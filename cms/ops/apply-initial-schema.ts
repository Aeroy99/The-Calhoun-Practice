import fs from "fs";
import pg from "pg";
import { up } from "../src/migrations/20260817_231130_initial.ts";

function getConnectionString() {
  const env = fs.readFileSync(".env.production.local", "utf8");
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
  const existing = await client.query(
    "SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users'",
  );
  if (existing.rowCount > 0) {
    console.log("Schema already present; skipping.");
    process.exit(0);
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
