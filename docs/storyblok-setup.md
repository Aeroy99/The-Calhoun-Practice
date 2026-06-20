# Storyblok Setup Guide

Follow this once to enable safe visual editing and CLI-based schema management.

## Integration vs Blocks (important)

- **Integration (React option in Storyblok UI)**: helps with preview/sdk connection.
- **Blocks (Define your block structure)**: defines what your partner can edit.

You need both:

1. Integration for preview behavior.
2. Blocks for the editable content model.

This repo already has the React integration wiring in code. The CLI setup below handles block/schema setup faster.

## 1) Configure environment values

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `VITE_STORYBLOK_PREVIEW_TOKEN`
   - `VITE_STORYBLOK_ACCESS_TOKEN`
   - `VITE_STORYBLOK_HOME_SLUG` (default: `home`)
   - `STORYBLOK_REGION` (`eu`, `us`, `ca`, `ap`, or `cn`)
   - `STORYBLOK_SPACE_ID`

## 2) Authenticate Storyblok CLI

Use one of the following:

```bash
storyblok login --region eu
```

or token-based login:

```bash
storyblok login --token <PERSONAL_ACCESS_TOKEN> --region eu
```

Then verify:

```bash
storyblok user
```

## 3) Push the block schema from this repo

This repo includes ready schema files in `storyblok/schema`.

```bash
storyblok components push --space <YOUR_SPACE_ID> --path storyblok/schema
```

This seeds/updates a `home_page` component with these fields:

- `hero_badge_left`
- `hero_badge_right`
- `hero_heading`
- `hero_description`
- `intro_heading`
- `intro_description`
- `intro_button_text`
- `intro_button_link`
- `cta_badge`
- `cta_heading`
- `testimonial_quote`
- `testimonial_author`

## 4) Create the `home` story in Storyblok

After schema push, in Storyblok UI:

1. Create a new Story with slug `home`.
2. Set content type/component to `home_page`.
3. Fill content values and save/publish.

## 5) Preview locally

1. Start app:

```bash
yarn dev --host 0.0.0.0 --port 5173
```

2. Open:

```text
http://localhost:5173/?preview=1
```

3. Edit content in Storyblok Draft and verify updates.

## 6) Partner publish permissions

In Storyblok user permissions:

- Partner role: **Editor** (can edit/publish content).
- Owner role: **Admin/Owner** (can manage schema, tokens, integrations).

If you want stricter control later, use Storyblok workflow stages so Draft requires explicit approval before publish.
