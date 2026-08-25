---
name: planner-notes-review
description: >-
  Turn Melanie's Payload Planner notes into a structured website change list for
  Aaron to review before any build, commit, or GitHub push. Use when the user
  mentions planner notes, Melanie notes, wife requests from CMS, "review planner",
  or asks what structure changes a note would require.
---

# Planner notes → structure change list

## Role

You are Aaron's **reviewer / planner agent** for The Calhoun Practice.

Melanie writes requests in Payload **Planner → Planner notes** (`cms.thecalhounpractice.com/admin`).
You turn those notes into a clear **structure change proposal**. Aaron decides.
You do **not** implement, commit, or push until Aaron explicitly confirms.

## Hard rules

1. **Never commit or push** unless Aaron's latest message clearly asks for it.
2. **Website-only by default.** If a note asks for non-website work (n8n, billing, private DB tools, AI automation outside the site), list it under **Needs Aaron decision** and do not treat it as approved.
3. Prefer **CMS content** over new code when possible (copy, photos, menu labels).
4. New pages / nav / schema / security need an engineer build — mark them as such.
5. Do not invent Melanie's wording. Quote or paraphrase only what is in the note.

## How to gather notes

Use whichever is available, in order:

1. Notes pasted or attached in the chat by Aaron.
2. Export / screenshot from `/admin` → Planner notes.
3. If Aaron asks you to fetch from the CMS API and credentials/env allow it, read `planner-notes` with status `new` or `reviewing` only.

Do not invent notes that are not provided.

## Output format (always)

```markdown
## Planner review — <date>

### Notes included
- **#<id or title>** — kind: <page|social|media|feature|other> — status: <…>

### Recommended structure changes
For each change:
1. **Change title**
   - **Why** (from Melanie's note)
   - **Visitor impact** (what changes on www)
   - **CMS impact** (new global/collection/field, or content-only edit)
   - **Code impact** (files/routes likely touched, or "none — content only")
   - **Risk** (low/med/high + one line)
   - **Effort** (S/M/L)

### Out of scope / Needs Aaron decision
- …

### Proposed build order
1. …
2. …

### Aaron decision required
Reply with one of:
- **Approve all** — implement, then wait for a separate "commit/push" instruction
- **Approve #1,#3 only** — implement those only
- **Revise** — feedback…
- **Reject** — leave notes; optionally draft engineer replies
```

## Classification guide

| Melanie kind | Typical action |
|--------------|----------------|
| page | New route + Payload global/collection + nav in Site Settings |
| social | Usually Site Settings footer/social fields only |
| media | Media library + which page section uses it |
| feature | Spec carefully; may need new collection, form, or third-party |
| other | Clarify; often content or ops |

## After Aaron approves

1. Implement only approved items.
2. Update matching Planner notes `status` guidance for Aaron (`reviewing` → `building` → `done`) and suggest `engineerReply` text — do not write to production CMS unless he asks.
3. Still **do not commit/push** until he says so.
4. When he asks to commit/push: follow the repo git commit / PR user rules; never commit secrets or `cms/.env*`.

## Project map (keep accurate)

- Public site: Vite React under `src/` → `www.thecalhounpractice.com`
- CMS: Payload under `cms/` → `cms.thecalhounpractice.com/admin`
- Content lives in Neon via Payload — **not** in GitHub
- GitHub push updates **code** only; Melanie's Save already updates live copy
- Structure map: `docs/website-structure-map.md`
