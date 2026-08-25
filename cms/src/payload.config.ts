import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { payloadTotp } from "payload-totp";

import { AuthChallenges } from "./collections/AuthChallenges";
import { Media } from "./collections/Media";
import { Passkeys } from "./collections/Passkeys";
import { PlannerNotes } from "./collections/PlannerNotes";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";
import { ContactPage, FeesPage, PrivacyPage } from "./globals/SimplePages";
import { TherapyPage } from "./globals/TherapyPage";
import { passkeyEndpoints } from "./auth/passkey-endpoints";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";
const rawDatabaseUrl =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || "file:./payload-demo.db";

function normalizePostgresUrl(url: string): string {
  let normalized = url
    .replace(/([?&])channel_binding=[^&]*&?/g, "$1")
    .replace(/[?&]$/, "");

  if (!normalized.includes("connect_timeout=")) {
    normalized += `${normalized.includes("?") ? "&" : "?"}connect_timeout=15`;
  }

  return normalized;
}

function isSqliteUrl(url: string): boolean {
  return url.startsWith("file:") || url.endsWith(".db") || url.includes(".db?");
}

const databaseUrl = isSqliteUrl(rawDatabaseUrl)
  ? rawDatabaseUrl
  : normalizePostgresUrl(rawDatabaseUrl);

function getDatabaseAdapter() {
  if (isSqliteUrl(databaseUrl)) {
    if (isProduction && isVercel) {
      throw new Error(
        "SQLite is not supported on Vercel. Set DATABASE_URL to a Neon postgres:// connection string.",
      );
    }

    return sqliteAdapter({
      client: {
        url: databaseUrl,
      },
    });
  }

  const poolConfig = {
    connectionString: databaseUrl,
    max: 1,
    connectionTimeoutMillis: 8000,
    idleTimeoutMillis: 5000,
  };

  if (isVercel) {
    return vercelPostgresAdapter({
      pool: poolConfig,
      prodMigrations: migrations,
    });
  }

  return postgresAdapter({
    pool: poolConfig,
    prodMigrations: migrations,
  });
}

const cmsOrigin = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (isProduction ? "https://cms.thecalhounpractice.com" : "http://localhost:3000")
).replace(/\/$/, "");

const corsOrigins = (
  process.env.CORS_ORIGINS ||
  (isProduction
    ? "https://www.thecalhounpractice.com,https://thecalhounpractice.com"
    : "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const csrfOrigins = (
  process.env.CSRF_ORIGINS || cmsOrigin
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const previewUrl =
  process.env.PREVIEW_URL?.replace(/\/$/, "") ||
  (isProduction ? "https://www.thecalhounpractice.com" : "http://localhost:5173");

const payloadSecret = process.env.PAYLOAD_SECRET || "";
if (isProduction && payloadSecret.length < 16) {
  throw new Error("PAYLOAD_SECRET must be set to a long random string in production.");
}

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
if (isProduction && isVercel && !blobToken) {
  throw new Error(
    "BLOB_READ_WRITE_TOKEN is required on Vercel so media uploads are stored in Blob, not ephemeral disk.",
  );
}

const emailFrom = process.env.EMAIL_FROM || "noreply@thecalhounpractice.com";
const emailAdapter = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: emailFrom,
      defaultFromName: "Calhoun CMS",
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              }
            : undefined,
      },
    })
  : undefined;

const totpDisabled =
  process.env.NODE_ENV === "test" || process.env.PAYLOAD_DISABLE_TOTP === "true";

export default buildConfig({
  serverURL: cmsOrigin,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Calhoun CMS",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterLogin: ["/admin/PasskeyLogin#PasskeyLogin"],
    },
    livePreview: {
      globals: [
        "site-settings",
        "home-page",
        "about-page",
        "therapy-page",
        "contact-page",
        "fees-page",
        "privacy-page",
      ],
      url: ({ data }) => {
        const slug = (data as { globalType?: string } | undefined)?.globalType;
        const path =
          slug === "about-page"
            ? "/about"
            : slug === "therapy-page"
              ? "/therapy"
              : slug === "contact-page"
                ? "/contact"
                : slug === "fees-page"
                  ? "/fees-and-faq"
                  : slug === "privacy-page"
                    ? "/privacy-policy"
                    : "/";
        return `${previewUrl}${path}`;
      },
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Services, PlannerNotes, Passkeys, AuthChallenges],
  globals: [
    SiteSettings,
    HomePage,
    AboutPage,
    TherapyPage,
    ContactPage,
    FeesPage,
    PrivacyPage,
  ],
  endpoints: passkeyEndpoints,
  editor: lexicalEditor(),
  secret: payloadSecret || "calhoun-payload-demo-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: getDatabaseAdapter(),
  cors: corsOrigins,
  csrf: csrfOrigins,
  email: emailAdapter,
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  sharp,
  plugins: [
    ...(blobToken
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: blobToken,
          }),
        ]
      : []),
    payloadTotp({
      collection: "users",
      forceSetup: !totpDisabled,
      disabled: totpDisabled,
      totp: {
        issuer: "Calhoun CMS",
      },
    }),
  ],
});
