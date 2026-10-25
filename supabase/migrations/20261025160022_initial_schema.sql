create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

create type public.payment_mode as enum ('deposit', 'pay_at_shop');
create type public.booking_status as enum (
  'pending_payment', 'confirmed', 'checked_in', 'expired', 'cancelled', 'no_show'
);
create type public.booking_source as enum ('web', 'pos');
create type public.payment_kind as enum ('deposit', 'balance', 'full');
create type public.payment_method as enum ('paystack', 'cash', 'momo', 'card');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.profile_role as enum ('admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (length(trim(full_name)) > 0),
  role public.profile_role not null default 'admin',
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  full_name text not null check (length(trim(full_name)) > 0),
  blocked boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  photo_path text,
  bio text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  tagline text,
  image_path text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.service_categories(id) on delete restrict,
  name text not null,
  description text,
  image_path text,
  price integer not null check (price >= 0),
  duration_minutes integer not null check (duration_minutes > 0),
  payment_mode public.payment_mode not null default 'pay_at_shop',
  deposit_amount integer not null default 0 check (deposit_amount >= 0 and deposit_amount <= price),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (category_id, name)
);

create table public.service_staff (
  service_id uuid not null references public.services(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  primary key (service_id, staff_id)
);

create table public.staff_hours (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  starts_at time not null,
  ends_at time not null,
  check (starts_at < ends_at),
  unique (staff_id, weekday, starts_at, ends_at)
);

create table public.staff_time_off (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  check (starts_at < ends_at)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  public_token text not null unique,
  customer_id uuid not null references public.customers(id) on delete restrict,
  customer_name text not null check (length(trim(customer_name)) > 0),
  service_id uuid not null references public.services(id) on delete restrict,
  staff_id uuid not null references public.staff(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.booking_status not null default 'pending_payment',
  source public.booking_source not null default 'web',
  total_price integer not null check (total_price >= 0),
  deposit_due integer not null default 0 check (deposit_due >= 0 and deposit_due <= total_price),
  hold_expires_at timestamptz,
  checked_in_at timestamptz,
  sms_status text not null default 'not_sent' check (sms_status in ('not_sent', 'pending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  check (starts_at < ends_at)
);

alter table public.bookings
  add constraint bookings_no_active_overlap
  exclude using gist (
    staff_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (status in ('pending_payment', 'confirmed', 'checked_in'));

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  kind public.payment_kind not null,
  method public.payment_method not null,
  amount integer not null check (amount > 0),
  status public.payment_status not null default 'pending',
  reference text not null unique,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_path text,
  active boolean not null default true,
  starts_on date,
  ends_on date,
  service_id uuid references public.services(id) on delete set null,
  created_at timestamptz not null default now(),
  check (starts_on is null or ends_on is null or starts_on <= ends_on)
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  caption text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  window_started_at timestamptz not null,
  count integer not null default 0 check (count >= 0),
  unique (key, window_started_at)
);

create index services_category_idx on public.services(category_id);
create index service_staff_staff_idx on public.service_staff(staff_id);
create index staff_hours_staff_weekday_idx on public.staff_hours(staff_id, weekday);
create index bookings_customer_idx on public.bookings(customer_id);
create index bookings_staff_starts_idx on public.bookings(staff_id, starts_at);
create index bookings_public_token_idx on public.bookings(public_token);
create index payments_booking_idx on public.payments(booking_id);

create or replace function public.generate_booking_identifiers()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  candidate text;
begin
  if new.public_token is null or new.public_token = '' then
    new.public_token := encode(gen_random_bytes(32), 'hex');
  end if;
  if new.code is null or new.code = '' then
    loop
      candidate := 'BLS-' ||
        substr(alphabet, 1 + floor(random() * length(alphabet))::integer, 1) ||
        substr(alphabet, 1 + floor(random() * length(alphabet))::integer, 1) ||
        substr(alphabet, 1 + floor(random() * length(alphabet))::integer, 1) ||
        substr(alphabet, 1 + floor(random() * length(alphabet))::integer, 1);
      exit when not exists (select 1 from public.bookings where code = candidate);
    end loop;
    new.code := candidate;
  end if;
  return new;
end;
$$;

create trigger bookings_generate_identifiers
before insert on public.bookings
for each row execute function public.generate_booking_identifiers();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.staff enable row level security;
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.service_staff enable row level security;
alter table public.staff_hours enable row level security;
alter table public.staff_time_off enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.offers enable row level security;
alter table public.gallery_images enable row level security;
alter table public.rate_limits enable row level security;

create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage customers" on public.customers for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active staff" on public.staff for select to anon, authenticated using (active);
create policy "Admins manage staff" on public.staff for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active categories" on public.service_categories for select to anon, authenticated using (active);
create policy "Admins manage categories" on public.service_categories for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active services" on public.services for select to anon, authenticated using (active);
create policy "Admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads service assignments" on public.service_staff for select to anon, authenticated using (
  exists (select 1 from public.services s where s.id = service_id and s.active)
);
create policy "Admins manage service assignments" on public.service_staff for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active staff hours" on public.staff_hours for select to anon, authenticated using (
  exists (select 1 from public.staff s where s.id = staff_id and s.active)
);
create policy "Admins manage staff hours" on public.staff_hours for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage staff time off" on public.staff_time_off for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage bookings" on public.bookings for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage payments" on public.payments for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active offers" on public.offers for select to anon, authenticated using (active);
create policy "Admins manage offers" on public.offers for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active gallery" on public.gallery_images for select to anon, authenticated using (active);
create policy "Admins manage gallery" on public.gallery_images for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage rate limits" on public.rate_limits for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true), ('staff', 'staff', true), ('catalog', 'catalog', true)
on conflict (id) do update set public = excluded.public;

create policy "Public reads image objects" on storage.objects for select
to anon, authenticated using (bucket_id in ('gallery', 'staff', 'catalog'));
create policy "Admins insert image objects" on storage.objects for insert
to authenticated with check (bucket_id in ('gallery', 'staff', 'catalog') and public.is_admin());
create policy "Admins update image objects" on storage.objects for update
to authenticated using (bucket_id in ('gallery', 'staff', 'catalog') and public.is_admin())
with check (bucket_id in ('gallery', 'staff', 'catalog') and public.is_admin());
create policy "Admins delete image objects" on storage.objects for delete
to authenticated using (bucket_id in ('gallery', 'staff', 'catalog') and public.is_admin());