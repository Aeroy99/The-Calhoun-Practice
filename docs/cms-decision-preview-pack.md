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

## Option B: Sanity Free (alternative)

- Cost: Free tier advertised as `$0 forever` (with plan limits)
- Editing UI: modern studio, generally easier for content teams
- Versioning: document history + dataset workflow
- Best for: smoother editor UX with structured content

What to compare in 10 minutes:

1. Can she change headline and description confidently?
2. Is publish/draft flow clear?
3. Can she recover from a mistake easily?
4. Does the interface feel calm and simple?

## Recommendation for your constraints

If strict free-only + minimal platform complexity is priority, keep **Decap**.
If better editor UX is priority and you accept a managed service dependency, evaluate **Sanity Free**.

## How to run the comparison locally

1. Start website: `yarn dev:cms`
2. (Optional for local editor saves) start proxy: `npx --yes decap-server@latest`
3. Open `http://localhost:5173/cms-compare`
