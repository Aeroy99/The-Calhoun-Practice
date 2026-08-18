import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { HomePage } from "./globals/HomePage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === "production";
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

const databaseUrl = normalizePostgresUrl(rawDatabaseUrl);

function isSqliteUrl(url: string): boolean {
  return url.startsWith("file:") || url.endsWith(".db") || url.includes(".db?");
}

function getDatabaseAdapter() {
  if (isSqliteUrl(databaseUrl)) {
    if (isProduction && process.env.VERCEL === "1") {
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

  if (process.env.VERCEL === "1") {
    return vercelPostgresAdapter({
      pool: poolConfig,
    });
  }

  return postgresAdapter({
    pool: poolConfig,
  });
}

const corsOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,http://127.0.0.1:5173,https://www.thecalhounpractice.com,https://thecalhounpractice.com"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const previewUrl =
  process.env.PREVIEW_URL?.replace(/\/$/, "") || "http://localhost:5173";

const payloadSecret = process.env.PAYLOAD_SECRET || "";
if (isProduction && payloadSecret.length < 16) {
  throw new Error("PAYLOAD_SECRET must be set to a long random string in production.");
}

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (isProduction ? "https://cms.thecalhounpractice.com" : "http://localhost:3000"),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Calhoun CMS",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      globals: ["home-page"],
      url: `${previewUrl}/?cms=payload`,
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: payloadSecret || "calhoun-payload-demo-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: getDatabaseAdapter(),
  cors: corsOrigins,
  csrf: corsOrigins,
  sharp,
  plugins: [],
});
