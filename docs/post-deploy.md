# Checklist post-deploy

Cosas que solo tienen sentido ejecutar contra el dominio real, no en local.
Nada de esto está implementado en código todavía — es deliberado.

---

## 1. IndexNow (Bing, Yandex, Seznam)

**Estado: no implementado. Pendiente para después del deploy.**

Se evaluó implementarlo en esta fase y se decidió que no: IndexNow avisa a los
buscadores de URLs *nuevas o modificadas*, y para eso necesita (a) un dominio en
producción que sirva el archivo de verificación y (b) URLs que hayan cambiado
realmente. En local no se puede verificar la key ni comprobar que el envío
funcionó, así que el código quedaría escrito a ciegas.

No requiere ninguna dependencia: es una petición HTTP.

### Cómo configurarlo cuando el sitio esté desplegado

**a) Generar la key.** Una cadena hexadecimal de 8–128 caracteres:

```bash
openssl rand -hex 32
```

**b) Publicar el archivo de verificación.** Crear `public/<key>.txt` cuyo
contenido sea exactamente la key. Debe quedar accesible en
`https://users.mx/<key>.txt`. Este archivo es público por diseño — la key de
IndexNow no es un secreto, solo demuestra control del dominio. Aun así, guarda
la key también en una variable de entorno (`INDEXNOW_KEY`) para no repetirla en
el código.

**c) Enviar URLs.** Un POST con las URLs que cambiaron:

```bash
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "host": "users.mx",
    "key": "'"$INDEXNOW_KEY"'",
    "keyLocation": "https://users.mx/'"$INDEXNOW_KEY"'.txt",
    "urlList": [
      "https://users.mx/soluciones",
      "https://users.mx/soluciones/desarrollo-web"
    ]
  }'
```

Una respuesta `200` o `202` significa aceptado.

### Reglas de uso

- Enviar **solo URLs que cambiaron**. Reenviar el sitemap completo en cada
  despliegue es contraproducente y puede hacer que ignoren el dominio.
- No enviar más de una vez por cambio real de contenido.
- El sitemap (`/sitemap.xml`) sigue siendo el mecanismo principal; IndexNow solo
  acelera el aviso.

---

## 2. Google Search Console y Bing Webmaster Tools

- Verificar la propiedad de `users.mx` en ambos.
- Enviar `https://users.mx/sitemap.xml`.
- **Revisar si existe indexación histórica de un dominio anterior** (la Fase 1
  no encontró ningún rastro de "Haza" en el repositorio, así que si existe es
  externo). Si aparece, configurar redirecciones 301 desde ahí.

---

## 3. Analítica y tráfico referido por IA — pendiente para la Fase 7

Hoy el proyecto **no tiene ninguna capa de analítica**, así que no se agregó
lógica de tracking: sería código sin nada que lo consuma.

Cuando se instale, debe poder distinguir al menos:

| Origen | Cómo se identifica |
|---|---|
| ChatGPT | `utm_source=chatgpt.com`, o `referrer` con ese host |
| Perplexity | `referrer` de `perplexity.ai` |
| Gemini / Copilot | `referrer` de `gemini.google.com`, `copilot.microsoft.com` |
| Tarjeta de presentación | Un parámetro propio, p. ej. `?ref=tarjeta` |
| Búsqueda orgánica | Google Search Console, no analítica de cliente |

El caso de la tarjeta es el único que exige una decisión previa: hay que
imprimir la URL con el parámetro para poder medirlo.

---

## 4. Antes de encender campañas

- [ ] Sustituir las capturas placeholder de Llevelín
      (`lib/projects.ts` → quitar `placeholder`, poner `image`).
- [ ] Sustituir los placeholders de marca de ACTIIVA y MEDIICA por capturas
      reales cuando existan.
- [ ] Confirmar el precio del plan de seguimiento de Sistemas.
- [ ] Probar el flujo completo de `/analisis` en producción, incluyendo el
      correo de Resend y el guardado en Supabase.
- [ ] Compartir `https://users.mx` en WhatsApp y verificar la vista previa.
