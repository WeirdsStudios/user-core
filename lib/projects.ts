/**
 * Casos reales de cliente. Fuente única para /proyectos, /proyectos/[slug],
 * el bloque de casos de la home y el sitemap.
 *
 * REGLA: aquí solo entra trabajo hecho PARA UN CLIENTE. ACTIIVA es
 * productos propios de USERS y viven en siteConfig.products — mezclarlos aquí
 * haría parecer que son clientes.
 *
 * REGLA: nada de cifras de negocio (ingresos, transacciones, sucursales…) que
 * no podamos comprobar. Se describe alcance funcional, que sí es verificable.
 */

import type { MediaSlot } from "@/lib/media"

/** @deprecated Usa MediaSlot. Se mantiene el alias para no romper imports. */
export type ProjectAsset = MediaSlot

export interface Project {
  slug: string
  name: string
  /** Giro, para el índice y los breadcrumbs. */
  industry: string
  location?: string
  /** Una línea: qué se construyó. Se usa en home e índice. */
  built: string
  /** Una línea: qué problema se digitalizó. */
  summary: string
  /** Etiquetas de alcance. */
  scope: string[]
  externalUrl?: string
  externalLabel?: string

  // ── Página de detalle ──
  context: string
  challenge: string
  solution: { label: string; body: string }[]
  /** Qué demuestra este caso sobre las capacidades de USERS. */
  demonstrates: string[]
  assets: MediaSlot[]
  /**
   * Clip corto para la rejilla de casos.
   *
   * En la home y en /proyectos el material se ve pequeño y compite con otras
   * dos tarjetas: ahí conviene un fragmento breve que se entienda de un
   * vistazo, no la escena completa de la página de detalle. Si no se define,
   * se usa el primer asset.
   */
  preview?: MediaSlot

  /** Slugs de /soluciones que este caso respalda. */
  solutions: string[]
  metaTitle: string
  metaDescription: string
}

export const PROJECTS: Project[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "greek-gym",
    name: "Greek Gym",
    industry: "Gimnasio y fitness",
    location: "Puebla",
    built: "Sitio público + experiencia del socio + sistema administrativo",
    summary:
      "Un gimnasio con dos sucursales necesitaba que su sitio, sus socios y su caja dejaran de ser tres mundos separados.",
    scope: ["Sitio web", "Reservas", "Punto de venta", "Roles y permisos", "Multisucursal"],
    externalUrl: "https://greekgym.mx",
    externalLabel: "greekgym.mx",

    context:
      "Greek Gym opera dos sucursales en Puebla con disciplinas, coaches y planes de membresía distintos en cada una. Su presencia digital tenía que atraer socios nuevos, pero por dentro el equipo necesitaba una herramienta para cobrar, controlar inventario y llevar la caja del día.",
    challenge:
      "Casi todo negocio de servicios tiene dos caras digitales que suelen construirse por separado y nunca se hablan: la que ve el cliente y la que usa el equipo para operar. Cuando eso pasa, la información se duplica, se contradice y alguien termina capturándola dos veces a mano.",
    solution: [
      {
        label: "Presencia",
        body: "Sitio público con las dos sucursales, las disciplinas, los coaches y los planes de membresía. Es lo que encuentra quien busca un gimnasio en Puebla.",
      },
      {
        label: "Clientes",
        body: "Los socios reservan su clase por el mismo WhatsApp que ya usaban, sin instalar nada ni aprender otra aplicación.",
      },
      {
        label: "Operación",
        body: "Sistema administrativo con tres perfiles de acceso, punto de venta, catálogo de productos y membresías, control de inventario y corte de caja.",
      },
    ],
    demonstrates: [
      "Construimos las dos caras del mismo negocio: la pública y la interna.",
      "El software se adapta a cómo opera el negocio, incluyendo permisos distintos por puesto.",
      "Una integración puede apoyarse en herramientas que el cliente ya usa, como WhatsApp.",
    ],
    assets: [
      {
        video: "greekgym",
        badge: "Sitio",
        caption: "Sitio público — greekgym.mx",
        alt: "Recorrido por el sitio público de Greek Gym: sucursales, disciplinas y membresías",
      },
      {
        video: "greekgym-admin",
        badge: "Sistema",
        caption: "Sistema administrativo — perfiles de acceso y punto de venta",
        alt: "Recorrido por el sistema administrativo de Greek Gym: perfiles de acceso, catálogo y cobro",
      },
    ],

    solutions: ["desarrollo-web", "software-a-medida", "portales-para-clientes"],
    metaTitle: "Greek Gym — sitio web, reservas y sistema administrativo | USERS",
    metaDescription:
      "Cómo construimos para Greek Gym el sitio público, las reservas por WhatsApp y el sistema administrativo con roles, punto de venta e inventario para sus dos sucursales en Puebla.",
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "llevelin",
    name: "Llevelín",
    industry: "Supermercado",
    built: "Punto de venta para cajas, autocobro e islas de atención",
    summary:
      "Un supermercado no cobra en un solo lugar ni de una sola forma. Construimos un punto de venta que funciona igual en la caja, en el autocobro y en los mostradores donde se despacha y se pesa.",
    scope: ["Punto de venta", "Autocobro", "Islas de atención", "Venta por peso", "Retail"],

    context:
      "Llevelín es un supermercado nuevo en México. Vende en piso como cualquier supermercado y además tiene su propia app de delivery. USERS desarrolló su sistema de punto de venta.",
    challenge:
      "Un supermercado no tiene un punto de cobro: tiene varios, y cada uno funciona distinto. La caja necesita velocidad con un cajero experto. El autocobro lo opera un cliente que nunca vio el sistema y no puede equivocarse. Y en las islas —salchichonería, frutas y verduras— se despacha a granel, se pesa y se etiqueta antes de cobrar. Un mismo producto no se vende igual en los tres lugares.",
    solution: [
      {
        label: "Cajas",
        body: "El flujo principal de cobro, pensado para volumen: que el cajero pueda trabajar rápido durante toda la jornada sin pelearse con la interfaz.",
      },
      {
        label: "Autocobro",
        body: "El mismo sistema en modo autoservicio, operado directamente por el cliente. Cambia lo que se muestra, lo que se permite y cómo se resuelve un error.",
      },
      {
        label: "Islas de atención",
        body: "Funciones adicionales para los mostradores donde se atiende y se despacha —salchichonería, frutas y verduras— con venta por peso, no por pieza escaneada.",
      },
    ],
    demonstrates: [
      "Un mismo sistema puede tener modos distintos según quién lo usa y dónde: cajero, cliente o personal de mostrador.",
      "Construimos software para operación física de alto volumen, no solo interfaces de oficina.",
      "El desarrollo se organiza alrededor de cómo vende el negocio, incluso cuando vende de varias formas a la vez.",
    ],
    /**
     * Material real, grabado sobre el sistema en uso.
     *
     * Los tres clips salen de una misma sesión de 2:08 y se cortaron por
     * escena: venta, inventario y reporte. Ninguno se etiqueta como autocobro
     * ni como isla de atención — esas partes del proyecto existen y están
     * descritas en el texto, pero este material no las muestra, y poner la
     * etiqueta encima sería fabricar evidencia.
     *
     * QUÉ SE DEJÓ FUERA: la pantalla de corte de caja. Lista los cortes por
     * cajero con identificadores que siguen el patrón de un RFC de persona
     * física (cuatro letras y fecha de nacimiento). Es dato fiscal de personas
     * reales y no se publica. El reporte de ventas cuenta lo mismo —control
     * del día y del mes— sin identificar a nadie.
     *
     * `preview` es el clip corto para la rejilla de casos; los otros tres
     * viven en la página del proyecto.
     */
    preview: {
      video: "preview",
      dir: "projects/llevelin",
      badge: "Caja",
      caption: "Cobro en caja — el flujo principal de la jornada",
      alt: "Punto de venta de Llevelín registrando productos en una venta",
    },

    assets: [
      {
        video: "caja",
        dir: "projects/llevelin",
        badge: "Caja",
        caption: "Cobro en caja — del carrito al cambio a devolver",
        alt: "Punto de venta de Llevelín: carrito, método de pago y cálculo del cambio",
      },
      {
        video: "inventario",
        dir: "projects/llevelin",
        badge: "Inventario",
        caption: "Inventario — alta de producto y existencias",
        alt: "Pantalla de inventario de Llevelín con listado de productos y alta de uno nuevo",
      },
      {
        video: "reporte",
        dir: "projects/llevelin",
        badge: "Reporte",
        caption: "Reporte de ventas — el día y el mes contra su meta",
        alt: "Reporte de ventas de Llevelín con totales del día, balance mensual y tickets",
      },
    ],

    solutions: ["punto-de-venta-a-medida", "software-a-medida"],
    metaTitle: "Llevelín — punto de venta para cajas, autocobro e islas | USERS",
    metaDescription:
      "Punto de venta desarrollado por USERS para el supermercado Llevelín: un mismo sistema operando en cajas, en autocobro y en islas de atención con venta por peso.",
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "las-frescas",
    name: "Las Frescas",
    industry: "Servicios para eventos",
    location: "Ciudad de México",
    built: "Sitio web + cotizador digital",
    summary:
      "Cada cotización empezaba con una conversación manual por WhatsApp. Ahora el cliente arma lo que necesita antes de escribir.",
    scope: ["Sitio web", "Cotizador", "Catálogo"],
    externalUrl: "https://lasfrescas.vercel.app",
    externalLabel: "lasfrescas.vercel.app",

    context:
      "Las Frescas monta barras de paletas y snacks para eventos y ferias. Cada evento es distinto: cambia el número de invitados, los productos y el tipo de barra. Eso hacía que cotizar fuera una conversación larga, repetida decenas de veces al mes.",
    challenge:
      "Cuando cotizar depende de una conversación, el negocio solo puede atender tantas cotizaciones como mensajes alcance a responder. Además, muchas de esas conversaciones terminan sin compra, después de haber consumido tiempo real de alguien.",
    solution: [
      {
        label: "Presencia",
        body: "Sitio que explica el servicio, muestra el catálogo y responde de entrada las preguntas que antes se hacían por mensaje.",
      },
      {
        label: "Cotizador",
        body: "El cliente configura su barra —productos, cantidad, tipo de evento— y obtiene una estimación antes de contactar.",
      },
    ],
    demonstrates: [
      "Un proceso comercial que dependía de conversación manual puede volverse digital sin perder el trato cercano.",
      "El cliente llega a la conversación con la decisión avanzada, no desde cero.",
    ],
    /**
     * La grabación existente ya recorre el flujo completo: descubrir → elegir →
     * configurar → cotizar → contactar. Si más adelante se graba una versión
     * enfocada solo en el cotizador, se añade como segundo slot con la misma
     * convención de archivos.
     */
    assets: [
      {
        video: "lasfrescas",
        badge: "Cotizador",
        caption: "Del catálogo al cotizador — lasfrescas.vercel.app",
        alt: "Recorrido por el sitio de Las Frescas y su cotizador de barras para eventos",
      },
    ],

    solutions: ["cotizadores-digitales", "desarrollo-web"],
    metaTitle: "Las Frescas — sitio web y cotizador digital | USERS",
    metaDescription:
      "Cómo USERS convirtió el proceso de cotización manual de Las Frescas en un cotizador digital: el cliente configura su barra para eventos antes de iniciar la conversación.",
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
