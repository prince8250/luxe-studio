# 17 · Availability Engine

## Goal

A tested module that answers: which time slots can this customer book for this service?

## Depends On

- `02-database-schema.md`
- `13-admin-services.md`
- `16-admin-staff-schedules.md`

## Scope (Build Only This)

- `lib/availability` with pure functions: given a service, optional staff, and a date range, return bookable slots.
- Inputs considered: staff working hours, time off, existing active bookings (including unexpired holds), service duration, studio timezone (`Africa/Accra`), and a minimum lead time (default 60 minutes).
- Support a specific staff member, and "any available" (returns slots with the staff who can take them, picking the first free staff member).
- Slot interval default: 30 minutes (configurable constant).
- A server function that fetches the needed data and calls the pure logic.
- Unit tests for the pure logic: back-to-back bookings, a service longer than the gap, time off, day off, past slots, holds, and "any available".

## Out Of Scope

- Any UI.

## Notes And Rules

- The database constraint remains the final guard. Availability is for good UX only, and booking creation (spec 19) must still handle a lost race gracefully.
- Add a test runner (for example Vitest) in this spec; ask the developer first since it is a new dependency.

## Acceptance Criteria

- [ ] Unit tests pass and cover the cases listed.
- [ ] Returned slots never overlap existing active bookings or time off.
- [ ] Past times and times inside the lead time are never offered.
- [ ] Results are correct around midnight and day boundaries in Accra time.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
