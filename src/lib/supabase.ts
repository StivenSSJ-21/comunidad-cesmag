import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Misma Project URL y misma clave pública (anon/publishable) de la Parte 2.
// Usa SIEMPRE la clave pública, nunca service_role.
const supabaseUrl = "https://exggibyjejebigpfswdn.supabase.co";
const supabaseAnonKey = "sb_publishable_HigVV36wao2j8CchwC-TTg_G-sfecBI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
