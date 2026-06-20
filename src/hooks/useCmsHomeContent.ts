import { useEffect, useState } from "react";
import { DEFAULT_HOME_CONTENT, mapHomeContent } from "@/lib/cms/homeContent";

const CMS_MODE_QUERY_KEY = "cms";
const CMS_MODE_STORAGE_KEY = "calhoun.cms.mode";

export type CmsMode = "decap" | "sanity-demo";

function isCmsMode(value: string | null): value is CmsMode {
  return value === "decap" || value === "sanity-demo";
}

function resolveCmsMode(search: string): CmsMode {
  if (typeof window === "undefined") {
    return "decap";
  }

  const queryMode = new URLSearchParams(search).get(CMS_MODE_QUERY_KEY);
  if (isCmsMode(queryMode)) {
    window.localStorage.setItem(CMS_MODE_STORAGE_KEY, queryMode);
    return queryMode;
  }

  const storedMode = window.localStorage.getItem(CMS_MODE_STORAGE_KEY);
  if (isCmsMode(storedMode)) {
    return storedMode;
  }

  return "decap";
}

function getContentPath(mode: CmsMode): string {
  if (mode === "sanity-demo") {
    return "/content/home-content.sanity-demo.json";
  }
  return "/content/home-content.json";
}

export function useCmsHomeContent(search = "") {
  const [cmsMode, setCmsMode] = useState<CmsMode>(() => resolveCmsMode(search));
  const [content, setContent] = useState(DEFAULT_HOME_CONTENT);
  const [source, setSource] = useState<"defaults" | "decap" | "sanity-demo">(
    "defaults",
  );

  useEffect(() => {
    setCmsMode(resolveCmsMode(search));
  }, [search]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        const response = await fetch(getContentPath(cmsMode), {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load Decap content file: ${response.status}`);
        }

        const data = await response.json();
        if (isCancelled) {
          return;
        }

        setContent(mapHomeContent(data));
        setSource(cmsMode);
      } catch (error) {
        console.error("Failed to load CMS content, using defaults.", error);
        if (!isCancelled) {
          setContent(DEFAULT_HOME_CONTENT);
          setSource("defaults");
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [cmsMode]);

  return {
    cmsMode,
    content,
    source,
    previewMode: false,
  };
}
