import "dotenv/config";
import { copyFileSync, existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";

import config from "../src/payload.config";
import { debugLog } from "../src/lib/debug-log";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const cmsRoot = path.resolve(dirname, "..");
const versionsDir = path.join(dirname, "backups", "versions");

function listVersionDirs(): string[] {
  if (!existsSync(versionsDir)) {
    return [];
  }

  return readdirSync(versionsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== ".gitkeep")
    .map((entry) => entry.name)
    .sort();
}

function resolveTarget(requested?: string): string {
  const versions = listVersionDirs();
  if (versions.length === 0) {
    throw new Error("No snapshots found. Run yarn cms:backup first.");
  }

  if (!requested) {
    return versions[versions.length - 1];
  }

  if (versions.includes(requested)) {
    return requested;
  }

  const match = versions.find((name) => name.startsWith(requested));
  if (match) {
    return match;
  }

  throw new Error(
    `Snapshot "${requested}" not found. Available:\n${versions.map((name) => `  - ${name}`).join("\n")}`,
  );
}

function isSqliteUrl(url: string | undefined) {
  return Boolean(url && (url.startsWith("file:") || url.endsWith(".db")));
}

function restoreSqliteFile(folder: string) {
  const dest = path.join(cmsRoot, "payload-demo.db");
  const src = path.join(folder, "payload-demo.db");
  if (!existsSync(src)) {
    throw new Error(`Snapshot is missing payload-demo.db`);
  }

  for (const extra of ["", "-wal", "-shm"]) {
    const live = `${dest}${extra}`;
    if (existsSync(live)) {
      rmSync(live, { force: true });
    }
  }

  copyFileSync(src, dest);

  for (const suffix of ["-wal", "-shm"]) {
    const sidecar = path.join(folder, `payload-demo.db${suffix}`);
    if (existsSync(sidecar)) {
      copyFileSync(sidecar, `${dest}${suffix}`);
    }
  }
}

async function restore() {
  const requested = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
  const id = resolveTarget(requested);
  const folder = path.join(versionsDir, id);
  const homePath = path.join(folder, "home-page.json");
  const sqliteSrc = path.join(folder, "payload-demo.db");
  const databaseUrl =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || "file:./payload-demo.db";
  const sqliteEnv = isSqliteUrl(databaseUrl);

  if (sqliteEnv && existsSync(sqliteSrc)) {
    restoreSqliteFile(folder);
    debugLog(
      "cms/ops/restore.ts",
      "restored sqlite snapshot only",
      { id, mode: "sqlite" },
      "D",
    );
    console.log(`Restored SQLite database from snapshot ${id}.`);
    console.log("Restart yarn cms:dev if it is running, then refresh the website.");
    process.exit(0);
  }

  if (!existsSync(homePath)) {
    throw new Error(`Missing home-page.json in ${id}`);
  }

  const raw = JSON.parse(readFileSync(homePath, "utf8")) as Record<string, unknown>;
  const data = { ...raw };
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.globalType;

  const payload = await getPayload({ config });
  await payload.updateGlobal({
    slug: "home-page",
    data,
  });

  debugLog(
    "cms/ops/restore.ts",
    "restored homepage JSON without copying sqlite",
    { id, mode: "json", sqlitePresentButSkipped: existsSync(sqliteSrc) && !sqliteEnv },
    "D",
  );

  console.log(`Restored homepage content from snapshot ${id}.`);
  if (existsSync(sqliteSrc) && !sqliteEnv) {
    console.log("SQLite file in the snapshot was ignored because this environment uses Postgres.");
  }
  console.log("Refresh the website to confirm.");
  process.exit(0);
}

restore().catch((error) => {
  console.error("Restore failed:", error);
  process.exit(1);
});
