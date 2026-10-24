# 04 · Hero

## Goal

The first screen: a black, moody hero with the wordmark, crest, and a dominant Book Now button.

## Depends On

- `01-theme-and-layout.md`
- `03-navbar.md`

## Scope (Build Only This)

- View `design-reference/01` and `05` first.
- Full-bleed black section, at least one full screen tall (`100svh`), with a dark background image (placeholder until real photography is supplied) fading to black.
- Centered **wordmark** "BESTMAN LUXE STUDIO" in bold white Noto Serif capitals, slightly tracked.
- Below it, a circular **crest** placeholder (`public/logo-crest.svg` placeholder to be replaced with the real logo).
- Below that, the **BOOK NOW** solid button linking to `/book`. Secondary actions below it: **Call** (`tel:`) and **Get directions** (map link), as small outline buttons.
- Desktop only: a vertical rail of social icons on the left with a rotated "OUR SOCIALS" label.
- Load animation: wordmark, crest, then button fade in with small offsets.
- Create `lib/studio.ts` with placeholder constants: name, phone, address, map URL, hours, socials, WhatsApp number. Log these as open question 2.

## Out Of Scope

- Real booking logic, other home sections.

## Notes And Rules

- Text over the image must meet contrast with a dark overlay.
- The hero image must be optimized with `next/image` and `priority`, and must not cause layout shift.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Matches the reference layout and tone.
- [ ] BOOK NOW, Call, and Directions are all visible without scrolling on a 375×667 viewport.
- [ ] Call opens the dialer on a phone and Directions opens the map.
- [ ] Hero loads fast on slow data.
- [ ] Reduced-motion users get a simple fade only.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
