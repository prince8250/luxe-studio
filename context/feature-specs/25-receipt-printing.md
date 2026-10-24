# 25 · Receipt Printing

## Goal

Print a clean receipt for POS sales and checked-in bookings.

## Depends On

- `24-pos-manual-booking.md`
- `23-admin-bookings-checkin.md`

## Scope (Build Only This)

- `/admin/receipts/[bookingId]` page generated from stored data: studio name and contact, receipt/booking ID, date and time, customer name and phone, service, staff, amount, payment method(s), deposit paid and balance paid when relevant, thank-you line.
- Print stylesheet for a narrow thermal paper width (80mm) with a normal A4 fallback; black and white only.
- A Print button that opens the browser print dialog, and a Reprint option from the booking detail page.
- Link to the receipt from the POS success screen and from checked-in bookings.

## Out Of Scope

- Emailing or SMS-ing receipts. Direct printer hardware integrations.

## Notes And Rules

- Confirm open question 10 (printer type and receipt details) with the developer first.
- Test with the browser's print preview at the configured paper width.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Receipt data comes from the database, not client state.
- [ ] Print preview looks right at thermal width and on A4.
- [ ] Reprinting produces the same receipt.
- [ ] Only admins can open receipts.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
