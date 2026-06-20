# Decap Editor Workflow

This workflow keeps content editing simple for your partner and technical safety with you.

## Roles

- **Owner (you)**: controls code, deployment settings, and technical merges.
- **Editor (partner)**: edits homepage content in Decap UI and publishes content updates.

## Daily editor flow

1. Open `/admin`.
2. Edit **Home Page Content** fields.
3. Save draft.
4. Preview site on `localhost:5173` (local) or production URL.
5. Publish when ready.

## Technical request flow

For layout/backend/form logic changes:

1. Submit GitHub **Technical Change Request** issue.
2. Owner implements on branch + PR.
3. Review preview deployment.
4. Merge with approval.

## Rollback process

- Content issue: revert file `public/content/home-content.json` from git history.
- Deployment issue: roll back in Vercel.
- Code issue: revert commit and redeploy.
