# Payload CMS production checklist (Vercel + Neon)

Two Vercel projects, one GitHub repo. The public Vite site stays as it is. Payload deploys from the `cms/` folder.

```
Visitors  →  www.thecalhounpractice.com     (existing Vite project)
Editors   →  cms.thecalhounpractice.com/admin
Website   →  GET cms…/api/globals/home-page
CMS       →  Neon Postgres + Vercel Blob
```

Do not put Payload into the existing Vite project. SQLite is local-only.

## 0) Before you start

- [x] `vercel login` works on this machine
- [x] Existing site project remains `the-calhoun-practice` (www)
- [x] CMS project created: `the-calhoun-practice-cms` (linked from `cms/`)
- [ ] **You:** accept Neon marketplace terms (one-time browser step — see below)
- [ ] **You:** add DNS for `cms.thecalhounpractice.com` (A record → `76.76.21.21`)
- [ ] **You:** create a Vercel Blob store on the CMS project
- [ ] **You:** set `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD` on the CMS project (sensitive)

The first `/admin` account is created by the production build (`payload migrate` + `ensure-admin`). Do not create it by visiting `/admin` in a browser first.

### Aaron — two actions that unblock production

1. **Neon terms:** open [Accept Neon marketplace terms](https://vercel.com/aarons-projects-43de1c01/~/integrations/accept-terms/neon?source=cli), accept, then run:
   ```bash
   vercel integration add neon --plan free_v3 --no-claim -m region=iad1 -m auth=false --name calhoun-cms-db --cwd cms
   ```
   This adds `DATABASE_URL` to the CMS project automatically.

2. **DNS:** at your domain registrar, add:
   ```
   A  cms  76.76.21.21
   ```
   (Vercel already attached the domain to the CMS project; DNS must point at Vercel.)

## 1) Create Neon Postgres

1. In Vercel: Storage / Marketplace → Neon → create a database for the CMS project.
2. Copy the **pooled** `DATABASE_URL` (`postgres://…`, often includes `-pooler`).
3. Keep it out of git. Local `.env` stays `file:./payload-demo.db`.

## 2) Create / link the CMS Vercel project

**Done:** project `the-calhoun-practice-cms` is created and linked from `cms/`.

Git settings for this project (if connecting Git deploys):

- Repository: `Aeroy99/The-Calhoun-Practice`
- Root Directory: `cms`
- Framework: Next.js

## 3) CMS environment variables (Production + Preview)

| Name | Notes |
|--|--|
| `PAYLOAD_SECRET` | Long random string |
| `NEXT_PUBLIC_SERVER_URL` | `https://cms.thecalhounpractice.com` |
| `PREVIEW_URL` | `https://www.thecalhounpractice.com` |
| `CORS_ORIGINS` | `https://www.thecalhounpractice.com,https://thecalhounpractice.com` |
| `CSRF_ORIGINS` | `https://cms.thecalhounpractice.com` (CMS origin only) |
| `DATABASE_URL` | Added by Neon |
| `PAYLOAD_ADMIN_EMAIL` | First admin email |
| `PAYLOAD_ADMIN_PASSWORD` | 12+ characters, sensitive |
| `BLOB_READ_WRITE_TOKEN` | From the Blob store |
| `EMAIL_FROM` / `SMTP_*` | Optional; required for forgot-password email |

## 4) Deploy CMS

**Blocked until Neon `DATABASE_URL` exists.** Then:

```powershell
.\cms\ops\deploy-after-neon.ps1
```

Or:

```bash
vercel --prod --cwd cms
```

The CMS `build` script runs `payload migrate`, then `ensure-admin`, then `next build`.

## 5) Domain

**Done:** `cms.thecalhounpractice.com` is attached to the CMS project.

**You:** add at your DNS registrar:

```
A  cms  76.76.21.21
```

Until DNS propagates, use the `*.vercel.app` URL from the successful deploy for `/admin` and temporarily for `NEXT_PUBLIC_SERVER_URL` if needed.

## 6) First admin + authenticator + passkey

1. Production build creates the admin from `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`.
2. Open `/admin`, sign in with that email and password.
3. Forced **Authenticator app** setup: scan the QR code in Google Authenticator, Authy, or 1Password.
4. On your user account, click **Register a passkey** (Windows Hello / iCloud Keychain / hardware key).
5. Later logins: password + TOTP, or **Sign in with passkey**.
6. Invite your wife as an **Editor** (homepage only). She must also complete Authenticator setup, and can add her own passkey.

Seed homepage copy (insert-only unless you pass `--force`):

```bash
cd cms
vercel env pull --cwd cms .env.production.local
npx tsx ops/seed-production.ts
```

## 7) Flip the public site (after CMS API works)

On the **existing** www project `the-calhoun-practice`, add:

| Name | Value |
|--|--|
| `VITE_PAYLOAD_URL` | `https://cms.thecalhounpractice.com` |

Vite bakes this in at **build** time, so redeploy www after setting it. A production www build fails if `VITE_PAYLOAD_URL` is missing or localhost.

Check:

- [ ] `https://cms.thecalhounpractice.com/api/globals/home-page?depth=0` returns JSON
- [ ] Live Preview in `/admin` shows www and updates before Save
- [ ] www homepage reflects a Save
- [ ] If Payload is down, www shows the built-in default copy

## Rollback

- **Copy only:** `yarn cms:restore` (local 5-slot snapshots) or re-Save previous wording in `/admin`
- **Vercel:** rollback the CMS or www deployment in the dashboard
- **Neon:** use Neon PITR / snapshots for a full production database. Local backup writes `home-page.json` plus `pg_dump` when `pg_dump` is installed.

## Local vs production

| | Local | Production |
|--|--|--|
| DB | SQLite `cms/payload-demo.db` | Neon Postgres |
| Editor | `http://localhost:3000/admin` | `https://cms.thecalhounpractice.com/admin` |
| Site | `http://localhost:5173` | `https://www.thecalhounpractice.com` |
| First user | `PAYLOAD_ADMIN_*` via `yarn cms:seed` | created during Vercel build |
| Media | local disk | Vercel Blob |
