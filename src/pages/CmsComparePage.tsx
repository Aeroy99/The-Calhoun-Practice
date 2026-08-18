import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type CmsMode = "decap" | "sanity-demo" | "payload";

export default function CmsComparePage() {
  const [mode, setMode] = useState<CmsMode>("payload");

  const previewSrc = useMemo(() => `/?cms=${mode}`, [mode]);

  return (
    <main className="min-h-screen bg-[hsl(var(--cream))] px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--warm-gray))]">
            CMS Decision Preview
          </p>
          <h1 className="mt-2 text-2xl font-serif text-[var(--color-text-primary)] md:text-3xl">
            Compare content sources for the homepage
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(var(--warm-gray))] md:text-base">
            Payload is the owned open-source path (editor at{" "}
            <code>http://localhost:3000/admin</code>). Decap remains a Git-backed
            fallback. Sanity Demo is a static sample dataset only.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("payload")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === "payload"
                  ? "bg-[hsl(var(--terracotta-main))] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Payload mode
            </button>
            <button
              type="button"
              onClick={() => setMode("decap")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === "decap"
                  ? "bg-[hsl(var(--terracotta-main))] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Decap mode
            </button>
            <button
              type="button"
              onClick={() => setMode("sanity-demo")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === "sanity-demo"
                  ? "bg-[hsl(var(--terracotta-main))] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Sanity demo mode
            </button>
            <a
              href="http://localhost:3000/admin"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-black/10 hover:bg-gray-50"
              target="_blank"
              rel="noreferrer"
            >
              Open Payload editor
            </a>
            <Link
              to={previewSrc}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-black/10 hover:bg-gray-50"
            >
              Open full preview
            </Link>
          </div>
        </header>

        <section className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
          <iframe
            title="CMS comparison preview"
            src={previewSrc}
            className="h-[72vh] w-full rounded-xl border border-black/10"
          />
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            What you are looking at
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[hsl(var(--warm-gray))]">
            <li>
              Payload: live content from your local SQLite database via the CMS
              API.
            </li>
            <li>Decap: JSON file in the repo (`public/content/home-content.json`).</li>
            <li>Sanity demo: alternate JSON file only (no real Sanity Studio).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
