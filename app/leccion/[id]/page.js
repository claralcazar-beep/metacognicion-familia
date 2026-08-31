"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Users, Sparkles, Flame } from "lucide-react";
import { useFamily } from "@/lib/useFamily";
import { findLesson } from "@/data";
import { loadProgress, saveLesson, stars } from "@/lib/progress";
import { Primary, Stars, Loading, Confetti } from "@/components/ui";

export default function Leccion() {
  const { id } = useParams();
  const router = useRouter();
  const { profile, user, ready } = useFamily();
  const lesson = findLesson(id);
  const [rec, setRec] = useState(null);
  const [step, setStep] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [celebrate, setCelebrate] = useState(null);

  useEffect(() => {
    if (!ready) return;
    loadProgress(profile.id).then((m) => {
      const r = m[id] || {};
      setRec(r);
      setNote(r.note || "");
      if (r.quiz_done) setStep(2);
    });
    // Solo al abrir la lección: si se repitiera en cada render, borraría la nota mientras se escribe
  }, [ready, id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step, qi]);

  if (!lesson) return <Loading text="Esa lección no existe." />;
  if (!ready || rec === null) return <Loading />;

  const kids = profile.role !== "parent";
  const back = () => router.push("/camino");

  // Lectura del módulo inicial: solo se marca como leída
  if (lesson.intro) {
    const markRead = async () => {
      setSaving(true);
      await saveLesson(user.id, profile.id, id, { reto_done: true, quiz_done: false, score: 0 });
      setSaving(false);
      back();
    };
    return (
      <main className="max-w-md mx-auto px-5 pb-10">
        <Header onBack={back} />
        <div className="text-xs text-gris mb-1">Antes de empezar</div>
        <h1 className="text-2xl font-extrabold mb-5">{lesson.title}</h1>
        {lesson.read.map((p, i) => (
          <p key={i} className="text-base leading-relaxed mb-4">{p}</p>
        ))}
        <Primary onClick={markRead} disabled={saving}>{rec.reto_done ? "Volver" : "Leído, volver al camino"}</Primary>
      </main>
    );
  }

  const q = lesson.quiz[qi];
  const total = lesson.quiz.length;
  const labels = kids ? ["Lee", "Reto", "Misión"] : ["Lectura", "Prueba", "Reto"];
  const accent = kids ? "bg-lila" : "bg-azul";

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.ok) setScore((s) => s + 1);
  };

  const nextQ = async () => {
    if (qi + 1 < total) {
      setQi(qi + 1);
      setPicked(null);
      return;
    }
    setSaving(true);
    const first = !rec.quiz_done;
    const patch = { quiz_done: true, score: first ? score : Math.max(score, rec.score || 0) };
    if (first) patch.completed_at = new Date().toISOString();
    const saved = await saveLesson(user.id, profile.id, id, patch);
    setRec(saved);
    setSaving(false);
    if (first) setCelebrate({ xp: score * 10, stars: stars(score, total) });
    setStep(2);
  };

  const doReto = async () => {
    setSaving(true);
    const saved = await saveLesson(user.id, profile.id, id, { reto_done: true, note });
    setRec(saved);
    setSaving(false);
  };

  return (
    <main className="max-w-md mx-auto px-5 pb-10">
      <Header onBack={back}>
        <div className="flex-1 flex gap-1.5">
          {labels.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition ${i <= step ? accent : "bg-linea"}`} />
          ))}
        </div>
        <span className="text-xs font-semibold text-gris">{labels[step]}</span>
      </Header>

      <div className="text-xs text-gris mb-1">{lesson.weekTitle}</div>
      <h1 className="text-2xl font-extrabold mb-5">{lesson.title}</h1>

      {step === 0 && (
        <div>
          {lesson.read.map((p, i) => (
            <p key={i} className={`leading-relaxed mb-4 ${kids ? "text-lg" : "text-base"}`}>{p}</p>
          ))}
          <Primary onClick={() => setStep(1)} color={accent}>{kids ? "¡Al reto!" : "Ir a la prueba"}</Primary>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="text-xs font-semibold text-gris mb-2">Pregunta {qi + 1} de {total}</div>
          <div className="text-xl font-bold mb-4 leading-snug">{q.q}</div>
          <div className="flex flex-col gap-2.5">
            {q.a.map((opt, i) => {
              let cls = "border-linea bg-white text-ink";
              if (picked !== null) {
                if (i === q.ok) cls = "border-menta bg-mentaSuave text-menta anim-pop";
                else if (i === picked) cls = "border-rosa bg-rosaSuave text-rosa anim-wiggle";
              }
              return (
                <button key={i} onClick={() => answer(i)} className={`text-left px-4 py-3.5 rounded-2xl font-semibold border-2 ${cls} ${kids ? "text-lg" : ""}`}>
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-4 rounded-2xl px-4 py-3 text-sm bg-cielo">
              <div className={`font-bold mb-1 ${picked === q.ok ? "text-menta" : "text-rosa"}`}>
                {picked === q.ok ? (kids ? "¡Correcto! ⭐" : "Correcto") : kids ? "Casi. Mira por qué:" : "No es esa"}
              </div>
              {q.why}
            </div>
          )}
          {picked !== null && (
            <div className="mt-4">
              <Primary onClick={nextQ} color={accent} disabled={saving}>
                {qi + 1 < total ? "Siguiente" : saving ? "Guardando…" : "Terminar"}
              </Primary>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          {celebrate && kids && <Confetti />}
          {celebrate && (
            <div className="rounded-2xl px-4 py-5 mb-4 bg-ambarSuave text-center anim-pop">
              {kids ? (
                <>
                  <Stars n={celebrate.stars} size={40} className="mb-2" animate />
                  <div className="font-extrabold text-lg">¡Ganaste {celebrate.stars} {celebrate.stars === 1 ? "estrella" : "estrellas"} y {celebrate.xp} puntos!</div>
                  <div className="text-sm text-gris flex items-center justify-center gap-1 mt-1">
                    <Flame size={16} className="text-ambar anim-flame" /> Tu racha sigue viva
                  </div>
                </>
              ) : (
                <div className="font-bold">Prueba completada · +{celebrate.xp} puntos</div>
              )}
            </div>
          )}
          {!celebrate && (
            <div className="text-sm mb-4 flex items-center gap-2 text-menta">
              <Check size={16} /> {kids ? "Reto ya superado" : "Prueba completada"} · {rec.score}/{total}
              {kids && <Stars n={stars(rec.score, total)} size={14} />}
            </div>
          )}

          <div className={`rounded-2xl px-4 py-4 mb-4 ${kids ? "bg-lilaSuave" : lesson.week > 2 ? "bg-rosaSuave" : "bg-ambarSuave"}`}>
            <div className={`flex items-center gap-2 font-bold mb-2 ${kids ? "text-lila" : lesson.week > 2 ? "text-rosa" : "text-ambar"}`}>
              {kids ? <Sparkles size={16} /> : lesson.week > 2 ? <Users size={16} /> : <Sparkles size={16} />}
              {kids ? "Tu misión" : lesson.week > 2 ? "Reto con los niños" : "Reto de hoy"}
            </div>
            <p className={`leading-relaxed ${kids ? "text-lg" : ""}`}>{lesson.reto}</p>
          </div>

          <label className="block text-sm font-semibold mb-1">{kids ? "¿Qué pasó? (si quieres)" : "¿Qué notaste?"}</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Una o dos líneas bastan."
            className="w-full border-2 border-linea rounded-2xl px-3 py-2 text-base mb-4"
          />

          {!rec.reto_done ? (
            <Primary onClick={doReto} color={accent} disabled={saving}>
              {saving ? "Guardando…" : kids ? "¡Misión cumplida! 🎉 +20" : "Marcar reto como hecho"}
            </Primary>
          ) : (
            <div>
              <div className="rounded-2xl px-4 py-3 text-sm font-bold flex items-center gap-2 mb-3 bg-mentaSuave text-menta">
                <Check size={16} /> {kids ? "Misión cumplida" : "Reto hecho"}
              </div>
              {note !== (rec.note || "") && (
                <button onClick={doReto} className="w-full py-2 text-sm font-semibold text-azul">Guardar nota</button>
              )}
            </div>
          )}
          <button onClick={back} className="w-full py-3 mt-2 text-sm font-semibold text-gris">Volver al camino</button>
        </div>
      )}
    </main>
  );
}

function Header({ onBack, children }) {
  return (
    <header className="pt-4 pb-4 flex items-center gap-3 sticky top-0 bg-white z-10">
      <button onClick={onBack} className="p-1 -ml-1 text-gris"><ChevronLeft size={26} /></button>
      {children}
    </header>
  );
}
