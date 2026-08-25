import { useEffect, useMemo, useState } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import {
  DEFAULT_HOME_CONTENT,
  mapHomeContent,
} from "@/lib/cms/homeContent";
import { fetchPayloadGlobal, getPayloadBaseUrl } from "@/lib/cms/payloadClient";

function isEmbeddedPreview(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function useCmsHomeContent() {
  const [payloadRaw, setPayloadRaw] = useState<Record<string, unknown>>(
    DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
  );
  const [source, setSource] = useState<"defaults" | "payload">("defaults");
  const [inLivePreviewFrame, setInLivePreviewFrame] = useState(false);

  useEffect(() => {
    setInLivePreviewFrame(isEmbeddedPreview());
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        const data = await fetchPayloadGlobal("home-page", 0);
        if (isCancelled) {
          return;
        }
        setPayloadRaw(data as Record<string, unknown>);
        setSource("payload");
      } catch (error) {
        console.warn("[CMS] Payload API unavailable, using defaults.", error);
        if (!isCancelled) {
          setPayloadRaw(
            DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
          );
          setSource("defaults");
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const { data: livePayloadData } = useLivePreview({
    initialData: payloadRaw,
    serverURL: getPayloadBaseUrl(),
    depth: 0,
  });

  const content = useMemo(
    () => mapHomeContent(livePayloadData),
    [livePayloadData],
  );

  return {
    content,
    source,
    previewMode: inLivePreviewFrame,
  };
}
