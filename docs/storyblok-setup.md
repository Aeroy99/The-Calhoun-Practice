# Storyblok Setup Guide

Follow this once to enable safe visual editing.

## 1) Create Storyblok space

1. Create a new Storyblok space.
2. Create a content type named `home_page`.
3. Create a story with slug `home` using `home_page`.

## 2) Add fields to `home_page`

You can use either grouped fields (recommended) or flat fields.

### Group: `hero`
- `badge_left` (Text)
- `badge_right` (Text)
- `heading` (Text/textarea)
- `description` (Textarea)

### Group: `introduction`
- `heading` (Text)
- `description` (Textarea)
- `button_text` (Text)
- `button_link` (Link)

### Group: `cta`
- `badge` (Text)
- `heading` (Text)

### Group: `testimonial`
- `quote` (Textarea)
- `author` (Text)

## 3) Configure local environment

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `VITE_STORYBLOK_PREVIEW_TOKEN`
   - `VITE_STORYBLOK_ACCESS_TOKEN`
   - `VITE_STORYBLOK_HOME_SLUG` (default: `home`)

## 4) Run local preview

1. Start app: `yarn dev --host 0.0.0.0 --port 5173`
2. Open: `http://localhost:5173/?preview=1`
3. Edit content in Storyblok Draft and verify updates.

## 5) Partner publish permissions

In Storyblok user permissions:

- Partner role: **Editor** (can edit/publish content).
- Owner role: **Admin/Owner** (can manage schema, tokens, integrations).

If you want stricter control later, use Storyblok workflow stages so Draft requires your explicit approval before publish.
