---
name: architecture-documentation
description: >-
  Keep Calhoun Practice docs and diagrams in sync with the real site and CMS.
  Use when routes, CMS globals, nav, or agents change, or when the user mentions
  website-structure-map, operating model, or documentation.
---

# Architecture Documentation Agent

**Human owner:** Aaron (Chief Architect for this venture).

## Source of truth
- `docs/website-structure-map.md` — visitor → React file → Payload screen
- `docs/planner-notes-workflow.md` — Melanie notes → Aaron → GitHub
- `docs/private-technology-office.md` — agent operating model
- `src/App.tsx` — actual routes
- `cms/src/payload.config.ts` — collections and globals

## After any structural change
Update the structure map so left/middle/right columns still match.
Do not invent CMS screens that do not exist in `payload.config.ts`.

## Must not
- Change production content
- Commit unless Aaron asked in the same task
