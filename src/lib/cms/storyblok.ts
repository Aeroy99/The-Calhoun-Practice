import {
  DEFAULT_HOME_CONTENT,
  mapStoryblokHomeContent,
  type HomeContent,
} from "@/lib/cms/homeContent";

type StoryVersion = "draft" | "published";

interface StoryblokStoryResponse {
  story?: {
    id: number;
    content: unknown;
  };
}

const STORYBLOK_CDN_URL = "https://api.storyblok.com/v2/cdn/stories";
const STORYBLOK_BRIDGE_URL = "https://app.storyblok.com/f/storyblok-v2-latest.js";
const STORYBLOK_BRIDGE_SCRIPT_ID = "storyblok-bridge-script";

export function getStoryblokToken(): string {
  return (
    import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN ||
    import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN ||
    ""
  );
}

export function getStoryblokHomeSlug(): string {
  return import.meta.env.VITE_STORYBLOK_HOME_SLUG || "home";
}

export function isStoryblokConfigured(): boolean {
  return Boolean(getStoryblokToken());
}

export async function fetchHomeContentFromStoryblok(
  version: StoryVersion,
): Promise<{ content: HomeContent; storyId?: number } | null> {
  const token = getStoryblokToken();
  if (!token) {
    return null;
  }

  const slug = getStoryblokHomeSlug();
  const params = new URLSearchParams({
    token,
    version,
    cv: String(Date.now()),
  });

  const response = await fetch(`${STORYBLOK_CDN_URL}/${slug}?${params.toString()}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Storyblok request failed with status ${response.status}`);
  }

  const json = (await response.json()) as StoryblokStoryResponse;
  if (!json.story) {
    return null;
  }

  return {
    content: mapStoryblokHomeContent(json.story.content) || DEFAULT_HOME_CONTENT,
    storyId: json.story.id,
  };
}

function loadStoryblokBridgeScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.StoryblokBridge) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      STORYBLOK_BRIDGE_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Storyblok bridge script.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = STORYBLOK_BRIDGE_SCRIPT_ID;
    script.src = STORYBLOK_BRIDGE_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Storyblok bridge script."));
    document.body.appendChild(script);
  });
}

export async function createStoryblokBridge(): Promise<StoryblokBridgeInstance | null> {
  await loadStoryblokBridgeScript();

  if (!window.StoryblokBridge) {
    return null;
  }

  return new window.StoryblokBridge();
}
