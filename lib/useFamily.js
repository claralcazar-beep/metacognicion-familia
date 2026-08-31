"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, configured } from "./supabase";
import { getProfile } from "./session";

// Garantiza sesión de familia (Supabase) y perfil activo (localStorage).
// needProfile=false para /perfiles.
export function useFamily({ needProfile = true, parentOnly = false } = {}) {
  const router = useRouter();
  const [state, setState] = useState({ user: null, profile: null, ready: false });

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!configured) {
        router.replace("/login");
        return;
      }
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user || null;
      if (!user) {
        router.replace("/login");
        return;
      }
      const profile = getProfile();
      if (needProfile && (!profile || profile.family_id !== user.id)) {
        router.replace("/perfiles");
        return;
      }
      if (parentOnly && profile?.role !== "parent") {
        router.replace("/camino");
        return;
      }
      if (alive) setState({ user, profile, ready: true });
    })();
    return () => {
      alive = false;
    };
  }, [router, needProfile, parentOnly]);

  return state;
}
