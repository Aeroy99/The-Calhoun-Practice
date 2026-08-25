import pg from "pg";

import { up } from "../src/migrations/20260817_231130_initial.ts";
import { debugLog } from "../src/lib/debug-log";
import { loadCmsProductionEnv } from "./load-env.ts";

const REQUIRED_TABLES = [
  "users_sessions",
  "users",
  "media",
  "payload_kv",
  "payload_locked_documents",
  "payload_locked_documents_rels",
  "payload_preferences",
  "payload_preferences_rels",
  "payload_migrations",
  "home_page",
] as const;

const { connectionString } = loadCmsProductionEnv();

const client = new pg.Client({
  connectionString,
  connectionTimeoutMillis: 20000,
});

const db = {
  async execute(query) {
    const { sql: text, params } = query.toQuery({
      dialect: "postgresql",
      casing: "snake_case",
    });
    try {
      await client.query(text, params);
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : "";
      if (code === "42P07" || code === "42710" || code === "42701") {
        return;
      }
      throw error;
    }
  },
};

try {
  await client.connect();
  const existing = await client.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = ANY($1)",
    [REQUIRED_TABLES],
  );
  const found = existing.rows.map((row) => row.tablename);
  const missing = REQUIRED_TABLES.filter((table) => !found.includes(table));

  debugLog(
    "cms/ops/apply-initial-schema.ts",
    "schema presence check",
    {
      foundCount: found.length,
      requiredCount: REQUIRED_TABLES.length,
      missingCount: missing.length,
    },
    "C",
  );

  if (missing.length === 0) {
    console.log("Initial schema already present; skipping.");
    process.exit(0);
  }

  if (found.length > 0) {
    console.warn(
      `Partial schema detected (missing: ${missing.join(", ")}). Applying remaining tables...`,
    );
  }

  console.log("Applying initial migration...");
  await up({ db, payload: {}, req: {} });
  const migrationRow = await client.query(
    "SELECT 1 FROM payload_migrations WHERE name = $1 LIMIT 1",
    ["20260817_231130_initial"],
  );
  if ((migrationRow.rowCount ?? 0) === 0) {
    await client.query(
      "INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ($1, $2, NOW(), NOW())",
      ["20260817_231130_initial", 1],
    );
  }
  console.log("Initial migration applied.");
} catch (error) {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.end();
}
