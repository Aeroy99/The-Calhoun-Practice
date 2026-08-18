# Payload CMS — folder map

Everything for the **editor / backend** lives in this `cms/` folder.
The public website stays in the repo root (Vite). Your wife never opens this folder.

```
cms/
├── README.md                 ← you are here
├── src/                      Payload app (admin UI + API)
│   ├── payload.config.ts     How admin, preview, database, and CORS are wired
│   ├── globals/HomePage.ts   Fields your wife edits (labels live here)
│   ├── collections/          Users + media (you manage accounts)
│   ├── seed.ts               First-time homepage copy
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
| Wife | Browser → `/admin` | This folder, GitHub, Vercel |
| You | This folder + GitHub + Vercel | Her daily editing |

## Commands (from repo root)

```bash
yarn cms:dev       # start editor at http://localhost:3000
yarn cms:seed      # load default homepage copy (once)
yarn cms:backup    # snapshot now; keep 5 newest
yarn cms:restore              # newest snapshot
yarn cms:restore -- 2026-08-17T21-05-00
```

## Daily backups (5 versions)

Each snapshot stores:

- `home-page.json` — the text she edits (easy revert)
- `payload-demo.db` — full local database copy when SQLite is in use

When a 6th snapshot is created, the **oldest folder is deleted**.

Schedule on Windows: Task Scheduler → daily → run `cms/ops/backup.ps1`.
Details: `ops/README.md`.

After Neon is live: run `ops/deploy-after-neon.ps1` from repo root.

Production (Vercel + Neon): [`../docs/payload-vercel-production.md`](../docs/payload-vercel-production.md).
