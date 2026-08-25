import pg from "pg";

import { loadCmsProductionEnv } from "./load-env.ts";

const { env, connectionString } = loadCmsProductionEnv();
const pooled = env.DATABASE_URL || env.POSTGRES_URL;

async function listTables(label, url) {
  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: 20000,
  });
  const started = Date.now();
  try {
    await client.connect();
    const tables = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1",
    );
    console.log(
      `${label} (${Date.now() - started}ms):`,
      tables.rows.map((row) => row.tablename).join(", ") || "(none)",
    );
  } finally {
    await client.end();
  }
}

try {
  await listTables("unpooled", connectionString);
  if (pooled && pooled !== connectionString) {
    await listTables("pooled", pooled);
  }
} catch (error) {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
}
