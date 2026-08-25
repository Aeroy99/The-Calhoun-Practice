export function debugLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
  runId = "pre-fix",
) {
  if (process.env.NODE_ENV === "production" || process.env.CALHOUN_DEBUG_LOG !== "true") {
    return;
  }

  const DEBUG_ENDPOINT =
    "http://127.0.0.1:7559/ingest/eb3498d8-f5f2-46b2-aa0f-47eea4097b46";

  fetch(DEBUG_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "d2bd94",
    },
    body: JSON.stringify({
      sessionId: "d2bd94",
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
