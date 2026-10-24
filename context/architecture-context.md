# Architecture Context

## Stack

| Layer          | Technology                              | Role                                                              |
| -------------- | --------------------------------------- | ----------------------------------------------------------------- |
| Framework      | Next.js (latest) + TypeScript, App Router | Full-stack app: public site, admin area, and server logic        |
| UI             | Tailwind CSS + shadcn/ui                | Component composition and styling                                 |
| Database       | Supabase Postgres                       | All relational data: services, staff, bookings, payments, etc.    |
| Admin auth     | Supabase Auth (email + password)        | Admin sessions only. There are no customer accounts               |
| File storage   | Supabase Storage                        | Gallery images and staff photos                                   |
| Payments       | Paystack                                | Online deposits (card and mobile money)                           |
| SMS            | Local Ghana SMS provider (Arkesel, mNotify, or Hubtel; chosen in the open questions) | Booking confirmation SMS, behind one adapter in `lib/sms` |
| Bot protection | Cloudflare Turnstile (free)             | Challenge on the public booking form                              |
| Hosting        | Vercel                                  | Frontend and server code. Free tier while building. A paid plan is needed once the site serves the client commercially |
| Validation     | Zod                                     | Validate all external input                                       |

There is **no separate backend service**. Server logic lives in Next.js server actions and route handlers.

## System Boundaries

- `app/(public)` — Public pages: home, services, gallery, booking flow, booking confirmation page.
- `app/admin` — Admin area. Every route here requires the admin role, checked on the server.
- `app/api` — Route handlers that must be HTTP endpoints: Paystack webhook and slot-hold cleanup. Everything else prefers server actions.
- `lib` — Shared infrastructure: Supabase clients, auth and role helpers, availability engine, Paystack client, SMS adapter, money and phone utilities.
- `components` — UI composition only. No business logic.
- `supabase/migrations` — SQL migrations. The database schema is defined here, never by hand in the dashboard.
- `context` — Specs and project docs for the AI agent.

## Data Model (Supabase Postgres)

All money is stored as **integer pesewas** (1 GHS = 100 pesewas). All timestamps are `timestamptz`. The studio's timezone is `Africa/Accra`.

| Table                | Purpose and key fields                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `profiles`           | **Admins only.** `id` (matches the Supabase auth user), `full_name`, `role` (`admin`). No customer ever has a profile |
| `customers`          | One row per phone number: `phone` (E.164, unique), `full_name`, `blocked` (bool), `created_at`. Created automatically by bookings and POS sales. Not linked to any login |
| `staff`              | Studio workers: `name`, `photo_path`, `bio`, `active`. A staff member is a record, not a login                       |
| `service_categories` | `name`, `tagline`, `image_path`, `sort_order`, `active`. Drives the home page panels                                  |
| `services`           | `category_id`, `name`, `description`, `image_path`, `price`, `duration_minutes`, `payment_mode` (`deposit` or `pay_at_shop`), `deposit_amount`, `active` |
| `service_staff`      | Which staff can perform which service (many-to-many)                                                                 |
| `staff_hours`        | Weekly working hours per staff member (weekday, start, end)                                                          |
| `staff_time_off`     | Exceptions: days or ranges a staff member is unavailable                                                             |
| `bookings`           | `code` (short human-friendly booking ID), `public_token` (long random string for the private confirmation link), `customer_id`, `customer_name` (as typed for this booking), `service_id`, `staff_id`, `starts_at`, `ends_at`, `status`, `source` (`web` or `pos`), `total_price` (snapshot), `deposit_due` (snapshot), `hold_expires_at`, `checked_in_at`, `sms_status` |
| `payments`           | `booking_id`, `kind` (`deposit`, `balance`, `full`), `method` (`paystack`, `cash`, `momo`, `card`), `amount`, `status`, `reference` (unique), `paid_at` |
| `offers`             | `title`, `description`, `image_path`, `active`, `starts_on`, `ends_on`, optional `service_id`                          |
| `gallery_images`     | `path`, `caption`, `sort_order`, `active`                                                                             |
| `rate_limits`        | Counters used for abuse protection: key (for example phone or IP hash), window, count                                  |

Customers are matched by normalized phone number. When a booking or POS sale arrives, find the `customers` row by phone or create it. The customer's `full_name` is set the first time and is not overwritten by later bookings; each booking keeps its own `customer_name`.

### Booking Status Lifecycle

`pending_payment` → `confirmed` → `checked_in`

- `pending_payment`: slot is held (`hold_expires_at`) while the customer pays a deposit.
- `confirmed`: deposit paid, or the service is pay-at-shop. Slot is locked.
- `checked_in`: admin marked the customer as arrived. Revenue is recognized now.
- `expired`: a hold ran out before payment. Slot is released.
- `cancelled`: admin cancelled. Slot is released.
- `no_show`: admin marked that the customer never came. No revenue.

POS walk-in sales are created directly as `checked_in` with `source = pos`.

### Price Snapshot Rule

When a booking is created, copy the service's `price` and `deposit_amount` onto the booking (`total_price`, `deposit_due`). Later price changes in the admin must never change existing bookings.

## Booking and Availability Model

- Available slots are computed from: the staff member's `staff_hours`, minus `staff_time_off`, minus existing active bookings, using the service `duration_minutes`.
- The database enforces no overlap. `bookings` has an exclusion constraint on (`staff_id`, time range) for active statuses (`pending_payment`, `confirmed`, `checked_in`). Application code checks availability for good UX, but the constraint is the source of truth.
- Deposit flow: create booking as `pending_payment` with a short hold (about 10 minutes) → send customer to Paystack → webhook confirms → booking becomes `confirmed` → confirmation SMS. A cleanup job expires stale holds.
- Pay-at-shop flow: booking is created directly as `confirmed` after the bot challenge and rate-limit checks pass.

## Payments Model (Paystack)

- The server creates the Paystack transaction with a unique reference tied to the booking.
- A booking is confirmed **only** by the verified Paystack webhook (signature checked, then amount and reference matched against the booking). Never trust the browser redirect or client-supplied status.
- The webhook must be idempotent: receiving the same event twice must not double-record a payment.
- Paystack secret key lives only in server environment variables.

## Access Model (No Customer Accounts)

- **Customers never log in.** Booking is a public server action that takes a name and phone number, protected by a bot challenge and rate limits. It runs on the server with the service-role client; the browser never reads the `bookings` or `customers` tables.
- **Confirmation page**: `/booking/[token]` uses the booking's long random `public_token`. Possessing the link is the permission to view that one booking. The short booking `code` is for the front desk and SMS; it is **not** enough to open the confirmation page.
- **Admin** signs in with Supabase Auth email + password. Public sign-ups are **disabled** in Supabase. An admin is an auth user whose `profiles.role = 'admin'`. The first admin is created in the Supabase dashboard and given a profile row by SQL.
- Admin routes and admin server actions verify the admin role on the server every time. Hiding a button in the UI is never access control.
- Phone numbers are normalized to E.164 (`+233...`) everywhere before storage or comparison.

### Known Trade-off: Phone Numbers Are Not Verified

Without OTP, nobody proves they own the phone number they typed. Consequences and mitigations:

- A confirmation SMS could go to the wrong person. Accepted. The booking ID can also be given by name and phone at the desk.
- Spam or fake bookings could fill slots. Mitigated by: Turnstile challenge, per-phone and per-IP rate limits, a maximum of 2 upcoming bookings per phone number (default), required deposits for services that need one (a real payment is proof of intent), a short hold on unpaid deposit bookings, and an admin phone blocklist.
- Admin can see and cancel any booking and mark no-shows.

## Row Level Security

- RLS is enabled on every table.
- Public (anon) can read only: active service categories, active services, active staff, active offers, active gallery images, and the staff hours needed for availability. Anon cannot read `bookings`, `payments`, `customers`, `profiles`, or `rate_limits`.
- All booking and customer reads and writes happen server-side. Public booking actions use the service-role client inside server-only modules after validation, challenge, and rate-limit checks.
- Admin pages use server code that verifies the admin role first.
- The Supabase service-role key is server-only and never imported into client components.

## Storage

- Buckets: `gallery` and `staff` (public read, admin-only write).
- Images are resized and compressed at upload time. Mobile users on slow data must not download full-size camera photos.
- The database stores the storage path, not a full URL.

## Receipts

- Receipts are an HTML page styled for printing (narrow thermal width, with a normal A4 fallback), opened from a booking or POS sale and printed with the browser's print dialog.
- A receipt is generated from stored data (booking, payments, customer), never from client-side state.

## Finance Model

- **Revenue is recognized at check-in**, not at booking and not when a deposit is paid.
- For a web booking, when admin checks in: the booking's `total_price` counts as revenue on the `checked_in_at` date. Any balance collected at the shop is recorded as a `payments` row of kind `balance`.
- For a POS sale: it is created already checked in; revenue is its `total_price`.
- Day, week, and month totals are computed from checked-in bookings grouped by `checked_in_at` in `Africa/Accra` time.
- Cancelled, expired, and no-show bookings never count.

## Invariants

1. No two active bookings overlap for the same staff member. The database enforces this.
2. Money is stored as integer pesewas. No floating-point money anywhere.
3. A booking is confirmed by a verified Paystack webhook only, never by the client.
4. Revenue counts only when a booking is `checked_in` (or is a POS sale). Nothing else changes finance totals.
5. The admin role is verified on the server at every admin read and mutation. Public booking actions are protected by the bot challenge and rate limits, and never trust client-supplied prices, status, or IDs.
6. Existing bookings never change when a service's price, deposit, or duration changes (price snapshot).
7. Secrets (service-role key, Paystack secret, SMS provider key, Turnstile secret) never reach the browser.
8. Phone numbers are stored in one normalized format.
9. Request handlers stay short. Heavy or scheduled work is isolated in its own module or endpoint.
10. SMS is sent only through the adapter in `lib/sms`, so the provider can change without touching feature code.
11. No customer account, password, or OTP exists anywhere in the system.
12. The confirmation page is reachable only through the booking's long random token.
