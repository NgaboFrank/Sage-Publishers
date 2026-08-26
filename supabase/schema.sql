create extension if not exists pgcrypto;

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text not null default 'Sage Administrator',
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  description text,
  price numeric(12,2) not null default 0,
  currency text not null default 'RWF',
  cover_url text,
  gallery_urls jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text unique not null,
  value text not null default '',
  image_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid references public.customers(id) on delete set null,
  book_id uuid references public.books(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  amount numeric(12,2) not null,
  currency text not null default 'RWF',
  payment_status text not null default 'PENDING',
  order_status text not null default 'NEW',
  pesapal_tracking_id text,
  merchant_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'UNREAD',
  created_at timestamptz not null default now()
);

create index if not exists orders_payment_status_idx on public.orders(payment_status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists messages_created_at_idx on public.contact_messages(created_at desc);

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

-- The application uses the server-side Supabase service role for admin operations.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in browser code.

-- Security: all application tables are protected by Row Level Security.
-- The Sage Publishers Next.js server routes use the service-role key, which bypasses
-- RLS for trusted server-side operations. No public/anon policies are granted here,
-- so direct REST/API access with the public anon key cannot read or modify these tables.
alter table public.admins enable row level security;
alter table public.books enable row level security;
alter table public.site_content enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.contact_messages enable row level security;
