# 27 · Finance Dashboard

## Goal

Show the owner how much the studio has earned, counting only real, checked-in revenue.

## Depends On

- `23-admin-bookings-checkin.md`
- `24-pos-manual-booking.md`

## Scope (Build Only This)

- Dashboard home: revenue today, this week, this month (week starts Monday; all in `Africa/Accra` time).
- Counts: bookings checked in today, upcoming confirmed bookings today, POS sales today.
- Breakdown by payment method and by service for the selected period, and a simple list of recent checked-in bookings.
- Date range selector (today, this week, this month, custom).
- Revenue is the sum of `total_price` for `checked_in` bookings grouped by `checked_in_at`. Cancelled, expired, no-show, and unchecked bookings never count.
- A clearly labeled "Deposits held for upcoming bookings" figure, kept separate from revenue.

## Out Of Scope

- Exports, charts beyond a simple one, and tax reports.

## Notes And Rules

- Aggregate in SQL (a view or function), not by loading all rows into the app.
- Add a test or documented manual check proving revenue changes only at check-in.

## Mobile Check

- Verify at 375px and at one desktop width.
- Tap targets at least 44px, body text at least 16px.
- Loading, empty, and error states exist where data is fetched.

## Acceptance Criteria

- [ ] Revenue does not change when a booking is created or a deposit is paid.
- [ ] Revenue increases exactly once when a booking is checked in or a POS sale is saved.
- [ ] Cancelled and no-show bookings are excluded.
- [ ] Day, week, and month boundaries are correct in Accra time.
- [ ] Readable at 375px.

## When Done

- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Reply using the explanation format in `context/ai-workflow-rules.md`.
- Update `context/progress-tracker.md`.
- Stop. Do not start the next spec.
