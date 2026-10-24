# 05 · Service Categories and Services Page

## Goal

Show the studio's services as full-bleed photo panels and a detailed services page, loaded from the database.

## Depends On

- `02-database-schema.md`
- `04-hero.md`

## Scope (Build Only This)

- View `design-reference/02` and `05` first.
- Home page `#services` section: one tall full-bleed photo **panel per active category** (image, bold uppercase title, one-line tagline, outlined SEE MORE button). Two columns on desktop with the second panel offset downward, stacked and edge to edge on mobile.
- SEE MORE links to `/services#<category>`.
- `/services` page on black: for each category, a heading and a list of service cards (small photo, name, duration, price in GHS in Oswald, a "Deposit required" label when `payment_mode = deposit`, and a solid Book button linking to `/book?service=<id>`).
- Server-side data fetching of active categories and services only. Loading, empty, and error states.
- Hover (desktop only): slow photo scale and slightly darker overlay.

## Out Of Scope

- The booking flow itself.

## Notes And Rules

- Create `lib/money.ts` with the GHS formatter if it does not exist.
- Show the full price prominently. If a deposit is required, show the deposit amount as secondary text.
- Panels must keep text readable over any photo (dark overlay).

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Panels and cards render from the seeded database and match the reference style.
- [ ] Inactive categories and services are hidden.
- [ ] Prices format correctly from integer pesewas.
- [ ] Works at 375px with images sized for mobile and no horizontal scrolling.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
