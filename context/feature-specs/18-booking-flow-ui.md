# 18 · Booking Flow: Service, Staff, Time, Details

## Goal

The mobile-first `/book` screens up to the point of confirming the choice. No account and no login.

## Depends On

- `05-services-section.md`
- `17-availability-engine.md`
- `03-navbar.md`

## Scope (Build Only This)

- View the Booking page description in `ui-context.md`.
- `/book` stepper: 1 Service, 2 Staff (with "No preference" if allowed), 3 Date and time slot, 4 Your details (**name and phone number**), 5 Confirm.
- Preselect the service from `?service=<id>`.
- Only staff assigned to the chosen service are shown. Slots come from the availability engine, shown as square outlined chips grouped by morning, afternoon, and evening; the selected chip inverts to white with black text.
- Phone field normalizes and validates Ghana numbers with the shared helper and shows friendly errors. Numeric keyboard on mobile.
- A persistent summary of choices so far with the price and payment wording ("Pay a deposit of GHS X now" or "Pay at the studio"), in a sticky bottom bar.
- State kept in the URL or a small client store so refresh does not lose progress.
- The Confirm step ends with a button that spec 19 will wire up.

## Out Of Scope

- Creating the booking, the bot challenge, and payment.

## Notes And Rules

- One decision per screen on mobile. Steps slide with a small fade.
- If there are no available slots, show a helpful message and a Call button.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] A customer can complete all steps at 375px with one hand.
- [ ] Slots reflect real availability and update when staff or date changes.
- [ ] Refreshing keeps the current selections.
- [ ] Deposit and pay-at-shop services show the correct wording.
- [ ] Invalid phone numbers are rejected clearly.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
