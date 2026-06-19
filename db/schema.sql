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
