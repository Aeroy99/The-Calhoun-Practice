# Payload CMS

The CMS lives in **`cms/`**. Folder map, backups, and restore: [`cms/README.md`](../cms/README.md) and [`cms/ops/README.md`](../cms/ops/README.md).

This is a self-hosted Payload 3 app: the only content backend for The Calhoun Practice website.

- Vite site (`../`) = what visitors see
- Payload app (`./cms`) = what editors use at `/admin`

## What she edits in `/admin`

**Website**
- Menu, footer & social
- Homepage content
- About Me
- Therapy pages (overview, Adult, Kids / Young Adult)
- Services (the “How we help” cards)
- Contact, Fees & FAQ, Privacy Policy
- Photos & files

**Planner notes**
- Leave a request for Aaron: a new page, social account, photo, or feature
- He reviews it, replies in the same note, then builds it (or later an agent can read this inbox)

**Accounts**
- Users (Aaron only)

## Architecture

```
├── Vite website (port 5173 locally, Vercel in production)
│   └── fetches homepage text from Payload API
│
└── Payload CMS (port 3000 locally, cms.thecalhounpractice.com in production)
    ├── /admin
    ├── /api/globals/home-page
    ├── SQLite locally / Neon Postgres in production
    └── schema in src/globals/HomePage.ts
```

| Piece | Path | Who uses it |
|--|--|--|
| Admin UI | `/admin` | Editors |
| Homepage schema | `cms/src/globals/HomePage.ts` | Developer |
| Public API | `GET /api/globals/home-page` | Website |
| Website hook | `src/hooks/useCmsHomeContent.ts` | Site |

## Quick start

From the repo root:

```bash
yarn --cwd cms install
yarn cms:dev
yarn cms:seed
yarn dev
```

Then:

1. Open `http://localhost:3000/admin` and sign in (admin from `PAYLOAD_ADMIN_EMAIL`).
2. Complete Authenticator setup, then register a passkey.
3. Edit pages under **Website**. For a new idea that needs code, open **Planner notes**.
4. Refresh `http://localhost:5173` to see the saved copy.

Optional env for the Vite site:

```bash
# in repo root .env.local
VITE_PAYLOAD_URL=http://localhost:3000
```

## Editor experience

1. Browser link to `/admin`
2. Email + password, then Authenticator (and optional passkey)
3. Open **Homepage content**
4. Click **Live Preview** to see the real website
5. Type changes — the preview updates before Save
6. Click **Save** when happy

### Live Preview

- Config: `cms/src/payload.config.ts` → `admin.livePreview`
- Website listener: `src/hooks/useCmsHomeContent.ts` via `@payloadcms/live-preview-react`
- Preview URL env: `PREVIEW_URL` (local default `http://localhost:5173`)
- Both apps must be running (`yarn cms:dev` + `yarn dev`) for the iframe preview to load

## Production

Step-by-step: [`payload-vercel-production.md`](./payload-vercel-production.md).
