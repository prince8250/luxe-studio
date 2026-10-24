# 08 · About, Location, Contact, and Footer

## Goal

Finish the home page: the light About block, the location and contact section, and the footer.

## Depends On

- `01-theme-and-layout.md`
- `04-hero.md`

## Scope (Build Only This)

- View `design-reference/03` first.
- **About** (`#about`): the paper-textured light section. Image (cutout or photo) on the left, and on the right a heavy uppercase headline, a short bold rule, a sentence-case subheading, short body copy, and a solid dark button (for example "BOOK NOW"). Stacked on mobile with the image first. Copy is provided by the developer; use clearly marked placeholder text until then.
- **Location and contact** (`#contact`): black section with address, opening hours (with an "Open now" indicator computed in Accra time), a large Call button, a Directions button, and a map link. Optional "Chat on WhatsApp" link using `wa.me` if the developer provides a number. Do not embed a heavy map unless it does not hurt mobile performance.
- **Footer**: wordmark, quick links in small spaced uppercase, social links, copyright.
- All studio details are read from `lib/studio.ts`.

## Out Of Scope

- Automated WhatsApp messaging (out of scope for v1).

## Notes And Rules

- Text on paper uses `text-on-paper` tokens and meets AA contrast.
- Use scroll-reveal for the About text and image.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] About matches the reference's light block and typography.
- [ ] Every contact action works on a phone (call, directions, WhatsApp if enabled).
- [ ] Details come from one source file.
- [ ] Footer links are easy to tap at 375px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
