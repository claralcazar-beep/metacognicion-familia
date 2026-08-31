"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, configured } from "@/lib/supabase";
import { getProfile } from "@/lib/session";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!configured) return router.replace("/login");
      const { data } = await supabase.auth.getSession();
      if (!data.session) return router.replace("/login");
      const p = getProfile();
      router.replace(p && p.family_id === data.session.user.id ? "/camino" : "/perfiles");
    })();
  }, [router]);
  return <div className="min-h-screen flex items-center justify-center text-gris">Abriendo…</div>;
}
