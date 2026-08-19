/**
 * Protección razonable contra compartir datos sensibles.
 *
 * No promete detección perfecta —ningún filtro léxico la tiene—, pero evita
 * que una contraseña escrita por descuido termine copiada en el resumen que
 * se manda por WhatsApp.
 *
 * El texto original nunca sale de la sesión del navegador; esto solo limpia
 * lo que se exporta.
 */

const PATTERNS: { re: RegExp; label: string }[] = [
  // "mi contraseña es X", "password: X", "clave X"
  {
    re: /\b(contrase[nñ]a|password|passwd|clave|pin)\b\s*(?:es|:|=)?\s*\S+/gi,
    label: "[dato omitido]",
  },
  // Tokens y llaves de API
  { re: /\b(sk|pk|api[_-]?key|token|bearer)[_-]?[A-Za-z0-9]{8,}\b/gi, label: "[credencial omitida]" },
  { re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, label: "[token omitido]" },
  // Tarjetas: 13–19 dígitos con o sin separadores
  { re: /\b(?:\d[ -]?){13,19}\b/g, label: "[número omitido]" },
  // CLABE mexicana
  { re: /\b\d{18}\b/g, label: "[cuenta omitida]" },
]

export function redact(text: string): string {
  return PATTERNS.reduce((acc, p) => acc.replace(p.re, p.label), text)
}

/** ¿El texto parece contener algo que no deberían habernos mandado? */
export function looksSensitive(text: string): boolean {
  return PATTERNS.some((p) => {
    p.re.lastIndex = 0
    return p.re.test(text)
  })
}
