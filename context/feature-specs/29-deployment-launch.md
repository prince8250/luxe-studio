# 29 · Deployment and Launch Checklist

## Goal

Deploy to production and verify everything with real services.

## Depends On

- `28-polish-performance-seo.md`

## Scope (Build Only This)

- Create the production Supabase project, apply all migrations, configure storage buckets, and confirm public sign-ups are disabled. No sample seed data in production.
- Create the first admin account in production (dashboard user plus profile row).
- Deploy to Vercel with environment variables set. Configure the custom domain if the client has one.
- Switch Paystack to live keys (account in the client's business name) and configure the production webhook URL.
- Configure the SMS provider's production sender ID and balance.
- Create the production Turnstile site and keys.
- Schedule the expire-holds job.
- Confirm the hosting plans are appropriate for a commercial client (open question 12).
- End-to-end production test: book a deposit service as a guest with a small real payment, receive the SMS, open the confirmation link, check in as admin, print a receipt, and see revenue update. Then a pay-at-shop booking and a POS sale.
- Hand-over notes in `docs/owner-guide.md`, in plain language: how the owner logs in, adds a category and a service, uploads photos, checks in a booking, uses the POS, and blocks a phone number.

## Out Of Scope

- New features.

## Notes And Rules

- Never run destructive operations on the production database without the developer's explicit confirmation.
- List anything that could not be verified in production in the tracker.

## Acceptance Criteria

- [ ] A full real booking works end to end in production.
- [ ] Webhook, SMS, and cron jobs are confirmed working.
- [ ] Owner guide exists.
- [ ] No secrets in the repository and none exposed to the browser.
- [ ] The tracker shows launch status honestly.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
