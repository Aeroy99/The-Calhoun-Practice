# AGENTS.md

Guidance for coding agents working on this repository (The Calhoun Practice website).

## Project overview

The public marketing site is a React + TypeScript + Vite + Tailwind app in `src/`, deployed on Vercel. Site copy (including the homepage) is edited in Payload CMS under `cms/` (Next.js + Payload), not hard-coded in the Vite app. Locally the site is port 5173 and the CMS admin is `http://localhost:3000/admin`.

## Commands

Package manager: Yarn 1 (`packageManager` in the root `package.json`, plus `yarn.lock`). Scripts below exist in the root or `cms/package.json`.

Root (marketing site):

- Install (site): `yarn install`
- Install (CMS): `yarn --cwd cms install`
- Dev (site): `yarn dev` (or `yarn dev:cms` to bind `0.0.0.0:5173`)
- Dev (CMS): `yarn cms:dev`
- Lint (site): `yarn lint`
- Build (site): `yarn build` (runs `tsc -b` then `vite build`)
- Preview (site): `yarn preview`

CMS helpers (only when the task is about them): `yarn cms:seed`, `yarn cms:ensure-admin`, `yarn cms:backup`, `yarn cms:restore`. Further CMS scripts live in `cms/package.json` (including `yarn --cwd cms build` and `yarn --cwd cms start`).

There is no `test` or standalone `typecheck` script in the root or `cms/package.json`. Do not invent one. Typechecking for the site is part of `yarn build` (`tsc -b`).

## Structure

- `src/` — Vite marketing site (`pages/`, `components/`, `lib/cms/`, `hooks/`)
- `public/` — static assets
- `cms/` — Payload CMS (Next.js under `cms/src/`, plus `cms/ops/` for backup and admin helpers)
- `docs/` — project docs
- `cms/AGENTS.md` and `cms/CLAUDE.md` already exist (generated Next.js stubs). Leave them alone unless you are explicitly asked to change them.

## Conventions

- The public site is a Vite React app, not Next.js App Router. In `cms/` (Next.js), Server Components are the default; add `"use client"` only at the smallest interactive boundary. Keep secrets and data access on the server.
- Keep shareable UI state in the URL where it applies. Drop stale params when the parent selection changes.
- Every changed view needs written empty, loading, and error states. Do not gate empty or error UI on a happy-path object that is null in that case. Friendly copy in the UI; raw exceptions in the console only.
- Accessibility basics: one `<main>`, labelled controls, visible `:focus-visible` rings, meaningful `alt` (or empty `alt` if decorative), accessible names on icon-only buttons, and `aria-current="page"` on the current nav item.
- Patient-facing copy must be warm and clinically appropriate, and must never give medical advice. Prefer editing homepage and other partner-editable fields in Payload rather than hard-coding them in the Vite app.

## Guardrails

- Work on a branch only. Never push to `main`, merge, deploy, or change Vercel or env settings. Merging `main` auto-deploys production.
- Never commit secrets or `.env` files, or print env values.
- Commit as `Aeroy99 <160900214+Aeroy99@users.noreply.github.com>`.
- No force-push except an instructed restack.

## Done when

Run the checks that exist in this repo and paste their full output in your report:

- `yarn lint`
- `yarn build`

There is no package script for unit tests. If a later change adds one, run it too. Vercel preview checks on the PR must be green; wait for every linked Vercel project.

## Report back

Return the new head SHA (full), the base SHA and branch, whether the work is stacked on another PR, the commands you ran, their output, and the Vercel check states.
