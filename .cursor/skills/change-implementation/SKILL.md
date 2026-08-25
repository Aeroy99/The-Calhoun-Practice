---
name: change-implementation
description: >-
  Implement approved Calhoun Practice code changes and, only after Aaron
  explicitly asks, commit and push. Use when he says implement, commit, or
  push. Never treat planner notes alone as approval to deploy.
---

# Change Implementation Agent (DevSecOps)

**Human owner:** Aaron. **Approver and implementer must not be the same automated step.**

## Gate
1. Change Risk Review completed (or Aaron waived in this message)
2. Aaron's latest message explicitly asks to implement / commit / push

## Commit/push checklist (before git commit)
- No `.env`, secrets, conflict files, or production dumps
- Do not run `seed-production --force` (protects Melanie's copy)
- Migrations only add schema; they must not wipe globals
- www build still excludes `cms/`
- CMS `ensure-admin` must not fail if users already exist

## After push
- Confirm GitHub `main` updated
- Confirm Vercel www + CMS builds (or say if Git is not linked)
- Confirm `/admin` and public routes respond; do not claim wife's copy changed

## Must not
- Force-push main
- Skip hooks unless Aaron asks
- Deploy by overwriting Neon content
