# 23 · Admin Bookings and Check-in

## Goal

Admin finds a booking and checks the customer in. This is the moment revenue is counted.

## Depends On

- `11-admin-shell.md`
- `21-confirmation-and-sms.md`

## Scope (Build Only This)

- Bookings list with filters (today, upcoming, status) and search by booking ID or phone number.
- Booking detail page: customer, service, staff, time, payments, status.
- Prominent "Find booking by ID" input at the top of the admin for fast front-desk use.
- Check in action: sets `status = checked_in` and `checked_in_at = now`. For a deposit booking, require the admin to record how the balance was paid (cash, MoMo, or card) and create a `balance` payment row; for pay-at-shop, record the full payment method.
- Other actions: cancel (frees the slot), mark no-show.
- Flag late-payment conflicts from spec 20.
- Checking in twice must be impossible (idempotent and guarded).

## Out Of Scope

- Finance dashboard (spec 27). POS (spec 24).

## Notes And Rules

- All actions are admin-guarded server actions with confirmation dialogs for cancel and no-show.
- Confirm open questions 9 and 14 with the developer first.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Entering a valid booking ID opens the booking in one step.
- [ ] Check-in sets the status and time and records the balance payment.
- [ ] A booking cannot be checked in twice or after cancellation.
- [ ] Cancelled bookings free their slot.
- [ ] Works well on a phone at the counter.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
