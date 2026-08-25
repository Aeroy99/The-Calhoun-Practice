# Private Technology Office — operating model (proposal)

This is the **internal** model for The Calhoun Practice technology. It is **not** a legal org chart and agents are **not** officers.

Aaron: Technical Founder / private CTO.  
Melanie: public Founder / Practice Director (content, clinical, brand).

---

## Honest position

A counselling **marketing website** does not need a 10-seat CISO/CAB/SOC org. That language is useful as **accountability labels**, not as autonomous employees.

What **does** make sense here:

- Small set of Cursor **skills** (controlled functions)
- **You** remain Human Change Authority for git/production
- Melanie remains authority for public/clinical wording
- Reuse the same office later for other ventures

What **does not** make sense yet:

- An agent that commits/pushes to GitHub, Vercel, CMS, and Blob **without you**
- Agents titled CISO/CTO as if they hold legal duty
- Clinical Governance Agent making crisis or treatment decisions
- Treating this CMS as a GDPR “user retention database” for therapy records — it is a **website CMS**

**Better alternative:** six skills + one human gate, not ten self-acting agents. Same coverage, less false confidence.

---

## Approver vs implementer vs verifier

| Role | Who | Agent may |
|------|-----|-----------|
| Approver | Aaron (tech), Melanie (public copy) | Recommend only |
| Implementer | Cursor after Aaron says so | Code; commit only if asked |
| Verifier | Bugbot + smoke checks + Aaron | Report; not auto-promote |

High-risk (MFA, secrets, backups, PII forms, production infra): **Aaron must approve**, even if agents prepared the memo.

---

## Your six functions (mapped)

| Your name | Studio title | Skill | Auto? |
|-----------|--------------|-------|-------|
| 1 Reviewer | Change Risk Review | `.cursor/skills/change-risk-review` | Analyse only |
| 2 Commit | Implementation / DevSecOps | `.cursor/skills/change-implementation` | After Aaron asks |
| 3 Visual & docs | Chief Architect function | `.cursor/skills/architecture-documentation` | Edit docs when asked |
| 4 Suggestions | Learning Advisor | `.cursor/skills/learning-advisor` | Tips only |
| 5 Security & compliance | CISO function | `.cursor/skills/security-compliance` | Advise only |
| 6 API & integrations | Platform integration | `.cursor/skills/api-integrations` | Passport first |

Planner notes remain a **seventh** intake skill: `.cursor/skills/planner-notes-review`.

---

## Project passport — The Calhoun Practice

```text
Project Name: The Calhoun Practice
Business Owner: Melanie (Practice Director)
Public Brand: thecalhounpractice.com
Technical Owner: Aaron
Purpose: Public counselling website + Payload CMS for copy/media
Data Sensitivity: Low–medium marketing PII (contact form later); not clinical records
Applicable Requirements: UK GDPR (marketing site), WCAG 2.2 AA target, professional advertising norms
Systems: Vite www, Payload cms, Vercel, Neon, Vercel Blob
Human Approval Points: git push, production env, MFA, anything collecting health data
Deployment: www + cms Vercel projects
Backup: Neon + ops snapshots (SQLite local; pg_dump when available)
Documentation: docs/
```

---

## Content vs code (do not mix)

- Melanie **Save** in CMS → Neon → live copy. **No GitHub.**
- GitHub push → Vercel rebuilds **code** (routes, schema, admin). **Does not overwrite her wording** if seed is not forced.
