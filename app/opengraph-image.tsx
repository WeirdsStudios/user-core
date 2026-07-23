import { ImageResponse } from "next/og"

export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

// Imagen OG generada dinámicamente por Next.js (next/og, sin dependencias externas).
// Next.js la sirve en /opengraph-image y la incluye automáticamente en los meta tags.
// Para reemplazarla con un diseño personalizado, edita este archivo o coloca
// public/og-image.jpg (1200×630) y elimina este archivo.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo + headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              color: "#4cfc0f",
              fontSize: "14px",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            users.mx
          </div>
          <div
            style={{
              color: "white",
              fontSize: "52px",
              fontWeight: "bold",
              lineHeight: 1.15,
              maxWidth: "820px",
            }}
          >
            Desarrollo Web &amp; Consultoría de Negocio para PyMEs Mexicanas
          </div>
        </div>

        {/* Bottom: precio ancla + ubicación */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              background: "#4cfc0f",
              color: "#0A0A0A",
              padding: "14px 28px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Proyectos desde $15,000 MXN
          </div>
          <div style={{ color: "#666", fontSize: "14px" }}>
            Ciudad de México · hola@users.mx
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
