import "dotenv/config";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";
import { getPayload } from "payload";

import config from "../src/payload.config";
import { debugLog } from "../src/lib/debug-log";

const KEEP_COUNT = 5;
const dirname = path.dirname(fileURLToPath(import.meta.url));
const cmsRoot = path.resolve(dirname, "..");
const versionsDir = path.join(dirname, "backups", "versions");

function stamp(): string {
  return new Date().toISOString().replace(/:/g, "-").slice(0, 19);
}

function listVersionDirs(): string[] {
  if (!existsSync(versionsDir)) {
    return [];
  }

  return readdirSync(versionsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== ".gitkeep")
    .map((entry) => entry.name)
    .sort();
}

function pruneOldVersions() {
  const versions = listVersionDirs();
  const extra = versions.length - KEEP_COUNT;
  if (extra <= 0) {
    return;
  }

  for (const name of versions.slice(0, extra)) {
    rmSync(path.join(versionsDir, name), { recursive: true, force: true });
    console.log(`Removed oldest snapshot: ${name}`);
  }
}

function isSqliteUrl(url: string | undefined) {
  return Boolean(url && (url.startsWith("file:") || url.endsWith(".db")));
}

async function backupSqliteConsistent(src: string, dest: string) {
  const client = createClient({ url: `file:${src.replace(/\\/g, "/")}` });
  try {
    const destSql = dest.replace(/\\/g, "/").replace(/'/g, "''");
    await client.execute(`VACUUM INTO '${destSql}'`);
  } finally {
    client.close();
  }
}

function tryPgDump(connectionString: string, dest: string) {
  try {
    execFileSync(
      "pg_dump",
      ["--no-owner", "--no-acl", `--dbname=${connectionString}`, "-f", dest],
      { stdio: "pipe" },
    );
    return true;
  } catch {
    return false;
  }
}

async function backup() {
  mkdirSync(versionsDir, { recursive: true });

  const payload = await getPayload({ config });
  const homePage = await payload.findGlobal({
    slug: "home-page",
    depth: 0,
  });

  const id = stamp();
  const target = path.join(versionsDir, id);
  mkdirSync(target, { recursive: true });

  writeFileSync(
    path.join(target, "home-page.json"),
    `${JSON.stringify(homePage, null, 2)}\n`,
    "utf8",
  );

  const databaseUrl =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || "file:./payload-demo.db";
  let sqliteMethod: "vacuum" | null = null;
  let postgresDump: string | null = null;

  if (isSqliteUrl(databaseUrl)) {
    const sqliteSrc = path.join(cmsRoot, "payload-demo.db");
    if (existsSync(sqliteSrc)) {
      await backupSqliteConsistent(sqliteSrc, path.join(target, "payload-demo.db"));
      sqliteMethod = "vacuum";
    }
  } else if (tryPgDump(databaseUrl, path.join(target, "postgres.sql"))) {
    postgresDump = "postgres.sql";
  }

  debugLog(
    "cms/ops/backup.ts",
    "backup snapshot written",
    {
      sqliteMethod,
      postgresDump: Boolean(postgresDump),
      isSqlite: isSqliteUrl(databaseUrl),
    },
    "D",
  );

  writeFileSync(
    path.join(target, "manifest.json"),
    `${JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        keep: KEEP_COUNT,
        files: {
          homePage: "home-page.json",
          sqlite: sqliteMethod ? "payload-demo.db" : null,
          sqliteMethod,
          postgresDump,
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  pruneOldVersions();

  const remaining = listVersionDirs();
  console.log(`Backup saved: ${id}`);
  console.log(`Kept ${remaining.length}/${KEEP_COUNT} snapshots:`);
  for (const name of remaining) {
    console.log(`  - ${name}`);
  }
  if (isSqliteUrl(databaseUrl) && sqliteMethod) {
    console.log("SQLite copied with VACUUM INTO (consistent snapshot).");
  } else if (!isSqliteUrl(databaseUrl) && !postgresDump) {
    console.log(
      "Postgres dump skipped (pg_dump not found). Homepage JSON was saved. Use Neon PITR for full DB recovery.",
    );
  }
  console.log("Restore newest: yarn cms:restore");
  console.log(`Restore this one: yarn cms:restore -- ${id}`);
  process.exit(0);
}

backup().catch((error) => {
  console.error("Backup failed:", error);
  process.exit(1);
});
