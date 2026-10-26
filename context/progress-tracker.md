# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- In progress. The theme and layout shell and the Supabase schema foundation are implemented; production setup still needs a Supabase project and the required Next.js security upgrade.

## Current Goal

- Create the Supabase project, apply the migration and sample seed, verify RLS and booking overlap behavior, then complete the remaining foundation setup checks.

## Completed

- Next.js App Router scaffold is present with strict TypeScript and the requested package setup.
- Required dependencies for Supabase, Zod, Lucide, and shadcn-compatible UI were added.
- `lib/env.ts` validates required env vars and `.env.example` lists the required variable names.
- Required folders for `lib`, public/admin/booking components, and `supabase/migrations` were created.
- `01-theme-and-layout.md` is implemented: design tokens, Bebas Neue/Noto Serif/Oswald fonts, brand wrappers, scroll reveal, metadata, and the temporary `/design-check` page are in place.
- The site's global font is now Bebas Neue; the hero wordmark remains on the restored serif display font.
- Font change verification: lint and typecheck pass; the build compiles and prerenders, then stops at Next.js's mandatory security upgrade gate.
- `03-navbar.md` is implemented: responsive fixed navigation, desktop floating bar, mobile menu sheet, active-section observer, reduced-motion scrolling, keyboard focus trap, Escape/backdrop close behavior, and always-visible Book links.
- The mobile navigation menu now uses an ease-in slide and backdrop fade on entry, plus an ease-out slide and fade on exit.
- `04-hero.md` is implemented: full-screen responsive hero with the supplied local background, a left-aligned serif wordmark, compact Book/Call/Directions actions, staged reduced-motion-safe entrance animation, desktop social rail, and studio constants in `lib/studio.ts`.
- `02-database-schema.md` is implemented in code: the initial Supabase migration defines all required tables, enums, booking overlap protection, booking identifiers, RLS policies, and `gallery`, `staff`, and `catalog` storage buckets.
- Sample catalog data is provided in `supabase/seed.sql`; it is explicitly labeled as sample data.
- Typed Supabase browser, server, and server-only service-role helpers were added, along with `lib/database.types.ts`.

## In Progress

- The current hero issue refinement is implemented; lint and typecheck pass. The build compiles and prerenders, then stops at Next.js's mandatory security upgrade gate.

- `02-database-schema.md` cannot be fully verified until the developer creates the Supabase project, supplies local environment keys, applies the migration, and runs the overlap/RLS checks.
- `00-project-setup.md` remains blocked on the required Next.js security upgrade because the current app version is flagged by the framework itself.

## Next Up

- Create the Supabase project with public sign-ups disabled, apply `supabase/migrations/20261025160022_initial_schema.sql`, run `supabase/seed.sql`, and verify overlap and anon RLS behavior.
- Decide whether to run the security upgrade in-place or in a separate Git worktree, then rerun `npm run lint`, `npm run typecheck`, and `npm run build`.

## Build Order

Specs live in `context/feature-specs/`. Build in order unless the developer says otherwise. Tick a box only when the spec is fully done.

**Phase 0: Foundation**
- [ ] 00 Project setup
- [x] 01 Theme and layout shell
- [ ] 02 Database schema, RLS, and seed data (implementation complete; Supabase verification pending)

**Phase 1: Public site**
- [x] 03 Navbar
- [x] 04 Hero
- [ ] 05 Service categories and services page
- [ ] 06 Gallery mosaic and page
- [ ] 07 Offers section
- [ ] 08 About, location, contact, and footer

**Phase 2: SMS and admin access**
- [ ] 09 SMS adapter
- [ ] 10 Admin login
- [ ] 11 Admin role, route protection, and shell

**Phase 3: Admin catalog**
- [ ] 12 Admin staff
- [ ] 13 Admin categories and services
- [ ] 14 Admin gallery
- [ ] 15 Admin offers
- [ ] 16 Admin staff schedules

**Phase 4: Online booking (no accounts)**
- [ ] 17 Availability engine
- [ ] 18 Booking flow: service, staff, time, details
- [ ] 19 Booking creation and slot hold
- [ ] 20 Paystack deposit and webhook
- [ ] 21 Booking confirmation page and SMS
- [ ] 22 Booking abuse protection

**Phase 5: Admin operations**
- [ ] 23 Admin bookings and check-in
- [ ] 24 POS manual booking
- [ ] 25 Receipt printing
- [ ] 26 Customers
- [ ] 27 Finance dashboard

**Phase 6: Launch**
- [ ] 28 Polish: performance, SEO, and accessibility
- [ ] 29 Deployment and launch checklist

## Open Questions

Resolve these before the spec that needs them (shown in brackets). Record answers in the relevant context file, then remove them here.

1. **Studio details** [04, 08]: logo (crest and wordmark files), phone number, address, map link, opening hours, social links, optional WhatsApp number, About text, and real photos.
2. **Accent color** [01]: the design reference has no accent color, so the UI is black, charcoal, white, and paper. Does the developer want the studio's teal as a small accent, or keep it fully monochrome? (Default: monochrome.)
3. **SMS provider** [09]: Arkesel, mNotify, or Hubtel? Needs an account, API key, and sender ID.
4. **Deposit amount** [13]: fixed GHS amount per service, or a percentage? (Default: fixed GHS amount entered by admin.)
5. **Service duration** [13, 17]: admin enters minutes per service. (Default: yes.)
6. **"Any available staff"** [18]: can the customer choose "no preference"? (Default: yes.)
7. **Admin accounts** [10, 11]: how many admins, and whose emails? (Default: the owner plus the developer.)
8. **Offers** [15]: display-only, or do they change the price? (Default: display-only.)
9. **Balance collection at check-in** [23]: admin records how the remaining balance was paid. (Default: required.)
10. **Receipt printer** [25]: thermal 80mm or normal paper? What business details appear on the receipt?
11. **Paystack account** [20]: should be in the client's business name. Test keys first, live keys at launch.
12. **Hosting plan** [29]: free tiers are fine to build on; plan for paid Vercel and Supabase plans at launch (Vercel's free tier is non-commercial; Supabase free projects pause when idle). Verify current terms.
13. **Deposit hold time** [19]: default 10 minutes.
14. **Cancellations and refunds** [23]: admin cancels; deposits are refunded manually in Paystack. Acceptable for launch?
15. **Abuse limits** [22]: default of 2 upcoming bookings per phone number and the rate limits. Are these right for the studio?
16. **Cloudflare Turnstile** [22]: the developer creates a free Turnstile site and supplies the keys.
17. **Service categories** [05, 13]: the starting list of categories and their images (for example Haircuts, Braiding, Nails, Makeup, Massage). Real photos are needed for the panels.

## Architecture Decisions

- Next.js + Supabase + Paystack on Vercel; no separate backend. The earlier Spring Boot backend is not used.
- **No customer accounts and no OTP.** Customers book with a name and phone number and receive an SMS confirmation. The confirmation page uses a long private token.
- Admin signs in with email and password through Supabase Auth, with public sign-ups disabled.
- Customer records are kept by phone number for recognizing returning customers and for studio records.
- Abuse protection replaces OTP: Turnstile, rate limits, per-phone booking limits, and a phone blocklist.
- Notifications are SMS only in v1 (confirmation only).
- Revenue is recognized at check-in. POS sales are created already checked in.
- Per-service payment mode (`deposit` or `pay_at_shop`) is set by admin.
- Money is integer pesewas. Studio timezone is `Africa/Accra`.
- Visual direction comes from `context/design-reference/`: black, charcoal, white, and paper; square corners; uppercase tracked type; photo-led. No accent color.

## Session Notes

- Fixed navbar review findings: the mobile overlay scrolls vertically when needed, modified/non-primary section clicks retain normal navigation, and entering the desktop breakpoint closes the menu and releases the body scroll lock. Lint, typecheck, build (on retry after the existing security reminder), and Chromium checks at mobile, short-viewport, breakpoint, and desktop sizes passed.
- Merged the overlapping fixes with the remote corrections. Lint, typecheck, build (on retry), 398 type assertions, browser bundle checks, and PostgreSQL seed replay checks passed on the merged code; earlier identifier/overlap/RLS checks remain valid because the migration is unchanged. Hosted Supabase verification remains pending.
- Applied the current issue corrections: aligned the generated UI component rule, corrected the migration filename, tightened database write types, made browser env references statically analyzable, fixed the migration search path, made offer and gallery seeds idempotent, and removed the scratch issue list.
- Fixed the mobile navbar menu interaction by ensuring the hamburger trigger and opened navigation sheet have explicit touch handling and stacking order; verified the menu opens at 375px.
- Supabase project creation and keys are still required; do not guess them. In Supabase Auth, disable public sign-ups before launch.
- The migration includes a `catalog` public bucket in addition to the `gallery` and `staff` buckets required by the schema spec.
- The migration uses `btree_gist` and `pgcrypto`; active booking overlap is enforced by a partial exclusion constraint on `[starts_at, ends_at)`.
- Navbar section targets `#services`, `#gallery`, `#about`, and `#contact` are not present on the temporary home page yet; the links are wired to those real IDs for later public-site sections.
- The mobile `Call` link currently points to `/#contact` because the studio phone number is still an open question.
- Hero studio details are placeholders until the owner supplies the real logo, phone, address, map link, hours, social links, WhatsApp number, and photography (open question 1).
- Hero verification: `npm run lint` and `npm run typecheck` pass. `npm run build` compiles, typechecks, and prerenders routes, then stops on Next.js 16.4.0's known security vulnerability gate; the dev server is stopped by the same gate before browser viewport verification can complete.
