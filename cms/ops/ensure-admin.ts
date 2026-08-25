import "dotenv/config";
import { getPayload } from "payload";

import config from "../src/payload.config";
import { debugLog } from "../src/lib/debug-log";

export async function ensureAdminUser() {
  const email = process.env.PAYLOAD_ADMIN_EMAIL;
  const password = process.env.PAYLOAD_ADMIN_PASSWORD;
  const name = process.env.PAYLOAD_ADMIN_NAME || "Admin";

  if (!email || !password) {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: "users",
      limit: 1,
      overrideAccess: true,
    });

    if (existing.totalDocs > 0) {
      console.warn(
        "Skipping admin bootstrap: credentials unset, but at least one user already exists.",
      );
      return { created: false, skipped: true };
    }

    if (process.env.VERCEL === "1") {
      throw new Error(
        "PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD must be set so the first /admin user is created by deploy, not by whoever visits first.",
      );
    }
    console.warn(
      "Skipping admin bootstrap: set PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD to create the first user.",
    );
    return { created: false, skipped: true };
  }

  if (password.length < 12) {
    throw new Error("PAYLOAD_ADMIN_PASSWORD must be at least 12 characters.");
  }

  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    debugLog(
      "cms/ops/ensure-admin.ts",
      "admin already present",
      { created: false },
      "E",
    );
    console.log(`Admin user already exists: ${email}`);
    return { created: false, skipped: false };
  }

  await payload.create({
    collection: "users",
    overrideAccess: true,
    data: {
      email,
      password,
      name,
      role: "admin",
    },
  });

  debugLog(
    "cms/ops/ensure-admin.ts",
    "created first admin user",
    { created: true },
    "E",
  );
  console.log(`Created admin user ${email}`);
  return { created: true, skipped: false };
}

const isDirectRun = process.argv[1]?.includes("ensure-admin");
if (isDirectRun) {
  ensureAdminUser()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("ensure-admin failed:", error);
      process.exit(1);
    });
}
