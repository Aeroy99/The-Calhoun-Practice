# The Calhoun Practice Website

Marketing website built with React + TypeScript + Vite and deployed on Vercel.
Homepage copy is edited in Payload CMS (`cms/`), not in this Vite app.

## Local development

Use port `5173` for the public site and port `3000` for the CMS.

```bash
yarn install
yarn --cwd cms install
yarn cms:dev
yarn dev --host 0.0.0.0 --port 5173
```

Open:

- Site: [http://localhost:5173](http://localhost:5173)
- Editor: [http://localhost:3000/admin](http://localhost:3000/admin)

Set `VITE_PAYLOAD_URL=http://localhost:3000` in `.env.local`.

## Content editing

Partner-facing homepage fields (hero, introduction, CTA, testimonial) are edited in Payload at `/admin`. Live Preview shows the real site before Save.

## Governance model

- Content edits: partner edits/publishes in Payload `/admin`.
- Technical changes: raised as GitHub issues, implemented via PR by owner.
- Rollback: Payload restore snapshots, Vercel deployment rollback, Git code revert.

See:

- `docs/payload-cms-demo.md`
- `docs/payload-vercel-production.md`
- `docs/website-structure-map.md`
- `docs/publish-safely-checklist.md`
- `docs/github-vercel-approval-flow.md`
- `.github/ISSUE_TEMPLATE/technical-change-request.yml`
