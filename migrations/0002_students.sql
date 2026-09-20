create table if not exists students (
  name text primary key,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists quiz_results (
  student_name text not null references students (name) on delete cascade,
  course_id text not null,
  topic_id text not null,
  mcq_score integer not null,
  mcq_total integer not null,
  writing_count integer not null default 0,
  answers_json text not null default '{}',
  submitted_at timestamptz not null default now(),
  primary key (student_name, course_id, topic_id)
);

create index if not exists quiz_results_student_idx on quiz_results (student_name);
create index if not exists students_last_seen_idx on students (last_seen desc);
