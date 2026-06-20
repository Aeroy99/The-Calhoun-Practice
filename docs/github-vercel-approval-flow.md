# GitHub + Vercel Approval Flow

This project uses GitHub Actions checks and Vercel preview deployments for safer releases.

## What runs automatically

When a pull request targets `main`, GitHub Actions runs:

- `yarn lint`
- `yarn build`

Workflow file: `.github/workflows/pr-quality-gates.yml`

## How approval works

1. Create branch and open PR.
2. Vercel generates preview deployment URL.
3. GitHub Actions checks must pass.
4. Owner review/approval is required.
5. Merge to `main`.
6. Vercel deploys production.

`CODEOWNERS` is configured so owner review can be required by branch protection.

## One-time GitHub settings (manual)

In GitHub repository settings:

1. **Settings -> Branches -> Add rule** for `main`.
2. Enable:
   - Require a pull request before merging
   - Require approvals
   - Require review from Code Owners
   - Require status checks to pass before merging
3. Add status check:
   - `Lint and Build` (from the PR Quality Gates workflow)

## One-time Vercel settings (manual)

In Vercel project:

1. Go to **Settings -> Deployment Checks**.
2. Click **Add Checks**.
3. Choose **Import from GitHub**.
4. Select the `Lint and Build` check.
5. Configure it to block promotion to production until check passes.

## Email notifications

- GitHub can email you for PRs, review requests, and check failures (configure in GitHub Notifications settings).
- Vercel can email deployment status updates (configure in Vercel notification preferences).
- Approval action itself happens in GitHub UI, not by email reply.
