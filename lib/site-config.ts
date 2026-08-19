/**
 * Fuente única de verdad para la información comercial de USERS.
 *
 * Todo dato que (a) aparece repetido en el sitio, (b) debe permanecer
 * consistente y (c) puede cambiar por decisión comercial vive aquí.
 * El copy de cada sección NO vive aquí — solo los datos.
 *
 * Al cambiar `startingPrice`, corre `npm run build`: llms.txt se regenera
 * desde este archivo, así que no hay que sincronizarlo a mano.
 */

export type ProductStatus = "in-development" | "live"

export interface MaintenancePlan {
  id: string
  name: string
  forWhat: string
  price: number
  priceNote: string
  /** true = el precio es un punto de partida, no una tarifa cerrada. */
  isFrom?: boolean
  features: readonly string[]
  highlight: boolean
}

export interface Product {
  name: string
  /** Vertical que atiende. Es el mensaje comercial, no el estado técnico. */
  vertical: string
  /** "in-development" oculta el CTA externo hasta que el destino esté terminado. */
  status: ProductStatus
  url: string
  urlLabel: string
  description: string
  tags: readonly string[]
}

const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const

/**
 * Convierte los días de atención en el texto que ve una persona.
 * Días consecutivos se escriben como rango ("Lunes a sábado"); días sueltos
 * se enumeran. Así el copy nunca puede desincronizarse del cálculo.
 */
function formatDayRange(days: readonly number[]): string {
  if (days.length === 0) return "Sin atención programada"
  if (days.length === 7) return "Todos los días"

  const sorted = [...days].sort((a, b) => a - b)
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1)

  if (consecutive && sorted.length > 1) {
    return `${DAY_NAMES[sorted[0]]} a ${DAY_NAMES[sorted[sorted.length - 1]].toLowerCase()}`
  }
  return sorted.map((d) => DAY_NAMES[d]).join(", ")
}

/**
 * Imagen social por defecto.
 *
 * `app/opengraph-image.tsx` la genera, pero Next solo la inyecta cuando la
 * página no declara su propio bloque `openGraph`. Casi todas lo declaran para
 * fijar título y descripción, y al hacerlo perdían la imagen: al compartir un
 * proyecto o una solución en WhatsApp salía sin miniatura. Se declara aquí
 * para no repetir la URL en catorce archivos.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "USERS — desarrollo web y software para PyMEs en México",
}

export const siteConfig = {
  name: "USERS",
  /** Marca como se escribe en el sitio y en metadata. */
  wordmark: "users.mx",
  /**
   * Dominio canónico. Tiene que ser exactamente el que sirve contenido: el
   * apex users.mx responde 308 hacia www, así que apuntar los canonical al
   * apex los mandaba a una URL que redirige. La marca escrita sigue siendo
   * "users.mx" — eso vive en `wordmark`, esto es solo la URL.
   */
  url: "https://www.users.mx",
  locale: "es_MX",

  description:
    "Desarrollo web y software para PyMEs en México. Construimos la presencia digital, los sistemas para operar el negocio y las experiencias que usan sus clientes.",
  shortDescription: "Desarrollo web y software para PyMEs en México",

  contact: {
    email: "hola@users.mx",
    /** Formato E.164 sin signos, como lo requiere wa.me */
    whatsapp: "5215612934010",
    /** Mismo número en formato legible para humanos. */
    whatsappDisplay: "+52 56 1293 4010",
    /** Usado en el JSON-LD de Organization. */
    telephone: "+525612934010",
    city: "Ciudad de México",
    country: "MX",
    /**
     * Ventana de atención humana. El Centro automatizado responde siempre;
     * esto solo determina cuándo puede escalarse a una persona.
     *
     * `days` son índices de `Date.getDay()` (0 = domingo). Es la única
     * definición: tanto el cálculo de disponibilidad como el texto que se
     * muestra salen de aquí. Antes el texto decía una cosa y el motor
     * evaluaba otra constante, y podían separarse sin que nadie lo notara.
     */
    supportHours: { from: "09:00", to: "16:00", timezone: "America/Mexico_City" },
    supportDays: [1, 2, 3, 4, 5, 6] as readonly number[],
    get supportDaysLabel() {
      return formatDayRange(this.supportDays)
    },
    get hours() {
      return `${this.supportDaysLabel}, ${this.supportHours.from} a ${this.supportHours.to} hrs`
    },
  },

  pricing: {
    /** Punto de entrada, no precio de un desarrollo completo. */
    startingPrice: 11900,
    currency: "MXN",
    /** "$11,900 MXN" — usar siempre esto en vez de escribirlo a mano. */
    get startingPriceLabel() {
      return `$${this.startingPrice.toLocaleString("en-US")} ${this.currency}`
    },
    maintenanceFrom: 399,
    get maintenanceFromLabel() {
      return `$${this.maintenanceFrom.toLocaleString("en-US")} ${this.currency}/mes`
    },
  },

  /**
   * Planes de seguimiento posteriores al lanzamiento.
   *
   * Escalan por *qué* se mantiene, no por cuántos cambios se permiten: un
   * sistema con base de datos y usuarios cuesta más de sostener que un sitio
   * de contenido.
   *
   * El plan de Sistemas es un "desde": no se anuncian tiempos de respuesta,
   * horas incluidas ni frecuencia de respaldo porque esas condiciones aún no
   * están definidas comercialmente. Cuando lo estén, se pueden concretar aquí.
   */
  maintenancePlans: [
    {
      id: "sitio",
      name: "Sitio",
      forWhat: "Para sitios web, landing pages y catálogos",
      price: 399,
      priceNote: "MXN/mes",
      features: [
        "Hosting, dominio y certificado de seguridad",
        "Respaldos periódicos",
        "Actualizaciones de seguridad",
        "Cambios de contenido acordados",
        "Soporte por WhatsApp",
      ],
      highlight: false,
    },
    {
      id: "sistemas",
      name: "Sistemas",
      forWhat: "Para software con usuarios, cobros o base de datos",
      price: 1290,
      priceNote: "MXN/mes",
      /**
       * "Desde" y "según alcance" son deliberados: las condiciones concretas
       * (tiempos de respuesta, frecuencia de respaldo, horas incluidas) todavía
       * no están definidas comercialmente, así que se enuncian como lo que el
       * plan *puede incluir* y no como una promesa cerrada.
       */
      isFrom: true,
      features: [
        "Infraestructura y hosting del sistema",
        "Monitoreo",
        "Respaldos",
        "Actualizaciones de seguridad y dependencias",
        "Soporte",
        "Ajustes evolutivos",
      ],
      highlight: true,
    },
  ] as MaintenancePlan[],

  /**
   * Productos propios de USERS. Cambiar `status` a "live" es todo lo que hace
   * falta para activar el enlace externo en el sitio.
   */
  products: [
    {
      name: "ACTIIVA",
      vertical: "Fitness",
      status: "in-development",
      url: "https://actiiva.mx",
      urlLabel: "actiiva.mx",
      description:
        "Plataforma para gimnasios boutique, estudios fitness y entrenadores: membresías, reservas y cobros en un solo lugar.",
      tags: ["Producto propio", "Fitness", "Membresías", "Reservas"],
    },
    {
      name: "MEDIICA",
      vertical: "Salud",
      status: "in-development",
      url: "https://mediica.mx",
      urlLabel: "mediica.mx",
      description:
        "Sistema de gestión para consultorios y clínicas: agenda de citas, expediente e historial de pacientes.",
      tags: ["Producto propio", "Salud", "Agenda", "Expediente"],
    },
  ] as Product[],

  /** Solo perfiles que existen realmente. Vacío hasta que los haya. */
  social: [] as { platform: string; url: string }[],
} as const

export type SiteConfig = typeof siteConfig
