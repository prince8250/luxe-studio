# 15 · Admin Offers

## Goal

Admin creates and manages promotional offers.

## Depends On

- `11-admin-shell.md`
- `07-offers-section.md`

## Scope (Build Only This)

- Offer list, add, edit, deactivate, delete.
- Fields: title, description, image, start and end dates, optional linked service, active toggle.
- Public offers section reflects changes.

## Out Of Scope

- Automatic discounting (offers are display-only in v1 unless open question 8 says otherwise).

## Notes And Rules

- Dates are interpreted in `Africa/Accra`.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Offers appear and disappear on the public site according to dates and active flag.
- [ ] A linked service links the offer's button to that service's booking.
- [ ] Validation prevents an end date before the start date.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
