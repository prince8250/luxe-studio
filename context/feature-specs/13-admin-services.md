# 13 · Admin Categories and Services

## Goal

Admin creates and manages service categories and services, including price, duration, assigned staff, and payment mode.

## Depends On

- `11-admin-shell.md`
- `12-admin-staff.md`

## Scope (Build Only This)

- Category management: name, tagline, image, order, active toggle (these drive the home page panels).
- Service list, add, edit, deactivate. Fields: category, name, description, image, price (entered in GHS, stored as pesewas), duration in minutes, payment mode (`deposit` or `pay_at_shop`), deposit amount (required only when mode is `deposit`, at most the price), active toggle.
- Assign staff to the service (multi-select from active staff) through `service_staff`.
- Changes affect only future bookings (price snapshot rule).

## Out Of Scope

- Offers (spec 15).

## Notes And Rules

- Validate that a deposit service has a positive deposit amount and a pay-at-shop service has none.
- Confirm open questions 4 and 5 (deposit type and duration) with the developer before building.
- Compress and resize uploaded images before storing.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Admin can create a category and a service with all fields and assigned staff.
- [ ] The category appears as a panel on the home page and the service appears on `/services` with the correct price and deposit label.
- [ ] Validation prevents invalid deposit and price combinations.
- [ ] Editing a price does not alter existing bookings.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
