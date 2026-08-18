import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { up } from "../src/migrations/20260817_231130_initial.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cmsRoot = path.resolve(__dirname, "..");

function getConnectionString() {
  const env = fs.readFileSync(path.join(cmsRoot, ".env.production.local"), "utf8");
  const unpooled = env.match(/^DATABASE_URL_UNPOOLED="(.+)"$/m)?.[1];
  if (!unpooled) {
    throw new Error("DATABASE_URL_UNPOOLED not found");
  }

  return unpooled
    .replace(/([?&])channel_binding=[^&]*&?/g, "$1")
    .replace(/[?&]$/, "");
}

const client = new pg.Client({
  connectionString: getConnectionString(),
  connectionTimeoutMillis: 20000,
});

const db = {
  async execute(query) {
    const { sql: text, params } = query.toQuery({
      dialect: "postgresql",
      casing: "snake_case",
    });
    await client.query(text, params);
  },
};

try {
  await client.connect();
  const requiredTables = ["users", "media", "home_page", "payload_migrations"];
  const existing = await client.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = ANY($1)",
    [requiredTables],
  );
  if (existing.rowCount === requiredTables.length) {
    console.log("Schema already present; skipping.");
    process.exit(0);
  }
  if (existing.rowCount > 0) {
    const found = existing.rows.map((r) => r.tablename);
    const missing = requiredTables.filter((t) => !found.includes(t));
    console.warn(
      `Partial schema detected (missing: ${missing.join(", ")}). Re-applying migration...`,
    );
  }

  console.log("Applying initial migration...");
  await up({ db, payload: {}, req: {} });
  await client.query(
    "INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ($1, $2, NOW(), NOW())",
    ["20260817_231130_initial", 1],
  );
  console.log("Initial migration applied.");
} catch (error) {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.end();
}
