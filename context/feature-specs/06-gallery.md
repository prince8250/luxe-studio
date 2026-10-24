# 06 · Gallery Mosaic and Page

## Goal

A fast, striking mosaic gallery that shows the studio's work.

## Depends On

- `02-database-schema.md`
- `04-hero.md`

## Scope (Build Only This)

- View `design-reference/04` first.
- Home page `#gallery` preview and a full `/gallery` page.
- Mosaic of active gallery images with **thin black gutters** and mixed tile sizes (tall, wide, and standard). Tile sizing is deterministic from image order or stored aspect ratio so the layout does not jump while loading. Square corners.
- Tap or click opens a full-screen viewer with swipe, arrow keys, and a clear close button.
- Lazy loading and responsive image sizes. Staggered fade-up reveal as tiles enter the viewport. Loading, empty, and error states.

## Out Of Scope

- Admin upload (spec 14).

## Notes And Rules

- Images come from Supabase Storage through `next/image` (configure the remote pattern).
- Alt text from captions, with a sensible fallback.
- Mobile: two-column mosaic with a few full-width tiles.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Looks like a wall of varied photos with black gutters, not a uniform grid.
- [ ] Viewer opens, swipes, and closes, and is keyboard accessible.
- [ ] Offscreen images do not load until near the viewport.
- [ ] Stays light on mobile data.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
