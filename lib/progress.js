import { supabase } from "./supabase";

// progress: filas { profile_id, lesson_id, quiz_done, score, reto_done, note, completed_at }
export async function loadProgress(profileId) {
  const { data, error } = await supabase.from("progress").select("*").eq("profile_id", profileId);
  if (error) throw error;
  const map = {};
  for (const r of data || []) map[r.lesson_id] = r;
  return map;
}

export async function loadAllProgress(familyId) {
  const { data, error } = await supabase.from("progress").select("*").eq("family_id", familyId);
  if (error) throw error;
  return data || [];
}

export async function saveLesson(familyId, profileId, lessonId, patch) {
  const row = { family_id: familyId, profile_id: profileId, lesson_id: lessonId, ...patch, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from("progress").upsert(row, { onConflict: "profile_id,lesson_id" }).select().single();
  if (error) throw error;
  return data;
}

const day = (iso) => (iso ? iso.slice(0, 10) : null);
const shift = (d, n) => {
  const x = new Date(d + "T12:00:00");
  x.setDate(x.getDate() + n);
  return x.toISOString().slice(0, 10);
};

export function stars(score, total) {
  if (score >= total) return 3;
  if (score >= total - 1) return 2;
  return 1;
}

// Estadísticas de un perfil a partir de sus filas
export function stats(rows, lessons) {
  const byId = {};
  for (const r of rows) byId[r.lesson_id] = r;
  let xp = 0,
    starsTotal = 0,
    done = 0,
    retos = 0;
  for (const l of lessons) {
    const r = byId[l.id];
    if (!r) continue;
    if (r.quiz_done) {
      done++;
      xp += (r.score || 0) * 10;
      starsTotal += stars(r.score || 0, l.quiz.length);
    }
    if (r.reto_done) {
      retos++;
      xp += 20;
    }
  }
  // Racha: días consecutivos con al menos una lección completada, contando desde hoy o ayer
  const days = new Set(rows.filter((r) => r.completed_at).map((r) => day(r.completed_at)));
  const today = new Date().toISOString().slice(0, 10);
  let cursor = days.has(today) ? today : days.has(shift(today, -1)) ? shift(today, -1) : null;
  let streak = 0;
  while (cursor && days.has(cursor)) {
    streak++;
    cursor = shift(cursor, -1);
  }
  const last = rows.reduce((m, r) => (r.updated_at > m ? r.updated_at : m), "");
  return { xp, stars: starsTotal, done, retos, streak, last, byId, total: lessons.length };
}
