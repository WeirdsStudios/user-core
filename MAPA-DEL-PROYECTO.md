# MAPA DEL PROYECTO — users.mx

## Estructura de componentes

### Sitio principal (`/app/page.tsx`)
Orden de secciones en la home:
1. Header (fixed)
2. Hero
3. Manifesto
4. ClientLogos
5. Services
6. Portfolio
7. Process
8. Differentiators ("Por qué elegirnos")
9. Testimonials
10. MotorCTA ("Motor de Análisis")
11. FAQ
12. Team
13. FinalCTA
14. Blog
15. Footer

---

## Componente clave: BrowserFrame

**Archivo:** `components/ui/BrowserFrame.tsx`

Renderiza un marco de navegador (browser chrome) con una imagen de screenshot adentro.

```tsx
<BrowserFrame
  screenshotSrc="/imgs/portfolio/tu-proyecto.webp"  // ← CAMBIAR AQUÍ
  screenshotAlt="Nombre del proyecto"
  urlLabel="tudominio.com"
/>
```

**Para reemplazar la imagen interior de cada proyecto:**
- Ir a `components/sections/Portfolio.tsx`
- Buscar el array `projects`
- Cambiar el campo `screenshotSrc` de cada proyecto por la captura real

---

## Imágenes del proyecto (`/public/imgs/`)

```
imgs/
  hero/
    sec-1-portrait.webp      → foto retrato del equipo (hero)
    sec-1-bg-lines.webp      → textura de fondo del hero
    sec-1-shape-25.webp      → elemento decorativo esquina superior derecha
    sec-1-alien.webp         → elemento decorativo flotante (hero)
  portfolio/
    sec-3-project-1.webp     → Greek Gym — reemplazar con screenshot real
    sec-3-project-2.webp     → Las Frescas — reemplazar con screenshot real
    sec-3-project-3.webp     → SoFit — reemplazar con screenshot real
    sec-3-project-4.webp     → Consulto — reemplazar con screenshot real
    sec-3-project-5.webp     → decorativo en sidebar del portafolio
  team/
    sec-6-member-1.webp      → foto miembro equipo (Desarrollo)
    sec-6-member-2.webp      → foto miembro equipo (Diseño)
    sec-6-member-3.webp      → foto miembro equipo (Estrategia)
    sec-6-member-4.webp      → foto miembro equipo (Marketing)
    avatar-1.webp            → avatar testimonio Carlos M.
    avatar-2.webp            → avatar testimonio Daniela R.
    avatar-3.webp            → avatar testimonio Alejandro V.
  clients/
    logo-brand-01.webp       → logo Greek Gym (marquee)
    logo-brand-02.webp       → logo Las Frescas (marquee)
    logo-brand-03.webp       → logo SoFit (marquee)
    logo-brand-04.webp       → logo Consulto (marquee)
    logo-brand-05.webp       → logo users.mx (marquee)
  blog/
    thumb-1.webp             → thumbnail artículo 1
    thumb-2.webp             → thumbnail artículo 2
    thumb-3.webp             → thumbnail artículo 3
    thumb-4.webp             → thumbnail artículo 4
  bg/
    bg-img.webp              → textura de fondo (Testimonials, FinalCTA)
    bg-img-2.webp            → textura decorativa (Manifesto)
    bg-img-3.webp            → imagen strip (Manifesto)
    scene.webp               → foto de escena (Process, Differentiators)
  logos/
    imagotipo_user.svg       → logo verde+negro (Header oscuro)
    imagotipo_user_black.svg → logo negro+verde (Header blanco, Footer)
    isotipo_user.svg         → favicon
    isotipo_user_black.svg   → variante de favicon
```

---

## Motor de Análisis (`/analisis`)

- **Frontend:** `app/analisis/page.tsx` — 6 pasos, client component
- **Backend:** `app/api/analisis/calcular/route.ts` — cálculo + Supabase + Resend
- **Guardado progresivo:** `app/api/analisis/guardar-progreso/route.ts`
- **Admin client:** `lib/supabase-admin.ts`
- **Schema DB:** `supabase/schema.sql`

Variables de entorno requeridas (`.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `NOTIFICATION_EMAIL`

---

## Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| Accent | `#4cfc0f` | CTAs, íconos activos, acentos verdes |
| Background dark | `#0A0A0A` | Hero, secciones oscuras, footer |
| Background light | `#F5F5F5` | Secciones alternadas claras |
| Text primary | `#0A0A0A` | Títulos y cuerpo sobre fondo claro |
| Text muted | `#888` | Texto secundario |
| Accent tint | `#f0ffe8` | Fondos de confirmación/info en el motor |

---

## Scroll snap

Secciones con `snap-start` (se centran en pantalla al hacer scroll):
Hero, ClientLogos, Process, Differentiators, Testimonials, MotorCTA, Team, FinalCTA

Secciones SIN snap (scroll libre — contenido largo):
Portfolio, FAQ, Blog
