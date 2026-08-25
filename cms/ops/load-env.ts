import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { debugLog } from "../src/lib/debug-log";

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function parseEnvFile(contents: string): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[match[1]] = value;
  }

  return parsed;
}

export function stripPostgresUrl(url: string): string {
  return url
    .replace(/([?&])channel_binding=[^&]*&?/g, "$1")
    .replace(/[?&]$/, "");
}

function isPooledUrl(url: string): boolean {
  return url.includes("-pooler") || /(?:^|[?&])pgbouncer=true(?:&|$)/i.test(url);
}

export function resolveUnpooledDatabaseUrl(env: Record<string, string>): string {
  const candidates = [
    env.DATABASE_URL_UNPOOLED,
    env.POSTGRES_URL_NON_POOLING,
    env.POSTGRES_URL_UNPOOLED,
    env.DATABASE_URL,
    env.POSTGRES_URL,
  ].filter((value): value is string => Boolean(value));

  const unpooled = candidates.find((url) => !isPooledUrl(url)) || candidates[0];
  if (!unpooled) {
    throw new Error(
      "No database URL found. Expected DATABASE_URL_UNPOOLED or POSTGRES_URL_NON_POOLING in cms/.env.production.local",
    );
  }

  return stripPostgresUrl(unpooled);
}

export function loadCmsProductionEnv(envFileName = ".env.production.local") {
  const envPath = path.join(cmsRoot, envFileName);
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing ${envPath}. Run: vercel env pull --cwd cms ${envFileName}`);
  }

  const contents = fs.readFileSync(envPath, "utf8");
  const env = parseEnvFile(contents);
  const url = resolveUnpooledDatabaseUrl(env);

  debugLog(
    "cms/ops/load-env.ts:loadCmsProductionEnv",
    "resolved production database env",
    {
      cwd: process.cwd(),
      cmsRoot,
      envFileName,
      hasCR: contents.includes("\r"),
      usedUnpooledKey: Boolean(env.DATABASE_URL_UNPOOLED),
      usedNonPoolingKey: Boolean(env.POSTGRES_URL_NON_POOLING) && !env.DATABASE_URL_UNPOOLED,
      isPooled: isPooledUrl(url),
      oldQuotedOnlyWouldMatch: /^DATABASE_URL_UNPOOLED="(.+)"$/m.test(contents),
    },
    "A",
  );

  return { cmsRoot, env, connectionString: url, envPath };
}

export { cmsRoot };
