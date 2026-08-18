# Payload CMS production checklist (Vercel + Neon)

Two Vercel projects, one GitHub repo. The public Vite site stays as it is. Payload deploys from the `cms/` folder.

```
Visitors  →  www.thecalhounpractice.com     (existing Vite project)
Wife      →  cms.thecalhounpractice.com/admin
Website   →  GET cms…/api/globals/home-page
CMS       →  Neon Postgres
```

Do not put Payload into the existing Vite project. SQLite is local-only.

## 0) Before you start

- [x] `vercel login` works on this machine
- [x] Existing site project remains `the-calhoun-practice` (www)
- [x] CMS project created: `the-calhoun-practice-cms` (linked from `cms/`)
- [ ] **You:** accept Neon marketplace terms (one-time browser step — see below)
- [ ] **You:** add DNS for `cms.thecalhounpractice.com` (A record → `76.76.21.21`)
- [ ] You will create the first admin account in the browser (no password in git)

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

**Already set** on `the-calhoun-practice-cms` (Production, Preview, Development):

| Name | Status |
|--|--|
| `PAYLOAD_SECRET` | Set (sensitive) |
| `NEXT_PUBLIC_SERVER_URL` | `https://cms.thecalhounpractice.com` |
| `PREVIEW_URL` | `https://www.thecalhounpractice.com` |
| `CORS_ORIGINS` | www + apex + localhost |
| `DATABASE_URL` | **Pending — added by Neon install** |

## 4) Deploy CMS

**Blocked until Neon `DATABASE_URL` exists.** Then:

```powershell
.\cms\ops\deploy-after-neon.ps1
```

Or:

```bash
vercel --prod --cwd cms
```

## 5) Domain

**Done:** `cms.thecalhounpractice.com` is attached to the CMS project.

**You:** add at your DNS registrar:

```
A  cms  76.76.21.21
```

Until DNS propagates, use the `*.vercel.app` URL from the successful deploy for `/admin` and temporarily for `NEXT_PUBLIC_SERVER_URL` if needed.

## 6) First admin + seed

1. Open `/admin` and **create your account** (first visitor becomes admin).
2. Seed homepage copy against production (uses `DATABASE_URL` from the environment you pass in):

```bash
cd cms
# one-off: DATABASE_URL and PAYLOAD_SECRET from Vercel, then
yarn seed
```

Or paste current homepage fields once in **Homepage content** and Save.

3. Invite your wife: Payload **Users** → new user (editor). Send her `https://cms.thecalhounpractice.com/admin` only.

## 7) Flip the public site (after CMS API works)

On the **existing** www project `the-calhoun-practice`, add:

| Name | Value |
|--|--|
| `VITE_PAYLOAD_URL` | `https://cms.thecalhounpractice.com` |
| `VITE_CMS_MODE` | `payload` |

Vite bakes these in at **build** time, so redeploy www after setting them.

Check:

- [ ] `https://cms.thecalhounpractice.com/api/globals/home-page?depth=0` returns JSON
- [ ] Live Preview in `/admin` shows www and updates before Save
- [ ] www homepage reflects a Save
- [ ] If Payload is down, www still shows `public/content/home-content.json`

Do not remove Decap files until Payload has been live and stable.

## Rollback

- **Copy only:** `yarn cms:restore` (local 5-slot snapshots) or re-Save previous wording in `/admin`
- **Site source:** keep `VITE_CMS_MODE=decap` and redeploy www
- **Vercel:** rollback the CMS or www deployment in the dashboard

## Local vs production

| | Local | Production |
|--|--|--|
| DB | SQLite `cms/payload-demo.db` | Neon Postgres |
| Editor | `http://localhost:3000/admin` | `https://cms.thecalhounpractice.com/admin` |
| Site | `http://localhost:5173` | `https://www.thecalhounpractice.com` |
