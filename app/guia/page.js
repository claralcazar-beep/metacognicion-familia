"use client";
import { useFamily } from "@/lib/useFamily";
import { PRINCIPLES, BOOKS } from "@/data/guia";
import { GLOSARIO } from "@/data/intro";
import { Nav, Loading } from "@/components/ui";

const Box = ({ title, items, cls }) => (
  <>
    <h2 className="font-bold mb-2">{title}</h2>
    <div className={`rounded-2xl px-4 py-3 mb-6 text-base leading-relaxed ${cls}`}>
      {items.map((t, i) => <div key={i}>{t}</div>)}
    </div>
  </>
);

export default function Guia() {
  const { profile, ready } = useFamily();
  if (!ready) return <Loading />;
  const kids = profile.role !== "parent";

  return (
    <main className="max-w-md mx-auto px-5 pt-6 pb-28">
      <h1 className="text-2xl font-extrabold mb-1">{kids ? "Mis trucos" : "Guía de bolsillo"}</h1>
      <p className="text-sm text-gris mb-6">{kids ? "Para mirar rápido cuando lo necesites." : "Lo esencial, para consultar en cualquier momento."}</p>

      <Box
        title="El semáforo"
        cls="bg-cielo"
        items={["🔴 Rojo: ¿qué tengo que hacer? ¿qué sé ya? ¿por dónde empiezo?", "🟡 Amarillo: ¿voy bien? ¿entiendo o solo avanzo? ¿cómo me siento?", "🟢 Verde: ¿qué me salió bien? ¿qué me costó? ¿qué haría distinto?"]}
      />
      <Box
        title="Las 3 preguntas de la noche"
        cls="bg-ambarSuave"
        items={["¿Qué aprendí hoy?", "¿Qué me costó y qué hice cuando me costó?", "¿Qué haría distinto mañana?"]}
      />

      {kids ? (
        <Box
          title="Trucos de pro"
          cls="bg-lilaSuave"
          items={["Cierra el cuaderno y cuéntalo con tus palabras.", "Enséñaselo a alguien (o a un peluche).", "Di «mi hipótesis es…» en vez de «yo sé».", "Agrega «todavía» a cada «no sé».", "Bloques de 15 minutos y 3 de moverte.", "Pide ayuda contando qué probaste.", "Duerme bien: el cerebro guarda de noche."]}
        />
      ) : (
        <>
          <h2 className="font-bold mb-2">Las 10 cosas</h2>
          <ol className="mb-6">
            {PRINCIPLES.map((t, i) => (
              <li key={i} className="flex gap-3 py-2 border-b border-linea">
                <span className="font-bold w-5 shrink-0 text-azul">{i + 1}</span>
                <span className="text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
          <Box
            title="Preguntas para devolverles"
            cls="bg-rosaSuave"
            items={["¿Cómo lo supiste?", "¿Cómo sabes que ya lo sabes?", "¿Qué probaste antes de pedir ayuda?", "¿Cuál es tu hipótesis?", "¿Qué te enseñó ese error?"]}
          />
          <h2 className="font-bold mb-2">Glosario</h2>
          <div className="mb-6">
            {GLOSARIO.map((g, i) => (
              <div key={i} className="py-2.5 border-b border-linea">
                <div className="font-semibold text-sm">{g.t}</div>
                <div className="text-sm text-gris">{g.d}</div>
              </div>
            ))}
          </div>
          <h2 className="font-bold mb-2">Libros</h2>
          <div className="mb-6">
            {BOOKS.map((b, i) => (
              <div key={i} className="py-2.5 border-b border-linea">
                <div className="font-semibold text-sm">{b.t} <span className="font-normal text-gris">· {b.a}</span></div>
                <div className="text-xs text-gris">{b.n}</div>
              </div>
            ))}
          </div>
          <h2 className="font-bold mb-2">Gratis en internet</h2>
          <div className="text-sm text-gris mb-6 leading-relaxed">
            Curso «Learning How to Learn» de Barbara Oakley en Coursera (subtítulos en español). Guía «Metacognition and Self-regulated Learning» de la Education Endowment Foundation (inglés).
          </div>
        </>
      )}
      <Nav role={profile.role} />
    </main>
  );
}
