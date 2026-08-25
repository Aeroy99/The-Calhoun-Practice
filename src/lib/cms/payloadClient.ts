function isLocalPayloadHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return url.includes("localhost") || url.includes("127.0.0.1");
  }
}

function debugCmsLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
) {
  // #region agent log
  fetch("http://127.0.0.1:7559/ingest/eb3498d8-f5f2-46b2-aa0f-47eea4097b46", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "d2bd94",
    },
    body: JSON.stringify({
      sessionId: "d2bd94",
      runId: "payload-only",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

export function getPayloadBaseUrl(): string {
  const configured = import.meta.env.VITE_PAYLOAD_URL?.replace(/\/$/, "") || "";
  if (import.meta.env.PROD) {
    if (!configured || isLocalPayloadHost(configured)) {
      debugCmsLog(
        "src/lib/cms/payloadClient.ts:getPayloadBaseUrl",
        "refusing localhost Payload URL in production",
        {
          hasConfigured: Boolean(configured),
          isLocal: configured ? isLocalPayloadHost(configured) : false,
        },
        "B",
      );
      return "";
    }
    return configured;
  }

  const url = configured || "http://localhost:3000";
  debugCmsLog(
    "src/lib/cms/payloadClient.ts:getPayloadBaseUrl",
    "resolved Payload URL",
    {
      usingLocalhost: isLocalPayloadHost(url),
      isProd: Boolean(import.meta.env.PROD),
    },
    "B",
  );
  return url;
}

export async function fetchPayloadGlobal(slug: string, depth = 1) {
  const base = getPayloadBaseUrl();
  if (!base) {
    throw new Error("Payload CMS URL is not configured");
  }
  const response = await fetch(`${base}/api/globals/${slug}?depth=${depth}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Payload ${slug} fetch failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchPayloadCollection(slug: string, depth = 1) {
  const base = getPayloadBaseUrl();
  if (!base) {
    throw new Error("Payload CMS URL is not configured");
  }
  const response = await fetch(
    `${base}/api/${slug}?depth=${depth}&limit=50&sort=order`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Payload ${slug} fetch failed: ${response.status}`);
  }
  return response.json();
}

export function mediaUrl(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (value && typeof value === "object") {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.trim()) {
      const path = url.trim();
      if (path.startsWith("http")) {
        return path;
      }
      const base = getPayloadBaseUrl();
      return `${base}${path}`;
    }
  }
  return fallback;
}
