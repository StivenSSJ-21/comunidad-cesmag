import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// Reemplaza estos dos valores por los de tu proyecto
// (Supabase > Project Settings > API).
// Usa SIEMPRE la clave pública anon/publishable, nunca service_role.
const supabaseUrl = "https://exggibyjejebigpfswdn.supabase.co";
const supabaseAnonKey = "sb_publishable_HigVV36wao2j8CchwC-TTg_G-sfecBI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
