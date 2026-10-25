create table if not exists public.vyqor_user_data (
  user_id uuid not null references auth.users (id) on delete cascade,
  data_key text not null check (
    data_key in (
      'eliteengine_user_v4',
      'eliteengine_exercises_v4',
      'eliteengine_splits_v5',
      'eliteengine_sessions_v4',
      'eliteengine_active_session_v4',
      'eliteengine_meals_v4',
      'eliteengine_saved_meals_v4',
      'eliteengine_nutrition_goals_v4',
      'eliteengine_body_weights_v4'
    )
  ),
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, data_key)
);

alter table public.vyqor_user_data enable row level security;

drop policy if exists "Users manage their own VYQOR data" on public.vyqor_user_data;
create policy "Users manage their own VYQOR data"
  on public.vyqor_user_data
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.vyqor_user_data to authenticated;
