import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

type AuthContextType = {
  session: Session | null;
  cargando: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  cargando: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Al abrir la app: ¿hay una sesión guardada en el dispositivo?
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });

    // Escucha cambios: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED...
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nuevaSession) => {
      setSession(nuevaSession);
      setCargando(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
