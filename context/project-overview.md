# Bestman Luxe Studio

## Overview

Bestman Luxe Studio is a single-branch beauty and grooming studio in Ghana. This project is its website: a mobile-first public site where visitors browse services and the gallery and book appointments online, plus an admin system the owner uses to run the studio day to day.

This is a real client project. Treat quality, correctness (especially money and bookings), and simplicity as more important than feature count.

Services include haircuts, wigs, makeup, massage, nails, tattoos, waxing, facials, pedicures, and braiding. The services list is managed in the admin, not hardcoded.

## Audience

- Most visitors use **mobile phones**, often on modest devices and variable data. Design and test mobile first.
- **There are no customer accounts.** A customer books with just a name and a phone number, and the confirmation arrives by SMS. No login, no password, no OTP, no email.

## Goals

1. Make it fast for a visitor to **book, call, or find the studio**, with the Book button always visible.
2. Show the studio's work through a strong **gallery** with a premium, photo-led feel (see `ui-context.md`).
3. Let anyone book a service with a chosen staff member and time slot, and pay a deposit online when the service requires one.
4. Give the owner one admin system to manage services, staff, gallery, offers, schedules, bookings, walk-in sales (POS), receipts, and finances.
5. Keep reliable records: no double bookings, no lost payments, and no revenue counted before the customer actually shows up.

## Roles

- **Visitor / customer**: browses and books without logging in.
- **Admin**: the owner (and anyone the owner authorizes). Logs in with email and password. Full access to the admin area. Admin accounts are created by the developer, never by public sign-up.

## Customer Story

1. Visitor lands on the home page and can immediately tap **Book**, **Call**, or **Get directions**. The Book button is always visible at the top.
2. Visitor browses services, offers, About, and the gallery on one page.
3. Visitor taps **Book** and lands on `/book`.
4. They pick a **service**, then a **staff member** (from the staff assigned to that service), then a **date and time slot**.
5. They enter their **name and phone number**. No account is created.
6. If the service requires a **deposit**, they pay it with Paystack. If the service is **pay at shop**, no online payment happens.
7. The booking is confirmed. They see a confirmation page and receive a **confirmation SMS** with their **booking ID**.
8. On the day, they go to the studio and give the booking ID (or their name and phone) to the admin.

## Admin Story

1. Admin logs in.
2. Admin manages the **gallery** (add and remove pictures).
3. Admin manages **staff** (add workers) and sees each staff member's **schedule**.
4. Admin manages **service categories and services**. For each service the admin sets: the price, the duration, which staff can do it, and the **payment mode**: either **deposit required online** (with the deposit amount) or **pay at the shop**.
5. Admin manages **offers** (promotions shown on the site).
6. When a customer arrives with a booking ID, admin looks the booking up and **checks the customer in**. Only now does the booking's money count toward finances.
7. For customers who did not book online, admin uses the **POS** to create a manual booking: customer name, phone number, service, amount, and payment. The system saves the customer by phone number so returning customers are recognized, and admin **prints a receipt**.
8. Admin views the **finance dashboard**: revenue today, this week, and this month, based only on checked-in bookings and POS sales.
9. Admin can **block a phone number** that is abusing the booking form.

## Customer Records

The studio keeps a simple customer record per phone number (name, phone, visit history) created automatically from bookings and POS sales. It is for the studio's own records and for recognizing returning customers. Customers never log in to see it.

## Features (Version 1)

### Public Site
- Single-page home: hero, service category panels, offers, About, gallery mosaic, location and contact, footer
- `/services` and `/gallery` pages
- Mobile-first layout, with Book always visible

### Booking (no accounts)
- Service, staff, and time slot selection
- Name and phone number entry
- Slot hold while a deposit payment is in progress
- Paystack deposit payment for deposit-required services
- Confirmation page (private link) and confirmation SMS with a human-friendly booking ID
- Abuse protection: bot challenge, per-phone limits, admin phone blocklist

### Admin
- Email and password login
- Service categories, services, staff, gallery, and offers management
- Staff schedules (working hours, time off, and a view of each staff member's bookings)
- Booking lookup and check-in by booking ID
- POS for manual bookings and walk-ins, with printable receipt
- Customer records keyed by phone number
- Finance dashboard (day, week, month)

## Scope

### In Scope
- Everything listed under Features (Version 1)
- Single studio branch, in-studio service only
- Currency: Ghana cedis (GHS)

### Out Of Scope (Version 1)
- Customer accounts, passwords, OTP login, and "My bookings" pages
- Online shop or product sales
- Rescheduling or customer self-cancellation (customers call the studio; admin can cancel)
- WhatsApp notifications (a "Chat on WhatsApp" link is allowed; automated messages are not)
- Mobile van and home service delivery modes
- Native mobile apps
- Refund automation (refunds are handled manually in the Paystack dashboard)
- Multiple branches
- Reminder SMS (a later phase)

## Success Criteria

1. A visitor on a phone sees Book, Call, and Directions without scrolling, and Book stays reachable at all times.
2. A customer can complete a booking with only a name and phone number, including a deposit payment, and receives the confirmation SMS.
3. Two customers can never hold the same staff member at overlapping times.
4. Admin can add a service with category, staff, price, duration, and payment mode, and it appears correctly on the public site and booking flow.
5. Admin can check in a booking by ID, and finance totals change only at that moment.
6. Admin can create a POS sale, print a receipt, and the customer is recognized by phone number next time.
7. The public site matches the look and feel in `ui-context.md` and the reference screenshots.
