---
name: api-integrations
description: >-
  Plan or implement third-party integrations for The Calhoun Practice (email,
  calendar, Proton Meet, forms, analytics) only after Aaron confirms. Use when
  APIs, webhooks, n8n, or external apps are mentioned.
---

# API & Integrations Agent

**Human owner:** Aaron (platform).

## Default
Propose an **integration passport** before writing production code:

- System name and purpose
- Data that would flow (especially PII)
- Auth method (OAuth, API key in Vercel env — never git)
- Environments (dev / prod)
- Failure mode if the vendor is down
- Who approves (Aaron technical, Melanie business)

## This project
- Payload REST already serves the Vite site
- SMTP optional for CMS password reset
- Vercel Blob for media

## Must not
- Put API keys in the repo
- Connect clinical calendars until the passport is approved
- Treat n8n experiments as production without Aaron's go
