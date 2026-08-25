import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticatorTransportFuture,
} from "@simplewebauthn/server";
import {
  generatePayloadCookie,
  getFieldsToSign,
  jwtSign,
  type Endpoint,
  type PayloadRequest,
} from "payload";
import { randomUUID } from "node:crypto";

import { debugLog } from "../lib/debug-log";

const CHALLENGE_TTL_MS = 5 * 60 * 1000;

function getRelyingParty() {
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://cms.thecalhounpractice.com"
      : "http://localhost:3000");
  const url = new URL(serverURL);
  return {
    rpID: url.hostname,
    origin: `${url.protocol}//${url.host}`,
    rpName: "Calhoun CMS",
  };
}

async function saveChallenge(req: PayloadRequest, challengeKey: string, challenge: string) {
  await req.payload.delete({
    collection: "auth-challenges",
    where: { challengeKey: { equals: challengeKey } },
    overrideAccess: true,
  });

  await req.payload.create({
    collection: "auth-challenges",
    overrideAccess: true,
    data: {
      challengeKey,
      challenge,
      expiresAt: new Date(Date.now() + CHALLENGE_TTL_MS).toISOString(),
    },
  });
}

async function readChallenge(req: PayloadRequest, challengeKey: string) {
  const result = await req.payload.find({
    collection: "auth-challenges",
    where: { challengeKey: { equals: challengeKey } },
    limit: 1,
    overrideAccess: true,
  });
  const doc = result.docs[0];
  if (!doc) {
    return null;
  }
  if (new Date(doc.expiresAt as string).getTime() < Date.now()) {
    await req.payload.delete({
      collection: "auth-challenges",
      id: doc.id,
      overrideAccess: true,
    });
    return null;
  }
  return doc;
}

async function json(data: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

async function createSessionCookie(req: PayloadRequest, user: { id: number; email: string }) {
  const collectionConfig = req.payload.collections.users.config;
  const sid = randomUUID();
  const tokenExpiration = collectionConfig.auth.tokenExpiration || 60 * 60 * 8;
  const expiresAt = new Date(Date.now() + tokenExpiration * 1000).toISOString();
  const existing = await req.payload.findByID({
    collection: "users",
    id: user.id,
    overrideAccess: true,
    depth: 0,
  });

  const sessions = Array.isArray(existing.sessions) ? existing.sessions : [];
  await req.payload.update({
    collection: "users",
    id: user.id,
    overrideAccess: true,
    data: {
      sessions: [
        ...sessions,
        {
          id: sid,
          createdAt: new Date().toISOString(),
          expiresAt,
        },
      ],
    },
  });

  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: user.email,
    sid,
    user: { ...existing, id: user.id, email: user.email },
  });
  const { token } = await jwtSign({
    fieldsToSign,
    secret: req.payload.secret,
    tokenExpiration,
  });

  return generatePayloadCookie({
    collectionAuthConfig: collectionConfig.auth,
    cookiePrefix: req.payload.config.cookiePrefix || "payload",
    token,
  });
}

export const passkeyEndpoints: Endpoint[] = [
  {
    path: "/passkeys/registration-options",
    method: "post",
    handler: async (req) => {
      if (!req.user) {
        return json({ error: "Login required" }, 401);
      }

      const { rpID, rpName } = getRelyingParty();
      const existing = await req.payload.find({
        collection: "passkeys",
        where: { user: { equals: req.user.id } },
        limit: 50,
        overrideAccess: true,
      });

      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName: req.user.email,
        userDisplayName: req.user.email,
        attestationType: "none",
        authenticatorSelection: {
          residentKey: "preferred",
          userVerification: "preferred",
        },
        excludeCredentials: existing.docs.map((doc) => ({
          id: String(doc.credentialId),
          transports: (doc.transports as AuthenticatorTransportFuture[] | undefined) || undefined,
        })),
      });

      await saveChallenge(req, `reg:${req.user.id}`, options.challenge);
      return json(options);
    },
  },
  {
    path: "/passkeys/register",
    method: "post",
    handler: async (req) => {
      if (!req.user) {
        return json({ error: "Login required" }, 401);
      }

      const body = (await req.json?.()) as {
        credential?: unknown;
        label?: string;
      };
      const stored = await readChallenge(req, `reg:${req.user.id}`);
      if (!stored || !body?.credential) {
        return json({ error: "Passkey registration challenge expired" }, 400);
      }

      const { rpID, origin } = getRelyingParty();
      const verification = await verifyRegistrationResponse({
        response: body.credential as Parameters<typeof verifyRegistrationResponse>[0]["response"],
        expectedChallenge: String(stored.challenge),
        expectedOrigin: origin,
        expectedRPID: rpID,
      });

      if (!verification.verified || !verification.registrationInfo) {
        return json({ error: "Passkey could not be verified" }, 400);
      }

      const { credential, credentialDeviceType, credentialBackedUp } =
        verification.registrationInfo;

      await req.payload.create({
        collection: "passkeys",
        overrideAccess: true,
        data: {
          user: req.user.id,
          label: body.label || "Passkey",
          credentialId: credential.id,
          publicKey: Buffer.from(credential.publicKey).toString("base64url"),
          counter: credential.counter,
          deviceType: credentialDeviceType,
          backedUp: credentialBackedUp,
          transports: credential.transports || [],
        },
      });

      await req.payload.delete({
        collection: "auth-challenges",
        id: stored.id,
        overrideAccess: true,
      });

      return json({ ok: true });
    },
  },
  {
    path: "/passkeys/authentication-options",
    method: "post",
    handler: async (req) => {
      const { rpID } = getRelyingParty();
      const options = await generateAuthenticationOptions({
        rpID,
        userVerification: "preferred",
      });
      await saveChallenge(req, `auth:${options.challenge}`, options.challenge);
      return json(options);
    },
  },
  {
    path: "/passkeys/authenticate",
    method: "post",
    handler: async (req) => {
      const body = (await req.json?.()) as {
        credential?: { id?: string };
        challenge?: string;
      };
      const credential = body?.credential;
      if (!credential?.id || !body.challenge) {
        return json({ error: "Missing passkey credential" }, 400);
      }

      const passkey = (
        await req.payload.find({
          collection: "passkeys",
          where: { credentialId: { equals: credential.id } },
          limit: 1,
          depth: 1,
          overrideAccess: true,
        })
      ).docs[0];

      if (!passkey) {
        return json({ error: "Passkey is not registered on this CMS" }, 401);
      }

      const { rpID, origin } = getRelyingParty();
      const stored = await readChallenge(req, `auth:${body.challenge}`);
      if (!stored) {
        return json({ error: "Passkey login challenge expired" }, 400);
      }

      const verification = await verifyAuthenticationResponse({
        response: credential as Parameters<typeof verifyAuthenticationResponse>[0]["response"],
        expectedChallenge: String(stored.challenge),
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
          id: String(passkey.credentialId),
          publicKey: Buffer.from(String(passkey.publicKey), "base64url"),
          counter: Number(passkey.counter) || 0,
          transports: (passkey.transports as AuthenticatorTransportFuture[] | undefined) || undefined,
        },
      });

      if (!verification.verified) {
        return json({ error: "Passkey authentication failed" }, 401);
      }

      await req.payload.update({
        collection: "passkeys",
        id: passkey.id,
        overrideAccess: true,
        data: { counter: verification.authenticationInfo.newCounter },
      });

      const relatedUser = passkey.user;
      const userId =
        typeof relatedUser === "object" && relatedUser
          ? relatedUser.id
          : relatedUser;
      const user =
        typeof relatedUser === "object" && relatedUser && "email" in relatedUser
          ? relatedUser
          : await req.payload.findByID({
              collection: "users",
              id: userId as string | number,
              overrideAccess: true,
            });

      const cookie = await createSessionCookie(req, {
        id: Number(user.id),
        email: String(user.email),
      });

      debugLog(
        "cms/src/auth/passkey-endpoints.ts:authenticate",
        "passkey login issued session cookie",
        { userId: user.id },
        "E",
      );

      await req.payload.delete({
        collection: "auth-challenges",
        id: stored.id,
        overrideAccess: true,
      });

      return json({ ok: true }, 200, { "Set-Cookie": cookie });
    },
  },
];
