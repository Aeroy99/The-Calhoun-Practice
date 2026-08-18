# CMS operations (you only)

Backup and restore for Payload content. Your wife does not use these commands.

## What is kept

Up to **5** snapshots in `ops/backups/versions/`.

Each folder is named with a timestamp, for example `2026-08-17T21-05-00`, and contains:

- `home-page.json` — homepage fields (always)
- `payload-demo.db` — local SQLite file when present
- `manifest.json` — what was copied and when

A new backup **deletes the oldest** once more than 5 exist.

These files are gitignored so secrets and local DB copies stay on this machine (and OneDrive, if the repo is synced).

## Backup now

From repo root:

```bash
yarn cms:backup
```

## Restore (revert her content)

List is printed at the end of each backup. Restore newest:

```bash
yarn cms:restore
```

Restore a specific day/time (folder name):

```bash
yarn cms:restore -- 2026-08-17T21-05-00
```

Then refresh the website. If Payload is running, restart `yarn cms:dev` after a SQLite file restore.

## Daily schedule (Windows)

1. Open Task Scheduler → Create Basic Task
2. Trigger: Daily, pick a quiet time
3. Action: Start a program
   - Program: `powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\Users\Aaron\OneDrive\Master Repo - The Calhoun Practice\The-Calhoun-Practice\cms\ops\backup.ps1"`
4. Confirm it runs whether you are logged in or not, if you want overnight backups

OneDrive already versions files in this repo; the 5-slot rotation is the **intentional** revert path so you are not hunting through OneDrive history.

## Production later

When Neon Postgres is live, `yarn cms:backup` still writes `home-page.json` (enough to revert copy). Full database dumps can be added then without changing this folder layout.
