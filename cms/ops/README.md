# CMS operations (you only)

Backup and restore for Payload content. Your wife does not use these commands.

## What is kept

Up to **5** snapshots in `ops/backups/versions/`.

Each folder is named with a timestamp, for example `2026-08-17T21-05-00`, and contains:

- `home-page.json` — homepage fields (always)
- `payload-demo.db` — consistent local SQLite snapshot (`VACUUM INTO`) when SQLite is in use
- `postgres.sql` — `pg_dump` output when Postgres is in use and `pg_dump` is installed
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

- **SQLite local env:** restores the snapshot database file (and removes stale `-wal`/`-shm` files). Restart `yarn cms:dev` if it is running.
- **Postgres / Neon:** restores `home-page.json` only. The SQLite file in a snapshot is never copied over a Postgres database.

## Daily schedule (Windows)

1. Open Task Scheduler → Create Basic Task
2. Trigger: Daily, pick a quiet time
3. Action: Start a program
   - Program: `powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\Users\Aaron\OneDrive\Master Repo - The Calhoun Practice\The-Calhoun-Practice\cms\ops\backup.ps1"`
4. Confirm it runs whether you are logged in or not, if you want overnight backups

## Production

`yarn cms:backup` always writes `home-page.json`. If `pg_dump` is on PATH and `DATABASE_URL` is Postgres, it also writes `postgres.sql`. Full Neon recovery still uses Neon PITR / snapshots; this repo does not replace that.
