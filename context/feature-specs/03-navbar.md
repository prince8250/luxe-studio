# 03 · Navbar

## Goal

The floating dark navigation bar from the reference, with Book always one tap away.

## Depends On

- `01-theme-and-layout.md`

## Scope (Build Only This)

- View `design-reference/01` to `05` first.
- **Desktop**: a centered floating bar, narrower than the screen, charcoal and slightly translucent, with a thin white line along its top edge. Links in tiny bold uppercase with wide tracking: Services, Gallery, About, Contact. A **Book** button (solid style) sits at the right end of the bar. The current section is underlined.
- **Mobile**: a slim top bar with a menu icon on the left and the **Book** button on the **top right**, always visible. The menu opens a full-height dark sheet with the same links plus a Call link, large type, and a close button.
- Links scroll smoothly to home page sections (`#services`, `#gallery`, `#about`, `#contact`) and navigate correctly from other pages.
- The bar stays fixed while scrolling and becomes slightly more opaque after scrolling.
- Active-section highlighting using an Intersection Observer.

## Out Of Scope

- The hero, any booking logic, any admin links.

## Notes And Rules

- Anchor targets may not exist yet; use the real ids and log which sections are still missing in the tracker.
- Keyboard accessible, focus trapped in the mobile menu, Escape closes it.
- Respect `prefers-reduced-motion` for smooth scrolling.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Matches the reference: floating, centered, thin top line, spaced uppercase links.
- [ ] On a phone, Book is visible at the top right without opening the menu.
- [ ] Menu opens and closes by tap, backdrop, and Escape.
- [ ] Tap targets are at least 44px.
- [ ] Works at 375px, 768px, and 1280px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
