import Link from "next/link";
import React from "react";

import "./styles.css";

export default function CmsDemoHomePage() {
  return (
    <main className="home">
      <div className="content">
        <p className="eyebrow">The Calhoun Practice · Payload demo</p>
        <h1>Website content editor (owned by you)</h1>
        <p>
          This Next.js app is the CMS backend. Your public Vite website at{" "}
          <code>localhost:5173</code> reads homepage text from here when you open{" "}
          <code>?cms=payload</code>.
        </p>
        <div className="links">
          <Link className="admin" href="/admin">
            Open editor (/admin)
          </Link>
          <a
            className="docs"
            href="http://localhost:5173/?cms=payload"
            rel="noreferrer"
          >
            Open website in Payload mode
          </a>
        </div>
        <ol>
          <li>Create your admin login on first visit to /admin.</li>
          <li>
            Run <code>yarn seed</code> once to load current homepage copy.
          </li>
          <li>Edit <strong>Homepage content</strong>, save, refresh the Vite site.</li>
        </ol>
      </div>
    </main>
  );
}
