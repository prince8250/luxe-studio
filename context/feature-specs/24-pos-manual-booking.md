# 24 · POS: Manual Booking

## Goal

Let admin record walk-in customers and sales, even if the customer never used the website.

## Depends On

- `23-admin-bookings-checkin.md`
- `12-admin-staff.md`
- `13-admin-services.md`

## Scope (Build Only This)

- `/admin/pos` form: customer name, phone number, service, staff, price (defaults to the service price, editable with a reason field if changed), payment method (cash, MoMo, card), amount received.
- Look up the customer by phone as the admin types; if found, show their name and visit count and reuse the record. If not found, create a `customers` row for that phone.
- Create a booking with `source = pos`, `status = checked_in`, `checked_in_at = now`, plus a `payments` row of kind `full`.
- Respect the no-overlap constraint for the chosen staff member and time (default start now).
- After saving, go straight to the receipt (spec 25).

## Out Of Scope

- Receipt layout (spec 25). Customers list screens (spec 26).

## Notes And Rules

- Phone numbers are normalized with the shared helper.
- Keep the form to as few taps as possible. Large inputs, since this may run on a phone or tablet at the counter.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] A POS sale saves with the right booking and payment records.
- [ ] A returning phone number is recognized and reuses the same customer record.
- [ ] A new phone number creates a customer record.
- [ ] The sale counts toward finances immediately.
- [ ] The form is quick to use on a tablet.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
