"use client";
import { useEffect, useState } from "react";
import { Flame, Star, Award, KeyRound, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useFamily } from "@/lib/useFamily";
import { hashPin } from "@/lib/session";
import { getRoute } from "@/data";
import { loadAllProgress, stats, stars } from "@/lib/progress";
import { Nav, Pill, Avatar, Stars, Loading } from "@/components/ui";

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short" }) : "sin actividad");

export default function Panel() {
  const { user, profile, ready } = useFamily({ parentOnly: true });
  const [profiles, setProfiles] = useState(null);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(null);
  const [pinFor, setPinFor] = useState(null);
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    const [{ data: ps }, all] = await Promise.all([
      supabase.from("profiles").select("*").eq("family_id", user.id).order("created_at"),
      loadAllProgress(user.id),
    ]);
    setProfiles(ps || []);
    setRows(all);
  };
  useEffect(() => {
    if (ready) load();
  }, [ready]); // eslint-disable-line

  if (!ready || profiles === null) return <Loading />;

  const changePin = async () => {
    if (!/^\d{4}$/.test(pin)) return;
    await supabase.from("profiles").update({ pin_hash: await hashPin(pin) }).eq("id", pinFor);
    setPinFor(null);
    setPin("");
    setMsg("PIN actualizado.");
  };

  const addChild = async () => {
    const name = prompt("Nombre del nuevo perfil:");
    if (!name) return;
    const p = prompt("PIN de 4 números:");
    if (!/^\d{4}$/.test(p || "")) return alert("El PIN debe tener 4 números.");
    await supabase.from("profiles").insert({ family_id: user.id, name, avatar: "🐼", role: "child", pin_hash: await hashPin(p) });
    load();
  };

  const remove = async (p) => {
    if (!confirm(`¿Eliminar el perfil de ${p.name} y todo su progreso?`)) return;
    await supabase.from("progress").delete().eq("profile_id", p.id);
    await supabase.from("profiles").delete().eq("id", p.id);
    load();
  };

  return (
    <main className="max-w-md mx-auto px-5 pt-6 pb-28">
      <h1 className="text-2xl font-extrabold mb-1">Panel de la familia</h1>
      <p className="text-sm text-gris mb-5">Progreso de cada perfil. Toca uno para ver el detalle y las notas.</p>
      {msg && <div className="text-sm text-menta mb-3">{msg}</div>}

      {profiles.map((p) => {
        const route = getRoute(p.role);
        const mine = rows.filter((r) => r.profile_id === p.id);
        const s = stats(mine, route.lessons);
        const kids = p.role !== "parent";
        const isOpen = open === p.id;
        return (
          <div key={p.id} className="rounded-2xl border-2 border-linea mb-4 overflow-hidden">
            <button onClick={() => setOpen(isOpen ? null : p.id)} className="w-full text-left px-4 py-3 flex items-center gap-3">
              <Avatar emoji={p.avatar} size="text-2xl" className="w-12 h-12" />
              <div className="flex-1">
                <div className="font-bold">{p.name}</div>
                <div className="text-xs text-gris">
                  {s.done}/{s.total} {kids ? "misiones" : "lecciones"} · {s.retos} {kids ? "cumplidas" : "retos"} · último: {fmt(s.last)}
                </div>
              </div>
            </button>
            <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
              <Pill icon={<Flame size={14} />} value={`${s.streak} días`} className="bg-ambarSuave text-ambar" />
              {kids && <Pill icon={<Star size={14} className="fill-ambar" />} value={s.stars} className="bg-ambarSuave text-ambar" />}
              <Pill icon={<Award size={14} />} value={`${s.xp} pts`} className="bg-cielo text-azul" />
            </div>
            <div className="px-4 pb-3 h-2 rounded-full">
              <div className="h-2 rounded-full bg-linea overflow-hidden">
                <div className="h-full bg-menta" style={{ width: `${(s.done / s.total) * 100}%` }} />
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-linea px-4 py-3">
                {route.weeks.map((w) => (
                  <div key={w.id} className="mb-3">
                    <div className="text-xs font-bold text-gris mb-1">{w.title}</div>
                    {w.lessons.map((l) => {
                      const r = s.byId[l.id];
                      return (
                        <div key={l.id} className="py-1.5 border-b border-linea last:border-0">
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`w-2.5 h-2.5 rounded-full ${r?.quiz_done ? "bg-menta" : "bg-linea"}`} />
                            <span className="flex-1">{l.title}</span>
                            {r?.quiz_done && (kids ? <Stars n={stars(r.score || 0, l.quiz.length)} size={12} /> : <span className="text-xs text-gris">{r.score}/{l.quiz.length}</span>)}
                            {r?.reto_done && <span className="text-xs text-menta font-semibold">✓</span>}
                          </div>
                          {r?.note && <div className="text-xs text-gris italic ml-4.5 mt-0.5 pl-4">“{r.note}”</div>}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="flex gap-4 mt-2 text-sm">
                  <button onClick={() => { setPinFor(p.id); setPin(""); setMsg(""); }} className="flex items-center gap-1 text-azul font-semibold">
                    <KeyRound size={14} /> Cambiar PIN
                  </button>
                  {p.id !== profile.id && (
                    <button onClick={() => remove(p)} className="flex items-center gap-1 text-rosa font-semibold">
                      <Trash2 size={14} /> Eliminar
                    </button>
                  )}
                </div>
                {pinFor === p.id && (
                  <div className="flex gap-2 mt-2">
                    <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="Nuevo PIN" className="border-2 border-linea rounded-xl px-3 py-2 w-28 text-center tracking-widest" />
                    <button onClick={changePin} className="px-3 rounded-xl bg-azul text-white font-semibold text-sm">Guardar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <button onClick={addChild} className="flex items-center gap-2 text-azul font-semibold text-sm">
        <Plus size={16} /> Agregar perfil
      </button>
      <Nav role={profile.role} />
    </main>
  );
}
