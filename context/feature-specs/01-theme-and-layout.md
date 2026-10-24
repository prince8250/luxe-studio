# 01 · Theme and Layout Shell

## Goal

Set up design tokens, fonts, brand wrapper components, and the base layout so every page matches the reference look from the first component.

## Depends On

- `00-project-setup.md`

## Scope (Build Only This)

- View `context/design-reference/` and read `ui-context.md` first.
- Define all color tokens from `ui-context.md` in `globals.css` and map them with `@theme inline`. Page background is pure black. There is no accent color.
- Load Noto Serif (bold), Open Sans, and Oswald with `next/font/google` and expose them as CSS variables.
- Set square corners as the default (`rounded-none`).
- Create brand wrapper components in `components/brand/`: `BrandButton` (variants `solid` and `outline`, sizes, optional `asChild` for links), `SectionHeading`, `PaperSection` (off-white background with a subtle speckle texture made from CSS or a tiny inline SVG, no heavy image), and a `Container`.
- Add a small scroll-reveal helper (Intersection Observer, `opacity` and `transform` only, once per element, disabled under `prefers-reduced-motion`).
- Create a temporary `/design-check` page showing buttons, headings, paper section, color swatches, and type samples at mobile width, for visual review only.
- Set `lang`, viewport, and theme-color (`#000000`) metadata.

## Out Of Scope

- Navbar, hero, or any real page content.

## Notes And Rules

- Do not edit files in `components/ui/`.
- Remove `/design-check` in spec 28.
- Keep the paper texture very light so it costs almost nothing to load.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] All tokens exist and work as Tailwind utilities.
- [ ] No hardcoded hex values or raw palette classes in code.
- [ ] Solid and outline buttons match the reference (charcoal fill with gray border; transparent with thin white border; condensed uppercase text).
- [ ] `/design-check` looks right at 375px and 1280px.
- [ ] Body text is at least 16px on mobile and inputs are at least 16px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
