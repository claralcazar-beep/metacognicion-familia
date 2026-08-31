"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Star, Lock, Check, BookOpen, Award } from "lucide-react";
import { useFamily } from "@/lib/useFamily";
import { clearProfile } from "@/lib/session";
import { getRoute } from "@/data";
import { loadProgress, stats, stars } from "@/lib/progress";
import { Nav, Pill, Avatar, Stars, Loading } from "@/components/ui";

export default function Camino() {
  const router = useRouter();
  const { profile, ready } = useFamily();
  const [prog, setProg] = useState(null);

  useEffect(() => {
    if (!ready) return;
    loadProgress(profile.id).then(setProg).catch(() => setProg({}));
  }, [ready, profile]);

  if (!ready || prog === null) return <Loading />;

  const kids = profile.role !== "parent";
  const { weeks, lessons, intro } = getRoute(profile.role);
  const rows = Object.values(prog);
  const s = stats(rows, lessons);
  const isDone = (id) => !!prog[id]?.quiz_done;
  const introRead = (id) => !!prog[id]?.reto_done;
  const unlocked = (idx) => idx === 0 || isDone(lessons[idx - 1].id);
  const nextIdx = lessons.findIndex((l, i) => unlocked(i) && !isDone(l.id));
  const next = nextIdx >= 0 ? lessons[nextIdx] : null;
  const weekDone = (w) => w.lessons.every((l) => isDone(l.id));

  const switchProfile = () => {
    clearProfile();
    router.replace("/perfiles");
  };

  return (
    <main className="max-w-md mx-auto pb-28">
      <header className={`px-5 pt-5 pb-4 sticky top-0 z-10 ${kids ? "kids-header text-white rounded-b-3xl shadow-lg" : "bg-white"}`}>
        <div className="flex items-center justify-between">
          <button onClick={switchProfile} className="flex items-center gap-2 text-left">
            <Avatar emoji={profile.avatar} size="text-2xl" className={`w-11 h-11 ${kids ? "bg-white/25" : ""}`} />
            <div>
              <div className="font-extrabold leading-tight">{profile.name}</div>
              <div className={`text-xs ${kids ? "text-white/80" : "text-gris"}`}>Cambiar perfil</div>
            </div>
          </button>
          <div className="flex gap-1.5">
            <Pill icon={<Flame size={15} className={s.streak > 0 ? "anim-flame" : ""} />} value={s.streak} className={kids ? "bg-white/25 text-white" : "bg-ambarSuave text-ambar"} />
            {kids && <Pill icon={<Star size={15} className="fill-ambar text-ambar" />} value={s.stars} className="bg-white/25 text-white" />}
            <Pill icon={<Award size={15} />} value={s.xp} className={kids ? "bg-white/25 text-white" : "bg-cielo text-azul"} />
          </div>
        </div>
        <div className={`mt-3 h-2.5 rounded-full overflow-hidden ${kids ? "bg-white/30" : "bg-linea"}`}>
          <div className={`h-full rounded-full transition-all ${kids ? "bar-shimmer" : "bg-menta"}`} style={{ width: `${(s.done / s.total) * 100}%` }} />
        </div>
        <div className={`text-xs mt-1 ${kids ? "text-white/85" : "text-gris"}`}>
          {s.done} de {s.total} {kids ? "misiones" : "lecciones"} · {s.retos} {kids ? "misiones cumplidas" : "retos hechos"}
        </div>
      </header>

      {next ? (
        <Link
          href={`/leccion/${next.id}`}
          className={`mx-5 mt-4 mb-5 rounded-2xl px-4 py-3.5 flex items-center justify-between text-white shadow-lg ${kids ? "bg-lila anim-float anim-ring" : "bg-azul"}`}
        >
          <div>
            <div className="text-xs opacity-80">{kids ? "Tu siguiente misión" : "Siguiente lección"}</div>
            <div className="font-bold text-lg">{next.title}</div>
          </div>
          <span className={`text-sm font-bold ${kids ? "text-2xl" : ""}`}>{kids ? "🚀" : "Empezar"}</span>
        </Link>
      ) : (
        <div className="mx-5 mt-4 mb-5 rounded-2xl px-4 py-3.5 bg-mentaSuave text-menta">
          <div className="font-bold text-lg">{kids ? "¡Completaste todo el camino! 🏆" : "Curso completo"}</div>
          <div className="text-sm">Puedes volver a cualquier {kids ? "misión" : "lección"} para repasar.</div>
        </div>
      )}

      {intro.length > 0 && (
        <section className="px-5 mb-6">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            <BookOpen size={16} className="text-gris" /> Antes de empezar
          </h2>
          <div className="rounded-2xl border-2 border-linea divide-y divide-linea">
            {intro.map((l) => (
              <Link key={l.id} href={`/leccion/${l.id}`} className="flex items-center gap-3 px-4 py-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${introRead(l.id) ? "bg-menta text-white" : "border-2 border-linea"}`}>
                  {introRead(l.id) && <Check size={12} />}
                </span>
                <span className="text-sm font-semibold flex-1">{l.title}</span>
                <span className="text-xs text-gris">lectura</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {weeks.map((w) => (
        <section key={w.id} className="px-5 mb-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-bold flex items-center gap-2 ${kids ? "text-lg" : ""}`}>
              {kids && <span className="text-2xl">{w.emoji}</span>}
              {w.title}
            </h2>
            {weekDone(w) && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-mentaSuave text-menta flex items-center gap-1">
                <Award size={12} /> {kids ? "Insignia" : "Completa"}
              </span>
            )}
          </div>
          <div className="relative pl-9">
            <div className={`absolute top-3 bottom-3 rounded ${kids ? "left-[18px] w-1.5 bg-lilaSuave" : "left-4 w-1 bg-linea"}`} />
            {w.lessons.map((l) => {
              const idx = lessons.findIndex((x) => x.id === l.id);
              const done = isDone(l.id);
              const open = unlocked(idx);
              const r = prog[l.id];
              const inner = (
                <>
                  <span
                    className={`absolute -left-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${kids ? "w-10 h-10 shadow-md" : "w-8 h-8"} ${
                      done ? (kids ? "bg-ambar" : "bg-menta") : open ? (kids ? "bg-lila anim-ring" : "bg-azul") : "bg-white border-2 border-linea text-gris"
                    }`}
                  >
                    {done ? (kids ? <Star size={20} className="fill-white" /> : <Check size={16} />) : open ? idx % 5 + 1 : <Lock size={13} />}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{l.title}</span>
                    {done && (
                      <span className="flex items-center gap-2 text-xs text-gris mt-0.5">
                        {kids ? <Stars n={stars(r.score || 0, l.quiz.length)} size={13} /> : `Prueba ${r.score}/${l.quiz.length}`}
                        {r.reto_done ? (kids ? "· misión cumplida" : "· reto hecho") : kids ? "· misión pendiente" : "· reto pendiente"}
                      </span>
                    )}
                  </span>
                </>
              );
              return open ? (
                <Link key={l.id} href={`/leccion/${l.id}`} className="relative flex items-center gap-3 py-3">
                  {inner}
                </Link>
              ) : (
                <div key={l.id} className="relative flex items-center gap-3 py-3 opacity-45">
                  {inner}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <Nav role={profile.role} />
    </main>
  );
}
