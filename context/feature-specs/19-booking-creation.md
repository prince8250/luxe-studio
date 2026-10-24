# 19 · Booking Creation and Slot Hold

## Goal

Turn a reviewed selection into a real booking safely, without any account.

## Depends On

- `18-booking-flow-ui.md`
- `09-sms-adapter.md`

## Scope (Build Only This)

- Public server action `createBooking`: validates input with Zod (service, staff, start time, name, phone), re-checks availability, finds or creates the `customers` row by normalized phone, snapshots price and deposit onto the booking, and generates the booking `code` and `public_token`.
- Refuse blocked phone numbers with a neutral message.
- Pay-at-shop services: booking is created as `confirmed` immediately.
- Deposit services: booking is created as `pending_payment` with `hold_expires_at` (default 10 minutes) and the flow moves to payment (spec 20).
- Handle the exclusion-constraint failure (slot just taken) with a friendly message and a return to slot selection.
- A cleanup mechanism that expires stale holds: an endpoint `app/api/cron/expire-holds` secured by a secret, plus the availability engine ignoring expired holds immediately.
- Wire the Confirm step's button. Redirect to `/booking/[token]` (spec 21) on success.

## Out Of Scope

- Paystack, the SMS send, and the confirmation page (specs 20 and 21). Bot challenge and rate limits (spec 22), but write the action so those checks are easy to add.

## Notes And Rules

- Never trust client-supplied price, deposit, status, or staff eligibility. Recompute them on the server.
- Document in the tracker how the expire-holds job will be scheduled once the hosting plan is known.
- Test two simultaneous attempts on the same slot: exactly one succeeds.

## Acceptance Criteria

- [ ] Pay-at-shop booking becomes `confirmed` with a booking code and a public token.
- [ ] Deposit booking becomes `pending_payment` with a hold.
- [ ] A new phone creates a customer and a returning phone reuses it.
- [ ] Two people cannot book the same slot.
- [ ] Price and deposit are snapshotted on the booking.
- [ ] Expired holds free the slot.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
