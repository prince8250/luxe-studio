# 16 · Admin Staff Schedules

## Goal

Admin sets staff working hours and time off, and views each staff member's schedule.

## Depends On

- `11-admin-shell.md`
- `12-admin-staff.md`
- `02-database-schema.md`

## Scope (Build Only This)

- Weekly working hours editor per staff member (supports a day off and a split day if simple).
- Time off: add and remove unavailable days or ranges.
- Schedule view: choose a staff member and a date, see their bookings and free time for the day (read-only list at this stage).
- All times shown in `Africa/Accra`.

## Out Of Scope

- Computing booking availability for customers (spec 17).

## Notes And Rules

- Warn the admin when new hours or time off conflict with existing confirmed bookings. Do not silently cancel anything.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Hours and time off save and reload correctly.
- [ ] The day view lists bookings in time order.
- [ ] Conflicts with existing bookings are flagged.
- [ ] Usable on a phone and a tablet.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
