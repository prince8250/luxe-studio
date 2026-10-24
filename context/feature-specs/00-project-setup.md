# 00 · Project Setup

## Goal

Create the Next.js project with tooling in place so every later spec starts from a clean, working base.

## Depends On

- Nothing. This is the starting point.

## Scope (Build Only This)

- Scaffold Next.js (latest) with TypeScript strict mode, App Router, Tailwind, ESLint.
- Initialize shadcn/ui and install only: button, input, label, card, dialog, sheet, sonner (toast).
- Install and configure: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`.
- Add `package.json` scripts: `lint`, `typecheck` (`tsc --noEmit`), `build`.
- Create folders: `lib/`, `components/public`, `components/admin`, `components/booking`, `supabase/migrations`.
- Create `lib/env.ts` that validates required environment variables with Zod, and `.env.example` listing every variable name (no values).
- Move or copy the `context/` folder to the project root if it is not there already.
- Initialize git, add a sensible `.gitignore`.

## Out Of Scope

- Any pages, theme, or database work.

## Notes And Rules

- Read `node_modules/next/dist/docs/` before configuring anything Next.js specific.
- Environment variables to declare: Supabase URL, anon key, service-role key (server only), Paystack public and secret keys, SMS provider key and sender ID, site URL.
- The home page can stay as the default placeholder.

## Acceptance Criteria

- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` all pass.
- [ ] `npm run dev` shows the placeholder page.
- [ ] Missing required env vars produce a clear error from `lib/env.ts`.
- [ ] No secrets are committed.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
