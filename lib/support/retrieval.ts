import { KB_ENTRIES } from "@/lib/knowledge-base"
import type { RetrievalHit } from "./types"

/**
 * Capa de recuperación.
 *
 * Puntúa las entradas de la base de conocimiento con un esquema tipo TF-IDF:
 * los términos raros pesan más que los comunes. Eso evita el problema de la
 * versión anterior, donde una palabra frecuente como "sistema" arrastraba la
 * consulta hacia cualquier entrada que la mencionara.
 *
 * Devuelve además una confianza normalizada: si nadie supera el umbral, el
 * motor responde UNKNOWN en vez de forzar la entrada "más parecida".
 */

/**
 * Palabras sin valor discriminante.
 *
 * Los interrogativos y demostrativos importan más de lo que parece: "cuál"
 * comparte raíz con "cualquiera", que aparece en media base de conocimiento,
 * así que "¿cuál es la capital de Mongolia?" coincidía con entradas serias
 * por una palabra que no significa nada.
 */
const STOPWORDS = new Set([
  "que", "qué", "es", "un", "una", "unos", "unas", "el", "la", "los", "las",
  "mi", "mis", "me", "de", "del", "para", "con", "por", "como", "cómo",
  "cuanto", "cuánto", "quiero", "necesito", "puedo", "pueden", "puede",
  "hacer", "tengo", "hay", "y", "o", "en", "a", "al", "se", "su", "sus",
  "tu", "tus", "lo", "le", "si", "no", "ya", "muy", "esta", "este", "esto",
  "hola", "buenas", "buenos", "gracias", "porfavor", "favor",
  // Interrogativos y relativos
  "cual", "cuál", "cuales", "cuáles", "quien", "quién", "quienes", "donde",
  "dónde", "cuando", "cuándo", "porque", "por qué",
  // Cuantificadores y deícticos
  "todo", "toda", "todos", "todas", "otro", "otra", "otros", "otras",
  "solo", "sólo", "mismo", "misma", "algun", "algún", "alguna", "algunos",
  "mucho", "mucha", "poco", "poca", "cada", "algo", "nada", "bien", "mal",
  // Pronombres y auxiliares frecuentes
  "ustedes", "nosotros", "usted", "ellos", "sobre", "desde", "hasta",
  "pero", "tambien", "también", "ese", "esa", "eso", "esos", "esas",
  "ser", "estar", "hace", "haces", "dar", "doy", "ver", "voy", "quiera",
])

export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t))
}

/**
 * Raíz para español.
 *
 * Quita plural y la vocal final antes de truncar, para que "pago", "paga",
 * "pagos" y "pagar" caigan en la misma familia. Truncar a secas —lo que hacía
 * la versión anterior— dejaba "pago" y "paga" como raíces distintas y hacía
 * que media consulta se perdiera sin que nada lo señalara.
 */
function stem(token: string): string {
  let w = token
  if (w.length > 4) w = w.replace(/(es|s)$/, "")
  if (w.length > 3) w = w.replace(/[aoe]$/, "")
  return w.slice(0, 7)
}

/**
 * Dos raíces son de la misma familia si una es prefijo de la otra.
 *
 * Es la MISMA regla que usa el conteo documental. Que `idf` y el
 * emparejamiento usaran definiciones distintas de "el término aparece en la
 * entrada" era el defecto de fondo: un término podía coincidir con una
 * etiqueta y aun así pesar cero, así que se descartaba en silencio y la
 * consulta quedaba sin señal. Ahí se perdían preguntas tan directas como
 * "¿hay que firmar algún contrato?".
 */
function related(a: string, b: string): boolean {
  if (a === b) return true
  if (a.length < 3 || b.length < 3) return false
  return a.startsWith(b) || b.startsWith(a)
}

/** Campos de cada entrada, con su peso. */
function fieldsOf(entryIndex: number) {
  const e = KB_ENTRIES[entryIndex]
  return [
    { text: e.tags.join(" "), weight: 3 },
    { text: e.question, weight: 2.5 },
    { text: e.answer, weight: 1 },
  ]
}

/** Raíces de cada campo de cada entrada. Se calcula una vez al cargar. */
const ENTRY_STEMS: { field: string[]; weight: number }[][] = KB_ENTRIES.map((_, i) =>
  fieldsOf(i).map((f) => ({ field: tokenize(f.text).map(stem), weight: f.weight }))
)

/** Todas las raíces de una entrada, para el conteo documental. */
const ENTRY_ALL_STEMS: string[][] = ENTRY_STEMS.map((fields) => [
  ...new Set(fields.flatMap((f) => f.field)),
])

const N = KB_ENTRIES.length

/** Peso de un término: raro = alto, común = bajo. */
function idf(term: string): number {
  const s = stem(term)
  const df = ENTRY_ALL_STEMS.filter((stems) => stems.some((x) => related(x, s))).length
  if (df === 0) return 0
  return Math.log(1 + N / df)
}

export function retrieve(query: string, limit = 4): RetrievalHit[] {
  const all = [...new Set(tokenize(query))]

  /**
   * Solo los términos que la base conoce.
   *
   * Una palabra que no aparece en ninguna entrada —"firmar", "taquería"— no
   * dice nada sobre qué tan buena es una coincidencia; simplemente no la
   * indexamos. Al contarla en la cobertura, "¿hay que firmar algún contrato?"
   * quedaba con cobertura 1/3 aunque hubiera pegado exactamente en la
   * etiqueta "contrato", y la confianza nunca alcanzaba el umbral.
   */
  const terms = all.filter((t) => idf(t) > 0)
  if (terms.length === 0) return []

  /** Puntaje máximo teórico: todos los términos pegando en el campo más pesado. */
  const maxScore = terms.reduce((acc, t) => acc + idf(t) * 3, 0) || 1

  const hits = KB_ENTRIES.map((entry, i) => {
    const fields = ENTRY_STEMS[i]
    let score = 0
    let matched = 0
    let matchedMass = 0

    for (const term of terms) {
      const weight = idf(term)
      if (weight === 0) continue
      const s = stem(term)
      const best = fields.reduce(
        (acc, f) => (f.field.some((x) => related(x, s)) ? Math.max(acc, f.weight) : acc),
        0
      )
      if (best > 0) {
        score += weight * best
        matchedMass += weight
        matched++
      }
    }

    // Cubrir más términos de la consulta importa más que pegar fuerte en uno.
    const coverage = matched / terms.length
    const final = score * coverage

    /**
     * Cuánta evidencia hubo, en términos absolutos.
     *
     * La cobertura es una proporción, y una proporción sobre un solo término
     * siempre da 1. Sin este factor, cualquier consulta que coincidiera en
     * una única palabra corriente alcanzaba confianza máxima. Aquí se pide
     * además que la masa de información coincidente sea suficiente.
     */
    const evidence = Math.min(1, matchedMass / EVIDENCE_FULL)

    return {
      entry,
      score: final,
      confidence: Math.min(1, (final / maxScore) * evidence),
    }
  })

  return hits
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Umbral de confianza. Por debajo, el motor prefiere admitir que no sabe
 * antes que arriesgar una respuesta incorrecta.
 */
export const CONFIDENCE_THRESHOLD = 0.18

/**
 * Masa de información (suma de idf) a partir de la cual se considera que hubo
 * evidencia suficiente. Equivale a un término poco frecuente, o a dos
 * términos de frecuencia media coincidiendo a la vez.
 */
const EVIDENCE_FULL = 4
