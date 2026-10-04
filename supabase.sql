-- Paste this whole file into Supabase > SQL Editor > New query, then Run.

-- One row per started attempt (so you can see who opened it and never finished)
create table if not exists public.attempts (
  id bigint generated always as identity primary key,
  edition text not null,
  email text not null,
  name text,
  started_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- One row per completed submission
create table if not exists public.responses (
  id bigint generated always as identity primary key,
  edition text not null,
  email text not null,
  name text,
  started_at timestamptz,
  finished_at timestamptz,
  answers jsonb not null,
  section_times jsonb,
  option_order jsonb,
  incidents jsonb,
  user_agent text,
  created_at timestamptz not null default now(),
  unique (edition, email)        -- one submission per person per edition
);

-- Answer keys live here, never in the public page.
-- Values are 0-based option indexes in the ORIGINAL order from config.js.
create table if not exists public.answer_keys (
  edition text primary key,
  key jsonb not null
);

insert into public.answer_keys (edition, key) values
  ('2026-10', '{"q1":1,"q2":0,"q3":2,"q4":0,"q5":1,"q6":0,"q7":0,"q8":0}')
on conflict (edition) do update set key = excluded.key;

-- Lock everything down: the public page can only INSERT, never read.
alter table public.attempts    enable row level security;
alter table public.responses   enable row level security;
alter table public.answer_keys enable row level security;

drop policy if exists "public can start"  on public.attempts;
drop policy if exists "public can submit" on public.responses;

create policy "public can start"  on public.attempts  for insert to anon with check (true);
create policy "public can submit" on public.responses for insert to anon with check (true);
-- No select/update/delete policies for anon on any table.
-- No policies at all on answer_keys: only the service role (admin page) can read it.
