-- SAMPLE DATA ONLY: replace these records and image paths before production launch.
insert into public.staff (id, name, photo_path, bio)
values
  ('00000000-0000-0000-0000-000000000101', 'Ama Mensah', 'staff/ama-mensah.jpg', 'Senior stylist and braider.'),
  ('00000000-0000-0000-0000-000000000102', 'Esi Owusu', 'staff/esi-owusu.jpg', 'Nail artist and beauty specialist.')
on conflict (id) do nothing;

insert into public.service_categories (id, name, tagline, image_path, sort_order)
values
  ('00000000-0000-0000-0000-000000000201', 'Hair', 'Signature cuts and styling', 'catalog/hair.jpg', 1),
  ('00000000-0000-0000-0000-000000000202', 'Braiding', 'Protective styles, finished beautifully', 'catalog/braiding.jpg', 2),
  ('00000000-0000-0000-0000-000000000203', 'Nails', 'Clean, considered nail care', 'catalog/nails.jpg', 3)
on conflict (id) do nothing;

insert into public.services (id, category_id, name, description, price, duration_minutes, payment_mode, deposit_amount)
values
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 'Classic Cut', 'A tailored cut and finish.', 12000, 45, 'pay_at_shop', 0),
  ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000201', 'Silk Press', 'Smooth, polished styling.', 25000, 90, 'deposit', 10000),
  ('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000202', 'Knotless Braids', 'Protective knotless braids.', 65000, 240, 'deposit', 20000),
  ('00000000-0000-0000-0000-000000000304', '00000000-0000-0000-0000-000000000203', 'Gel Manicure', 'Long-wearing gel manicure.', 18000, 60, 'pay_at_shop', 0),
  ('00000000-0000-0000-0000-000000000305', '00000000-0000-0000-0000-000000000203', 'Builder Gel Set', 'Structured builder gel set.', 30000, 90, 'deposit', 10000)
on conflict (id) do nothing;

insert into public.service_staff (service_id, staff_id)
select v.service_id, v.staff_id
from (values
  ('00000000-0000-0000-0000-000000000301'::uuid, '00000000-0000-0000-0000-000000000101'::uuid),
  ('00000000-0000-0000-0000-000000000302'::uuid, '00000000-0000-0000-0000-000000000101'::uuid),
  ('00000000-0000-0000-0000-000000000303'::uuid, '00000000-0000-0000-0000-000000000101'::uuid),
  ('00000000-0000-0000-0000-000000000304'::uuid, '00000000-0000-0000-0000-000000000102'::uuid),
  ('00000000-0000-0000-0000-000000000305'::uuid, '00000000-0000-0000-0000-000000000102'::uuid)
) as v(service_id, staff_id)
on conflict do nothing;

insert into public.staff_hours (staff_id, weekday, starts_at, ends_at)
select staff_id, weekday, starts_at, ends_at
from (values
  ('00000000-0000-0000-0000-000000000101'::uuid, 1::smallint, '09:00'::time, '18:00'::time),
  ('00000000-0000-0000-0000-000000000101'::uuid, 2::smallint, '09:00'::time, '18:00'::time),
  ('00000000-0000-0000-0000-000000000101'::uuid, 3::smallint, '09:00'::time, '18:00'::time),
  ('00000000-0000-0000-0000-000000000102'::uuid, 2::smallint, '10:00'::time, '19:00'::time),
  ('00000000-0000-0000-0000-000000000102'::uuid, 3::smallint, '10:00'::time, '19:00'::time)
) as v(staff_id, weekday, starts_at, ends_at)
where not exists (
  select 1 from public.staff_hours h
  where h.staff_id = v.staff_id and h.weekday = v.weekday
    and h.starts_at = v.starts_at and h.ends_at = v.ends_at
);

insert into public.offers (title, description, image_path, starts_on, ends_on)
select title, description, image_path, starts_on, ends_on
from (values
  ('First Visit', '10% off your first studio visit.', 'catalog/first-visit.jpg', current_date, current_date + 90),
  ('Midweek Reset', 'A considered midweek beauty reset.', 'catalog/midweek-reset.jpg', current_date, current_date + 60)
) as v(title, description, image_path, starts_on, ends_on)
where not exists (
  select 1 from public.offers existing where existing.title = v.title
);

insert into public.gallery_images (path, caption, sort_order)
values
  ('gallery/sample-01.jpg', 'Signature finish', 1),
  ('gallery/sample-02.jpg', 'Protective styling', 2),
  ('gallery/sample-03.jpg', 'Studio details', 3)
on conflict (path) do nothing;
