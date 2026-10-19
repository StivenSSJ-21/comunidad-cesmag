-- Supabase > SQL Editor > New query > pegar todo > Run
--
-- Parte 3 (Auth): cuando el usuario inicia sesión, sus peticiones dejan de
-- llegar con el rol "anon" y pasan a llegar con el rol "authenticated".
-- Las políticas de la Parte 2 eran solo para "anon", así que sin estas
-- dos políticas, publicar y consultar ideas fallaría con
-- "new row violates row-level security policy".

create policy "usuarios autenticados insertan ideas"
  on public.ideas_cesmag for insert to authenticated with check (true);

create policy "usuarios autenticados consultan ideas"
  on public.ideas_cesmag for select to authenticated using (true);

-- Las políticas para "anon" se dejan como estaban. Se endurecerán en el
-- siguiente laboratorio (relacionar cada idea con el UID del usuario y
-- aplicar RLS por usuario).
