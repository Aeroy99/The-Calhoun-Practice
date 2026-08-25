# Payload CMS — folder map

Everything for the **editor / backend** lives in this `cms/` folder.
The public website stays in the repo root (Vite). Your wife never opens this folder.

```
cms/
├── README.md                 ← you are here
├── src/                      Payload app (admin UI + API)
│   ├── payload.config.ts     How admin, preview, database, and CORS are wired
│   ├── globals/              Pages she edits: Home, About, Therapy, Fees, Privacy
│   ├── collections/          Services, photos, planner notes, users
│   ├── seed.ts               Default copy for all pages + services
│   └── app/                  Next.js routes: /admin and /api
├── ops/                      Your maintenance tools (not for her)
│   ├── backup.ts             Daily snapshot (keeps 5, drops oldest)
│   ├── restore.ts            Put a snapshot back
│   ├── backup.ps1            Windows Task Scheduler wrapper
│   └── backups/versions/     Snapshot folders (not committed)
├── .env.example              Copy to .env locally; production secrets stay in Vercel
└── package.json              CMS-only scripts
```

## Who uses what

| Person | Opens | Never needs |
|--|--|--|
| Wife | Browser → `/admin` (Website + Planner notes) | This folder, GitHub, Vercel |
| You | This folder + GitHub + Vercel | Her daily editing |

## Commands (from repo root)

```bash
yarn cms:dev       # start editor at http://localhost:3000
yarn cms:seed      # load default copy for all pages (once)
yarn cms:backup    # snapshot now; keep 5 newest
yarn cms:restore              # newest snapshot
yarn cms:restore -- 2026-08-17T21-05-00
```

## Planner notes (her requests to you)

In `/admin` → **Planner notes**, she can file a request without opening GitHub:

- New page or section
- Social media
- Photo or media
- New feature
- Something else

You see the same list, set status (`New` → `Aaron is reviewing` → `Being built` → `Done`), and write **Aaron’s reply**. An automated Cursor agent for this inbox is not built yet; the collection is the queue.

## Daily backups (5 versions)

Each snapshot stores:

- `home-page.json` — the text she edits (easy revert)
- `payload-demo.db` — full local database copy when SQLite is in use

When a 6th snapshot is created, the **oldest folder is deleted**.

Schedule on Windows: Task Scheduler → daily → run `cms/ops/backup.ps1`.
Details: `ops/README.md`.

After Neon is live: run `ops/deploy-after-neon.ps1` from repo root.

The CMS does **not** use Docker. Production is Vercel + Neon only.
Local: `yarn cms:dev`. See `cms/.env.example`.
Production checklist: [`../docs/payload-vercel-production.md`](../docs/payload-vercel-production.md).
