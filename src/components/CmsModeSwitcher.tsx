import { cn } from "@/lib/utils";

type CmsMode = "decap" | "sanity-demo";

interface CmsModeSwitcherProps {
  mode: CmsMode;
}

export function CmsModeSwitcher({ mode }: CmsModeSwitcherProps) {
  return (
    <div className="fixed bottom-4 left-4 z-[70] rounded-xl border border-black/10 bg-white/95 p-2 shadow-lg backdrop-blur">
      <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--warm-gray))]">
        CMS Preview Mode
      </p>
      <div className="flex items-center gap-1">
        <a
          href="/?cms=decap"
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition-colors",
            mode === "decap"
              ? "bg-[hsl(var(--terracotta-main))] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          )}
        >
          Decap
        </a>
        <a
          href="/?cms=sanity-demo"
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition-colors",
            mode === "sanity-demo"
              ? "bg-[hsl(var(--terracotta-main))] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          )}
        >
          Sanity Demo
        </a>
        <a
          href="/cms-compare"
          className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Compare
        </a>
      </div>
    </div>
  );
}
