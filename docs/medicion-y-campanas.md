# Medición y campañas — users.mx

Cómo está instrumentado el sitio y qué URLs usar para cada canal.

---

## 1. Cómo se mide

Toda la medición pasa por una sola función:

```ts
import { trackEvent } from "@/lib/analytics/track"
trackEvent("cta_contact_clicked", { page: "/proyectos" })
```

Ningún componente habla con Google, Meta o Vercel directamente. Cambiar de
proveedor —o quitarlos todos— no obliga a tocar un solo componente.

**Los clics no se instrumentan a mano.** `components/analytics/ClickTracker.tsx`
escucha todos los clics y deduce el evento del destino del enlace:

| Destino del enlace | Evento |
|---|---|
| `wa.me/...` | `whatsapp_clicked` |
| `mailto:` / `tel:` | `cta_contact_clicked` |
| `/analisis` | `cta_analysis_clicked` |
| `/soluciones/<slug>` | `solution_cta_clicked` |
| `/proyectos/<slug>` | `project_cta_clicked` |
| `data-cta="product_trial"` | `product_trial_clicked` |

Un CTA nuevo queda medido por existir. No hay handler que se pueda olvidar.

### Qué NO se envía nunca

Texto de conversaciones, nombres, correos, teléfonos, contenido de formularios,
contraseñas ni URLs privadas. `lib/analytics/track.ts` filtra en ejecución:
descarta cualquier clave fuera de la lista permitida, cualquier valor de más de
64 caracteres y cualquiera que parezca un dato personal. El tipo ayuda mientras
se programa; el filtro es lo que protege en producción.

---

## 2. Proveedores

| Proveedor | Estado | Necesita |
|---|---|---|
| Vercel Analytics | **activo** | Encenderlo en el panel del proyecto |
| Vercel Speed Insights | **activo** | Encenderlo en el panel del proyecto |
| Google Analytics 4 | listo, inactivo | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Meta Pixel | listo, inactivo | `NEXT_PUBLIC_META_PIXEL_ID` |

Sin esas variables no se carga ningún script de terceros y **el sitio no pone
cookies**. Por eso hoy no hay aviso de consentimiento.

> **Al activar GA4 o Meta hay que añadir el aviso de cookies.** Ambos las usan.
> Es un requisito legal, no una opción.

### Variables a dar de alta en Vercel

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX     # Google Analytics → Admin → Flujos de datos
NEXT_PUBLIC_META_PIXEL_ID=000000000000000      # Meta Events Manager → Orígenes de datos
```

Van en Production, Preview y Development. Llevan `NEXT_PUBLIC_` porque el
navegador las necesita: son identificadores públicos, no secretos. **Ninguna
clave privada debe llevar ese prefijo.**

---

## 3. Conversiones a configurar

En GA4: *Admin → Eventos → Marcar como conversión*. En Meta: *Events Manager →
Eventos personalizados*.

**Principales**

| Evento | Qué significa |
|---|---|
| `analysis_completed` | Terminó el Motor de Análisis. Es el lead más calificado que produce el sitio. |
| `cta_contact_clicked` | Escribió a `hola@users.mx`. |
| `support_whatsapp_clicked` | Salió a WhatsApp desde el Centro con contexto ya recabado. |

**De producto**

| Evento | Qué significa |
|---|---|
| `product_trial_clicked` | Pidió acceso anticipado a ACTIIVA o MEDIICA. |

**No marcar `page_view` como conversión.** Es tráfico, no resultado.

### Embudo intermedio

`analysis_started` → `analysis_step_completed` (con `step` 1–6) →
`analysis_completed`. Sirve para ver en qué paso se cae la gente. No es
conversión: es diagnóstico.

---

## 4. URLs por canal

Los parámetros se leen al llegar, se guardan durante la sesión y viajan con
cada evento. **La URL nunca se reescribe** y los enlaces internos no se
ensucian.

### Tarjetas de presentación (QR)

```
https://www.users.mx/?utm_source=business_card&utm_medium=offline&utm_campaign=networking
```

Recomendación: **una variante por lote** para saber qué funciona.

```
...&utm_content=lote_2026_q3        # tarjetas impresas en el trimestre
...&utm_content=evento_expo_pyme    # las que se reparten en un evento
```

Al generar el QR, apuntarlo a la URL completa con parámetros. Un acortador
propio también sirve siempre que redirija a esta URL.

### Instagram

| Ubicación | URL |
|---|---|
| Bio | `https://www.users.mx/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil` |
| Historia | `https://www.users.mx/?utm_source=instagram&utm_medium=story&utm_campaign=<tema>` |
| Anuncio | `https://www.users.mx/?utm_source=instagram&utm_medium=paid_social&utm_campaign=<campaña>&utm_content=<creativo>` |

### Facebook

```
https://www.users.mx/?utm_source=facebook&utm_medium=paid_social&utm_campaign=<campaña>&utm_content=<creativo>
```

### Google Ads

```
https://www.users.mx/?utm_source=google&utm_medium=cpc&utm_campaign=<campaña>&utm_term=<palabra clave>
```

Si se activa el etiquetado automático de Google Ads, **no** agregar `utm_source`
ni `utm_medium` a mano: se duplica la atribución. Usar solo `utm_campaign`.

### WhatsApp y mensajería directa

```
https://www.users.mx/?utm_source=whatsapp&utm_medium=directo&utm_campaign=prospeccion
```

### ChatGPT y buscadores con IA

No se puede etiquetar: el enlace lo genera el modelo. Se reconoce por el
`referrer_host` que la capa guarda automáticamente (`chatgpt.com`,
`perplexity.ai`). Nada que configurar.

### Tráfico directo

Sin parámetros y sin referrer. Es el comportamiento por defecto.

---

## 5. Convención

- Todo en **minúsculas**, sin acentos ni espacios (guion bajo para separar).
- `utm_source` = **dónde** estaba la persona (instagram, google, business_card).
- `utm_medium` = **qué tipo** de enlace era (paid_social, bio, offline, cpc).
- `utm_campaign` = **qué** se estaba promoviendo.
- `utm_content` = **cuál variante**, para comparar creativos o lotes.

Mantener la convención importa más que elegir los nombres "correctos": dos
nombres para lo mismo parten el reporte en dos.

---

## 6. Verificar que funciona

En desarrollo, cada evento se imprime en la consola con el prefijo
`[analytics]`. Para probar la atribución:

1. Abrir `https://www.users.mx/?utm_source=business_card&utm_medium=offline`
2. Abrir la consola del navegador
3. Navegar a otra página
4. Los eventos deben seguir mostrando `utm_source: "business_card"`
