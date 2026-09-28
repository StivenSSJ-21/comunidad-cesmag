-- Supabase > SQL Editor > New query > pegar todo > Run

-- PARTE 1: tabla del laboratorio
create table public.ideas_cesmag (
  id bigint generated always as identity primary key,
  nombre text not null,
  correo text not null,
  telefono text not null,
  programa text not null,
  idea text not null,
  created_at timestamptz default now()
);

-- PARTE 2: RLS (en la práctica se permite INSERT y SELECT al rol anon)
alter table public.ideas_cesmag enable row level security;

create policy "permitir insertar ideas"
  on public.ideas_cesmag for insert to anon with check (true);

create policy "permitir consultar ideas"
  on public.ideas_cesmag for select to anon using (true);

-- PARTE 3: ACTIVIDAD FINAL - columna nueva
alter table public.ideas_cesmag
  add column categoria text not null default 'Sin categoría';
