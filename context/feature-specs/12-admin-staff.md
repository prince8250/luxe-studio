# 12 · Admin Staff

## Goal

Admin adds and manages staff members.

## Depends On

- `11-admin-shell.md`
- `02-database-schema.md`

## Scope (Build Only This)

- Staff list, add staff, edit staff, deactivate and reactivate.
- Fields: name, bio (optional), photo upload to the `staff` bucket (resized on upload), active toggle.
- Deactivating a staff member hides them from new bookings but never deletes past bookings.
- Zod validation, loading and saved states, error messages.

## Out Of Scope

- Staff schedules (spec 16). Assigning staff to services (spec 13).

## Notes And Rules

- Never hard delete staff who have bookings.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Admin can add, edit, deactivate, and reactivate staff.
- [ ] Photo upload is compressed and shows on the form.
- [ ] Inactive staff do not appear publicly.
- [ ] Works well on a phone.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
