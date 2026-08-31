import { WEEKS_MAMA } from "./mama";
import { WEEKS_NINOS } from "./ninos";
import { INTRO } from "./intro";

// Devuelve la ruta según el rol del perfil
export function getRoute(role) {
  const weeks = role === "parent" ? WEEKS_MAMA : WEEKS_NINOS;
  const lessons = weeks.flatMap((w) => w.lessons.map((l) => ({ ...l, week: w.id, weekTitle: w.title })));
  return { weeks, lessons, intro: role === "parent" ? INTRO : [] };
}

export function findLesson(id) {
  for (const r of [WEEKS_MAMA, WEEKS_NINOS]) {
    for (const w of r) {
      const l = w.lessons.find((x) => x.id === id);
      if (l) return { ...l, week: w.id, weekTitle: w.title, kids: r === WEEKS_NINOS };
    }
  }
  const i = INTRO.find((x) => x.id === id);
  if (i) return { ...i, intro: true, week: 0, weekTitle: "Antes de empezar" };
  return null;
}
