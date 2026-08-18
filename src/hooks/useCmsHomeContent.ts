import { useEffect, useMemo, useState } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import {
  DEFAULT_HOME_CONTENT,
  mapHomeContent,
  type HomeContent,
} from "@/lib/cms/homeContent";

const CMS_MODE_QUERY_KEY = "cms";
const CMS_MODE_STORAGE_KEY = "calhoun.cms.mode";

export type CmsMode = "decap" | "sanity-demo" | "payload";

type ContentSource = "defaults" | "decap" | "sanity-demo" | "payload";

function isCmsMode(value: string | null | undefined): value is CmsMode {
  return value === "decap" || value === "sanity-demo" || value === "payload";
}

function isLocalPayloadHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return url.includes("localhost") || url.includes("127.0.0.1");
  }
}

function getPayloadBaseUrl(): string {
  return (
    import.meta.env.VITE_PAYLOAD_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

function getBuildDefaultMode(): CmsMode {
  const envMode = import.meta.env.VITE_CMS_MODE;
  if (isCmsMode(envMode)) {
    return envMode;
  }

  const payloadUrl = import.meta.env.VITE_PAYLOAD_URL;
  if (payloadUrl && !isLocalPayloadHost(payloadUrl)) {
    return "payload";
  }

  return "decap";
}

function resolveCmsMode(search: string): CmsMode {
  const buildDefault = getBuildDefaultMode();

  if (typeof window === "undefined") {
    return buildDefault;
  }

  const queryMode = new URLSearchParams(search).get(CMS_MODE_QUERY_KEY);
  if (isCmsMode(queryMode)) {
    window.localStorage.setItem(CMS_MODE_STORAGE_KEY, queryMode);
    return queryMode;
  }

  if (buildDefault === "payload") {
    return "payload";
  }

  const storedMode = window.localStorage.getItem(CMS_MODE_STORAGE_KEY);
  if (isCmsMode(storedMode)) {
    return storedMode;
  }

  return buildDefault;
}

async function loadPayloadHomeContent() {
  const response = await fetch(
    `${getPayloadBaseUrl()}/api/globals/home-page?depth=0`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Payload home-page fetch failed: ${response.status}`);
  }

  return response.json();
}

async function loadStaticHomeContent(mode: Exclude<CmsMode, "payload">) {
  const path =
    mode === "sanity-demo"
      ? "/content/home-content.sanity-demo.json"
      : "/content/home-content.json";
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load CMS content file: ${response.status}`);
  }
  return response.json();
}

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

export function useCmsHomeContent(search = "") {
  const [cmsMode, setCmsMode] = useState<CmsMode>(() => resolveCmsMode(search));
  const [fetchedContent, setFetchedContent] = useState<HomeContent>(
    DEFAULT_HOME_CONTENT,
  );
  const [payloadRaw, setPayloadRaw] = useState<Record<string, unknown>>(
    DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
  );
  const [source, setSource] = useState<ContentSource>("defaults");
  const [inLivePreviewFrame, setInLivePreviewFrame] = useState(false);

  useEffect(() => {
    setCmsMode(resolveCmsMode(search));
  }, [search]);

  useEffect(() => {
    setInLivePreviewFrame(isEmbeddedPreview());
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        if (cmsMode === "payload") {
          try {
            const data = await loadPayloadHomeContent();
            if (isCancelled) {
              return;
            }
            setPayloadRaw(data as Record<string, unknown>);
            setFetchedContent(mapHomeContent(data));
            setSource("payload");
            return;
          } catch (payloadError) {
            console.warn(
              "[CMS] Payload API unavailable:",
              payloadError,
            );
            if (import.meta.env.PROD) {
              if (!isCancelled) {
                setFetchedContent(DEFAULT_HOME_CONTENT);
                setPayloadRaw(
                  DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
                );
                setSource("defaults");
              }
              return;
            }
            const fallback = await loadStaticHomeContent("decap");
            if (isCancelled) {
              return;
            }
            setFetchedContent(mapHomeContent(fallback));
            setPayloadRaw(fallback as Record<string, unknown>);
            setSource("decap");
            return;
          }
        }

        const data = await loadStaticHomeContent(cmsMode);
        if (isCancelled) {
          return;
        }
        setFetchedContent(mapHomeContent(data));
        setSource(cmsMode);
      } catch (error) {
        console.error("Failed to load CMS content, using defaults.", error);
        if (!isCancelled) {
          setFetchedContent(DEFAULT_HOME_CONTENT);
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
  }, [cmsMode]);

  const { data: livePayloadData } = useLivePreview({
    initialData: payloadRaw,
    serverURL: getPayloadBaseUrl(),
    depth: 0,
  });

  const content = useMemo(() => {
    if (cmsMode === "payload") {
      return mapHomeContent(livePayloadData);
    }
    return fetchedContent;
  }, [cmsMode, livePayloadData, fetchedContent]);

  return {
    cmsMode,
    content,
    source,
    previewMode: cmsMode === "payload" && inLivePreviewFrame,
  };
}
