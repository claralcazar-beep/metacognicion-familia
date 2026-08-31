"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useFamily } from "@/lib/useFamily";
import { setProfile, clearProfile, hashPin } from "@/lib/session";
import { Primary, Avatar, Loading } from "@/components/ui";

const AVATARS = ["🦊", "🐯", "🦁", "🐼", "🦄", "🐬", "🦉", "🐸", "👩‍⚕️", "🧑‍🚀", "🌟", "🚀"];

export default function Perfiles() {
  const router = useRouter();
  const { user, ready } = useFamily({ needProfile: false });
  const [profiles, setProfiles] = useState(null);
  const [picked, setPicked] = useState(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!ready) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("family_id", user.id)
      .order("created_at")
      .then(({ data }) => setProfiles(data || []));
  }, [ready, user]);

  const tryPin = async (value) => {
    setPin(value);
    if (value.length < 4) return;
    const h = await hashPin(value);
    if (h === picked.pin_hash) {
      setProfile({ id: picked.id, name: picked.name, avatar: picked.avatar, role: picked.role, family_id: user.id });
      router.replace("/camino");
    } else {
      setErr("PIN incorrecto");
      setPin("");
    }
  };

  const logout = async () => {
    clearProfile();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (!ready || profiles === null) return <Loading />;

  if (profiles.length === 0) return <Setup user={user} onDone={(list) => setProfiles(list)} />;

  if (picked)
    return (
      <main className="max-w-md mx-auto min-h-screen px-6 flex flex-col items-center justify-center text-center">
        <Avatar emoji={picked.avatar} size="text-5xl" className="w-24 h-24 mb-3" />
        <div className="text-2xl font-extrabold mb-1">{picked.name}</div>
        <div className="text-gris mb-6">Escribe tu PIN de 4 números</div>
        <input
          autoFocus
          value={pin}
          onChange={(e) => tryPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
          type="password"
          className="text-center text-3xl tracking-[0.6em] border-2 border-linea rounded-2xl px-4 py-3 w-48"
        />
        {err && <div className="text-rosa text-sm mt-3">{err}</div>}
        <button onClick={() => { setPicked(null); setPin(""); setErr(""); }} className="mt-8 text-gris font-semibold">
          Elegir otro perfil
        </button>
      </main>
    );

  return (
    <main className="max-w-md mx-auto min-h-screen px-6 pt-16">
      <h1 className="text-2xl font-extrabold text-center mb-8">¿Quién eres?</h1>
      <div className="grid grid-cols-2 gap-5">
        {profiles.map((p) => (
          <button key={p.id} onClick={() => setPicked(p)} className="flex flex-col items-center gap-2 active:scale-95 transition anim-pop" style={{ animationDelay: `${profiles.indexOf(p) * 0.1}s` }}>
            <Avatar emoji={p.avatar} size="text-5xl" className={`w-28 h-28 shadow-md ${p.role === "parent" ? "bg-cielo" : "bg-lilaSuave"}`} />
            <span className="font-bold">{p.name}</span>
          </button>
        ))}
      </div>
      <button onClick={logout} className="mt-14 mx-auto flex items-center gap-2 text-sm text-gris font-semibold">
        <LogOut size={16} /> Salir de la cuenta familiar
      </button>
    </main>
  );
}

// Primera vez: crear los perfiles de la familia
function Setup({ user, onDone }) {
  const [rows, setRows] = useState([
    { name: "Mamá", avatar: "👩‍⚕️", role: "parent", pin: "" },
    { name: "Juan Alejandro", avatar: "🦊", role: "child", pin: "" },
    { name: "Juan Ángel", avatar: "🐯", role: "child", pin: "" },
  ]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const set = (i, k, v) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const valid = rows.length > 0 && rows.every((r) => r.name.trim() && /^\d{4}$/.test(r.pin)) && rows.some((r) => r.role === "parent");

  const save = async () => {
    setBusy(true);
    setErr("");
    const payload = [];
    for (const r of rows) payload.push({ family_id: user.id, name: r.name.trim(), avatar: r.avatar, role: r.role, pin_hash: await hashPin(r.pin) });
    const { data, error } = await supabase.from("profiles").insert(payload).select();
    setBusy(false);
    if (error) return setErr("No se pudieron crear los perfiles. Revisa que la tabla exista en Supabase.");
    onDone(data);
  };

  return (
    <main className="max-w-md mx-auto min-h-screen px-6 pt-10 pb-10">
      <h1 className="text-2xl font-extrabold">Crea los perfiles</h1>
      <p className="text-gris text-sm mt-1 mb-6">Cada uno tendrá su avatar y un PIN de 4 números. Solo se hace una vez.</p>

      {rows.map((r, i) => (
        <div key={i} className="rounded-2xl border-2 border-linea p-4 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              value={r.name}
              onChange={(e) => set(i, "name", e.target.value)}
              placeholder="Nombre"
              className="flex-1 border-2 border-linea rounded-xl px-3 py-2"
            />
            <input
              value={r.pin}
              onChange={(e) => set(i, "pin", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="PIN"
              inputMode="numeric"
              className="w-24 border-2 border-linea rounded-xl px-3 py-2 text-center tracking-widest"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => set(i, "avatar", a)}
                className={`w-10 h-10 rounded-full text-xl ${r.avatar === a ? "bg-cielo ring-2 ring-azul" : "bg-white"}`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => set(i, "role", "parent")}
                className={`px-3 py-1 rounded-full font-semibold ${r.role === "parent" ? "bg-azul text-white" : "bg-cielo text-azul"}`}
              >
                Mamá / papá
              </button>
              <button
                onClick={() => set(i, "role", "child")}
                className={`px-3 py-1 rounded-full font-semibold ${r.role === "child" ? "bg-rosa text-white" : "bg-rosaSuave text-rosa"}`}
              >
                Niño
              </button>
            </div>
            <button onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-gris">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => setRows([...rows, { name: "", avatar: "🐼", role: "child", pin: "" }])}
        className="flex items-center gap-2 text-azul font-semibold text-sm mb-6"
      >
        <Plus size={16} /> Agregar perfil
      </button>

      {err && <div className="text-rosa text-sm mb-3">{err}</div>}
      <Primary onClick={save} disabled={!valid || busy}>
        {busy ? "Creando…" : "Crear perfiles"}
      </Primary>
      <p className="text-xs text-gris mt-3">Debe haber al menos un perfil de mamá o papá; ese es el que ve el panel de progreso.</p>
    </main>
  );
}
