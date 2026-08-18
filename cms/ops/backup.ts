import "dotenv/config";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";

import config from "../src/payload.config";

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

  const homePath = path.join(target, "home-page.json");
  writeFileSync(homePath, `${JSON.stringify(homePage, null, 2)}\n`, "utf8");

  const sqliteName = "payload-demo.db";
  const sqliteSrc = path.join(cmsRoot, sqliteName);
  let copiedSqlite = false;
  if (existsSync(sqliteSrc)) {
    copyFileSync(sqliteSrc, path.join(target, sqliteName));
    copiedSqlite = true;
    for (const suffix of ["-wal", "-shm"]) {
      const extra = `${sqliteSrc}${suffix}`;
      if (existsSync(extra)) {
        copyFileSync(extra, path.join(target, `${sqliteName}${suffix}`));
      }
    }
  }

  writeFileSync(
    path.join(target, "manifest.json"),
    `${JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        keep: KEEP_COUNT,
        files: {
          homePage: "home-page.json",
          sqlite: copiedSqlite ? sqliteName : null,
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
  console.log("Restore newest: yarn cms:restore");
  console.log(`Restore this one: yarn cms:restore -- ${id}`);
  process.exit(0);
}

backup().catch((error) => {
  console.error("Backup failed:", error);
  process.exit(1);
});
