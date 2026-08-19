import { siteConfig } from "@/lib/site-config"

/**
 * Base de conocimiento pública de USERS — `usersKnowledgeBase`.
 *
 * ALCANCE: atiende ÚNICAMENTE a clientes de USERS, proyectos a medida de USERS
 * y dudas comerciales de USERS. ACTIIVA y MEDIICA tendrán cada uno su propia
 * base de conocimiento y su propio Centro de Atención — no mezclar respuestas,
 * productos ni soporte entre ellos.
 *
 * Es la fuente de verdad de /ayuda y, en la Fase 7, del Centro de Atención.
 * Por eso vive como datos y no dentro de un componente: el chatbot tiene que
 * poder recorrerla, filtrarla por categoría y decidir cuándo escalar sin
 * volver a parsear JSX.
 *
 * REGLAS
 *  · Solo información pública. Nada de procesos internos, credenciales,
 *    arquitectura sensible ni datos de clientes.
 *  · Ninguna política inventada. Si algo no está definido comercialmente, se
 *    marca con `needsPolicy` y la respuesta lo dice sin comprometer plazos.
 *  · Los precios se leen de siteConfig — nunca se escriben a mano.
 */

/** Qué tanto puede resolver el Centro de Atención por sí solo. */
export type ResolutionMode =
  /** Respuesta directa y cerrada. El bot la puede dar tal cual. */
  | "INFO"
  /** El bot responde y además guía por unos pasos o pide un dato. */
  | "GUIDED"
  /** Requiere criterio, acceso o cotización: escalar a una persona. */
  | "SPECIALIST"

export type KbCategoryId =
  | "empezar"
  | "durante"
  | "despues"
  | "productos"
  | "ajustes"

export interface KbCategory {
  id: KbCategoryId
  label: string
  description: string
}

export interface KbEntry {
  /** Slug estable. No cambiarlo: es el ancla pública y la referencia del bot. */
  id: string
  category: KbCategoryId
  question: string
  /** Respuesta breve primero. Para profundizar están los `related`. */
  answer: string
  mode: ResolutionMode
  /** Términos con los que alguien podría preguntar lo mismo. Moderados. */
  tags: string[]
  /** Rutas internas relacionadas. */
  related?: { label: string; href: string }[]
  /**
   * true = no existe todavía una política comercial definida para esto.
   * La respuesta pública evita comprometer plazos; el equipo debe definirla.
   */
  needsPolicy?: boolean
}

export const KB_CATEGORIES: KbCategory[] = [
  {
    id: "empezar",
    label: "Empezar un proyecto",
    description: "Qué podemos desarrollar, cómo se cotiza y cómo arranca.",
  },
  {
    id: "durante",
    label: "Durante el proyecto",
    description: "Cómo revisas avances, cambios y aprobaciones.",
  },
  {
    id: "despues",
    label: "Después de publicar",
    description: "Seguimiento, hosting, dominio, respaldos y ajustes.",
  },
  {
    id: "productos",
    label: "Productos USERS",
    description: "ACTIIVA y MEDIICA: qué son y en qué punto están.",
  },
  {
    id: "ajustes",
    label: "Soporte y ajustes",
    description: "Cambios de contenido, fallas y solicitudes nuevas.",
  },
]

const PRICE = siteConfig.pricing.startingPriceLabel
const SITE_PLAN = siteConfig.maintenancePlans.find((p) => p.id === "sitio")!
const SYS_PLAN = siteConfig.maintenancePlans.find((p) => p.id === "sistemas")!

export const KB_ENTRIES: KbEntry[] = [
  // ── EMPEZAR ────────────────────────────────────────────────────────────────
  {
    id: "que-desarrolla-users",
    category: "empezar",
    question: "¿Qué puede desarrollar USERS?",
    answer:
      "Tres frentes: presencia digital (sitios web, tiendas en línea, catálogos), operación (sistemas administrativos, puntos de venta, herramientas internas) y experiencias para tus clientes (cotizadores, portales, reservas). Puedes contratar uno solo y sumar los demás después.",
    mode: "INFO",
    tags: ["servicios", "qué hacen", "desarrollo", "software", "sistema para empresa", "página web"],
    related: [
      { label: "Ver todas las soluciones", href: "/soluciones" },
      { label: "Proyectos entregados", href: "/proyectos" },
    ],
  },
  {
    id: "como-empiezo",
    category: "empezar",
    question: "¿Cómo empiezo un proyecto con ustedes?",
    answer:
      "Hay dos caminos. Si ya sabes qué necesitas, escríbenos por WhatsApp y lo platicamos. Si todavía no lo tienes claro, el Motor de Análisis te hace las preguntas que haríamos en una primera reunión y te devuelve un diagnóstico con un estimado, sin hablar con nadie.",
    mode: "GUIDED",
    tags: ["empezar", "contratar", "primer paso", "contacto"],
    related: [
      { label: "Analizar mi negocio", href: "/analisis" },
      { label: "Central de Ayuda", href: "/ayuda" },
    ],
  },
  {
    id: "que-es-motor-analisis",
    category: "empezar",
    question: "¿Qué es el Motor de Análisis?",
    answer:
      "Una herramienta gratuita de 6 pasos. Preguntamos por tu giro, tamaño, cómo consigues clientes y qué te está costando trabajo, y te devuelve un diagnóstico, un rango de inversión desglosado por módulo y un tiempo aproximado de entrega. No requiere registro ni tarjeta.",
    mode: "GUIDED",
    tags: ["motor", "análisis", "cotizador", "diagnóstico", "gratis"],
    related: [{ label: "Hacer el análisis", href: "/analisis" }],
  },
  {
    id: "no-se-que-necesito",
    category: "empezar",
    question: "¿Tengo que saber exactamente qué necesito?",
    answer:
      "No. Es normal llegar sabiendo qué duele pero no qué lo resuelve. Parte de nuestro trabajo es traducir eso: entender cómo operas hoy y proponer qué construir, incluso si la conclusión es que todavía no necesitas desarrollar nada.",
    mode: "INFO",
    tags: ["no sé", "asesoría", "orientación", "dudas"],
    related: [{ label: "Analizar mi negocio", href: "/analisis" }],
  },
  {
    id: "cuanto-cuesta-proyecto",
    category: "empezar",
    question: "¿Cuánto cuesta un proyecto?",
    answer: `Los proyectos comienzan desde ${PRICE}. Esa cifra es un punto de entrada, no el costo de cualquier desarrollo: una landing y un sistema con roles y cobros no se parecen. El precio final depende del contenido, las funcionalidades y las integraciones.`,
    mode: "GUIDED",
    tags: ["precio", "costo", "cuánto cuesta", "presupuesto", "tarifa", "página web", "sitio web"],
    related: [
      { label: "Obtener un estimado", href: "/analisis" },
      { label: "Desarrollo web", href: "/soluciones/desarrollo-web" },
    ],
  },
  {
    id: "como-se-cotiza-software",
    category: "empezar",
    question: "¿Cómo se cotiza un software a medida?",
    answer:
      "Por alcance, no por lista. Descomponemos el sistema en módulos —usuarios y permisos, cobros, inventario, reportes, integraciones— y cada uno tiene su propio esfuerzo. Por eso no publicamos un precio fijo: sería inexacto en casi todos los casos.",
    mode: "SPECIALIST",
    tags: ["software a medida", "cotizar sistema", "precio software", "alcance"],
    related: [
      { label: "Software a medida", href: "/soluciones/software-a-medida" },
      { label: "Obtener un estimado", href: "/analisis" },
    ],
  },
  {
    id: "cuanto-tarda",
    category: "empezar",
    question: "¿Cuánto tarda un proyecto?",
    answer:
      "Un sitio informativo suele tomar entre 3 y 5 semanas. Un proyecto con reservas, cotizador, portal o panel administrativo puede tomar entre 6 y 14 semanas. El plazo exacto se define en la propuesta, después del análisis.",
    mode: "INFO",
    tags: ["tiempo", "plazo", "cuánto tarda", "entrega", "semanas"],
    related: [{ label: "Cómo trabajamos", href: "/#proceso" }],
  },
  {
    id: "que-necesito-entregar",
    category: "empezar",
    question: "¿Qué información necesitan de mí para empezar?",
    answer:
      "Para arrancar basta con el brief del negocio: qué haces, a quién le vendes y qué esperas del proyecto. Los textos, las fotos y la paleta los definimos juntos durante el proceso — no necesitas tenerlo todo listo el primer día.",
    mode: "GUIDED",
    tags: ["qué necesito", "brief", "información", "materiales", "fotos", "textos"],
  },
  {
    id: "trabajan-fuera-cdmx",
    category: "empezar",
    question: "¿Trabajan con negocios fuera de Ciudad de México?",
    answer: `Sí. Trabajamos de forma remota con clientes en toda la República: nuestros proyectos incluyen negocios en Puebla, Estado de México y ${siteConfig.contact.city}. Las sesiones de trabajo son por videollamada.`,
    mode: "INFO",
    tags: ["ubicación", "remoto", "otra ciudad", "estados", "cobertura"],
    related: [{ label: "Proyectos entregados", href: "/proyectos" }],
  },

  // ── DURANTE ────────────────────────────────────────────────────────────────
  {
    id: "como-reviso-avances",
    category: "durante",
    question: "¿Cómo reviso los avances del proyecto?",
    answer:
      "Desarrollamos por partes, con avances visibles: no tienes que esperar al final para ver algo. Antes de programar te mostramos la estructura y el diseño para que los revises, y después ves el proyecto tomando forma por etapas.",
    mode: "INFO",
    tags: ["avances", "revisar", "seguimiento", "progreso"],
    related: [{ label: "Cómo trabajamos", href: "/#proceso" }],
  },
  {
    id: "puedo-pedir-cambios",
    category: "durante",
    question: "¿Puedo pedir cambios durante el proyecto?",
    answer:
      "Sí. La etapa de diseño existe precisamente para eso: cambiar una estructura toma horas, cambiar un sistema ya construido toma semanas. Los cambios dentro de lo acordado entran en el proceso normal de revisión.",
    mode: "GUIDED",
    tags: ["cambios", "modificaciones", "revisiones", "ajustes"],
    related: [{ label: "Si cambia el alcance", href: "/ayuda#cambio-de-alcance" }],
  },
  {
    id: "cambio-de-alcance",
    category: "durante",
    question: "¿Qué pasa si a mitad del proyecto necesito algo que no estaba contemplado?",
    answer:
      "Se revisa por separado. Si es algo pequeño, normalmente entra. Si cambia el alcance —una funcionalidad nueva, una integración que no estaba— lo cotizamos aparte para que sepas qué implica antes de decidir, en vez de descubrirlo en la factura.",
    mode: "SPECIALIST",
    tags: ["alcance", "cambio", "agregar función", "más funciones", "costo extra"],
  },
  {
    id: "como-se-aprueban-disenos",
    category: "durante",
    question: "¿Cómo se aprueban los diseños?",
    answer:
      "Te mostramos la propuesta, nos das tus comentarios y aplicamos los cambios. El proyecto avanza a desarrollo cuando la estructura y el diseño están aprobados por ti.",
    mode: "INFO",
    tags: ["aprobar", "diseño", "validar", "feedback"],
  },
  {
    id: "entrega-de-accesos",
    category: "durante",
    question: "¿Cómo se entregan los accesos al final?",
    answer:
      "Los accesos que corresponden a cada proyecto se coordinan durante el cierre y la entrega. El proceso exacto depende de los servicios e infraestructura involucrados, así que lo revisamos contigo caso por caso.",
    mode: "SPECIALIST",
    tags: ["accesos", "credenciales", "entrega", "dominio", "propiedad"],
  },

  // ── DESPUÉS ────────────────────────────────────────────────────────────────
  {
    id: "que-es-el-seguimiento",
    category: "despues",
    question: "¿Qué es el seguimiento y para qué sirve?",
    answer:
      "Es el mantenimiento después del lanzamiento. Un proyecto publicado necesita hosting, dominio activo, respaldos y actualizaciones de seguridad; si además es un sistema con usuarios y datos, necesita monitoreo. Todos los proyectos incluyen soporte el primer mes; después el seguimiento es opcional y sin contrato forzoso.",
    mode: "INFO",
    tags: ["mantenimiento", "seguimiento", "soporte", "después"],
    related: [{ label: "Ver planes", href: "/#seguimiento" }],
  },
  {
    id: "plan-sitio",
    category: "despues",
    question: "¿Qué incluye el plan Sitio?",
    answer: `${SITE_PLAN.forWhat}. Cuesta $${SITE_PLAN.price.toLocaleString("en-US")} ${SITE_PLAN.priceNote} e incluye: ${SITE_PLAN.features.join(", ").toLowerCase()}.`,
    mode: "INFO",
    tags: ["plan sitio", "mantenimiento web", "399", "hosting"],
    related: [{ label: "Ver planes", href: "/#seguimiento" }],
  },
  {
    id: "plan-sistemas",
    category: "despues",
    question: "¿Qué incluye el plan Sistemas?",
    answer: `${SYS_PLAN.forWhat}. Empieza desde $${SYS_PLAN.price.toLocaleString("en-US")} ${SYS_PLAN.priceNote}, dependiendo de las necesidades del proyecto. Según el alcance puede incluir: ${SYS_PLAN.features.join(", ").toLowerCase()}. El costo final depende de la infraestructura, el alcance y el nivel de soporte.`,
    mode: "SPECIALIST",
    tags: ["plan sistemas", "mantenimiento software", "mantener sistema", "costo mensual", "1290", "monitoreo"],
    related: [{ label: "Cotizar seguimiento", href: "/analisis" }],
  },
  {
    id: "hosting-y-dominio",
    category: "despues",
    question: "¿Quién paga el hosting y el dominio?",
    answer:
      "Están incluidos en los planes de seguimiento. Si no contratas un plan, el hosting y el dominio quedan a tu cargo y hay que renovarlos cada año directamente con el proveedor — si vencen, el sitio deja de estar en línea.",
    mode: "GUIDED",
    tags: ["hosting", "dominio", "renovación", "quién paga", "anual"],
    related: [{ label: "Ver planes", href: "/#seguimiento" }],
  },
  {
    id: "sin-plan-de-seguimiento",
    category: "despues",
    question: "¿Qué pasa si no contrato seguimiento?",
    answer:
      "El proyecto sigue siendo tuyo y sigue funcionando. Lo que queda de tu lado es mantener vigentes el hosting y el dominio, y encargarte de respaldos y actualizaciones. Puedes contratar un plan después, en cualquier momento.",
    mode: "INFO",
    tags: ["sin plan", "no contratar", "cancelar", "por mi cuenta"],
  },
  {
    id: "respaldos",
    category: "despues",
    question: "¿Se hacen respaldos de mi sitio o sistema?",
    answer:
      "La frecuencia y el alcance de los respaldos dependen del tipo de solución y del plan de seguimiento contratado. Podemos revisar contigo qué nivel necesita tu proyecto.",
    mode: "SPECIALIST",
    tags: ["respaldo", "backup", "copia de seguridad", "datos"],
  },

  // ── PRODUCTOS ──────────────────────────────────────────────────────────────
  {
    id: "que-es-actiiva",
    category: "productos",
    question: "¿Qué es ACTIIVA?",
    answer:
      "Un producto propio de USERS para negocios fitness —gimnasios boutique, estudios y entrenadores— con membresías, reservas y cobros en un solo lugar. Está en desarrollo: todavía no está disponible al público ni tiene precio publicado. Si tienes un gimnasio y necesitas resolver algo ahora, el camino es desarrollo a la medida.",
    mode: "INFO",
    tags: ["actiiva", "gimnasio", "fitness", "producto propio", "plataforma"],
    related: [
      { label: "Ver productos USERS", href: "/productos" },
      { label: "Caso Greek Gym", href: "/proyectos/greek-gym" },
    ],
  },
  {
    id: "que-es-mediica",
    category: "productos",
    question: "¿Qué es MEDIICA?",
    answer:
      "Un producto propio de USERS para consultorios y clínicas: agenda de citas, expediente e historial de pacientes. Está en desarrollo y en una etapa más temprana que ACTIIVA. Todavía no está disponible ni tiene precio publicado.",
    mode: "INFO",
    tags: ["mediica", "consultorio", "clínica", "salud", "producto", "citas"],
    related: [{ label: "Ver productos USERS", href: "/productos" }],
  },
  {
    id: "diferencia-producto-y-medida",
    category: "productos",
    question: "¿Cuál es la diferencia entre un producto USERS y un desarrollo a la medida?",
    answer:
      "Un desarrollo a la medida se construye alrededor de tu negocio y es la mayor parte de lo que hacemos. Un producto USERS es software que desarrollamos para un sector completo: si tu operación encaja, sale más rápido; si no, conviene el desarrollo propio.",
    mode: "INFO",
    tags: ["diferencia", "producto vs medida", "cuál elijo", "saas"],
    related: [
      { label: "Productos USERS", href: "/productos" },
      { label: "Soluciones a medida", href: "/soluciones" },
    ],
  },
  {
    id: "avisar-cuando-este-lista",
    category: "productos",
    question: "¿Me pueden avisar cuando ACTIIVA o MEDIICA estén disponibles?",
    answer:
      "Sí. Escríbenos por WhatsApp diciéndonos cuál te interesa y te avisamos cuando abramos acceso.",
    mode: "GUIDED",
    tags: ["avisar", "lista de espera", "cuándo sale", "disponible", "lanzamiento"],
    related: [{ label: "Ver productos USERS", href: "/productos" }],
  },

  // ── AJUSTES Y SOPORTE ──────────────────────────────────────────────────────
  {
    id: "cambiar-texto",
    category: "ajustes",
    question: "Necesito cambiar un texto de mi sitio",
    answer:
      "Es un ajuste simple. Mándanos qué dice hoy y qué debe decir, con la página donde está. Si tienes plan de seguimiento entra dentro de tus cambios de contenido; si no, se cotiza como ajuste puntual.",
    mode: "GUIDED",
    tags: ["cambiar texto", "editar", "corregir", "contenido", "redacción"],
  },
  {
    id: "cambiar-imagen",
    category: "ajustes",
    question: "Necesito cambiar una imagen o una foto",
    answer:
      "También es un ajuste simple. Envíanos la imagen nueva en la mejor calidad que tengas e indícanos cuál reemplaza. Nosotros la optimizamos para que no afecte la velocidad del sitio.",
    mode: "GUIDED",
    tags: ["cambiar imagen", "foto", "logo", "banner", "reemplazar"],
  },
  {
    id: "cambiar-datos-contacto",
    category: "ajustes",
    question: "Cambió mi teléfono, correo o dirección",
    answer:
      "Ajuste simple, pero avísanos con calma: los datos de contacto suelen aparecer en varios lugares —encabezado, pie de página, botón de WhatsApp, formularios y metadatos— y conviene cambiarlos todos a la vez.",
    mode: "GUIDED",
    tags: ["teléfono", "correo", "dirección", "datos de contacto", "whatsapp"],
  },
  {
    id: "nueva-seccion",
    category: "ajustes",
    question: "Quiero agregar una sección nueva a mi sitio",
    answer:
      "Requiere revisión: una sección implica diseño, contenido y a veces cambios en la navegación. Cuéntanos qué quieres lograr con ella y te decimos qué implica antes de que decidas.",
    mode: "SPECIALIST",
    tags: ["nueva sección", "agregar página", "ampliar sitio"],
  },
  {
    id: "nueva-funcionalidad",
    category: "ajustes",
    question: "Quiero agregar una funcionalidad nueva (reservas, pagos, portal)",
    answer:
      "Es un cambio de alcance y se cotiza aparte. Cuéntanos qué necesita hacer el usuario y nosotros evaluamos cómo encaja con lo que ya está construido: muchas veces se puede sumar sin rehacer nada.",
    mode: "SPECIALIST",
    tags: ["reservas", "reservaciones", "citas", "pagos", "portal", "funcionalidad", "agregar función", "integrar"],
    related: [
      { label: "Ver soluciones", href: "/soluciones" },
      { label: "Cotizar", href: "/analisis" },
    ],
  },
  {
    id: "algo-dejo-de-funcionar",
    category: "ajustes",
    question: "Algo dejó de funcionar en mi sitio o sistema",
    answer:
      "Escríbenos por WhatsApp con tres datos: qué estabas haciendo, qué esperabas que pasara y qué pasó en su lugar. Si puedes, adjunta una captura y dinos desde qué dispositivo. Con eso podemos empezar a revisar sin pedirte información de ida y vuelta.",
    mode: "SPECIALIST",
    tags: ["error", "falla", "no funciona", "caído", "roto", "bug", "urgente"],
  },
  {
    id: "perdi-un-acceso",
    category: "ajustes",
    question: "Perdí un acceso o una contraseña",
    answer:
      "Escríbenos por WhatsApp desde el contacto registrado del proyecto y te indicamos cómo recuperarlo. Por seguridad no compartimos ni restablecemos credenciales por canales no verificados, y nunca te vamos a pedir tu contraseña.",
    mode: "SPECIALIST",
    tags: ["contraseña", "acceso", "login", "no puedo entrar", "recuperar"],
  },
  {
    id: "cambiar-dominio",
    category: "ajustes",
    question: "Quiero cambiar o conectar un dominio",
    answer:
      "Requiere revisión. Es un cambio delicado: mal hecho puede dejar el sitio fuera de línea o afectar tu posicionamiento y tu correo. Dinos qué dominio quieres usar y si ya lo tienes contratado, y lo planeamos.",
    mode: "SPECIALIST",
    tags: ["dominio", "url", "cambiar dirección", "dns", "comprar dominio"],
  },
  {
    id: "ayuda-con-correo",
    category: "ajustes",
    question: "Necesito ayuda con el correo de mi dominio",
    answer:
      "Requiere revisión, porque el correo depende de la configuración del dominio y del proveedor que uses. Cuéntanos qué necesitas —crear una cuenta, dejar de recibir mensajes, migrar— y qué proveedor tienes.",
    mode: "SPECIALIST",
    tags: ["correo", "email", "no llegan correos", "cuenta de correo"],
  },
  {
    id: "integrar-herramienta",
    category: "ajustes",
    question: "Quiero integrar una herramienta que ya uso",
    answer:
      "Se puede evaluar, siempre que la herramienta ofrezca una forma de conectarse. Dinos cuál es y qué necesitas que pase entre las dos; lo revisamos antes de comprometer nada, porque no todas las herramientas lo permiten.",
    mode: "SPECIALIST",
    tags: ["integración", "conectar", "api", "herramienta", "sincronizar"],
    related: [{ label: "Software a medida", href: "/soluciones/software-a-medida" }],
  },
  {
    id: "hablar-con-persona",
    category: "ajustes",
    question: "Quiero hablar con una persona",
    answer: `Escríbenos por WhatsApp al ${siteConfig.contact.whatsappDisplay} o por correo a ${siteConfig.contact.email}. Atendemos ${siteConfig.contact.hours.toLowerCase()}.`,
    mode: "SPECIALIST",
    tags: ["asesor", "humano", "persona", "hablar", "contacto", "llamar"],
  },

  // ── CONTRATACIÓN Y CONDICIONES ─────────────────────────────────────────────
  {
    id: "como-se-paga",
    category: "empezar",
    question: "¿Cómo son los pagos? ¿Hay anticipo?",
    answer:
      "Trabajamos con esquema 60/40: 60% al iniciar el proyecto y 40% al entregarlo. El pago final se libera cuando apruebas el resultado, no antes.",
    mode: "INFO",
    tags: ["pago", "anticipo", "60/40", "cómo se paga", "forma de pago", "depósito"],
  },
  {
    id: "facturacion",
    category: "empezar",
    question: "¿Emiten factura?",
    answer:
      "Sí. Coméntanos desde el inicio que la necesitas y con qué datos fiscales, para considerarlo en la propuesta.",
    mode: "GUIDED",
    tags: ["factura", "facturación", "cfdi", "rfc", "comprobante fiscal", "impuestos"],
  },
  {
    id: "hay-contrato",
    category: "empezar",
    question: "¿Hay contrato?",
    answer:
      "Antes de arrancar dejamos por escrito el alcance, los tiempos y las condiciones acordadas, para que ambas partes sepan qué incluye el proyecto y qué no. Los detalles se revisan contigo según el tipo de proyecto.",
    mode: "SPECIALIST",
    tags: ["contrato", "acuerdo", "por escrito", "condiciones", "términos"],
  },
  {
    id: "propiedad-del-proyecto",
    category: "despues",
    question: "¿El proyecto es mío? ¿Qué pasa si me voy con otro proveedor?",
    answer:
      "El proyecto que pagaste es tuyo, incluidos sus datos. Si en algún momento decides trabajar con alguien más, coordinamos la entrega de lo que corresponda a tu proyecto. Los detalles dependen de los servicios e infraestructura involucrados, así que se revisan caso por caso.",
    mode: "SPECIALIST",
    tags: ["propiedad", "código", "es mío", "me llevo el proyecto", "cambiar proveedor", "migrar"],
  },
  {
    id: "cancelar-seguimiento",
    category: "despues",
    question: "¿Puedo cancelar el plan de seguimiento?",
    answer:
      "Sí, no hay contrato forzoso. Al cancelar, el hosting, el dominio, los respaldos y las actualizaciones quedan a tu cargo. Avísanos con tiempo para coordinar la transición sin que el sitio quede fuera de línea.",
    mode: "GUIDED",
    tags: ["cancelar", "dar de baja", "terminar plan", "renovar", "suscripción"],
  },

  // ── LANZAMIENTO Y OPERACIÓN ────────────────────────────────────────────────
  {
    id: "que-pasa-al-publicar",
    category: "durante",
    question: "¿Qué pasa el día que publicamos?",
    answer:
      "Publicamos el proyecto, configuramos el dominio y el hosting, verificamos que todo funcione en móvil y escritorio, y te entregamos el manual de uso de tu plataforma. A partir de ahí corre el mes de soporte incluido.",
    mode: "INFO",
    tags: ["publicar", "lanzar", "salir en vivo", "puesta en marcha", "go live"],
  },
  {
    id: "capacitacion-equipo",
    category: "durante",
    question: "¿Nos capacitan para usar el sistema?",
    answer:
      "Sí. Al entregar te mostramos cómo usar la plataforma y recibes un manual de uso. Si tu equipo es grande o entra personal nuevo con frecuencia, lo platicamos para ver qué formato conviene.",
    mode: "GUIDED",
    tags: ["capacitación", "entrenar", "manual", "enseñar", "cómo se usa", "onboarding"],
  },
  {
    id: "que-reviso-antes-de-aprobar",
    category: "durante",
    question: "¿Qué debo revisar antes de aprobar?",
    answer:
      "Que la información sea correcta —precios, datos de contacto, textos—, que los formularios y botones lleven a donde deben, y que se vea bien en tu teléfono. Nosotros probamos la parte técnica; tú eres quien puede validar que el contenido diga la verdad de tu negocio.",
    mode: "GUIDED",
    tags: ["revisar", "aprobar", "pruebas", "qué checo", "validar", "testing"],
  },
  {
    id: "puedo-editar-yo",
    category: "despues",
    question: "¿Puedo editar el contenido yo mismo?",
    answer:
      "Depende de cómo esté construido tu proyecto. Algunos incluyen un panel para editar textos e imágenes; otros se actualizan a través de nosotros. Lo definimos durante el proyecto según qué tan seguido necesites cambiar cosas.",
    mode: "SPECIALIST",
    tags: ["editar", "administrar", "cambiar yo", "panel", "cms", "autonomía"],
  },

  // ── INCIDENTES Y CRECIMIENTO ───────────────────────────────────────────────
  {
    id: "sitio-lento",
    category: "ajustes",
    question: "Mi sitio va lento",
    answer:
      "Requiere revisión. La causa puede estar en imágenes muy pesadas, en el hosting o en algo que se agregó después del lanzamiento. Escríbenos indicando desde qué dispositivo y conexión lo notas, y lo revisamos.",
    mode: "SPECIALIST",
    tags: ["lento", "tarda", "velocidad", "carga", "rendimiento", "performance"],
  },
  {
    id: "sitio-comprometido",
    category: "ajustes",
    question: "Creo que mi sitio fue hackeado o muestra contenido extraño",
    answer:
      "Escríbenos de inmediato por WhatsApp y no hagas cambios por tu cuenta mientras tanto. Necesitamos revisar qué se ve afectado antes de tocar nada. Si tienes plan de seguimiento, las actualizaciones de seguridad ya están incluidas.",
    mode: "SPECIALIST",
    tags: ["hackeado", "hackearon", "virus", "seguridad", "contenido extraño", "spam", "urgente"],
  },
  {
    id: "escalar-sistema",
    category: "ajustes",
    question: "Mi negocio creció, ¿el sistema aguanta más usuarios o sucursales?",
    answer:
      "Es de las razones más comunes para volver a hablar. Construimos pensando en que el proyecto pueda crecer, pero cuánto y cómo depende de lo que se construyó. Cuéntanos qué cambió en tu operación y lo evaluamos.",
    mode: "SPECIALIST",
    tags: ["escalar", "crecer", "más usuarios", "más sucursales", "más volumen", "agregar módulo"],
    related: [{ label: "Software a medida", href: "/soluciones/software-a-medida" }],
  },

  // ── CONFIANZA ──────────────────────────────────────────────────────────────
  {
    id: "referencias-clientes",
    category: "empezar",
    question: "¿Puedo ver proyectos que hayan hecho?",
    answer:
      "Sí. Publicamos nuestros casos con lo que construimos en cada uno: Greek Gym (sitio, reservas y sistema administrativo), Llevelín (punto de venta para un supermercado) y Las Frescas (sitio y cotizador).",
    mode: "INFO",
    tags: ["referencias", "portafolio", "casos", "clientes", "ejemplos", "trabajos previos"],
    related: [{ label: "Ver proyectos", href: "/proyectos" }],
  },
]

export function entriesByCategory(category: KbCategoryId): KbEntry[] {
  return KB_ENTRIES.filter((e) => e.category === category)
}

export function getEntry(id: string): KbEntry | undefined {
  return KB_ENTRIES.find((e) => e.id === id)
}

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

/**
 * Palabras que aparecen en casi cualquier pregunta y solo generan ruido.
 * Sin esto, "¿pueden hacer un sistema para mi empresa?" empataba con
 * cualquier entrada que contuviera "un" o "para".
 */
const STOPWORDS = new Set([
  "que", "qué", "es", "un", "una", "unos", "unas", "el", "la", "los", "las",
  "mi", "mis", "me", "de", "del", "para", "con", "por", "como", "cómo",
  "cuanto", "cuánto", "cuanta", "cuánta", "quiero", "necesito", "puedo",
  "pueden", "puede", "hacer", "tengo", "hay", "y", "o", "en", "a", "al",
  "se", "su", "sus", "tu", "tus", "lo", "le", "si", "no", "ya", "muy",
])

/**
 * Búsqueda ligera sobre pregunta, respuesta y tags.
 *
 * Compara por raíz de 5 caracteres, no por cadena exacta: así "mantener"
 * encuentra "mantenimiento" y "reservaciones" encuentra "reservas", que es
 * como la gente escribe de verdad.
 *
 * La Fase 7 puede sustituirla por búsqueda semántica sin cambiar la forma de
 * los datos — solo esta función.
 */
export function searchEntries(query: string): KbEntry[] {
  const terms = norm(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t))

  if (terms.length === 0) return []

  /** Raíz corta: suficiente para unir variantes sin confundir palabras. */
  const stem = (t: string) => t.slice(0, 5)

  const matches = (field: string, term: string) => {
    const s = stem(term)
    return norm(field)
      .split(/[^a-z0-9]+/)
      .some((w) => w.length >= 3 && w.startsWith(s))
  }

  return KB_ENTRIES.map((entry) => {
    let matched = 0
    const score = terms.reduce((acc, term) => {
      let best = 0
      if (entry.tags.some((t) => matches(t, term))) best = 5
      else if (matches(entry.question, term)) best = 4
      else if (matches(entry.answer, term)) best = 1
      if (best > 0) matched++
      return acc + best
    }, 0)
    // Cubrir más términos de la pregunta pesa más que pegar fuerte en uno solo:
    // "mi página dejó de funcionar" debe ganarle a cualquier entrada que solo
    // mencione "página".
    return { entry, score: score * (matched / terms.length) }
  })
    .filter((r) => r.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry)
}

/**
 * Alias con nombre explícito. El Centro de Atención de la Fase 7B debe
 * consumir `usersKnowledgeBase` para que quede claro de qué base habla cuando
 * existan las de ACTIIVA y MEDIICA.
 */
export const usersKnowledgeBase = KB_ENTRIES
