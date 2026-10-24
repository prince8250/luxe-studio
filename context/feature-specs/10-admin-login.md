# 10 · Admin Login

## Goal

Let the owner sign in to the admin area securely. There are no customer logins.

## Depends On

- `02-database-schema.md`

## Scope (Build Only This)

- `/admin/login` page with email and password using Supabase Auth, in the site's dark style.
- Session handling with `@supabase/ssr` and middleware refresh. Sign out button.
- Rate limiting on login attempts and generic error messages.
- Public sign-up is disabled (confirm the Supabase setting is off).
- Document in the tracker how to create the first admin: create the user in the Supabase dashboard, then insert their `profiles` row with `role = 'admin'`.
- Optional: a "forgot password" flow through Supabase's reset email, only if the developer wants it.

## Out Of Scope

- Admin shell and route protection (spec 11).

## Notes And Rules

- No customer-facing login link anywhere on the public site.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] The admin can sign in and out.
- [ ] A wrong password gives a generic error, and repeated attempts are limited.
- [ ] A user without an admin profile cannot proceed.
- [ ] There is no way to sign up from the public site.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
