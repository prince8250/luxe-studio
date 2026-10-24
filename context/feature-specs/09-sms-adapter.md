# 09 · SMS Adapter

## Goal

One module that sends SMS, so confirmations never depend on a specific provider.

## Depends On

- `00-project-setup.md`

## Scope (Build Only This)

- `lib/sms/index.ts` exposing `sendSms({ to, message })` returning a typed result.
- One provider implementation for the provider the developer chose (open question 3), in its own file.
- A development mode that logs the message to the server console instead of sending when `SMS_MODE=console`.
- Phone normalization helper `lib/phone.ts` (Ghana numbers to E.164, rejects invalid input) with unit tests.
- `lib/sms/templates.ts` with the booking confirmation template (studio name, service, date and time, booking ID, studio phone). Keep it short, ideally within a single-SMS length.
- Error handling and a clear failure result. Never log full message bodies in production.

## Out Of Scope

- Sending the confirmation after a booking (spec 21). No OTP messages exist in this project.

## Notes And Rules

- Ask the developer for the chosen provider and credentials before coding. Read that provider's current API documentation.
- Add a test runner (for example Vitest) now if one is not present; ask first because it is a new dependency.

## Acceptance Criteria

- [ ] A test SMS can be sent to the developer's phone through the real provider.
- [ ] Console mode works for local development.
- [ ] Phone helper handles `024...`, `+23324...`, and `23324...` formats and rejects garbage.
- [ ] No provider-specific code outside its own file.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
