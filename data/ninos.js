// Ruta de los niños · 4 semanas · 5 misiones por semana
// Escrita para 8–10 años. Lectura corta, 3 preguntas, 1 misión.
export const WEEKS_NINOS = [
  {
    id: 1,
    title: "Semana 1 · Mi cerebro y yo",
    emoji: "🧠",
    lessons: [
      {
        id: "n1-1",
        title: "Tu cerebro tiene un jefe",
        read: [
          "Dentro de tu cabeza hay un jefe. No es el que piensa: es el que mira cómo piensas. Cuando dices «espera, esto no me está saliendo», ese es el jefe hablando.",
          "Los científicos le pusieron un nombre difícil: metacognición. Tú puedes llamarlo el jefe. En este curso vas a entrenar a tu jefe para que te ayude a aprender más rápido y con menos enredo.",
        ],
        quiz: [
          { q: "¿Qué hace el jefe de tu cerebro?", a: ["Piensa por ti", "Mira cómo piensas", "Se queda dormido"], ok: 1, why: "El jefe vigila. Es el que se da cuenta cuando algo no sale." },
          { q: "¿Cómo se llama en palabras de científico?", a: ["Metacognición", "Memoria", "Matemáticas"], ok: 0, why: "Meta-cognición: pensar sobre el pensar. Puedes decir «el jefe»." },
          { q: "¿Qué frase dice el jefe?", a: ["«Tengo hambre»", "«Espera, esto no me está saliendo»", "«Quiero jugar»"], ok: 1, why: "Darse cuenta de que algo no funciona es el trabajo del jefe." },
        ],
        reto: "Hoy, mientras haces tareas, di en voz alta una vez: «Jefe, ¿cómo voy?». Y contesta con lo que sea verdad.",
      },
      {
        id: "n1-2",
        title: "Me suena no es lo mismo que lo sé",
        read: [
          "A veces lees algo dos veces y piensas «ya me lo sé». Pero en la prueba… se borra. Eso pasa porque «me suena» y «lo sé» se sienten igual, pero no son lo mismo.",
          "Hay una prueba secreta: cierra el libro y cuéntalo con tus palabras. Si puedes, lo sabes. Si se te enreda, todavía te suena nomás. Y no pasa nada: ahora sabes qué te falta.",
        ],
        quiz: [
          { q: "¿Cuál es la prueba secreta para saber si lo sabes?", a: ["Leerlo otra vez", "Cerrar el libro y contarlo con tus palabras", "Subrayar con colores"], ok: 1, why: "Si lo puedes contar sin mirar, es tuyo." },
          { q: "Si se te enreda al contarlo, significa que…", a: ["Eres malo para eso", "Todavía te suena nomás", "El libro está mal"], ok: 1, why: "Solo te falta un poco más. Ya sabes dónde." },
          { q: "¿Por qué engaña releer?", a: ["Porque cansa", "Porque se siente como saber, pero no lo es", "Porque es aburrido"], ok: 1, why: "El cerebro reconoce las palabras y cree que ya las tiene." },
        ],
        reto: "Escoge algo que viste hoy en el colegio. Cierra el cuaderno y cuéntaselo a alguien de la casa en un minuto.",
      },
      {
        id: "n1-3",
        title: "Semáforo rojo: para y planea",
        read: [
          "Vas a usar un semáforo para tus tareas. Empieza en rojo. Rojo no es «está mal»: rojo es «para un momento antes de arrancar».",
          "En rojo te haces tres preguntas: ¿Qué tengo que hacer? ¿Qué sé ya de esto? ¿Por dónde empiezo? Toma un minuto y te ahorra muchos enredos después.",
        ],
        quiz: [
          { q: "¿Qué significa el rojo?", a: ["Está mal", "Para y planea antes de empezar", "Ya terminé"], ok: 1, why: "Rojo es el momento de pensar antes de hacer." },
          { q: "¿Cuál es una pregunta del rojo?", a: ["¿Qué tengo que hacer?", "¿Qué me costó?", "¿Voy bien?"], ok: 0, why: "Saber qué te piden es lo primero." },
          { q: "¿Cuánto dura el rojo?", a: ["Una hora", "Un minuto", "Todo el día"], ok: 1, why: "Rapidito. Si es largo, no lo vas a hacer." },
        ],
        reto: "Antes de tu próxima tarea, di las tres preguntas del rojo en voz alta y contéstalas. Después arranca.",
      },
      {
        id: "n1-4",
        title: "Semáforo amarillo: ¿voy bien?",
        read: [
          "Cuando ya estás trabajando, prende el amarillo de vez en cuando. Amarillo es preguntarle al jefe: ¿voy bien? ¿estoy entendiendo o solo estoy avanzando?",
          "Si la respuesta es «no entiendo», no es el final. Es el momento de cambiar algo: leer más despacio, hacer un dibujo, probar de otra forma. Eso hacen los que aprenden rápido.",
        ],
        quiz: [
          { q: "¿Qué pregunta el amarillo?", a: ["¿Qué tengo que hacer?", "¿Voy bien? ¿Estoy entendiendo?", "¿Ya puedo jugar?"], ok: 1, why: "Amarillo es revisar en la mitad." },
          { q: "Si no entiendes, ¿qué haces?", a: ["Me rindo", "Cambio algo: más despacio, un dibujo, otra forma", "Sigo igual"], ok: 1, why: "Cambiar de estrategia es lo que hace el jefe." },
          { q: "«Solo avanzar» sin entender es…", a: ["Buena idea", "Una trampa", "Lo normal"], ok: 1, why: "Llegar al final sin entender es llegar a ningún lado." },
        ],
        reto: "En la mitad de una tarea, para y pregunta: «¿voy bien?». Si no, cambia una cosa y sigue.",
      },
      {
        id: "n1-5",
        title: "Semáforo verde: mira atrás",
        read: [
          "Cuando terminas, no cierres el cuaderno todavía. Prende el verde y mira atrás: ¿qué me salió bien? ¿qué me costó? ¿qué haría distinto la próxima vez?",
          "Verde dura un minuto y es donde más aprendes sobre ti. Los campeones de todo (fútbol, videojuegos, matemáticas) revisan lo que hicieron. Por eso mejoran.",
        ],
        quiz: [
          { q: "¿Cuándo se prende el verde?", a: ["Antes de empezar", "En la mitad", "Al terminar"], ok: 2, why: "Verde es mirar atrás cuando ya acabaste." },
          { q: "¿Cuál es una pregunta del verde?", a: ["¿Por dónde empiezo?", "¿Qué haría distinto la próxima vez?", "¿Voy bien?"], ok: 1, why: "Pensar en la próxima vez es lo que te hace mejorar." },
          { q: "¿Por qué los campeones revisan lo que hicieron?", a: ["Por aburrimiento", "Porque así mejoran", "Porque los obligan"], ok: 1, why: "Nadie mejora sin mirar qué pasó." },
        ],
        reto: "Al terminar la tarea de hoy, contesta las tres preguntas del verde. Ya tienes el semáforo completo.",
      },
    ],
  },
  {
    id: 2,
    title: "Semana 2 · Soy un científico",
    emoji: "🔬",
    lessons: [
      {
        id: "n2-1",
        title: "Mi hipótesis es…",
        read: [
          "Un científico no dice «yo sé». Dice «mi hipótesis es…» y luego lo prueba. Si estaba bien, genial. Si estaba mal, aprendió algo nuevo. Los científicos nunca pierden.",
          "Tú puedes hacer lo mismo. En vez de «esto se hace así», prueba «mi hipótesis es que se hace así». Suena raro al principio, pero te quita el miedo a equivocarte.",
        ],
        quiz: [
          { q: "¿Qué dice un científico en vez de «yo sé»?", a: ["«Yo tengo razón»", "«Mi hipótesis es…»", "«No sé nada»"], ok: 1, why: "Una hipótesis es una idea que se va a probar." },
          { q: "Si la hipótesis estaba mal, el científico…", a: ["Pierde", "Aprendió algo nuevo", "Se enoja"], ok: 1, why: "Por eso los científicos nunca pierden." },
          { q: "¿Qué te quita decir «mi hipótesis es»?", a: ["El hambre", "El miedo a equivocarte", "El tiempo"], ok: 1, why: "La idea puede estar mal sin que tú estés mal." },
        ],
        reto: "Hoy di «mi hipótesis es…» tres veces (en la tarea, en un juego, en la comida). Cuenta cuántas acertaste.",
      },
      {
        id: "n2-2",
        title: "No sé… todavía",
        read: [
          "Hay una palabra mágica: todavía. «No sé multiplicar por 7» se siente como una pared. «No sé multiplicar por 7 todavía» se siente como un camino.",
          "Los que aprenden más no son los que saben más. Son los que dicen «todavía» y siguen. Tu cerebro cree lo que le dices, así que dile que va a llegar.",
        ],
        quiz: [
          { q: "¿Cuál es la palabra mágica?", a: ["Nunca", "Todavía", "Imposible"], ok: 1, why: "Todavía convierte la pared en camino." },
          { q: "«No sé todavía» significa…", a: ["Que no sirvo", "Que no lo tengo, pero puedo llegar", "Que no quiero"], ok: 1, why: "Es una promesa de que vas a seguir." },
          { q: "¿Quiénes aprenden más?", a: ["Los que saben más", "Los que dicen todavía y siguen", "Los más rápidos"], ok: 1, why: "Seguir es más importante que empezar sabiendo." },
        ],
        reto: "Cada vez que hoy digas «no sé» o «no puedo», agrégale «todavía». Cuenta cuántas veces lo lograste.",
      },
      {
        id: "n2-3",
        title: "Mi error favorito",
        read: [
          "Un error no es una mancha. Es una pista. Cada error te dice exactamente qué te falta, y eso vale oro.",
          "En tu casa van a hacer un juego: cada uno cuenta su error favorito de la semana y qué aprendió. Tu mamá también. Gana el que tenga el error más interesante, no el que menos se equivocó.",
        ],
        quiz: [
          { q: "Un error es…", a: ["Una mancha", "Una pista de qué te falta", "Algo que hay que esconder"], ok: 1, why: "Te dice exactamente dónde mirar." },
          { q: "En el juego del error favorito gana…", a: ["El que menos se equivocó", "El que tiene el error más interesante", "El más grande"], ok: 1, why: "Un buen error enseña mucho." },
          { q: "¿Quién cuenta su error también?", a: ["Solo los niños", "Tu mamá también", "Nadie"], ok: 1, why: "Todos se equivocan. Todos aprenden." },
        ],
        reto: "Prepara tu error favorito de esta semana para contarlo en la mesa. Incluye qué aprendiste de él.",
      },
      {
        id: "n2-4",
        title: "El cerebro es un músculo",
        read: [
          "Cuando algo te cuesta, tu cerebro está creciendo. En serio: los científicos vieron que cuando practicas algo difícil, las conexiones del cerebro se hacen más fuertes, como un músculo en el gimnasio.",
          "Por eso nadie «es malo» para las matemáticas o «es bueno» para leer. Todos empiezan en algún punto y crecen practicando. Lo difícil no es la señal de que no puedes: es la señal de que estás creciendo.",
        ],
        quiz: [
          { q: "Cuando algo te cuesta, tu cerebro…", a: ["Se cansa y ya", "Está creciendo", "Se pone triste"], ok: 1, why: "Las conexiones se fortalecen con el esfuerzo." },
          { q: "¿Alguien «es malo» para las matemáticas?", a: ["Sí, algunos nacen así", "No, todos crecen practicando", "Solo los que no estudian"], ok: 1, why: "Nadie nace sabiendo. Todos crecen." },
          { q: "Lo difícil es la señal de que…", a: ["No puedes", "Estás creciendo", "Debes parar"], ok: 1, why: "Como el gimnasio: lo que pesa es lo que te hace fuerte." },
        ],
        reto: "Escoge algo que te cueste. Practícalo 10 minutos hoy y di al final: «mi cerebro acaba de crecer».",
      },
      {
        id: "n2-5",
        title: "Los dos modos del cerebro",
        read: [
          "Tu cerebro tiene dos modos. El modo lupa: concentrado, mirando una sola cosa. Y el modo nube: la mente vaga, como cuando caminas o te bañas. Los dos son importantes.",
          "En modo lupa resuelves. En modo nube tu cerebro conecta ideas sin que te des cuenta. Por eso a veces la respuesta llega cuando dejaste de pensar. Descansar también es trabajar.",
        ],
        quiz: [
          { q: "¿Cuáles son los dos modos?", a: ["Lupa y nube", "Rápido y lento", "Día y noche"], ok: 0, why: "Concentrado y vagando. Los dos sirven." },
          { q: "¿Qué hace el modo nube?", a: ["Nada", "Conecta ideas sin que te des cuenta", "Te distrae"], ok: 1, why: "Por eso las respuestas aparecen en la ducha." },
          { q: "Descansar es…", a: ["Perder el tiempo", "También trabajar", "Solo para los fines de semana"], ok: 1, why: "El cerebro sigue trabajando en modo nube." },
        ],
        reto: "Cuando algo no te salga hoy, párate, camina 3 minutos y vuelve. Fíjate si lo ves distinto.",
      },
    ],
  },
  {
    id: 3,
    title: "Semana 3 · Trucos de pro",
    emoji: "⚡",
    lessons: [
      {
        id: "n3-1",
        title: "Cierra y cuenta",
        read: [
          "El truco número uno para estudiar no es leer más. Es cerrar el cuaderno e intentar recordar. Cada vez que sacas algo de tu memoria sin ayuda, esa memoria se hace más fuerte.",
          "Cómo se hace: lees un pedazo, cierras, dices lo que recuerdas, abres y revisas qué te faltó. Repites solo la parte que te faltó. Así se estudia en la mitad del tiempo.",
        ],
        quiz: [
          { q: "¿Cuál es el truco número uno?", a: ["Leer más veces", "Cerrar e intentar recordar", "Copiar todo"], ok: 1, why: "Sacar de la memoria la fortalece." },
          { q: "Después de cerrar y contar, ¿qué haces?", a: ["Paso a otra cosa", "Abro y reviso qué me faltó", "Lo leo todo de nuevo"], ok: 1, why: "Solo repites lo que te faltó. Eso ahorra tiempo." },
          { q: "Este truco sirve para estudiar…", a: ["Más lento", "En la mitad del tiempo", "Igual que siempre"], ok: 1, why: "Porque solo trabajas en lo que no sabes." },
        ],
        reto: "Estudia algo hoy con cierra-y-cuenta: lee, cierra, di, revisa. Anota cuántas rondas necesitaste.",
      },
      {
        id: "n3-2",
        title: "Enséñaselo a alguien",
        read: [
          "Si quieres saber si de verdad entendiste, enséñaselo a alguien. Puede ser tu hermano, tu mamá o hasta un peluche. Cuando explicas, tu cerebro ordena las ideas y aparecen los huecos.",
          "Si te trabas al explicar, no te preocupes: acabas de descubrir exactamente qué te falta. Eso es información de oro. Vuelve a esa parte y explica otra vez.",
        ],
        quiz: [
          { q: "¿Para qué sirve enseñárselo a alguien?", a: ["Para presumir", "Para descubrir si de verdad entendiste", "Para que te ayuden"], ok: 1, why: "Explicar muestra los huecos." },
          { q: "¿A quién puedes enseñarle?", a: ["Solo a la profe", "A tu hermano, tu mamá o un peluche", "A nadie"], ok: 1, why: "Lo importante es explicar, no quién escucha." },
          { q: "Si te trabas al explicar…", a: ["Fallaste", "Descubriste qué te falta", "Cambia de tema"], ok: 1, why: "Ahora sabes dónde volver." },
        ],
        reto: "Enséñale a alguien de la casa algo que aprendiste hoy. Pide que te haga una pregunta difícil.",
      },
      {
        id: "n3-3",
        title: "¿Cómo me siento?",
        read: [
          "Las emociones también entran en la tarea. Cuando estás frustrado quieres rendirte. Cuando tienes prisa te saltas pasos. Cuando estás aburrido finges que entendiste.",
          "El truco es ponerle nombre: «estoy frustrado». Solo decirlo hace que baje un poco. Después preguntas qué necesitas: una pausa, agua, moverte, o pedir ayuda. Y vuelves.",
        ],
        quiz: [
          { q: "Cuando estás frustrado, quieres…", a: ["Seguir feliz", "Rendirte", "Correr"], ok: 1, why: "La frustración empuja a abandonar. Saberlo ayuda." },
          { q: "¿Qué pasa cuando le pones nombre a la emoción?", a: ["Sube", "Baja un poco", "Nada"], ok: 1, why: "Nombrarla te devuelve el control." },
          { q: "Después de nombrarla, ¿qué preguntas?", a: ["¿Por qué soy así?", "¿Qué necesito ahora?", "¿Quién tiene la culpa?"], ok: 1, why: "Pausa, agua, moverte o ayuda. Y vuelves." },
        ],
        reto: "Cuando algo te enrede hoy, di en voz alta cómo te sientes y qué necesitas. Luego hazlo y vuelve.",
      },
      {
        id: "n3-4",
        title: "Adivina tu nota",
        read: [
          "Antes de una evaluación, escribe qué nota crees que vas a sacar y en qué tema te sientes más seguro y en cuál menos. Cuando llegue la nota, compara.",
          "Al principio casi todos adivinan más alto de lo que sacan. Es normal: es el «me suena» engañando. Con práctica tus adivinanzas se van acercando, y eso quiere decir que tu jefe está aprendiendo a conocerte.",
        ],
        quiz: [
          { q: "¿Qué escribes antes de una prueba?", a: ["Las respuestas", "La nota que crees que vas a sacar", "Una carta"], ok: 1, why: "Y en qué tema estás más y menos seguro." },
          { q: "¿Por qué casi todos adivinan más alto?", a: ["Por optimismo", "Porque «me suena» engaña", "Porque la prueba es difícil"], ok: 1, why: "Es la ilusión de saber en acción." },
          { q: "Cuando tus adivinanzas se acercan, significa que…", a: ["Tuviste suerte", "Tu jefe está aprendiendo a conocerte", "La prueba era fácil"], ok: 1, why: "Conocerte bien es lo que buscamos." },
        ],
        reto: "Antes de tu próxima evaluación, escribe tu adivinanza. Cuando llegue la nota, mira qué tan cerca estuviste.",
      },
      {
        id: "n3-5",
        title: "Pedir ayuda como un pro",
        read: [
          "Pedir ayuda está bien. Pero hay una forma de pro: primero cuentas qué probaste. «Intenté esto y esto, y no me salió aquí». Así la ayuda llega justo a donde la necesitas.",
          "Además, muchas veces mientras cuentas lo que probaste… te das cuenta solo de la respuesta. Le pasa hasta a los ingenieros. Funciona.",
        ],
        quiz: [
          { q: "¿Cómo pide ayuda un pro?", a: ["«No entiendo nada»", "Primero cuenta qué probó", "No pide ayuda"], ok: 1, why: "Así la ayuda llega a donde toca." },
          { q: "¿Qué pasa a veces mientras cuentas lo que probaste?", a: ["Te aburres", "Te das cuenta solo de la respuesta", "Se te olvida"], ok: 1, why: "Explicar el problema ordena las ideas." },
          { q: "Pedir ayuda está…", a: ["Mal", "Bien", "Prohibido"], ok: 1, why: "Es una estrategia más. Los pros la usan." },
        ],
        reto: "La próxima vez que pidas ayuda, empieza con «ya probé…». Fíjate si te das cuenta solo.",
      },
    ],
  },
  {
    id: 4,
    title: "Semana 4 · Mi propio experimento",
    emoji: "🚀",
    lessons: [
      {
        id: "n4-1",
        title: "Las tres preguntas de la noche",
        read: [
          "Todo lo que aprendiste cabe en tres preguntas que se hacen antes de dormir: ¿Qué aprendí hoy? ¿Qué me costó y qué hice cuando me costó? ¿Qué haría distinto mañana?",
          "Tardan un minuto. Se hacen todos los días, en familia. Tu mamá también responde. No importa si la respuesta es corta: importa no saltarse ningún día.",
        ],
        quiz: [
          { q: "¿Cuántas preguntas son?", a: ["Una", "Tres", "Diez"], ok: 1, why: "Aprendí, me costó, haría distinto." },
          { q: "¿Cuándo se hacen?", a: ["En el recreo", "Antes de dormir", "Los domingos"], ok: 1, why: "Todos los días a la misma hora." },
          { q: "¿Qué es lo más importante?", a: ["Responder largo", "No saltarse ningún día", "Responder rápido"], ok: 1, why: "La constancia construye la voz del jefe." },
        ],
        reto: "Esta noche responde las tres preguntas con tu familia. Pon la hora en que las van a hacer siempre.",
      },
      {
        id: "n4-2",
        title: "Bloques de 15",
        read: [
          "Tu cerebro se concentra bien unos 15 minutos. Después empieza a irse a modo nube aunque no quieras. No es falta de ganas: es como funciona.",
          "El truco: trabaja 15 minutos con reloj, luego 3 minutos de moverte (saltar, caminar, agua) y vuelves. Cuatro bloques de esos valen más que una hora seguida.",
        ],
        quiz: [
          { q: "¿Cuánto se concentra bien tu cerebro?", a: ["5 minutos", "Unos 15 minutos", "Una hora"], ok: 1, why: "Después se va a modo nube solo." },
          { q: "¿Qué haces en los 3 minutos de pausa?", a: ["Ver videos", "Moverte: saltar, caminar, agua", "Seguir trabajando"], ok: 1, why: "Moverse recarga la concentración." },
          { q: "Cuatro bloques de 15 valen…", a: ["Menos que una hora", "Más que una hora seguida", "Lo mismo"], ok: 1, why: "Porque en cada bloque estás de verdad." },
        ],
        reto: "Haz la tarea de hoy en bloques de 15 con pausas de 3. Cuenta cuántos bloques necesitaste.",
      },
      {
        id: "n4-3",
        title: "Dormir también es estudiar",
        read: [
          "Mientras duermes, tu cerebro guarda lo que aprendiste en el día. Es como si pasara los archivos del escritorio a la carpeta correcta. Si no duermes bien, muchos se pierden.",
          "Por eso estudiar hasta muy tarde no sirve: lo que ganas leyendo lo pierdes por no dormir. Estudia temprano, duerme bien y mañana vas a saber más de lo que sabías anoche.",
        ],
        quiz: [
          { q: "Mientras duermes, tu cerebro…", a: ["Se apaga", "Guarda lo que aprendiste", "Se olvida de todo"], ok: 1, why: "Pasa los archivos a la carpeta correcta." },
          { q: "Estudiar hasta muy tarde…", a: ["Sirve mucho", "No sirve: pierdes por no dormir", "Es obligatorio"], ok: 1, why: "El sueño es parte del estudio." },
          { q: "¿Cuál es el plan?", a: ["Estudiar de noche", "Estudiar temprano y dormir bien", "No estudiar"], ok: 1, why: "Mañana sabrás más que anoche." },
        ],
        reto: "Esta noche acuéstate a la hora. Mañana intenta recordar lo que estudiaste y fíjate cuánto quedó.",
      },
      {
        id: "n4-4",
        title: "Mi experimento",
        read: [
          "Ahora vas a ser científico de ti mismo. Escoge algo que quieras mejorar: tablas, lectura, un deporte, un juego. Escribe una hipótesis: «Si practico ___ 10 minutos cada tarde, en dos semanas voy a ___».",
          "Con tu mamá decides cómo vas a saber si funcionó. En dos semanas revisan. Si funcionó, celebras. Si no, ajustas la hipótesis. Los científicos nunca pierden, ¿recuerdas?",
        ],
        quiz: [
          { q: "¿Qué escribes?", a: ["Un deseo", "Una hipótesis con qué, cuánto y en cuánto tiempo", "Una lista"], ok: 1, why: "Si hago X durante Y, entonces Z." },
          { q: "¿Cuándo revisan?", a: ["Mañana", "En dos semanas", "Nunca"], ok: 1, why: "Hay que dar tiempo al experimento." },
          { q: "Si no funcionó…", a: ["Perdiste", "Ajustas la hipótesis", "Te rindes"], ok: 1, why: "Los científicos nunca pierden." },
        ],
        reto: "Escribe tu hipótesis con tu mamá y pongan la fecha de revisión en el calendario.",
      },
      {
        id: "n4-5",
        title: "Mira atrás: ¿qué aprendí de mí?",
        read: [
          "Semáforo verde para todo el curso. Piensa: ¿qué sabías de tu cerebro hace cuatro semanas y qué sabes ahora? ¿Qué truco usas más? ¿Cuál te falta practicar?",
          "El jefe de tu cerebro ya está entrenado. Ahora el trabajo es no dejarlo dormir: semáforo en las tareas, error favorito en la mesa y tres preguntas de noche. Con eso, aprendes lo que quieras.",
        ],
        quiz: [
          { q: "¿Qué semáforo es esta misión?", a: ["Rojo", "Amarillo", "Verde"], ok: 2, why: "Mirar atrás al terminar. Como siempre." },
          { q: "¿Cuáles son los tres hábitos para siempre?", a: ["Leer, escribir, sumar", "Semáforo, error favorito, tres preguntas", "Dormir, comer, jugar"], ok: 1, why: "Con esos tres el jefe no se duerme." },
          { q: "Ahora puedes aprender…", a: ["Solo matemáticas", "Lo que quieras", "Nada nuevo"], ok: 1, why: "El jefe entrenado sirve para todo." },
        ],
        reto: "Cuéntale a tu mamá cuál truco usas más y cuál vas a practicar. Pídele que te cuente los suyos.",
      },
    ],
  },
];
