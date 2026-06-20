# Decap CMS Setup Guide (Free-Only)

This project is configured for Decap CMS with git-based content editing.

## What this gives you

- Free open-source editor at `/admin`
- Content saved in git (`public/content/home-content.json`)
- Draft/review flow via `publish_mode: editorial_workflow`
- Full rollback through GitHub history

## 1) Run locally

Start website:

```bash
yarn dev:cms
```

Start Decap local backend proxy (required for local editing without OAuth):

```bash
yarn cms:proxy
```

Open:

- Site preview: `http://localhost:5173`
- Editor UI: `http://localhost:5173/admin`

## 2) Configure GitHub auth for production editing

Decap uses GitHub backend in `public/admin/config.yml`.

To let your partner edit from production:

1. Create a GitHub OAuth App.
2. Provide the OAuth callback endpoint for Decap auth.
3. Keep `repo: Aeroy99/The-Calhoun-Practice` and `branch: main`.

If you prefer no OAuth setup, keep editing locally with `local_backend: true`.

## 3) Partner-friendly editing scope

Editable fields are in one form:

- Hero badge + heading + description
- Introduction heading/description/button
- CTA badge + heading
- Testimonial quote + author

Layout/components/backend remain code-only.

## 4) Safe publishing rule

- Partner edits content only in Decap.
- Technical changes go through GitHub issue/PR approval flow.
