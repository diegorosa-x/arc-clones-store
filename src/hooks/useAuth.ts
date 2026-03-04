import { useState, useEffect } from "react";
import { supabase } from "../lib/ClonesDatabase/client";
import type { User } from "@supabase/supabase-js"; // Importação como tipo para evitar erros de bundle

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Tipagem explícita para aceitar User ou null

  useEffect(() => {
    // Função interna para buscar a sessão inicial
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Erro ao carregar sessão:", error);
      }
    };

    // Adicionamos o .catch() na chamada para resolver o aviso "Promises must be awaited"
    getInitialSession().catch((err) =>
      console.error("Erro na inicialização:", err),
    );

    // Escuta mudanças (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  const logout = () => supabase.auth.signOut();

  return { user, login, logout };
};
