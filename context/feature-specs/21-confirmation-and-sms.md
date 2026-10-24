# 21 · Booking Confirmation Page and SMS

## Goal

Tell the customer the booking is confirmed and give them their booking ID.

## Depends On

- `19-booking-creation.md`
- `20-paystack-deposit.md`
- `09-sms-adapter.md`

## Scope (Build Only This)

- `/booking/[token]` confirmation page, looked up by the long `public_token` only (never by the short code): crest, "BOOKING CONFIRMED", booking ID large, service, staff, date and time, deposit status, studio address, Call and Directions buttons, and a line to show the booking ID at the studio. Unknown or invalid tokens show a neutral not-found page.
- Waiting-for-payment state for `pending_payment` bookings, with a way to retry payment while the hold is valid.
- Send the confirmation SMS through the SMS adapter once a booking becomes `confirmed` (pay-at-shop on creation, deposit on webhook). The SMS contains the studio name, service, date and time, and the booking ID.
- Record `sms_status` on the booking so failures are visible to admin. An SMS failure must never fail the booking.
- Avoid duplicate SMS if the webhook is delivered twice.

## Out Of Scope

- Reminder SMS (later phase).

## Notes And Rules

- Keep the SMS short.
- Add `robots: noindex` to the confirmation page.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] The page shows correct data and cannot be opened by guessing the booking ID.
- [ ] The customer receives the SMS with the booking ID.
- [ ] A duplicate webhook does not send a second SMS.
- [ ] The booking succeeds even if the SMS fails, and the failure is recorded.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
