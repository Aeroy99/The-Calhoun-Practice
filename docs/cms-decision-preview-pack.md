# CMS Decision Preview Pack

Use this with your wife to choose the final editor.

## Option A: Decap CMS (implemented now)

- Cost: Free open-source
- Editing UI: form-based, practical, less visual drag-and-drop
- Versioning: native Git history
- Best for: no-cost, controlled edits, technical safety

Preview links:

- Website: `http://localhost:5173`
- Editor: `http://localhost:5173/admin`
- Comparison playground: `http://localhost:5173/cms-compare`

## Option B: Payload CMS (owned demo — preferred path)

- Cost: Free / open source (you host it)
- Editing UI: form admin at `http://localhost:3000/admin` (no GitHub for her)
- Storage: local SQLite demo DB you own (`cms/payload-demo.db`)
- Docs: `docs/payload-cms-demo.md`

## Option C: Sanity Free (managed alternative)

- Cost: Free tier advertised as `$0` (with plan limits)
- Editing UI: modern studio
- Tradeoff: content lives in Sanity cloud, not fully owned end-to-end

What to compare in 10 minutes:

1. Can she change headline and description confidently?
2. Is publish/draft flow clear?
3. Can she recover from a mistake easily?
4. Does the interface feel calm and simple?

## Recommendation for your constraints

Prefer **Payload** for owned stack + wife-friendly browser editing.
Keep Decap only as a temporary comparison baseline.
Use Sanity only if you later prefer managed SaaS over self-hosting.

## How to run the comparison locally

1. Start Payload: `yarn cms:dev` then `yarn cms:seed` (once)
2. Start website: `yarn dev:cms`
3. Open `http://localhost:5173/cms-compare`
4. Payload editor: `http://localhost:3000/admin`
