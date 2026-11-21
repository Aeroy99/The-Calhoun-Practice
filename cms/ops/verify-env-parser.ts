import { parseEnvFile, loadCmsProductionEnv } from "./load-env.ts";
import { debugLog } from "../src/lib/debug-log.ts";

const crlfSample = 'DATABASE_URL_UNPOOLED=postgres://example.neon.tech/neondb\r\nPOSTGRES_URL="postgres://pooler.neon.tech/neondb?pgbouncer=true"\r\n';
const crlfParsed = parseEnvFile(crlfSample);
const oldQuoted = /^DATABASE_URL_UNPOOLED="(.+)"$/m.test(crlfSample);

debugLog(
  "cms/ops/verify-env-parser.ts",
  "CRLF unquoted parser check",
  {
    oldQuotedMatch: oldQuoted,
    newParserFoundUnpooled: Boolean(crlfParsed.DATABASE_URL_UNPOOLED),
  },
  "A",
  "post-fix",
);

try {
  const loaded = loadCmsProductionEnv();
  debugLog(
    "cms/ops/verify-env-parser.ts",
    "loaded cms production env from package root",
    {
      cwd: process.cwd(),
      foundConnection: Boolean(loaded.connectionString),
    },
    "A",
    "post-fix",
  );
  console.log(
    JSON.stringify({
      crlfOldQuotedMatch: oldQuoted,
      crlfNewParserFoundUnpooled: Boolean(crlfParsed.DATABASE_URL_UNPOOLED),
      productionEnvLoaded: true,
    }),
  );
} catch (error) {
  console.log(
    JSON.stringify({
      crlfOldQuotedMatch: oldQuoted,
      crlfNewParserFoundUnpooled: Boolean(crlfParsed.DATABASE_URL_UNPOOLED),
      productionEnvLoaded: false,
      error: error instanceof Error ? error.message : "unknown",
    }),
  );
}
