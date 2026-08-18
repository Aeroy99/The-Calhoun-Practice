# Payload CMS demo (owned stack)

The CMS lives in **`cms/`**. Folder map, backups, and restore: [`cms/README.md`](../cms/README.md) and [`cms/ops/README.md`](../cms/ops/README.md).

This folder is a **self-hosted Payload 3** app used as the content backend for The Calhoun Practice website demo.

It is separate from the public Vite site on purpose:
- Vite site (`../`) = what visitors see
- Payload app (`./cms`) = what your wife edits at `/admin`

## Architecture (where things sit)

```
Your laptop / future server
├── Vite website (port 5173 locally, Vercel in production today)
│   └── ?cms=payload → fetches homepage text from Payload API
│
└── Payload CMS (port 3000 locally)          ← YOU maintain this
    ├── /admin                               ← wife login + forms
    ├── /api/globals/home-page               ← public read API
    ├── SQLite file: payload-demo.db         ← owned content store
    └── schema in src/globals/HomePage.ts    ← you control fields
```

### What each piece does

| Piece | Path | Who uses it | Your maintenance |
|--|--|--|--|
| Admin UI | `http://localhost:3000/admin` | Wife (and you) | Create users, keep Payload updated |
| Homepage schema | `cms/src/globals/HomePage.ts` | You (developer) | Add/rename editable fields |
| Database | `cms/payload-demo.db` (SQLite, local demo) | System | Backup the file; later swap to Postgres for production |
| Public API | `GET /api/globals/home-page` | Website | Keep CORS origins correct |
| Website hook | `src/hooks/useCmsHomeContent.ts` | Site | Reads Payload when `?cms=payload` |

## Quick start (demo)

From the repo root:

```bash
# 1) Install CMS deps (once)
yarn --cwd cms install

# 2) Start Payload
yarn cms:dev

# 3) In another terminal, seed homepage copy (once)
yarn cms:seed

# 4) Start the public site (if not already running)
yarn dev:cms
```

Then:

1. Open `http://localhost:3000/admin` and create the first admin account.
2. In the sidebar open **Homepage content**, edit text, **Save**.
3. Open `http://localhost:5173/?cms=payload` and refresh to see her edits.
4. Compare modes at `http://localhost:5173/cms-compare`.

Optional env for the Vite site (defaults to `http://localhost:3000`):

```bash
# in repo root .env.local
VITE_PAYLOAD_URL=http://localhost:3000
```

## Wife experience (intentional)

She only needs:

1. Browser link to `/admin`
2. Email + password login
3. Open **Homepage content**
4. Click **Live Preview** (top of the editor) to see the real website beside/above the form
5. Type changes — the preview updates before Save
6. Click **Save** when happy

No GitHub. No terminal. Works on iPhone / Mac / Windows browsers.

### Live Preview (before save)

- Config: `cms/src/payload.config.ts` → `admin.livePreview`
- Website listener: `src/hooks/useCmsHomeContent.ts` via `@payloadcms/live-preview-react`
- Preview URL env: `PREVIEW_URL` (default `http://localhost:5173/?cms=payload`)
- Both apps must be running (`yarn cms:dev` + `yarn dev:cms`) for the iframe preview to load

## What you maintain long-term

1. **Schema** — edit `HomePage.ts` when she needs new fields, then redeploy CMS.
2. **Users** — invite her as a user in Payload admin (you stay admin).
3. **Database** — local demo uses SQLite. For production on Vercel, switch to Postgres (Neon) and keep the same Payload schema.
4. **Secrets** — `PAYLOAD_SECRET` and DB URL in env (never commit real secrets).
5. **CORS** — `CORS_ORIGINS` must include the website origin(s).
6. **Upgrades** — bump `payload` / `@payloadcms/*` versions together in `cms/package.json`.

## Production note (important)

SQLite is ideal for this **local demo**. For a always-on production CMS on Vercel/serverless, use Postgres (e.g. Neon) with `@payloadcms/db-postgres`. The editor UX for your wife stays the same; only the database adapter and env vars change.

## Why not inside the Vite app?

Payload 3 runs inside **Next.js**. Keeping CMS in `cms/` avoids rewriting the whole public site today, while still giving you full ownership of editor + API + database.

## Production (Vercel)

Step-by-step: [`payload-vercel-production.md`](./payload-vercel-production.md).
