import "dotenv/config";
import { copyFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";

import config from "../src/payload.config";

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

async function restore() {
  const requested = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
  const id = resolveTarget(requested);
  const folder = path.join(versionsDir, id);
  const homePath = path.join(folder, "home-page.json");

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

  const sqliteSrc = path.join(folder, "payload-demo.db");
  if (existsSync(sqliteSrc)) {
    copyFileSync(sqliteSrc, path.join(cmsRoot, "payload-demo.db"));
    console.log("Restored SQLite file payload-demo.db (restart yarn cms:dev if it is running).");
  }

  console.log(`Restored homepage content from snapshot ${id}.`);
  console.log("Refresh the website to confirm.");
  process.exit(0);
}

restore().catch((error) => {
  console.error("Restore failed:", error);
  process.exit(1);
});
