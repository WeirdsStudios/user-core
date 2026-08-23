# Preparación publicitaria — users.mx

Qué está construido, qué falta configurar y qué decisiones dependen de ti.

Este documento describe **infraestructura**, no estrategia. Los anuncios, la
oferta y los segmentos concretos se definen cuando exista la campaña.

---

## 1. Cuentas que necesitas crear

Ninguna se puede crear desde el código. Todas requieren tu identidad fiscal o
tu sesión.

| Cuenta | Para qué | Qué obtienes |
|---|---|---|
| **Meta Business Manager** | Contenedor de todo lo de Meta | — |
| **Meta Ads Manager** | Comprar anuncios en Instagram y Facebook | — |
| **Meta Pixel / Dataset** | Medir visitas y construir audiencias | ID de 15–16 dígitos |
| **Google Analytics 4** | Medición del sitio | ID `G-XXXXXXXXXX` |
| **Google Ads** | Comprar búsqueda, display y YouTube | ID `AW-XXXXXXXXX` |
| **Canal de YouTube** | Solo si haremos video | — |

**No inventé ningún ID.** Sin ellos la aplicación compila y funciona; los
adapters quedan inertes.

---

## 2. Variables de entorno

Solo nombres. Los valores los pones tú en Vercel → Settings → Environment
Variables, en Production, Preview y Development.

```
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_GOOGLE_ADS_ID
```

Llevan `NEXT_PUBLIC_` porque el navegador las necesita: son identificadores
públicos, visibles en el HTML de cualquier sitio que los use. **Ninguna clave
privada debe llevar ese prefijo.**

Sin estas variables no se carga ningún script de terceros, aunque la persona
acepte todo.

---

## 3. Pasos de conexión

### Meta

1. Business Manager → *Orígenes de datos* → *Conjuntos de datos* → crear.
2. Copiar el ID → `NEXT_PUBLIC_META_PIXEL_ID` en Vercel → redesplegar.
3. Instalar la extensión **Meta Pixel Helper** en Chrome y abrir users.mx.
4. Aceptar publicidad en el aviso de cookies. El Helper debe mostrar
   `PageView`.
5. Recorrer: solución → proyecto → iniciar análisis. Deben aparecer
   `ViewContent` e `InitiateCheckout`.
6. En *Eventos personalizados*, verificar que llegan los `trackCustom`.

### Google Analytics 4

1. GA4 → *Administrar* → *Flujos de datos* → *Web* → añadir `www.users.mx`.
2. Copiar el ID de medición → `NEXT_PUBLIC_GA_MEASUREMENT_ID` → redesplegar.
3. *Informes* → *Tiempo real*: navegar y confirmar que llegan `page_view`.
4. *Administrar* → *Eventos* → marcar conversiones (sección 6).

### Google Ads

1. Vincular Google Ads con GA4: en GA4, *Administrar* → *Vinculación de
   productos* → *Google Ads*.
2. Importar las conversiones de GA4 a Ads: *Objetivos* → *Conversiones* →
   *Importar* → *Google Analytics 4*.
3. Para audiencias: GA4 → *Administrar* → *Audiencias* → crear (sección 5) y
   verificar que se comparten con Ads.
4. `NEXT_PUBLIC_GOOGLE_ADS_ID` solo hace falta si además quieres conversiones
   nativas de Ads en vez de importadas.

### YouTube

**No existe un "pixel de YouTube".** El retargeting en YouTube se hace con las
audiencias de Google Ads, que ya llegan por GA4. Cuando exista el canal:
vincularlo en Google Ads → *Herramientas* → *Contenido vinculado*. No hay nada
que instalar en el sitio.

---

## 4. Eventos

Todos salen de `lib/analytics/events.ts`. La aplicación nunca llama a un
proveedor directamente.

| Evento | Cuándo | Etapa | → Meta |
|---|---|---|---|
| `page_view` | Cada página | según la página | `PageView` |
| `solution_viewed` | Abre una solución | consideration | `ViewContent` |
| `project_viewed` | Abre un caso | consideration | `ViewContent` |
| `product_viewed` | Abre productos | consideration | `ViewContent` |
| `article_viewed` | Abre un artículo | engaged | `ViewContent` |
| `project_media_started` | Empieza a verse el video de un caso | engaged | custom |
| `support_opened` | Abre el Centro | engaged | — |
| `support_article_clicked` | Va a la Central de Ayuda | engaged | — |
| `analysis_started` | Pasa del paso 1 del Motor | high_intent | `InitiateCheckout` |
| `analysis_progressed` | Completa cualquier paso | high_intent | custom |
| `analysis_completed` | Termina el diagnóstico | **converted** | `Lead` |
| `cta_analysis_clicked` | Pulsa "Analizar mi negocio" | high_intent | custom |
| `cta_contact_clicked` | Correo o teléfono | high_intent | `Contact` |
| `whatsapp_clicked` | Cualquier enlace de WhatsApp | high_intent | `Contact` |
| `support_whatsapp_clicked` | Escala desde el Centro | high_intent | `Contact` |
| `product_trial_clicked` | Pide acceso a ACTIIVA/MEDIICA | high_intent | `SubmitApplication` |
| `solution_cta_clicked` | Clic hacia una solución | — | custom |
| `project_cta_clicked` | Clic hacia un caso | — | custom |
| `support_*` (conversación) | Uso del Centro | — | **nunca** |
| `consent_updated` | Decide sus preferencias | — | **nunca** |

### Metadatos

Solo estas claves salen del navegador. Cualquier otra se descarta en ejecución.

```
page_path  page_type  funnel_stage
solution  project  product  article
source  medium  campaign  content  term
first_source  first_medium  first_campaign  referrer_host
step  turn  category  mode  surface  cta
```

**Nunca sale**: texto de conversaciones, nombres, correos, teléfonos, datos
del Motor de Análisis, ni URLs privadas.

---

## 5. Audiencias recomendadas

Son propuestas para probar, no verdades. Se crean en la plataforma cuando
existan las cuentas — **no se pueden crear desde el código**.

| # | Audiencia | Definición | Ventana sugerida |
|---|---|---|---|
| **A** | Todos los visitantes | `page_view`, sin `analysis_completed` | 30 días |
| **B** | Interés en web | `solution_viewed` con `solution = desarrollo-web` | 30 días |
| **C** | Interés en software | `solution_viewed` con `solution` en software-a-medida, punto-de-venta-a-medida, portales-para-clientes | 30 días |
| **D** | Vio evidencia | `project_viewed` (cualquiera) | 30 días |
| **E** | Alta intención | `funnel_stage = high_intent` | 7 días |
| **F** | Análisis incompleto | `analysis_started` sin `analysis_completed` | 7 días |
| **G** | Convertidos | `analysis_completed` | 180 días |
| **H1** | Interés en ACTIIVA | `product_trial_clicked` con `product = actiiva` | 90 días |
| **H2** | Interés en MEDIICA | `product_trial_clicked` con `product = mediica` | 90 días |

### Por qué esas ventanas

- **7 días** para intención alta: quien inició un diagnóstico y no terminó
  sigue caliente unos días, no un mes. Perseguirlo más tiempo molesta.
- **30 días** para interés: un ciclo de decisión razonable en PyME.
- **180 días** para convertidos: no para perseguirlos, sino para **excluirlos**.

Ajustar con datos reales. Ahora mismo no hay ninguno.

### Exclusiones

Toda campaña de adquisición debería excluir **G (convertidos)**. Pagar por
mostrarle un anuncio de "conoce USERS" a alguien que ya dejó sus datos es
quemar presupuesto y quedar mal.

Cuando exista un mecanismo seguro, excluir también a clientes activos. **En
esta fase no se sube ninguna lista de clientes a ninguna plataforma.**

---

## 6. Conversiones

### Primarias — miden el negocio

| Evento | Por qué |
|---|---|
| `analysis_completed` | Lead con diagnóstico completo. El más calificado. |
| `cta_contact_clicked` | Contacto directo por correo. |
| `support_whatsapp_clicked` | Escala a WhatsApp con contexto ya recabado. |
| `product_trial_clicked` | Solicitud de acceso a un producto. |

### Secundarias — construyen audiencias, no miden éxito

`analysis_started`, `analysis_progressed`, `project_viewed`,
`solution_viewed`, `support_opened`, `whatsapp_clicked`.

**No las marques como conversión en la plataforma.** Si lo haces, el
algoritmo optimizará hacia visitas a `/proyectos` y la campaña parecerá
rentable mientras no genera un solo cliente.

`page_view` nunca es conversión.

---

## 7. Convención de UTM

- Minúsculas, sin acentos ni espacios. Guion bajo para separar.
- `utm_source` = **dónde** estaba la persona.
- `utm_medium` = **qué tipo** de enlace era.
- `utm_campaign` = **qué** se promovía.
- `utm_content` = **cuál variante**, para comparar creativos.

| Canal | `utm_source` | `utm_medium` |
|---|---|---|
| Meta (Instagram + Facebook) | `meta` | `paid_social` |
| Google búsqueda / display | `google` | `cpc` |
| YouTube | `youtube` | `paid_video` |
| Tarjeta de presentación | `business_card` | `offline` |
| WhatsApp directo | `whatsapp` | `directo` |
| Publicación orgánica | `instagram` / `facebook` | `organic_social` |

**Meta es una sola fuente.** No separar `instagram` y `facebook` en el pago:
la compra es conjunta y separarlo parte el reporte. Para distinguir
ubicación o creativo, usar `utm_content`:

```
?utm_source=meta&utm_medium=paid_social&utm_campaign=web_pymes&utm_content=reel_dolor_a
```

### Google Ads

Si activas el etiquetado automático (`gclid`), **no** agregues `utm_source` ni
`utm_medium` a mano: se duplica la atribución. Usa solo `utm_campaign`.

Los identificadores de clic —`gclid`, `fbclid`, `msclkid`— se conservan tal
cual. No se interpretan, no se modifican y no se pasan a otro proveedor.

### ChatGPT y buscadores con IA

No se pueden etiquetar: el enlace lo genera el modelo. Se reconocen solos por
`referrer_host` (`chatgpt.com`, `perplexity.ai`). Nada que configurar.

---

## 8. QR de tarjeta

**URL oficial:**

```
https://www.users.mx/hola
```

Redirige a la home añadiendo la atribución completa. Se eligió sobre la URL
larga con parámetros porque:

- Cabe en un QR de baja densidad, que escanea bien impreso en chico.
- Se puede dictar por teléfono.
- Si algún día conviene mandar las tarjetas a otro destino, se cambia el
  código y **no hay que reimprimir**.

**Variantes por lote**, para saber qué funciona:

```
https://www.users.mx/hola?c=lote_2026_q3
https://www.users.mx/hola?c=expo_pyme
https://www.users.mx/hola?c=expo_pyme&v=reverso
```

`c` → `utm_campaign`, `v` → `utm_content`. Valores no válidos caen al
predeterminado, así que un QR mal impreso sigue funcionando.

El QR termina en la **home**, no en una landing aparte: quien te conoció en
persona quiere ver la empresa, no una página de captura.

---

## 9. Consentimiento

Tres categorías: **necesario** (siempre), **medición**, **publicidad**.

- Sin decisión no se carga **nada** de terceros. No es "cargar y no
  disparar": el script no llega a la página.
- Rechazar cuesta un clic, igual que aceptar, en un botón del mismo tamaño.
- Se puede cambiar desde el pie de página en cualquier momento.
- Si cambian las categorías, subir `CONSENT_VERSION` vuelve a preguntar.

Los eventos del Centro de Atención **nunca** se envían a plataformas
publicitarias, ni siquiera con consentimiento: construir audiencias de "quien
reportó una falla" es perfilar clientes por sus problemas.

---

## 10. Calidad de lead

El Motor de Análisis recopila giro, tamaño, presupuesto y necesidades. **Esa
información no se envía a Meta ni a Google** — ni siquiera agregada.

La clasificación (lead → lead calificado → cliente) ocurrirá donde ya viven
esos datos: la tabla `analisis_negocio` en Supabase. Hoy no existe ese
proceso y no se construye en esta fase.

Para reconciliar rendimiento de campaña con calidad real de lead haría falta
una API de conversiones del lado servidor. Es trabajo posterior y requiere
decisiones de privacidad que aún no están tomadas.

---

## 11. Frecuencia

El control de cuántas veces alguien ve un anuncio se hace **en la
plataforma**, no en el sitio. El código no intenta seguir a nadie.

Al configurar campañas de retargeting, poner un límite de frecuencia. Sin él,
las audiencias pequeñas —que serán las nuestras al principio— reciben el
mismo anuncio decenas de veces por semana.

---

## 12. Landings de campaña

**No se creó ninguna.** La landing definitiva depende de la oferta, el
anuncio y el segmento, que todavía no existen.

Cuando toque, el patrón es `/lp/<campaña>` con `robots: noindex, follow`:
una landing de campaña no debe competir en buscadores con
`/soluciones/desarrollo-web`, que sí está optimizada para eso.

Mientras tanto, la landing de tráfico pagado es
**`/soluciones/desarrollo-web`**, auditada para ese uso.

---

## 13. Lo que todavía no se puede afirmar

Sin IDs reales conectados, **nadie puede decir** que:

- el Pixel está verificado
- las audiencias se están poblando
- la API de conversiones funciona
- Google Ads recibe eventos

Lo que sí está comprobado es que la capa emite los eventos correctos, con los
metadatos correctos, respetando el consentimiento, y que ningún dato personal
sale del navegador. Eso se verifica con:

```bash
npx next start          # en una terminal
node scripts/funnel-qa.mjs
```
