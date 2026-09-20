alter table listings add column if not exists email text;
alter table listings add column if not exists contact text;
alter table listings add column if not exists subject text;
alter table listings add column if not exists audience text;
alter table listings add column if not exists outline text;
alter table listings add column if not exists status text not null default 'on_hold';

update listings
set status = 'live'
where id in ('mgt-crash', 'polc-pack', 'ai-ethics');
