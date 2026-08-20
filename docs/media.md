# Material visual — dónde va cada archivo

Cuando llegue el material real, esto es lo único que hay que hacer. **El layout
no cambia**: las proporciones ya están reservadas y las portadas editoriales se
sustituyen solas.

---

## Flujo

```
_incoming-media/<proyecto>/   ← originales (ignorado por git)
        ↓  ffmpeg + cwebp
public/imgs/…                 ← lo que se publica
        ↓  quitar `placeholder` y `cover` del slot
lib/projects.ts · lib/products-media.ts
```

Los comandos de conversión están en `_incoming-media/README.md`.

---

## Llevelín — `public/imgs/projects/llevelin/`

El caso tiene tres momentos y cada uno tiene su slot en `lib/projects.ts`.

| Slot | Archivos esperados |
|---|---|
| Caja | `caja.webm` · `caja.mp4` · `caja-poster.webp` |
| Autocobro | `autocobro.webm` · `autocobro.mp4` · `autocobro-poster.webp` |
| Islas de atención | `isla-atencion.webm` · `isla-atencion.mp4` · `isla-atencion-poster.webp` |

### Si solo hay un video general

No hace falta producir tres. Opciones, de menos a más trabajo:

**a) Un solo slot con el video general.** Borra los otros dos del array
`assets` y deja uno:

```ts
assets: [
  {
    video: "general",
    dir: "projects/llevelin",
    badge: "Punto de venta",
    caption: "El punto de venta operando en piso",
    alt: "Sistema de punto de venta de Llevelín en uso",
  },
]
```

**b) El video en el primero y portadas editoriales en los otros dos.** Basta
con quitar `placeholder` y `cover` del slot que ya tiene material; los demás
siguen mostrando su portada, que es una composición terminada y no un hueco.

**c) Una sola imagen.** `image: "/imgs/projects/llevelin/general.webp"` en vez
de `video`. `MediaFrame` acepta las tres formas sin cambios.

---

## ACTIIVA — `public/imgs/products/actiiva/`

```
preview.webm  ·  preview.mp4  ·  preview-poster.webp
```

O una sola imagen: `preview.webp`.

En `lib/products-media.ts`, quitar `placeholder`, `expectedPath` y `cover`, y
añadir `video: "preview"` o `image: "/imgs/products/actiiva/preview.webp"`.

## MEDIICA — `public/imgs/products/mediica/`

Idéntico, en `products/mediica/`.

---

## Reglas

- **Ningún GIF.** Un GIF de 27 MB se convierte en un WebM de 1.5 MB con mejor
  calidad. La conversión de los tres originales pasó de 55 MB a 3.5 MB.
- **Siempre póster.** Es lo que se ve mientras el video carga, lo que ve quien
  tiene el autoplay bloqueado y lo que ve quien pidió menos animación.
- **WebM + MP4.** WebM pesa menos; MP4 es el respaldo para Safari antiguo.
- **Ancho 960 px.** Los videos se muestran dentro de un marco, no a pantalla
  completa: más resolución solo suma peso.
- **Nada de interfaces simuladas.** Si no hay captura real, la portada
  editorial usa tipografía y datos verificables. Una pantalla inventada de un
  punto de venta se lee como el producto real del cliente.
