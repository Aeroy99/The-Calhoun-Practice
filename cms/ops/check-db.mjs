import fs from "fs";
import pg from "pg";

const env = fs.readFileSync(".env.production.local", "utf8");
const unpooled = env.match(/^DATABASE_URL_UNPOOLED="(.+)"$/m)?.[1];
const pooled = env.match(/^DATABASE_URL="(.+)"$/m)?.[1];
if (!unpooled) {
  console.error("DATABASE_URL_UNPOOLED not found");
  process.exit(1);
}

function stripChannelBinding(url) {
  return url.replace(/([?&])channel_binding=[^&]*&?/g, "$1").replace(/[?&]$/, "");
}

async function listTables(label, connectionString) {
  const client = new pg.Client({
    connectionString,
    connectionTimeoutMillis: 20000,
  });
  const started = Date.now();
  try {
    await client.connect();
    const tables = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1",
    );
    console.log(`${label} (${Date.now() - started}ms):`, tables.rows.map((row) => row.tablename).join(", ") || "(none)");
  } finally {
    await client.end();
  }
}

try {
  await listTables("unpooled", unpooled);
  await listTables("unpooled-no-cb", stripChannelBinding(unpooled));
  if (pooled) {
    await listTables("pooled", pooled);
  }
} catch (error) {
  console.error("ERR", error.message);
  process.exit(1);
}
