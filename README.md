# The Calhoun Practice Website

Marketing website built with React + TypeScript + Vite and deployed on Vercel.

## Local development

Use port `5173` for local work.

```bash
yarn install
yarn dev --host 0.0.0.0 --port 5173
```

Open [http://localhost:5173](http://localhost:5173).

## Storyblok content editing workflow

This project supports CMS-driven homepage copy for partner-friendly editing:

- Hero text
- Introduction text + button label/link
- CTA heading/badge
- Testimonial quote/author

If Storyblok env vars are missing, the app automatically falls back to built-in defaults.

### Environment variables

Copy `.env.example` to `.env.local` and set:

- `VITE_STORYBLOK_PREVIEW_TOKEN`
- `VITE_STORYBLOK_ACCESS_TOKEN`
- `VITE_STORYBLOK_HOME_SLUG` (default: `home`)

### Preview mode

Use preview URL while editing drafts:

```text
http://localhost:5173/?preview=1
```

## Governance model

- Content edits: partner can edit/publish in Storyblok.
- Technical changes: raised as GitHub issues, implemented via PR by owner.
- Rollback options: Storyblok version restore + Vercel deployment rollback + Git revert.

See:

- `docs/publish-safely-checklist.md`
- `docs/storyblok-setup.md`
- `docs/storyblok-editor-workflow.md`
- `.github/ISSUE_TEMPLATE/technical-change-request.yml`
