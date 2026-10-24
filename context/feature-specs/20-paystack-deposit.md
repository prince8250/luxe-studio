# 20 · Paystack Deposit and Webhook

## Goal

Collect deposits online and confirm bookings only from a verified Paystack webhook.

## Depends On

- `19-booking-creation.md`

## Scope (Build Only This)

- Server action that initializes a Paystack transaction for the booking's `deposit_due` with a unique reference, stores a pending `payments` row, and returns the authorization URL.
- Redirect the customer to Paystack, with a callback page that only displays status (it never confirms anything).
- `app/api/paystack/webhook`: verify the signature, handle `charge.success`, match reference and amount to the stored booking and payment, then mark the payment paid and the booking `confirmed`.
- Idempotency: processing the same event twice changes nothing the second time.
- Late payments: if a payment succeeds after the hold expired, confirm the booking if the slot is still free; otherwise flag it for admin and record it clearly (log in `payments`, surface in the admin bookings list in spec 23).
- Use Paystack test keys only. Test with a tunnel such as ngrok or Paystack's test tooling.

## Out Of Scope

- The confirmation page and SMS (spec 21).

## Notes And Rules

- Ask before touching anything money-related beyond this spec.
- Read Paystack's current API and webhook documentation first. Do not rely on memory.
- Mobile money options appear through Paystack's checkout when enabled on the account (open question 11).

## Acceptance Criteria

- [ ] A test payment confirms the booking through the webhook.
- [ ] A forged or unsigned webhook is rejected.
- [ ] A duplicate webhook does not duplicate payments.
- [ ] An amount mismatch does not confirm the booking.
- [ ] Cancelling or abandoning payment leaves the booking to expire.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
