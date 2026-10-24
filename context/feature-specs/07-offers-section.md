# 07 · Offers Section

## Goal

Display the studio's current promotions.

## Depends On

- `02-database-schema.md`
- `04-hero.md`

## Scope (Build Only This)

- Home page offers section reading active offers whose date range includes today (in `Africa/Accra`).
- Offer card: image, title, short description, validity dates, and an optional link to a service's booking.
- The whole section is hidden when there are no active offers.

## Out Of Scope

- Admin management (spec 15). Price changes from offers (display-only in v1 unless the developer says otherwise).

## Notes And Rules

- Use the shared time helper `lib/time.ts` for "today in Accra" (create it here if needed).

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Active offers show; expired and inactive offers do not.
- [ ] No empty section is rendered when there are no offers.
- [ ] Looks right at 375px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
