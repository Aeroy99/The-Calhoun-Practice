import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from "react";
import {
  fetchPayloadCollection,
  fetchPayloadGlobal,
  getPayloadBaseUrl,
} from "@/lib/cms/payloadClient";
import { useLivePreview } from "@payloadcms/live-preview-react";
import {
  DEFAULT_SITE_CHROME,
  mapServices,
  mapSiteChrome,
  type ServiceCard,
  type SiteChrome,
} from "@/lib/cms/siteContent";

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

export function useSiteChromeState() {
  const [raw, setRaw] = useState<Record<string, unknown>>(
    DEFAULT_SITE_CHROME as unknown as Record<string, unknown>,
  );
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setPreviewMode(isEmbeddedPreview());
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [settings, collection] = await Promise.all([
          fetchPayloadGlobal("site-settings", 0),
          fetchPayloadCollection("services", 1),
        ]);
        if (cancelled) {
          return;
        }
        setRaw(settings as Record<string, unknown>);
        setServices(mapServices(collection));
      } catch (error) {
        console.warn("[CMS] Site chrome unavailable, using defaults.", error);
        if (!cancelled) {
          setServices(mapServices({ docs: [] }));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { data } = useLivePreview({
    initialData: raw,
    serverURL: getPayloadBaseUrl(),
    depth: 0,
  });

  return {
    chrome: mapSiteChrome(data),
    services,
    previewMode,
  };
}

export function usePayloadPage<T>(
  slug: string,
  mapFn: (raw: unknown) => T,
  fallback: T,
) {
  const [raw, setRaw] = useState<Record<string, unknown>>(
    fallback as unknown as Record<string, unknown>,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPayloadGlobal(slug, 1);
        if (!cancelled) {
          setRaw(data as Record<string, unknown>);
        }
      } catch (error) {
        console.warn(`[CMS] ${slug} unavailable, using defaults.`, error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const { data } = useLivePreview({
    initialData: raw,
    serverURL: getPayloadBaseUrl(),
    depth: 1,
  });

  return mapFn(data);
}

type SiteChromeValue = {
  chrome: SiteChrome;
  services: ServiceCard[];
  previewMode: boolean;
};

const SiteChromeContext = createContext<SiteChromeValue | null>(null);

export function SiteChromeProvider({ children }: { children: ReactNode }) {
  const value = useSiteChromeState();
  return createElement(SiteChromeContext.Provider, { value }, children);
}

export function useSiteChrome() {
  return (
    useContext(SiteChromeContext) ?? {
      chrome: DEFAULT_SITE_CHROME,
      services: mapServices({ docs: [] }),
      previewMode: false,
    }
  );
}
