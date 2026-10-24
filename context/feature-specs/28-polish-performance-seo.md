# 28 · Polish: Performance, SEO, and Accessibility

## Goal

Make the public site fast, findable, and accessible before launch.

## Depends On

- `27-admin-finance-dashboard.md`

## Scope (Build Only This)

- Remove the `/design-check` page.
- Per-page metadata, Open Graph image, favicon, sitemap, `robots.txt`, and structured data (LocalBusiness) with the studio's details.
- Performance pass on mobile: image sizes, font loading, bundle size, and Lighthouse mobile checks on the home, services, gallery, and booking pages.
- Accessibility pass: contrast, focus order, labels, alt text, and keyboard use of menus and the gallery viewer.
- Error and not-found pages designed in the site's style.
- Review of all loading, empty, and error states.

## Out Of Scope

- New features.

## Notes And Rules

- Report Lighthouse numbers honestly, and list anything left unfixed in the tracker.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Mobile Lighthouse performance and accessibility results are recorded in the tracker.
- [ ] No page fails basic keyboard navigation.
- [ ] Metadata and sitemap are present.
- [ ] Custom 404 and error pages exist.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
