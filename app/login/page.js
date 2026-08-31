"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, configured } from "@/lib/supabase";
import { Primary } from "@/components/ui";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const enter = async () => {
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setBusy(false);
    if (error) return setErr("Correo o contraseña incorrectos.");
    router.replace("/perfiles");
  };

  return (
    <main className="max-w-md mx-auto min-h-screen px-6 flex flex-col justify-center">
      <div className="text-4xl mb-3">🧠</div>
      <h1 className="text-3xl font-extrabold leading-tight">Metacognición en familia</h1>
      <p className="text-gris mt-1 mb-8">Entra con la cuenta de la familia. Después cada uno elige su perfil.</p>

      {!configured && (
        <div className="rounded-2xl bg-rosaSuave text-rosa px-4 py-3 text-sm mb-4">
          Faltan las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel. Revisa el README.
        </div>
      )}

      <label className="text-sm font-semibold">Correo</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        autoComplete="email"
        className="w-full border-2 border-linea rounded-xl px-3 py-3 mb-3 text-base"
      />
      <label className="text-sm font-semibold">Contraseña</label>
      <input
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && enter()}
        type="password"
        autoComplete="current-password"
        className="w-full border-2 border-linea rounded-xl px-3 py-3 mb-4 text-base"
      />
      {err && <div className="text-rosa text-sm mb-3">{err}</div>}
      <Primary onClick={enter} disabled={busy || !email || !pass}>
        {busy ? "Entrando…" : "Entrar"}
      </Primary>
    </main>
  );
}
