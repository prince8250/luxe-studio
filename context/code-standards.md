# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes. Do not layer workarounds.
- Do not mix unrelated concerns in one component, action, or route.
- Respect the system boundaries and invariants in `architecture-context.md`.
- Prefer boring, readable code over clever code. The developer is learning this stack and must be able to read what you write.
- Comments explain **why**, not what. Add a short comment wherever the reason is not obvious (for example, why a constraint exists or why a check happens on the server).

## TypeScript

- Strict mode is required.
- Avoid `any`. Use explicit interfaces or narrowly scoped types.
- Validate every piece of external input (forms, query params, webhook bodies, environment variables) with Zod before trusting it.
- Use `interface` for object contracts. Generate database types from Supabase and use them rather than hand-writing duplicates.

## Next.js

- Default to React Server Components.
- Add `"use client"` only for browser interactivity, hooks, or real-time state, and keep client components small and as deep in the tree as possible.
- Prefer server actions for mutations from our own UI. Use route handlers only where an HTTP endpoint is required (webhooks, hooks, scheduled jobs).
- Read the guide in `node_modules/next/dist/docs/` before using any Next.js API you are not certain about. Do not rely on memory.

## Supabase

- Schema changes go in `supabase/migrations` as SQL files. Never change the schema only through the dashboard.
- Every table has RLS enabled and explicit policies.
- Use the browser/anon client only for public read-only data, the server client for the admin session, and the service-role client only in server-only modules after validation and checks.
- Never import the service-role client from anything that could be bundled to the browser. Mark such modules with `import "server-only"`.

## Money, Time, and Phones

- Money: integer pesewas in the database and in logic. Format to GHS only at the display edge through one shared helper.
- Time: store `timestamptz` in UTC. Convert to `Africa/Accra` for display and for "what day is it" logic, through one shared helper.
- Phones: normalize to E.164 with one shared helper before storing or comparing.

## Styling

- Use CSS custom property tokens defined in `globals.css`. No raw Tailwind palette classes and no hardcoded hex values.
- Corners are square (`rounded-none`) as defined in `ui-context.md`. No rounded cards or pill buttons.
- Write mobile styles first and add `sm:`, `md:`, `lg:` for larger screens.
- Every interactive element needs a visible focus state and a minimum 44px tap target.

## Forms and Server Actions

- Validate and parse input before any logic runs.
- Enforce authentication and role checks before any mutation.
- Return a consistent result shape, for example `{ ok: true, data }` or `{ ok: false, error }`, with messages a customer can understand.
- Show pending, success, and error states in the UI. Disable submit buttons while pending.

## Payments and Webhooks

- Verify the Paystack webhook signature before reading the body.
- Match reference and amount to the stored booking before confirming it.
- Make webhook handling idempotent.
- Never log secrets or full card data.

## Images

- Use `next/image` with sizes set for mobile.
- Resize and compress on upload. Store paths, not URLs.
- Always provide meaningful `alt` text (gallery captions, staff names).

## File Organization

- `app/(public)/` public pages, `app/admin/` admin pages, `app/api/` HTTP endpoints only.
- `lib/` shared infrastructure: Supabase clients, auth helpers, availability, Paystack, SMS adapter, money, time, and phone helpers.
- `components/` UI composition. Subfolders by area: `components/public`, `components/admin`, `components/booking`.
- `components/ui/` shadcn/ui generated components. Never edit them; compose them through app-level wrappers.
- `components/brand/` project-styled wrappers (buttons, panels, headings) that apply the design tokens.
- `supabase/migrations/` SQL.
- Name files after the responsibility they contain, not the technology.

## Security Basics

- Never commit secrets. Use `.env.local` and keep `.env.example` current with variable names only.
- Rate-limit public booking attempts per phone number and per IP, and verify the Turnstile token on the server for every booking submission.
- Escape and validate any user-provided text that is displayed (names, captions).
- Return generic errors to users and detailed errors only to server logs.

## Git

- Commit after each completed spec with a clear message, for example `feat: navbar (spec 03)`.
