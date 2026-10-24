# 26 · Customers

## Goal

Admin can see and search customers, and see their history.

## Depends On

- `24-pos-manual-booking.md`
- `23-admin-bookings-checkin.md`

## Scope (Build Only This)

- Customers list with search by name or phone number.
- Customer detail: name, phone, number of visits (checked-in bookings), total spent, last visit, and a list of their bookings.
- Edit name. Phone number is the identity and is not editable here.

## Out Of Scope

- Marketing messages or exports.

## Notes And Rules

- Visits and totals count only checked-in bookings.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Search by phone finds the right customer in any common number format.
- [ ] Visit counts and totals match the finance rules.
- [ ] Works at 375px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
