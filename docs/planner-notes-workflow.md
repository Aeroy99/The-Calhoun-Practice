# Planner notes → Aaron review → build → GitHub

Melanie writes in **CMS → Planner → Planner notes**. Aaron owns technical work.

## Layers (who does what)

| Who | Where | What |
|-----|--------|------|
| Melanie | `/admin` Planner notes | Requests (page, social, media, feature) |
| Cursor agent (this skill) | Chat | Turns notes into a **structure change list** |
| Aaron | Chat | Approves / rejects / revises |
| Cursor agent | Repo | Builds only approved items |
| Aaron | Chat | Says **commit and push** when ready |
| Vercel | GitHub | Redeploys **code** |
| Melanie Save | Neon | Updates **live copy** without GitHub |

## Security (admin)

Login layers for `/admin`:

1. Email + password  
2. Authenticator app (TOTP) — forced setup when enabled  
3. Optional Passkey on the login screen (register under the user account)

## One-line rule

**Content Save ≠ GitHub. Code change = GitHub after Aaron confirms.**
