# Storyblok Editor Workflow

This project uses a split workflow:

- Content edits can be done by the partner editor in Storyblok.
- Technical/layout/backend changes are routed to GitHub issues and handled in code.

## Roles

- **Owner (you)**
  - Maintains code, deployment configuration, and branch protections.
  - Approves/reviews technical changes and production code merges.
- **Editor (partner)**
  - Edits content in Storyblok.
  - Uses preview before publishing.
  - Submits technical/layout requests via GitHub issue template.

## Editable vs locked scope

### Editable in Storyblok

- Hero badge text, heading, and supporting description.
- Introduction heading, body text, CTA button text/link.
- CTA section badge + heading.
- Testimonial quote + author.

### Locked to code (Owner only)

- Global layout and component structure.
- Business logic, APIs, form behavior, integrations.
- Styling system and deployment settings.

## Preview flow (partner)

1. Open Storyblok and edit Draft content.
2. Open the website with preview mode: `?preview=1`.
3. Confirm the page looks correct.
4. Publish when satisfied.

## Content version rollback

1. Open the Story in Storyblok.
2. Open **Versions** history.
3. Select the known-good version.
4. Restore version and republish.

## Technical request flow (Option B)

1. Create a GitHub issue with the **Technical Change Request** template.
2. Include business goal, affected area, acceptance criteria, and urgency.
3. Owner implements on a branch and opens PR.
4. Review preview deployment.
5. Merge after approval.

## Emergency rollback order

1. **Content issue only**: revert Storyblok version.
2. **Deployment issue**: roll back in Vercel deployment history.
3. **Code issue**: revert commit in Git and redeploy.
