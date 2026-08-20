import type { MediaSlot } from "@/lib/media"
import type { WhatsAppOrigin } from "@/lib/whatsapp"

/**
 * Material y datos de presentación de los productos propios.
 *
 * Vive aparte de siteConfig porque siteConfig guarda la verdad comercial
 * (nombre, vertical, estado, URL) y esto es cómo se muestra.
 *
 * PARA SUSTITUIR POR MATERIAL REAL
 *   1. Coloca los archivos en public/imgs/products/<producto>/ siguiendo la
 *      convención: preview.webm + preview.mp4 + preview-poster.webp
 *      (o una sola imagen: preview.webp).
 *   2. En el slot de abajo: quita `placeholder`, `expectedPath` y `cover`, y
 *      añade `video: "preview"` — o `image: "/imgs/products/<x>/preview.webp"`.
 *   El layout no cambia: la proporción ya está reservada.
 *
 * Mientras tanto se muestra `cover`: una portada con la identidad del producto
 * y lo que resuelve. No se simula una interfaz de algo que todavía no existe.
 */
export interface ProductPresentation {
  /** Logotipo propio si existe. */
  logo?: string
  media: MediaSlot
  /** Origen del mensaje de WhatsApp para el acceso anticipado. */
  whatsappOrigin: WhatsAppOrigin
  /** Qué resuelve, en lenguaje de negocio. */
  highlights: string[]
}

export const PRODUCT_PRESENTATION: Record<string, ProductPresentation> = {
  ACTIIVA: {
    logo: "/logos/products/actiiva.svg",
    whatsappOrigin: "actiiva",
    media: {
      placeholder: true,
      dir: "products/actiiva",
      expectedPath: "/imgs/products/actiiva/preview.{webm,mp4,-poster.webp} o preview.webp",
      cover: {
        title: "ACTIIVA",
        // Sin eyebrow ni subtítulo: la tarjeta los repite cuatro líneas más
        // abajo. La portada aporta identidad, no información duplicada.
        parts: ["Membresías", "Reservas", "Cobros"],
      },
      caption: "ACTIIVA — producto propio de USERS",
      alt: "Vista de la plataforma ACTIIVA para negocios fitness",
    },
    highlights: [
      "Membresías y control de vencimientos",
      "Reservas de clases",
      "Cobros y perfiles de acceso",
    ],
  },
  MEDIICA: {
    whatsappOrigin: "mediica",
    media: {
      placeholder: true,
      dir: "products/mediica",
      expectedPath: "/imgs/products/mediica/preview.{webm,mp4,-poster.webp} o preview.webp",
      cover: {
        title: "MEDIICA",
        parts: ["Agenda", "Expediente", "Recordatorios"],
      },
      caption: "MEDIICA — producto propio de USERS",
      alt: "Vista del sistema MEDIICA para consultorios y clínicas",
    },
    highlights: [
      "Agenda de citas",
      "Expediente e historial de pacientes",
      "Recordatorios automáticos",
    ],
  },
}

/** CTA según el estado. Cambiar `status` a "live" en siteConfig lo alterna. */
export function productCta(name: string, status: string) {
  const live = status === "live"
  return {
    label: live ? `Probar ${name}` : `Quiero probar ${name}`,
    /** true = lleva al producto; false = solicita acceso anticipado. */
    isExternal: live,
  }
}
