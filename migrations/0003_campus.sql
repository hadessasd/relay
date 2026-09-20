create table if not exists access_keys (
  code text primary key,
  uni_id text not null,
  created_at timestamptz not null default now(),
  use_count integer not null default 0
);
create index if not exists access_keys_uni_idx on access_keys (uni_id);

create table if not exists listings (
  id text primary key,
  teacher_name text not null,
  title text not null,
  summary text not null,
  price_aed integer not null,
  created_at timestamptz not null default now()
);

create table if not exists sales (
  id serial primary key,
  listing_id text not null references listings (id),
  buyer_name text not null,
  amount_aed integer not null,
  commission_aed integer not null,
  created_at timestamptz not null default now()
);
create index if not exists sales_listing_idx on sales (listing_id);

alter table students add column if not exists uni_id text;

insert into listings (id, teacher_name, title, summary, price_aed)
values
  (
    'mgt-crash',
    'Ms. Al Shamsi',
    'MGT 1003 Week 5 crash notes',
    'POLC, profit, SWOT and controlling in short pages a student can revise the night before. Includes worked AED examples.',
    49
  ),
  (
    'polc-pack',
    'Mr. Khan',
    'POLC flash pack',
    'Planning, organizing, leading and controlling as a cycle, with café examples from campus life.',
    29
  ),
  (
    'ai-ethics',
    'Dr. Rahman',
    'Foundations of AI · ethics drills',
    'Traffic-light risk, human-check gates and department mapping. Built for Assessment 1.',
    39
  )
on conflict (id) do nothing;
