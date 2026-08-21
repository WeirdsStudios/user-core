/**
 * Contenido editorial. Fuente única para /blog, /blog/[slug], el sitemap y
 * los enlaces desde las soluciones.
 *
 * REGLAS DE CONTENIDO
 *  · Ninguna cifra sin fuente verificable. Si el dato ayuda pero no tenemos
 *    fuente, se reformula sin número. Si no aporta, se elimina.
 *  · Los ejemplos numéricos se marcan como hipotéticos, no como hallazgos.
 *  · Un artículo enseña a evaluar; la landing vende. No deben competir.
 *  · Nada sobre ACTIIVA que dé a entender que ya está disponible.
 */

export type BlogCategory = "Web" | "Software" | "Operación" | "Clientes" | "Negocio"

export type BlogSection = {
  heading?: string
  body: string
}

export type BlogPost = {
  slug: string
  title: string
  category: BlogCategory
  /** ISO. Alimenta <time datetime> y datePublished del schema. */
  publishedAt: string
  /** ISO. Solo si hubo una revisión real de contenido. */
  updatedAt?: string
  author: string
  thumbnail: string
  intro: string
  sections: BlogSection[]
  /** Slug de /soluciones relacionado editorialmente. */
  relatedSolution?: string
  /** Slugs de /proyectos que ilustran el artículo. */
  relatedProjects?: string[]
}

/** Autoría institucional: es conocimiento del equipo, no de una firma individual. */
const AUTHOR = "Equipo USERS"

export const BLOG_POSTS: BlogPost[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "por-que-tu-negocio-necesita-mas-que-un-sitio-web-bonito",
    title: "Por qué tu negocio necesita más que un sitio web bonito",
    category: "Web",
    publishedAt: "2026-07-08",
    updatedAt: "2026-08-19",
    author: AUTHOR,
    thumbnail: "/imgs/blog/thumb-1.webp",
    intro:
      "Un sitio que se ve bien pero no convierte es como una tienda bien decorada con la puerta cerrada. El problema no suele ser el diseño: es la decisión de negocio detrás de él.",
    relatedSolution: "desarrollo-web",
    relatedProjects: ["greek-gym", "las-frescas"],
    sections: [
      {
        heading: "El error más común",
        body: `Cada semana hablamos con dueños de negocio que tienen sitios modernos, bien fotografiados, con paleta consistente y hasta animaciones — y que no generan ni un solo cliente nuevo al mes. La queja es siempre parecida: "invertí en el sitio, pero no me sirve de nada".

Casi nunca es culpa del diseño. El problema es que el sitio se construyó para verse bien en el portafolio de quien lo hizo, no para funcionar dentro de un negocio.

Un sitio web es una herramienta de ventas. Como cualquier herramienta, si no defines para qué la vas a usar antes de pedirla, terminas con algo que no resuelve nada.`,
      },
      {
        heading: "Las tres preguntas de los primeros segundos",
        body: `Antes de hablar de colores o tipografías, un buen sitio tiene que responder tres cosas casi de inmediato:

¿Qué ofrece este negocio? ¿Es para mí? ¿Qué hago ahora?

Si tu visitante no puede responderlas sin leer varios párrafos, ya perdiste su atención. Y como la mayoría de la gente va a llegar desde un teléfono, tienes todavía menos margen: menos pantalla, más prisa y a veces peor conexión.

Además de eso, el sitio tiene trabajo que hacer: capturar contacto, abrir conversaciones, mostrar trabajo real, responder objeciones frecuentes y ser encontrable cuando alguien te busque.`,
      },
      {
        heading: "Diseño y estrategia no son lo mismo",
        body: `El diseño responde a "¿cómo se ve?". La estrategia responde a "¿para qué sirve y cómo se va a usar?". Separarlas es caro.

Si contratas diseño sin estrategia, obtienes algo bonito. Si contratas desarrollo sin diseño, obtienes algo funcional pero poco convincente. Cuando hay una decisión de negocio detrás de ambos, obtienes algo que trabaja mientras tú atiendes otras cosas.

Esa decisión incluye saber a qué cliente quieres atraer, qué le preocupa, qué palabras usa para buscarte y qué lo hace dudar antes de escribirte.`,
      },
      {
        heading: "Cómo lo abordamos",
        body: `Antes de diseñar una pantalla, dedicamos tiempo a entender el negocio. No con formularios genéricos, sino con preguntas concretas: quién es tu cliente ideal, cuántos clientes al mes necesitas para que el proyecto se pague, qué te preguntan siempre antes de contratarte.

Con eso definimos la estructura: qué va en cada sección, qué mensaje lleva cada botón, cómo se mueve alguien desde que llega hasta que te contacta. El diseño visual viene después y refuerza esa estructura.

En Las Frescas, por ejemplo, la conclusión no fue "hace falta un sitio más bonito", sino que el cuello de botella estaba en cotizar a mano. El sitio terminó incluyendo un cotizador.`,
      },
      {
        heading: "Cómo saber si el tuyo necesita más que un rediseño",
        body: `Hazte estas preguntas: ¿sabes cuántas personas visitan tu sitio al mes? ¿Cuántas de ellas te contactan? ¿Cuántas terminan comprando?

Si no tienes esos números, el problema probablemente no es el diseño: es que el sitio nunca se construyó con métricas de negocio en mente. Y no puedes mejorar lo que no estás midiendo.

Si ya los tienes y la proporción de visitantes que te contactan te parece baja, ahí hay trabajo por hacer — pero conviene revisar primero qué tráfico estás recibiendo, porque no todo visitante es un cliente potencial.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "de-un-gimnasio-en-ecatepec-al-desarrollo-de-actiiva",
    title: "De un gimnasio en Ecatepec al desarrollo de ACTIIVA",
    category: "Negocio",
    publishedAt: "2026-07-22",
    updatedAt: "2026-08-19",
    author: AUTHOR,
    thumbnail: "/imgs/blog/thumb-2.webp",
    intro:
      "ACTIIVA no salió de una investigación de mercado. Salió de trabajar con negocios fitness reales y ver el mismo problema repetirse. Esto es lo que encontramos y en qué punto está hoy el producto.",
    relatedSolution: "software-a-medida",
    relatedProjects: ["greek-gym"],
    sections: [
      {
        heading: "El punto de partida",
        body: `En México hay miles de gimnasios boutique, estudios de yoga, boxes de CrossFit y estudios de pilates. La mayoría los opera una o dos personas que además entrenan, venden, cobran, coordinan y responden mensajes.

Las opciones de software solían ser dos: producto extranjero caro y complejo, o nada. Muchos dueños terminan en un punto medio incómodo: WhatsApp para agendar, transferencias para cobrar, hojas de cálculo para la asistencia y bastante energía gastada en tareas administrativas.

Uno de nuestros primeros acercamientos serios al segmento fue Hot Legs Cardio, un estudio fitness en Ecatepec, Estado de México. Ahí vimos de cerca cómo se va la jornada: cobrar, recordar vencimientos y saber quién había asistido. Ese trabajo fue el punto de partida para entender qué necesita de verdad un negocio fitness.`,
      },
      {
        heading: "Qué encontramos al preguntar",
        body: `Antes de escribir código pasamos tiempo hablando con dueños de gimnasio. No les preguntamos qué funciones querían en un software — esa pregunta casi siempre devuelve una lista de deseos. Les preguntamos qué hacían el lunes por la mañana, qué les quitaba el sueño y qué pasaba cuando un alumno dejaba de pagar.

Las respuestas fueron consistentes. El problema principal no era la tecnología: era el tiempo. Tiempo para cobrar, para recordar que una mensualidad venció, para saber quién vino esta semana y quién lleva días sin aparecer.`,
      },
      {
        heading: "Lo que sí construimos y entregamos",
        body: `Lo aprendido con Hot Legs Cardio se sumó después al trabajo con otros negocios del giro. El caso que podemos mostrar completo es Greek Gym, un gimnasio con dos sucursales en Puebla: sitio público, reservas por WhatsApp y un sistema administrativo con tres perfiles de acceso —Super Administrador, Administrador y Cajero—, punto de venta, catálogo, inventario y corte de caja.

Ahí quedó claro qué se repite entre negocios del mismo giro: el control de membresías, el cobro, la asistencia y la necesidad de que cada puesto vea solo lo que le corresponde.`,
      },
      {
        heading: "En qué punto está ACTIIVA",
        body: `ACTIIVA es el intento de empaquetar ese aprendizaje en un producto propio para negocios fitness, en lugar de reconstruirlo desde cero con cada cliente.

Hoy está en desarrollo. No está disponible al público, no tiene precio publicado y no vamos a describir funciones que todavía no puedas usar. Cuando esté lista aparecerá en nuestra página de productos con lo que realmente incluya.

Mientras tanto, si tienes un gimnasio o estudio y necesitas resolver algo ya, el camino es el mismo que siguió Greek Gym: desarrollo a la medida de cómo opera tu negocio.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "el-costo-real-de-no-tener-un-sistema-de-gestion-para-tu-negocio",
    title: "El costo real de no tener un sistema de gestión",
    category: "Operación",
    publishedAt: "2026-06-17",
    updatedAt: "2026-08-19",
    author: AUTHOR,
    thumbnail: "/imgs/blog/thumb-3.webp",
    intro:
      "No tener un sistema tiene un costo que rara vez se contabiliza: tiempo, errores y clientes que se van sin decir por qué. Aquí va una forma de estimarlo con tus propios números.",
    relatedSolution: "software-a-medida",
    relatedProjects: ["greek-gym", "llevelin"],
    sections: [
      {
        heading: "El costo invisible",
        body: `Cuando preguntamos a dueños de negocio cuánto les cuesta no tener un sistema, la respuesta habitual es "no sé". Nadie lleva la cuenta porque el costo está repartido en cientos de fricciones pequeñas: el tiempo que tardas en encontrar una factura, el cliente que no volvió porque no le llegó el recordatorio, la cotización que no enviaste porque no tenías el dato a la mano.

Cada evento parece menor. La suma, mes con mes, es lo que separa a un negocio que crece de uno que se queda igual.`,
      },
      {
        heading: "Cómo estimar el costo del tiempo",
        body: `En vez de darte un promedio de la industria, te proponemos hacer la cuenta con tus datos. Es más útil y no depende de que confíes en una estadística ajena.

Anota durante una semana cuánto tiempo dedican tú o tu equipo a tareas administrativas repetitivas: responder las mismas preguntas, dar seguimiento a cobros, actualizar inventario a mano, coordinar agenda por mensaje.

Después multiplica: horas al día × lo que vale esa hora × días trabajados al mes. Si el resultado te parece alto, ya tienes el número contra el que comparar el costo de un sistema. Si te parece bajo, probablemente todavía no lo necesitas — y eso también es información útil.

Un ejemplo hipotético, solo para mostrar la aritmética: 3 horas diarias valoradas en $300 MXN, sobre 22 días hábiles, dan alrededor de $19,800 MXN al mes. No es un dato de mercado: es una operación que puedes rehacer con tus cifras reales.`,
      },
      {
        heading: "El costo del error humano",
        body: `Los procesos manuales tienen errores que un sistema evita por construcción: un cobro mal registrado, un pedido con la cantidad equivocada, dos citas en el mismo horario.

Cada uno tiene un costo directo —un reembolso, una merma, un cliente molesto— y uno indirecto: el tiempo de resolverlo y el desgaste de quien lo resuelve.

No vamos a darte un porcentaje de reducción de errores, porque depende demasiado del proceso concreto. Lo que sí es estructural: un sistema no se distrae, no se salta un paso y no depende de que alguien recuerde una regla.`,
      },
      {
        heading: "El costo de los clientes que no reclaman",
        body: `Este es el más difícil de ver. Un cliente que tuvo una mala experiencia operativa —no le llegó la confirmación, se le cobró mal, nadie le dio seguimiento— no siempre se queja. Simplemente no vuelve.

En negocios donde el valor está en la recurrencia, perder un cliente por fricción operativa es especialmente caro, porque además se pierde lo que hubiera comprado después y las recomendaciones que no hizo.`,
      },
      {
        heading: "Cuándo tiene sentido invertir",
        body: `La regla es simple: si el costo mensual de operar sin sistema es mayor que el de tenerlo, el sistema se paga solo. Lo difícil no es la regla, es medir el primer número — y por eso vale la pena hacer el ejercicio de la semana.

Conviene también revisar si una herramienta que ya existe en el mercado resuelve tu caso. Muchas veces sí, y es la respuesta más barata. El desarrollo a medida tiene sentido cuando tu operación tiene reglas que ninguna herramienta contempla sin adaptaciones incómodas.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "diseno-vs-desarrollo-por-que-separarlos-es-el-error-mas-caro",
    title: "Diseño y desarrollo por separado: por qué suele salir más caro",
    category: "Negocio",
    publishedAt: "2026-06-03",
    updatedAt: "2026-08-19",
    author: AUTHOR,
    thumbnail: "/imgs/blog/thumb-4.webp",
    intro:
      "Contratar al diseñador y al desarrollador por separado parece la opción económica. Con frecuencia termina costando más. Aquí está por qué, y qué preguntar antes de contratar.",
    relatedSolution: "desarrollo-web",
    sections: [
      {
        heading: "Por qué parece lógico separarlos",
        body: `La lógica es aparente: contratas a alguien que haga los diseños, los mandas a quien programa, cada uno cobra por su parte y tú supervisas.

El problema es que supone que diseño y desarrollo son etapas independientes. En la práctica se retroalimentan. Un diseño que no considera las restricciones técnicas es un diseño que no se puede implementar tal cual, o que cuesta bastante más de lo presupuestado cuando se intenta.`,
      },
      {
        heading: "Qué pasa cuando no se hablan",
        body: `El patrón es reconocible: llega un archivo de diseño impecable, quien programa lo abre, identifica varias cosas que no se pueden hacer como están planteadas y empieza a negociar qué se queda y qué cambia.

Cada negociación cuesta: tiempo de desarrollo, revisiones de diseño y decisiones que el cliente toma sin la información completa. Al final el resultado se parece menos a lo acordado, el presupuesto se estiró y ninguno de los dos responsables tiene toda la culpa — simplemente no compartían el mismo objetivo.

Quien pagó las dos partes absorbe el costo de esa fricción.`,
      },
      {
        heading: "El costo de la desincronización",
        body: `Cuando ambas partes trabajan por separado y sin un proceso de comunicación formal, cada cambio tarda más: hay que coordinar dos calendarios y dos listas de prioridades antes de mover nada.

La calidad también sufre. Quien implementa un diseño sin entender su intención toma decisiones que pueden comprometer la experiencia. Y quien diseña sin conocer las limitaciones técnicas produce cosas que se ven bien en la presentación y se sienten mal en el teléfono.`,
      },
      {
        heading: "Qué cambia con un equipo integrado",
        body: `Cuando diseño y desarrollo comparten objetivo desde el inicio, las decisiones son distintas. Quien diseña sabe qué es costoso de implementar y propone alternativas que funcionan. Quien desarrolla conoce la intención detrás de cada elemento e implementa con criterio, no solo con instrucciones.

Cuando alguien propone un cambio, el impacto en ambas dimensiones se evalúa al mismo tiempo. Menos ida y vuelta, menos malentendidos que aparecen en la entrega.`,
      },
      {
        heading: "Qué preguntar antes de contratar",
        body: `Antes de decidir, pregunta cómo trabajan diseño y desarrollo en conjunto. Si la respuesta es "el diseñador entrega los archivos y el desarrollador los implementa", ya sabes lo que va a pasar.

Busca que quien diseña participe desde el planteamiento del problema y que quien desarrolla entienda los objetivos de negocio, no solo las especificaciones.

Y pregunta algo más concreto: qué pasa si a mitad del proyecto descubren que algo no se puede hacer como se diseñó. La respuesta te dice bastante sobre cómo trabajan de verdad.`,
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

/** Más recientes primero. */
export function postsByDate(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** Estimación a ~200 palabras por minuto, calculada del contenido real. */
export function readingTime(post: BlogPost): string {
  const words = [post.intro, ...post.sections.map((s) => `${s.heading ?? ""} ${s.body}`)]
    .join(" ")
    .trim()
    .split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
