/**
 * Catálogo de soluciones a medida. Fuente única para /soluciones, el sitemap,
 * los enlaces internos y llms.txt.
 *
 * Cada entrada existe porque responde una pregunta comercial que ninguna otra
 * responde. Si dos páginas contestaran lo mismo, se fusionan — la decisión y
 * el porqué quedan anotados en `whyItExists`.
 *
 * DESCARTADAS a propósito:
 *  · /sistemas-para-negocios — misma intención que software-a-medida.
 *  · /sistemas-de-reservas   — sin evidencia suficiente para sostener que
 *    somos especialistas en motores de reservación completos.
 */

export type SolutionArea = "presencia" | "operacion" | "clientes"

export interface Solution {
  slug: string
  /** Nombre corto para navegación y listados. */
  name: string
  area: SolutionArea
  /** La pregunta del visitante que esta página contesta. */
  intent: string
  /** Una línea para el hub y los enlaces internos. */
  teaser: string
  /** Por qué merece URL propia. Documenta la decisión anticanibalización. */
  whyItExists: string
  /** Slugs de casos que respaldan esta solución. */
  cases: string[]
  metaTitle: string
  metaDescription: string
}

export const AREAS: Record<SolutionArea, { label: string; body: string }> = {
  presencia: {
    label: "Presencia",
    body: "Lo que ve quien te busca, te encuentra o recibe tu tarjeta.",
  },
  operacion: {
    label: "Operación",
    body: "Las herramientas con las que tu equipo trabaja todos los días.",
  },
  clientes: {
    label: "Clientes",
    body: "Lo que tus clientes pueden resolver por su cuenta.",
  },
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "desarrollo-web",
    name: "Desarrollo web",
    area: "presencia",
    intent: "Necesito una página web para mi negocio.",
    teaser:
      "Sitios, landing pages, catálogos y tiendas en línea construidos para explicar el negocio y generar contacto.",
    whyItExists:
      "Es la puerta de entrada más buscada y la única que responde «quiero una página». Las demás páginas asumen que el visitante ya sabe que necesita software.",
    cases: ["greek-gym", "las-frescas"],
    metaTitle: "Desarrollo web para PyMEs en México | USERS",
    metaDescription:
      "Desarrollo web para negocios que necesitan que su sitio explique, genere contacto y pueda conectarse después con sus sistemas. Proyectos desde $11,900 MXN.",
  },
  {
    slug: "software-a-medida",
    name: "Software a medida",
    area: "operacion",
    intent: "Quiero dejar de operar con Excel y herramientas sueltas.",
    teaser:
      "Sistemas administrativos, herramientas internas y automatizaciones construidas alrededor de cómo trabaja tu negocio.",
    whyItExists:
      "Es la categoría amplia de operación. Responde la decisión previa —¿herramienta existente o desarrollo propio?— que ninguna página específica plantea.",
    cases: ["greek-gym", "llevelin"],
    metaTitle: "Software a medida para empresas y PyMEs | USERS",
    metaDescription:
      "Desarrollo de software a medida en México: sistemas administrativos, herramientas internas y automatizaciones construidas alrededor de la operación real de tu negocio.",
  },
  {
    slug: "punto-de-venta-a-medida",
    name: "Punto de venta a medida",
    area: "operacion",
    intent: "Los puntos de venta que existen no encajan con cómo operamos.",
    teaser:
      "Sistemas de punto de venta para operaciones que cobran en varios lugares y de varias formas: cajas, autocobro y mostradores de atención.",
    whyItExists:
      "Especialización concreta de software a medida, con una intención de búsqueda propia y un caso dedicado (Llevelín). Quien busca «punto de venta» no busca «software a medida».",
    cases: ["llevelin"],
    metaTitle: "Desarrollo de punto de venta a medida | USERS",
    metaDescription:
      "Desarrollamos sistemas de punto de venta alrededor de la operación real del negocio, para modelos con reglas propias o varios puntos de atención.",
  },
  {
    slug: "cotizadores-digitales",
    name: "Cotizadores digitales",
    area: "clientes",
    intent: "Pierdo mucho tiempo cotizando por WhatsApp.",
    teaser:
      "Herramientas para que el cliente estructure lo que necesita antes de iniciar la conversación.",
    whyItExists:
      "Captura un dolor operativo muy específico —cotizar a mano, una y otra vez— que no aparece en ninguna otra página.",
    cases: ["las-frescas"],
    metaTitle: "Cotizadores digitales para negocios | USERS",
    metaDescription:
      "Cotizadores digitales que convierten una conversación repetitiva en un proceso: el cliente configura lo que necesita antes de contactarte.",
  },
  {
    slug: "portales-para-clientes",
    name: "Portales para clientes",
    area: "clientes",
    intent: "Quiero que mis clientes resuelvan cosas sin escribirme.",
    teaser:
      "Espacios donde tus clientes consultan, solicitan o gestionan lo suyo sin depender de un mensaje.",
    whyItExists:
      "Responde la necesidad de autoservicio continuo —cuenta, historial, estado—, distinta de una cotización puntual o de un sitio informativo.",
    cases: ["greek-gym"],
    metaTitle: "Portales para clientes y autoservicio | USERS",
    metaDescription:
      "Desarrollamos portales donde tus clientes consultan información, hacen solicitudes y gestionan su cuenta sin depender de WhatsApp.",
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}

export function solutionsByArea(area: SolutionArea): Solution[] {
  return SOLUTIONS.filter((s) => s.area === area)
}
