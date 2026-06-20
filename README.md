# The Calhoun Practice Website

Marketing website built with React + TypeScript + Vite and deployed on Vercel.

## Local development

Use port `5173` for local work.

```bash
yarn install
yarn dev --host 0.0.0.0 --port 5173
```

Open [http://localhost:5173](http://localhost:5173).

## Decap content editing workflow

This project supports CMS-driven homepage copy for partner-friendly editing:

- Hero text
- Introduction text + button label/link
- CTA heading/badge
- Testimonial quote/author

Editor route:

```text
http://localhost:5173/admin
```

Comparison route:

```text
http://localhost:5173/cms-compare
```

## Governance model

- Content edits: partner can edit/publish in Decap.
- Technical changes: raised as GitHub issues, implemented via PR by owner.
- Rollback options: Git content revert + Vercel deployment rollback + Git code revert.

See:

- `docs/publish-safely-checklist.md`
- `docs/decap-setup.md`
- `docs/decap-editor-workflow.md`
- `docs/cms-decision-preview-pack.md`
- `docs/sanity-free-option.md`
- `docs/github-vercel-approval-flow.md`
- `.github/ISSUE_TEMPLATE/technical-change-request.yml`
