import { normalize, tokenize } from "./retrieval"
import type { Intent } from "./types"

/**
 * Capa de clasificación de intención.
 *
 * Detecta *qué tipo de cosa* está pidiendo la persona, independientemente de
 * qué entrada de la base de conocimiento se recupere. Es lo que permite que
 * "quiero agregar reservaciones" se trate como funcionalidad nueva (y por
 * tanto como SPECIALIST) aunque la KB tenga una entrada parecida.
 *
 * No es un `includes()` suelto: son señales léxicas ponderadas, y la decisión
 * final combina esta intención con la confianza del retrieval.
 */

type Signal = { patterns: RegExp[]; weight: number }

const SIGNALS: Record<Exclude<Intent, "desconocido">, Signal[]> = {
  /**
   * Peso bajo a propósito: "hola, mi sitio no carga" es un incidente que
   * empieza con un saludo, no un saludo. Cualquier señal real debe ganarle.
   */
  saludo: [
    { patterns: [/^(hola|buenas|buenos dias|buenas tardes|hey|que tal)\b/], weight: 2.5 },
  ],

  incidente: [
    {
      patterns: [
        /\bno (funciona|abre|carga|sirve|entra|deja|puedo)\b/,
        /\bdejo de (funcionar|servir|cargar)\b/,
        /\b(borro|borraron|borrado|desaparecio|desaparecieron|perdio|perdimos|ya no aparece|ya no esta)\w*/,
        /\b(error|falla|fallando|caido|caida|roto|rota|bug)\b/,
        /\b(hacke|virus|comprometid|spam|suplant)\w*/,
        /\b(lent[oa]|tarda|no responde|se traba|se cae|se cayo|cayo|caido|se murio|no jala|no abre)\b/,
      ],
      weight: 4,
    },
    { patterns: [/\b(contrasena|password|acceso|login|iniciar sesion)\b/], weight: 3 },
  ],

  /**
   * Un ajuste necesita un verbo de cambio. Los sustantivos solos no bastan:
   * con ellos, "quién inventó el teléfono" se clasificaba como una edición de
   * contenido y terminaba escalando a un especialista.
   */
  ajuste: [
    {
      patterns: [
        /\b(cambiar|cambia|cambio|cambiamos|modificar|actualizar|corregir|editar|reemplazar|poner|quitar|subir|agregar)\b/,
      ],
      weight: 3,
    },
    {
      patterns: [
        /\b(texto|redaccion|ortografia|foto|fotos|imagen|imagenes|logo|telefono|correo|direccion|precio|precios|horario)\b/,
      ],
      weight: 1.5,
    },
  ],

  funcionalidad: [
    {
      patterns: [
        /\b(agregar|anadir|integrar|conectar|implementar|sumar)\b/,
        /\b(reserva|reservacion|apartar|agendar|cita|cotizador|portal|login|pago|pagar|cobrar|cobro|pasarela|carrito|crm|inventario|notificacion|recordatorio|automatic|modulo|funcion|funcionalidad|seccion nueva)\w*/,
        /\bmercado ?pago|stripe|paypal|conekta\b/,
      ],
      weight: 4,
    },
  ],

  comercial: [
    {
      patterns: [
        /\b(cuanto cuesta|precio|costo|presupuesto|cotiza|tarifa|vale)\w*/,
        /\b(forma de pago|como se paga|anticipo|mensualidad|se paga)\b/,
        /\b(quiero|necesito|busco|ocupo|me interesa|pueden hacer|hacen|cuanto por)\b[^.?!]{0,20}\b(sitio|sitios|pagina|paginas|web|landing|sistema|software|punto de venta|pdv|app|tienda|ecommerce|catalogo)\w*/,
        /\b(contratar|empezar|arrancar|proyecto nuevo)\b/,
        /\bno (se|tengo idea|estoy segur)\w*\b.*\b(que|por donde|como)\b/,
        /\btengo (un|una) [a-z]+ y\b/,
      ],
      weight: 3.5,
    },
  ],

  producto: [
    { patterns: [/\bactiiva\b/, /\bmediica\b/], weight: 6 },
  ],

  "hablar-humano": [
    {
      patterns: [
        /\b(hablar|platicar) con (alguien|una persona|un humano|asesor|especialista|ejecutivo)\b/,
        /\b(asesor|especialista|humano|persona real|agente)\b/,
        /\bque me (llamen|contacten|marquen)\b/,
        /\b(pueden|puedes|podrian|podrias|me)\s+(marcar|llamar|contactar)\b/,
      ],
      weight: 5,
    },
  ],

  informacion: [
    {
      patterns: [
        /\bque (es|son|incluye|hacen|ofrecen)\b/,
        /\b(como funciona|en que consiste|cuanto tarda|cuanto tiempo)\b/,
        /\b(seguimiento|mantenimiento|plan|garantia|proceso|factura|contrato)\b/,
      ],
      weight: 2.5,
    },
  ],
}

export function classifyIntent(text: string): { intent: Intent; strength: number } {
  const t = normalize(text)
  if (tokenize(text).length === 0 && !/^(hola|buenas|hey)/.test(t)) {
    return { intent: "desconocido", strength: 0 }
  }

  let best: { intent: Intent; strength: number } = { intent: "desconocido", strength: 0 }

  for (const [intent, signals] of Object.entries(SIGNALS)) {
    let strength = 0
    for (const signal of signals) {
      const hits = signal.patterns.filter((re) => re.test(t)).length
      if (hits > 0) strength += signal.weight * Math.min(hits, 2)
    }
    if (strength > best.strength) {
      best = { intent: intent as Intent, strength }
    }
  }

  return best
}

/**
 * ¿La consulta es sobre soporte de ACTIIVA/MEDIICA?
 *
 * Este Centro atiende USERS. Si alguien pide soporte de producto, hay que
 * decirlo y orientar — no responder con la base de conocimiento de USERS.
 *
 * "¿Qué es ACTIIVA?" sí se responde: es información comercial de USERS.
 * "¿Cómo doy de alta a un alumno en ACTIIVA?" no: es operación del producto.
 */
export function isOtherProductSupport(text: string): "ACTIIVA" | "MEDIICA" | null {
  const t = normalize(text)
  const mentionsProduct = /\bactiiva\b/.test(t)
    ? "ACTIIVA"
    : /\bmediica\b/.test(t)
      ? "MEDIICA"
      : null
  if (!mentionsProduct) return null

  // Señal de soporte: algo va mal, o necesitan credenciales/facturación.
  const supportish =
    /\b(soporte|problema|error|no funciona|falla|acceso|contrasena|usuario|cuenta|factura|cobro)\b/.test(t)

  // Señal de operación: preguntan cómo usar el producto, no qué es.
  const operational =
    /\b(como|donde|puedo|quiero|necesito)\b/.test(t) &&
    /\b(dar de alta|doy de alta|registrar|configurar|activar|cancelar|editar|agendar|cobrar|reservar|exportar|imprimir|asignar)\w*/.test(
      t
    )

  return supportish || operational ? mentionsProduct : null
}

/**
 * Vocabulario del dominio: desarrollo web, software a la medida y lo que
 * rodea a un proyecto después de publicarlo.
 *
 * Sirve de reja para consultas sin ninguna señal de intención. El retrieval
 * siempre devuelve *algo* —una coincidencia léxica basta— así que sin esta
 * reja "cuál es la capital de Mongolia" recibiría una respuesta seria sobre
 * productos USERS. Solo se aplica cuando no hubo señal de intención alguna:
 * cualquier consulta real del dominio ya la produce.
 */
const DOMAIN_TERMS =
  /\b(sitio|sitios|pagina|paginas|web|website|landing|sistema|sistemas|software|app|aplicacion|plataforma|proyecto|desarrollo|desarrollar|programar|dominio|hosting|servidor|correo|email|seo|google|posicionamiento|diseno|panel|administrador|base de datos|pdv|punto de venta|tienda|ecommerce|carrito|users|actiiva|mediica|plan|planes|precio|costo|cotiza|presupuesto|pag|factura|contrato|seguimiento|mantenimiento|soporte|cliente|clientes|negocio|empresa|whatsapp|formulario|boton|texto|imagen|foto|logo|contenido|reserva|reservacion|cita|agenda|respaldo|backup|acceso|cuenta|usuario|celular|movil|navegador|velocidad|lento|analitica|contactar|contacto|cotizador|integrar|api|wix|wordpress|squarespace|shopify|godaddy|plantilla|constructor|freelance|freelancer|agencia)\w*/

export function isInScope(text: string): boolean {
  return DOMAIN_TERMS.test(normalize(text))
}
