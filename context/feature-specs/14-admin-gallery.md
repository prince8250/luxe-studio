# 14 · Admin Gallery

## Goal

Admin manages the gallery pictures.

## Depends On

- `11-admin-shell.md`
- `06-gallery.md`

## Scope (Build Only This)

- Upload one or several images, with client-side resize and compression before upload.
- Edit caption, reorder (move up/down or drag where it works on touch), activate or deactivate, delete (removes the storage file and row).
- Upload progress and error states.

## Out Of Scope

- Video, albums, or categories.

## Notes And Rules

- Validate file type and size on both client and server. Store only paths in the database.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Uploaded images appear on the public gallery with correct order.
- [ ] Large camera photos are reduced in size before storage.
- [ ] Delete removes the file from storage.
- [ ] Usable on a phone.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
