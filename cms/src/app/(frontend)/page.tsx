import Link from "next/link";
import React from "react";

import "./styles.css";

export default function CmsHomePage() {
  return (
    <main className="home">
      <div className="content">
        <p className="eyebrow">The Calhoun Practice · CMS</p>
        <h1>Website content editor</h1>
        <p>
          This app is the Payload CMS. Editors sign in at <code>/admin</code>.
          The public site reads homepage copy from{" "}
          <code>/api/globals/home-page</code>.
        </p>
        <div className="links">
          <Link className="admin" href="/admin">
            Open editor (/admin)
          </Link>
          <a
            className="docs"
            href="https://www.thecalhounpractice.com"
            rel="noreferrer"
          >
            Open public website
          </a>
        </div>
        <ol>
          <li>Sign in with the admin created by <code>yarn seed</code> (from PAYLOAD_ADMIN_EMAIL).</li>
          <li>
            Complete Authenticator app setup, then register a passkey on your account.
          </li>
          <li>Edit <strong>Homepage content</strong>, save, then refresh the public site.</li>
        </ol>
      </div>
    </main>
  );
}
