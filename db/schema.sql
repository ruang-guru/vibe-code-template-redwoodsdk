create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

alter table users
  add column if not exists password_hash text;

alter table users
  alter column password_hash set not null;

create table if not exists drills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  drill_id uuid not null references drills(id) on delete cascade,
  score integer not null default 0,
  accuracy numeric(5, 2) not null check (accuracy >= 0 and accuracy <= 100),
  reaction_time_ms integer not null check (reaction_time_ms >= 0),
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null check (correct_answers >= 0 and correct_answers <= total_questions),
  created_at timestamptz not null default now()
);

create index if not exists attempts_user_created_at_idx
  on attempts (user_id, created_at desc);

create index if not exists attempts_drill_created_at_idx
  on attempts (drill_id, created_at desc);

insert into drills (name, category, description)
values
  ('Sequence Memory', 'memory', 'Remember and repeat a growing sequence'),
  ('Focus Tap', 'focus', 'React quickly to the correct target'),
  ('Pattern Match', 'pattern_recognition', 'Identify the missing pattern'),
  ('Quick Math', 'mental_math', 'Solve arithmetic under time pressure'),
  ('Logic Check', 'logic', 'Answer simple reasoning puzzles')
on conflict (name) do update
set
  category = excluded.category,
  description = excluded.description;
