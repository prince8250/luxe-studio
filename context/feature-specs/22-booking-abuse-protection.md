# 22 · Booking Abuse Protection

## Goal

Protect the open booking form from spam and fake bookings now that there is no OTP.

## Depends On

- `19-booking-creation.md`

## Scope (Build Only This)

- Cloudflare Turnstile on the Confirm step, with server-side token verification inside `createBooking` before anything is written.
- Rate limits using the `rate_limits` table: for example a maximum number of attempts per IP and per phone number per hour (defaults chosen by the agent and documented).
- A limit of 2 upcoming (confirmed or pending) bookings per phone number by default, with a friendly message that tells the customer to call the studio.
- Admin **blocked numbers** screen: block and unblock a phone number (sets `customers.blocked`), with the reason noted. Blocked numbers cannot book online.
- A no-show shortcut on the booking detail page (spec 23) that offers to block the number.

## Out Of Scope

- Phone verification by OTP (explicitly not part of this project).

## Notes And Rules

- Ask the developer to create a free Cloudflare Turnstile site and provide the keys. Keep the secret key server-only.
- Use friendly messages that do not reveal exactly which rule triggered.
- Confirm the limits with the developer in the tracker.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] A request without a valid Turnstile token is rejected.
- [ ] Rapid repeated submissions are rate limited.
- [ ] A phone with 2 upcoming bookings cannot create a third online.
- [ ] A blocked number cannot book online, and admin can unblock it.
- [ ] Normal customers are not slowed down.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
