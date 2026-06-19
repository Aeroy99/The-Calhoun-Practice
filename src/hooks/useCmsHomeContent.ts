import { useEffect, useMemo, useState } from "react";
import { DEFAULT_HOME_CONTENT, mapStoryblokHomeContent } from "@/lib/cms/homeContent";
import {
  createStoryblokBridge,
  fetchHomeContentFromStoryblok,
  isStoryblokConfigured,
} from "@/lib/cms/storyblok";

function isPreviewSession(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.has("_storyblok") || params.get("preview") === "1";
}

export function useCmsHomeContent() {
  const [content, setContent] = useState(DEFAULT_HOME_CONTENT);
  const [source, setSource] = useState<"defaults" | "storyblok">("defaults");

  const previewMode = useMemo(() => isPreviewSession(), []);

  useEffect(() => {
    if (!isStoryblokConfigured()) {
      setContent(DEFAULT_HOME_CONTENT);
      setSource("defaults");
      return;
    }

    let isCancelled = false;
    let currentStoryId: number | undefined;

    const load = async () => {
      try {
        const data = await fetchHomeContentFromStoryblok(
          previewMode ? "draft" : "published",
        );

        if (!data || isCancelled) {
          return;
        }

        currentStoryId = data.storyId;
        setContent(data.content);
        setSource("storyblok");

        if (!previewMode) {
          return;
        }

        const bridge = await createStoryblokBridge();
        if (!bridge || isCancelled) {
          return;
        }

        bridge.on("input", (event) => {
          if (isCancelled) {
            return;
          }

          if (currentStoryId && event.story?.id && event.story.id !== currentStoryId) {
            return;
          }

          if (event.story?.content) {
            setContent(mapStoryblokHomeContent(event.story.content));
            setSource("storyblok");
          }
        });

        bridge.on(["change", "published"], () => {
          if (!isCancelled) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error("Failed to load Storyblok content, using defaults.", error);
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
  }, [previewMode]);

  return {
    content,
    source,
    previewMode,
  };
}
