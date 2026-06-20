import { useEffect, useState } from "react";
import { DEFAULT_HOME_CONTENT, mapHomeContent } from "@/lib/cms/homeContent";

export function useCmsHomeContent() {
  const [content, setContent] = useState(DEFAULT_HOME_CONTENT);
  const [source, setSource] = useState<"defaults" | "decap">("defaults");

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/content/home-content.json", {
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
        setSource("decap");
      } catch (error) {
        console.error("Failed to load Decap content, using defaults.", error);
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
  }, []);

  return {
    content,
    source,
    previewMode: false,
  };
}
