

create table IF NOT EXISTS "public"."student" (
    student_id uuid  not null default gen_random_uuid(),
    first_name text not null,
    last_name text not null,
    middle_name text null,
    guardian_name text not null,
    physically_challenged boolean not null default false,
    gender text not null,
    occupation text not null,
    category text not null,
    nationality text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint student_pkey primary key (student_id)
  );

create trigger handle_updated_at before
update on student for each row
execute function moddatetime ('updated_at');