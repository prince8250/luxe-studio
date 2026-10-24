# 02 · Database Schema, RLS, and Seed Data

## Goal

Create the Supabase database exactly as described in `architecture-context.md`, with security rules and sample data.

## Depends On

- `00-project-setup.md`

## Scope (Build Only This)

- SQL migrations for: `profiles` (admins only), `customers`, `staff`, `service_categories`, `services`, `service_staff`, `staff_hours`, `staff_time_off`, `bookings`, `payments`, `offers`, `gallery_images`, `rate_limits`.
- Enums or checked columns for `payment_mode`, booking `status`, booking `source`, payment `kind`, and payment `method`.
- Exclusion constraint on `bookings` preventing overlapping active bookings for the same staff member (needs the `btree_gist` extension).
- Human-friendly unique booking `code` generation (for example `BLS-7K4Q`, avoiding look-alike characters such as 0/O and 1/I) and a long random `public_token` for each booking.
- RLS enabled on every table with policies as described in the architecture file. Anon can read only active public catalog data and nothing else.
- Storage buckets `gallery`, `staff`, and `catalog` (service and category images) with policies (public read, admin write).
- A seed file with 2 staff, 3 categories, 5 services (a mix of deposit and pay-at-shop), staff hours, 2 offers, and a few gallery rows. Mark it clearly as sample data.
- Generate TypeScript database types into `lib/database.types.ts`.
- Supabase client helpers: `lib/supabase/client.ts`, `server.ts`, and `admin.ts` (the service-role client, with `server-only`).

## Out Of Scope

- Any UI. Any application code beyond the Supabase client helpers.

## Notes And Rules

- Ask the developer to create the Supabase project and provide the keys. Do not guess values.
- In the Supabase auth settings, public sign-ups must be disabled. Tell the developer to do this and record it in the tracker.
- Test the overlap constraint explicitly: attempt two overlapping bookings for one staff member and confirm the second fails; confirm back-to-back bookings succeed.
- Test RLS: confirm anon can read active services but cannot read `bookings`, `customers`, `payments`, or `profiles`.

## Acceptance Criteria

- [ ] Migrations apply cleanly on a fresh database.
- [ ] Overlap constraint blocks double booking and allows adjacent slots.
- [ ] RLS behaves as described, verified by queries as anon.
- [ ] Types file is generated and `npm run typecheck` passes.
- [ ] The service-role client is `server-only`.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
