export type BlogSection = {
  heading?: string
  body: string
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  author: string
  thumbnail: string
  readingTime: string
  intro: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "por-que-tu-negocio-necesita-mas-que-un-sitio-web-bonito",
    title: "Por qué tu negocio necesita más que un sitio web bonito",
    date: "Julio 2026",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-1.webp",
    readingTime: "5 min",
    intro:
      "Un sitio web que se ve bien pero no convierte es lo mismo que una tienda bien decorada con la puerta cerrada. El problema no es el diseño: es la estrategia detrás de él.",
    sections: [
      {
        heading: "El error más común de las PyMEs mexicanas",
        body: `Cada semana hablamos con dueños de negocio que tienen sitios web modernos, bien fotografiados, con paleta de colores consistente y hasta animaciones — y sin embargo no generan ni un solo cliente nuevo al mes. La queja es siempre la misma: "Invertí en el sitio, pero no me sirve de nada."

El problema casi nunca es el diseño. El problema es que el sitio fue construido para verse bien en el portafolio del diseñador, no para funcionar dentro de tu negocio.

Un sitio web es una herramienta de ventas. Como cualquier herramienta, si no sabes para qué la vas a usar antes de pedirla, terminas con algo que no resuelve nada.`,
      },
      {
        heading: "¿Qué tiene que hacer un sitio web en realidad?",
        body: `Antes de hablar de colores, tipografías o animaciones, un buen sitio tiene que responder tres preguntas en los primeros 5 segundos en que alguien lo visita:

¿Qué ofrece este negocio? ¿Es para mí? ¿Qué tengo que hacer ahora?

Si tu visitante no puede responder esas tres preguntas sin leer más de tres líneas, ya perdiste su atención. Y en México, donde el 70% del tráfico web viene de celular y la conexión promedio no es la mejor, tienes aún menos margen.

Además de eso, tu sitio tiene que hacer trabajo real: capturar datos de contacto, generar conversaciones en WhatsApp, mostrar casos reales, responder objeciones frecuentes y posicionarte en Google para que te encuentren cuando te estén buscando.`,
      },
      {
        heading: "La diferencia entre diseño y estrategia",
        body: `El diseño responde a la pregunta "¿cómo se ve?". La estrategia responde a "¿para qué sirve y cómo se va a usar?". Separar las dos es el error más costoso que puede cometer una empresa.

Cuando contratas un diseñador sin estrategia, obtienes algo bonito. Cuando contratas desarrollo sin diseño, obtienes algo funcional pero poco convincente. Cuando hay estrategia detrás de los dos, obtienes algo que trabaja para ti mientras tú estás atendiendo otros asuntos.

La estrategia incluye saber qué tipo de cliente quieres atraer, qué les preocupa, qué palabras usan para buscar tus servicios, qué los hace dudar antes de contactarte y cómo puedes eliminar esa duda desde el sitio.`,
      },
      {
        heading: "Lo que hacemos diferente en users.mx",
        body: `Antes de escribir una sola línea de código o diseñar una sola pantalla, pasamos tiempo entendiendo tu negocio. No con formularios genéricos, sino con preguntas reales: ¿quién es tu cliente ideal? ¿Cuántos clientes al mes necesitas para que el proyecto se pague solo? ¿Qué te preguntan siempre antes de contratarte?

Con eso construimos la estructura del sitio — lo que va en cada sección, qué mensaje lleva cada botón, cómo se mueve el usuario desde que llega hasta que te contacta.

El diseño visual viene después, y sirve para reforzar esa estructura, no para reemplazarla.

El resultado no es un sitio que impresiona en capturas de pantalla. Es un sitio que atrae clientes.`,
      },
      {
        heading: "¿Cómo saber si tu sitio necesita más que rediseño?",
        body: `Hazte estas preguntas: ¿Sabes cuántas personas visitan tu sitio cada mes? ¿De ellas, cuántas te contactan? ¿Cuántas terminan comprando? Si no tienes esos números, el problema no es el diseño — es que el sitio nunca fue construido con métricas de negocio en mente.

Si tu tasa de conversión (visitantes que te contactan) es menor al 2%, hay trabajo por hacer. Si no sabes cuál es tu tasa de conversión, eso también dice algo.

En users.mx hacemos un análisis gratuito de tu negocio digital que empieza precisamente con esas preguntas. En 6 pasos sabes dónde estás, qué te falta y cuánto costaría resolverlo. Sin compromiso, sin ventas agresivas.`,
      },
    ],
  },
  {
    slug: "como-sofit-resolvio-el-problema-de-administracion-de-un-gimnasio-real",
    title: "Cómo SoFit resolvió el problema de administración de un gimnasio real",
    date: "Julio 2026",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-2.webp",
    readingTime: "6 min",
    intro:
      "SoFit no nació en una incubadora ni de una investigación de mercado. Nació de ver a dueños de gimnasio usar hojas de Excel para cobrar mensualidades y WhatsApp para coordinar clases. Esto es lo que encontramos y cómo lo resolvimos.",
    sections: [
      {
        heading: "El problema que nadie estaba resolviendo bien",
        body: `En México hay miles de gimnasios boutique, estudios de yoga, boxes de CrossFit y estudios de pilates. La mayoría los maneja una o dos personas que también entrenan, venden, cobran, coordinan y responden mensajes.

Las soluciones que existían en el mercado eran dos: software estadounidense caro y complejo, o nada. Los dueños terminaban en un punto medio doloroso: WhatsApp para agendar, transferencias bancarias para cobrar, hojas de cálculo para llevar asistencia y mucha energía gastada en tareas administrativas que no generan valor.

Cuando un cliente nuestro con un gimnasio en Monterrey nos dijo que pasaba cuatro horas al día en esas tareas, supimos que valía la pena construir algo desde cero.`,
      },
      {
        heading: "Cómo construimos SoFit",
        body: `Pasamos dos meses hablando con dueños de gimnasio antes de escribir una sola línea de código. No les preguntamos qué funciones querían en un software — les preguntamos qué hacían el lunes por la mañana, qué les quitaba el sueño y qué pasaba cuando un alumno dejaba de pagar.

Las respuestas fueron consistentes: el mayor problema no era la tecnología, era el tiempo. Tiempo para cobrar, tiempo para recordarle a los alumnos que su mensualidad vencía, tiempo para saber quién había venido esta semana y quién llevaba diez días sin aparecer.

Con eso en mente construimos SoFit alrededor de tres principios: que todo lo urgente se maneje solo, que la información importante esté visible de inmediato y que el dueño pueda operar desde su celular sin capacitación.`,
      },
      {
        heading: "Las funciones que marcaron la diferencia",
        body: `El cobro automático fue lo que más impacto tuvo. Los gimnasios con cobro manual dejan escapar entre el 15% y el 25% de sus ingresos mensuales por olvidos, vergüenza de cobrar o alumnos que prometen y no pagan. SoFit genera el cargo automáticamente y envía un aviso por WhatsApp — sin que el dueño tenga que hacer nada.

El portal de socios fue la segunda gran diferencia. Los alumnos pueden ver su historial de asistencia, reservar clases, ver qué días hay cupo y renovar su membresía desde su teléfono. El gimnasio deja de ser el intermediario de información y se convierte en el proveedor de la experiencia.

El dashboard de negocio fue el tercer impacto. Por primera vez, los dueños podían ver de un vistazo cuántos alumnos activos tenían, cuántos estaban a punto de vencer, cuál era su ingreso del mes y cuánto creció respecto al anterior.`,
      },
      {
        heading: "Lo que aprendimos del primer año",
        body: `Los primeros clientes de SoFit nos enseñaron cosas que no anticipamos. El módulo que más usaban no era el de cobros automáticos — era el de seguimiento de asistencia. Ver qué alumnos estaban desapareciendo y poder mandarles un mensaje antes de que cancelaran cambió la retención de manera significativa.

También aprendimos que la adopción del software dependía de lo sencillo que fuera para el alumno, no solo para el dueño. Si el proceso de reservar una clase era complicado, los alumnos seguían mandando mensaje por WhatsApp. La simpleza del portal público fue lo que desbloqueó el uso real de la plataforma.

Esos aprendizajes se convirtieron en mejoras de producto que siguieron iterando en los meses siguientes.`,
      },
      {
        heading: "¿Qué significa esto para tu gimnasio?",
        body: `Si tienes un gimnasio, estudio o espacio fitness en México, SoFit está construido exactamente para tu contexto: cobro en pesos, notificaciones por WhatsApp, interfaz en español y soporte que entiende cómo funciona un negocio fitness en la región.

No es un software americano adaptado. Es una plataforma construida desde conversaciones con dueños de gimnasio mexicanos, con las funciones que ellos necesitaban, al precio que tiene sentido para su tamaño de negocio.

Empieza desde $599 MXN al mes, sin contratos anuales, con onboarding incluido. Si tu gimnasio tiene más de 20 alumnos activos, el ahorro en tiempo y la reducción de cuentas por cobrar lo hacen rentable en el primer mes.`,
      },
    ],
  },
  {
    slug: "el-costo-real-de-no-tener-un-sistema-de-gestion-para-tu-negocio",
    title: "El costo real de no tener un sistema de gestión para tu negocio",
    date: "Junio 2026",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-3.webp",
    readingTime: "5 min",
    intro:
      "No tener un sistema de gestión tiene un costo que rara vez se contabiliza: tiempo perdido, errores humanos, clientes que se van y oportunidades que no se ven. Este artículo pone números concretos a ese costo.",
    sections: [
      {
        heading: "El costo invisible del caos operativo",
        body: `Cuando preguntamos a dueños de negocio cuánto les cuesta no tener un sistema, la respuesta habitual es "no sé" o "algo, supongo". Nadie lleva la cuenta porque el costo está distribuido en cientos de pequeñas fricciones cotidianas: el tiempo que tardas en encontrar una factura, el cliente que no volvió porque no le llegó el recordatorio, la cotización que nunca enviaste porque no tenías el número guardado.

Cada uno de esos eventos parece menor. La suma de todos ellos, mes con mes, es lo que distingue a un negocio que crece de uno que se mantiene estático.`,
      },
      {
        heading: "El costo del tiempo",
        body: `Un estudio de procesos que hacemos como parte del Motor de Análisis de Negocio muestra que el dueño promedio de una PyME mexicana gasta entre 2 y 4 horas diarias en tareas administrativas repetitivas: responder las mismas preguntas, hacer seguimiento de cobros, actualizar inventarios manualmente, coordinar agenda por WhatsApp.

Si tu hora vale $300 MXN (conservador para alguien que opera un negocio), 3 horas diarias de tareas que un sistema podría automatizar equivalen a $900 MXN al día, $27,000 MXN al mes, $324,000 MXN al año.

¿Cuánto cuesta un sistema que automatiza esas tareas? En la mayoría de los casos, menos de lo que estás perdiendo en un mes.`,
      },
      {
        heading: "El costo del error humano",
        body: `Los procesos manuales tienen tasas de error que los sistemas digitales eliminan casi completamente. Un cobro mal registrado, un pedido con cantidad equivocada, una cita agendada dos veces en el mismo horario — cada uno de esos errores tiene un costo directo (reembolso, merma, cliente molesto) y un costo indirecto (reputación, tiempo para resolverlo, estrés).

Las empresas que migran de procesos manuales a sistemas digitales reportan consistentemente reducciones del 60% al 80% en errores operativos en los primeros tres meses. No porque el equipo mejore — sino porque el sistema no comete los errores que los humanos sí.`,
      },
      {
        heading: "El costo de los clientes perdidos",
        body: `Este es el costo más difícil de ver pero el más grande. Un cliente que tuvo una mala experiencia de servicio — porque no le llegó la confirmación, porque cobró mal, porque nadie le dio seguimiento — no siempre se queja. Simplemente no vuelve.

En negocios de servicios, donde el valor del cliente está en la recurrencia, perder un cliente por fricción operativa es particularmente caro. Si tu cliente promedio te deja $1,500 MXN al mes y tienes una rotación del 10% mensual por problemas operativos, estás perdiendo el equivalente de 1.2 clientes al mes — sin contar lo que eso representa en referencias no generadas.

Un sistema que reduce la fricción operativa no solo ahorra tiempo: retiene clientes.`,
      },
      {
        heading: "¿Cuándo tiene sentido invertir en un sistema?",
        body: `La regla simple: si el costo mensual del sistema es menor que el costo mensual de no tenerlo, el sistema paga solo. Y en casi todos los casos que analizamos, el umbral se cruza mucho antes de lo que los dueños esperan.

Para una empresa con 50 clientes activos, 3 empleados y procesos manuales, un sistema de gestión bien implementado suele amortizarse en el primer o segundo mes de uso. Lo que viene después es ganancia neta: tiempo liberado para vender, crecer y atender mejor.

El Motor de Análisis de Negocio de users.mx calcula exactamente ese retorno de inversión con tus propios números, en 6 preguntas. Es gratuito y no requiere hablar con nadie hasta que tú lo decidas.`,
      },
    ],
  },
  {
    slug: "diseno-vs-desarrollo-por-que-separarlos-es-el-error-mas-caro",
    title: "Diseño vs. desarrollo: por qué separarlos es el error más caro",
    date: "Junio 2026",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-4.webp",
    readingTime: "5 min",
    intro:
      "Contratar al diseñador y al desarrollador por separado parece la opción más económica. En la mayoría de los casos, termina siendo la más cara. Aquí explicamos por qué.",
    sections: [
      {
        heading: "Por qué parece lógico separar diseño y desarrollo",
        body: `La lógica es aparente: contratas al diseñador para que haga los mockups, luego los mandas al desarrollador para que los implemente. Cada uno en su rol, cada uno cobrando por su parte, y tú supervisando el resultado.

El problema es que esta lógica supone que diseño y desarrollo son procesos secuenciales e independientes. En la práctica, son procesos interdependientes que se retroalimentan constantemente. Un diseño que no considera las restricciones técnicas es un diseño que no se puede implementar, o que cuesta el triple de lo presupuestado cuando se intenta.`,
      },
      {
        heading: "Lo que pasa cuando no se comunican",
        body: `Hemos visto este patrón docenas de veces: el diseñador entrega un archivo de Figma impecable. El desarrollador lo abre, identifica doce cosas que no se pueden hacer como están diseñadas y empieza a negociar qué se queda y qué se modifica.

Cada negociación tiene un costo: tiempo del desarrollador, revisiones del diseñador, decisiones que toma el cliente sin la información completa. Al final del proyecto, el resultado es diferente a lo que se acordó, el presupuesto se excedió y ninguno de los dos responsables tiene la culpa — simplemente no hablaban el mismo idioma desde el principio.

El cliente, que pagó por los dos, absorbe el costo de esa fricción.`,
      },
      {
        heading: "El precio real de la desincronización",
        body: `En proyectos donde diseño y desarrollo trabajan por separado sin un proceso de comunicación formal, el tiempo de iteración se duplica. Un cambio de diseño que tarda un día en un equipo integrado puede tardar una semana cuando hay que coordinar entre dos freelancers con sus propios calendarios y prioridades.

Además, la calidad del resultado final sufre. Un desarrollador que implementa diseños sin entender su intención estratégica toma decisiones de implementación que pueden comprometer la experiencia del usuario. Un diseñador que no conoce las limitaciones técnicas diseña cosas hermosas que se convierten en frustrantes cuando se usan en el celular.`,
      },
      {
        heading: "Qué significa trabajar con un equipo integrado",
        body: `En un equipo donde diseño y desarrollo comparten el mismo objetivo desde el día uno, las decisiones son diferentes. El diseñador sabe qué es fácil de implementar y qué no, así que diseña soluciones que funcionan técnicamente. El desarrollador conoce la intención detrás de cada elemento, así que implementa con criterio, no solo con instrucciones.

Cuando alguien en el equipo propone un cambio — sea visual o técnico — el impacto en ambas dimensiones se evalúa al mismo tiempo. No hay ping-pong de correos. No hay malentendidos que se descubren en la entrega final.

El resultado llega más rápido, más cerca de lo acordado y con menos sorpresas.`,
      },
      {
        heading: "Qué deberías buscar en tu próximo proveedor de desarrollo web",
        body: `Antes de contratar, pregunta cómo trabajan diseño y desarrollo en conjunto. Si la respuesta es "el diseñador entrega los archivos y el desarrollador los implementa", ya tienes la información que necesitas.

Busca equipos donde el proceso de diseño involucre al desarrollador desde el principio, y donde el desarrollador entienda los objetivos de negocio del proyecto, no solo las especificaciones técnicas.

En users.mx trabajamos con un proceso integrado desde el día uno: estrategia, diseño y desarrollo comparten el mismo brief, los mismos objetivos y el mismo criterio de éxito. Es más caro que contratar a alguien de cada lado por separado — y casi siempre resulta más barato cuando terminas de sumar todo lo que te costó la desincronización.`,
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
