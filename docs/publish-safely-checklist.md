# Publish Safely Checklist

Use this checklist before pushing new changes to production.

## 1) Local readiness

- [ ] Run `yarn install`.
- [ ] Run `yarn dev --host 0.0.0.0 --port 5173`.
- [ ] Verify key routes: `/`, `/contact`, `/fees-and-faq`, `/privacy-policy`.
- [ ] Confirm forms and booking/contact actions still work.
- [ ] Check mobile layout and text legibility.

## 2) Content workflow readiness (partner-friendly)

- [ ] CMS content is edited in Draft first.
- [ ] Preview matches expectations before Publish.
- [ ] If unsure, compare against previous Git/CMS version.
- [ ] Publish only content changes from the editor (no technical changes).

## 3) Technical change flow (Option B)

- [ ] Technical request logged as a GitHub issue using the template.
- [ ] Work done on a feature branch.
- [ ] Pull request created with summary + test plan.
- [ ] Preview deployment reviewed.
- [ ] Merge to `main` only after explicit approval.

## 4) Rollback safety

- [ ] Content version restore path confirmed (content rollback).
- [ ] Vercel deployment history available (deployment rollback).
- [ ] Git revert path documented for code rollback.

## 5) Launch quality checks

- [ ] Privacy policy and consent text are current.
- [ ] Accessibility pass done (headings, contrast, keyboard basics, alt text).
- [ ] Contact details and booking links verified.
- [ ] SEO basics reviewed (title/description/canonical if applicable).
