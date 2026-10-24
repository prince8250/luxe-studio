# 11 · Admin Role, Route Protection, and Shell

## Goal

A protected admin area with navigation, ready to host the admin features.

## Depends On

- `10-admin-login.md`

## Scope (Build Only This)

- `lib/auth/require-admin.ts` that verifies a logged-in user with `profiles.role = 'admin'` on the server, used by every admin page and server action.
- `app/admin/layout.tsx` that enforces it. Anyone else is redirected to the login page, and no admin data is ever sent to them.
- Admin shell on the paper background: bottom tab bar on mobile, left sidebar on desktop. Sections: Dashboard, Bookings, POS, Customers, Services, Staff, Schedules, Gallery, Offers.
- A persistent **"Find booking by ID"** field at the top (it can be wired to real data in spec 23).
- Placeholder pages for each section with the real route structure.

## Out Of Scope

- The features inside each section.

## Notes And Rules

- Follow the Admin notes in `ui-context.md`: tool-like, large touch targets, no decorative animation.
- Test that a logged-out visitor cannot open `/admin/*` and cannot call an admin server action directly.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] An admin can open `/admin`; everyone else is redirected.
- [ ] Navigation works at 375px and 1280px.
- [ ] A reusable server-side admin guard exists and every placeholder page and action uses it.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
