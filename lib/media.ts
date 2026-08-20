/**
 * Descriptor único de material audiovisual. Lo usan casos y productos para que
 * los tres proyectos tengan el mismo nivel de producción y para que sustituir
 * un placeholder por material real no obligue a tocar layout.
 *
 * CONVENCIÓN DE ARCHIVOS
 *   Un `video` de nombre "x" espera:
 *     /imgs/<dir>/x.webm   · /imgs/<dir>/x.mp4   · /imgs/<dir>/x-poster.webp
 *   Una `image` es la ruta completa.
 *
 * Mientras no exista el material, se declara `placeholder: true` y el marco
 * pinta una portada editorial con `cover` — nunca un aviso de que falta algo.
 * Sustituir = quitar `placeholder` y añadir `video`/`image`; el layout no cambia.
 */
export interface MediaSlot {
  /** Nombre base del video, sin extensión. Relativo a `dir`. */
  video?: string
  /** Ruta completa de una imagen estática. */
  image?: string
  /** Carpeta bajo /imgs donde viven los archivos. */
  dir?: string
  /** true = todavía no hay material real. */
  placeholder?: boolean
  /** Ruta exacta que deberá existir cuando llegue el material. */
  expectedPath?: string
  caption: string
  /** Describe función/contexto. No repite el caption. */
  alt: string
  /** Etiqueta corta sobre el marco, ej. "Caja" o "Autocobro". */
  badge?: string
  /**
   * Qué mostrar mientras no hay material real.
   *
   * Solo información verificable: la marca, su categoría y las piezas que el
   * trabajo sí incluye. Nunca una interfaz simulada — una captura falsa de un
   * punto de venta se leería como el producto real del cliente.
   */
  cover?: {
    title: string
    eyebrow?: string
    subtitle?: string
    parts?: readonly string[]
  }
}

const DEFAULT_DIR = "video"

export function mediaSources(slot: MediaSlot) {
  const dir = slot.dir ?? DEFAULT_DIR
  return {
    webm: `/imgs/${dir}/${slot.video}.webm`,
    mp4: `/imgs/${dir}/${slot.video}.mp4`,
    poster: `/imgs/${dir}/${slot.video}-poster.webp`,
  }
}
