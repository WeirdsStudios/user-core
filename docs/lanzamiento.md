# Lanzamiento de users.mx

Qué hacer antes, durante y después de publicar. Y cómo volver atrás si hace falta.

---

## 1. Entorno

| | |
|---|---|
| Hosting | Vercel — proyecto `user-core`, cuenta `haza-munguia` |
| Producción | `https://www.users.mx` |
| Dominio | `users.mx`, registrado con un tercero y **con nameservers externos** |
| Canónico | `https://www.users.mx` — el apex responde 308 hacia www |
| Base de datos | Supabase (tabla `analisis_negocio`) |
| Correo | Resend |
| Node | 24.x |

**No tocar el DNS.** Los nameservers no están en Vercel; cambiar algo ahí puede
tirar el correo y el dominio, y no hace falta para publicar.

---

## 2. Antes de publicar

```bash
npx tsc --noEmit          # tipos
npm run lint              # reglas
npm run build             # build de producción
npx tsx scripts/support-qa.mts   # banco del Centro de Atención
npm audit --omit=dev      # dependencias de producción
```

Los cinco tienen que pasar. Si el build falla, no se publica.

---

## 3. Publicar

```bash
git add -A
git commit -m "..."
git tag -a v1.0.0 -m "Lanzamiento comercial"
git push origin <rama> --tags
```

Vercel construye solo al recibir el push a la rama de producción.

---

## 4. Después de publicar — comprobación manual

No basta con que Vercel diga "Ready". Abrir y revisar:

- [ ] `https://www.users.mx` carga y se ve correcta
- [ ] `https://users.mx` redirige a www en **un solo salto**
- [ ] `/analisis` — completar el flujo entero y confirmar que llega el correo
- [ ] `/soluciones` y una solución
- [ ] `/proyectos` y los tres casos
- [ ] `/productos`
- [ ] `/blog` y un artículo
- [ ] `/ayuda`
- [ ] `/centro-de-atencion` — hacer dos preguntas y escalar a WhatsApp
- [ ] Una URL inventada → debe salir la 404 de USERS, en español
- [ ] `/robots.txt` → apunta a `https://www.users.mx/sitemap.xml`
- [ ] `/sitemap.xml` → 20 URLs, todas con www
- [ ] `/llms.txt` → precios correctos
- [ ] El slug viejo del artículo de ACTIIVA → 301 a la URL nueva

### Metadatos sociales

No hay forma de verificarlos automáticamente desde fuera. Manualmente:

1. **WhatsApp** — mandarse a uno mismo `https://www.users.mx/proyectos/greek-gym`.
   Debe salir título, descripción e imagen. WhatsApp cachea de forma agresiva:
   si sale mal y ya se corrigió, probar con `?v=2` al final.
2. **LinkedIn** — [Post Inspector](https://www.linkedin.com/post-inspector/).
   Tiene botón para forzar el refresco del caché.
3. **Facebook** — [Sharing Debugger](https://developers.facebook.com/tools/debug/).
4. **X/Twitter** — [Card Validator](https://cards-dev.twitter.com/validator).

Revisar al menos: la home, una solución, un proyecto y un artículo.

---

## 5. Analytics en producción

En el panel de Vercel: **Analytics** y **Speed Insights** → activar.

Comprobar que llegan, sin generar decenas de eventos de prueba:

- [ ] `page_view` al abrir la home
- [ ] `cta_analysis_clicked` al pulsar "Analizar mi negocio"
- [ ] `analysis_started` al pasar del paso 1
- [ ] `support_opened` al abrir el Centro
- [ ] `whatsapp_clicked` al pulsar el botón flotante

Con **una** vez de cada basta. Si el proveedor permite filtrar tráfico interno,
excluir la IP propia antes de probar.

---

## 6. Google Search Console

No se puede automatizar sin una integración autorizada. Manual:

1. **Verificar la propiedad** de `users.mx`. Elegir **propiedad de dominio**
   (no prefijo de URL): cubre apex y www de una vez. Pide un registro TXT en el
   DNS — es lo único que hay que tocar ahí, y no afecta a nada más.
2. **Enviar el sitemap**: `https://www.users.mx/sitemap.xml`
3. **Inspeccionar la home** y pedir indexación.
4. **Pedir indexación** solo de las principales:
   - `/`
   - `/soluciones`
   - `/soluciones/desarrollo-web`
   - `/soluciones/software-a-medida`
   - `/soluciones/punto-de-venta-a-medida`
   - `/soluciones/cotizadores-digitales`
   - `/proyectos`
   - `/proyectos/greek-gym`
   - `/proyectos/llevelin`
   - `/proyectos/las-frescas`
   - `/productos`
5. **A los 7 días**: revisar Cobertura. A los 30: Rendimiento.

No pedir indexación de las 20 URLs a mano. Con el sitemap enviado y el
rastreo funcionando, el resto llega solo; la cuota manual es limitada y se
gasta mejor en las páginas comerciales.

### Qué significa cada estado

Son cuatro cosas distintas y conviene no confundirlas:

- **Rastreable** — Google puede entrar. Se controla con robots.txt.
- **Descubierta** — Google conoce la URL. Se logra con el sitemap.
- **Indexada** — Google la guardó y puede mostrarla.
- **Posicionada** — aparece bien para búsquedas reales.

Enviar el sitemap resuelve *descubierta*. No garantiza indexada, y **no tiene
nada que ver** con posicionar. Eso depende del contenido y de la competencia,
y se mide en meses.

---

## 7. Bing

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → añadir el sitio.
2. Verificar. Lo más rápido es importar desde Google Search Console.
3. Enviar `https://www.users.mx/sitemap.xml`.
4. Usar URL Inspection para la home.

### IndexNow — pendiente, no implementado

Permite avisar a Bing en cuanto una URL cambia, en vez de esperar al rastreo.
Requiere:

1. Generar una clave (cadena aleatoria de 8–128 caracteres).
2. Publicarla en `public/<clave>.txt` con la clave como contenido.
3. Llamar al endpoint de IndexNow con las URLs que cambiaron.

**No se implementó** porque el sitio no tiene un evento de publicación: el
contenido cambia al desplegar, no al guardar en un gestor. Engancharlo al
despliegue es posible, pero hay que hacerlo bien —solo las URLs que
cambiaron— y no mandar un ping en cada carga de página. Queda como tarea
posterior al lanzamiento.

---

## 8. Indexación heredada

Puede que sigan apareciendo en los buscadores resultados de la versión
anterior del sitio. Eso **no se arregla en el repositorio**: es caché externa.

Después de publicar, buscar en Google:

```
site:users.mx
```

Anotar lo que salga y no debería:

- Títulos o descripciones viejas → se corrigen solas al recrawlear. Se puede
  acelerar con "Inspeccionar URL" → "Solicitar indexación".
- URLs que ya no existen → deben dar 404. Si son importantes, agregar un 301 en
  `next.config.ts`.
- Contenido que debe desaparecer ya → *Eliminaciones* en Search Console
  (oculta el resultado ~6 meses; no reemplaza al 404 ni al redirect).

Lo mismo en Bing Webmaster Tools.

---

## 9. Volver atrás

Vercel guarda todos los despliegues. Para revertir:

1. Panel de Vercel → proyecto `user-core` → **Deployments**
2. Buscar el despliegue anterior que funcionaba
3. **⋯ → Promote to Production**

Tarda segundos y no requiere build. **No borrar despliegues viejos:** son el
mecanismo de reversión.

Desde consola:

```bash
npx vercel rollback           # vuelve al anterior
npx vercel ls user-core       # lista los despliegues
```

En el repositorio, cada lanzamiento queda etiquetado (`git tag`). Para volver
al código de una versión concreta:

```bash
git checkout v1.0.0
```

---

## 10. Pendientes conocidos

| Tema | Estado |
|---|---|
| Content-Security-Policy | No implementada. Una CSP útil en Next necesita nonce por petición, y eso obliga a render dinámico en las 29 rutas hoy estáticas. La alternativa (`unsafe-inline`) da apariencia de protección sin protección. |
| Límite de frecuencia distribuido | El actual vive en memoria del proceso. Frena abuso casual y scripts simples, no un ataque distribuido. Para eso hace falta un contador compartido. |
| Material de Llevelín | Los tres huecos están reservados con la proporción correcta. Se sustituyen sin tocar el layout (ver `lib/projects.ts`). |
| Archivos sin uso en `public/` | ~80 MB sin ninguna referencia (GIFs originales ya convertidos a video, e imágenes de la plantilla original). No afectan el rendimiento —nadie los pide— pero engordan cada despliegue. |
| IndexNow | Ver sección 7. |
| Aviso de cookies | Necesario **solo** si se activan GA4 o Meta Pixel. |
