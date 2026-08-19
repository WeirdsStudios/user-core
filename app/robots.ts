import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

/**
 * Una sola regla para todos los agentes: todo el contenido público es
 * crawlable (Googlebot, Bingbot, OAI-SearchBot y cualquier otro quedan
 * cubiertos por `*`), y solo se bloquean las rutas de API, que no tienen
 * contenido indexable. No se listan agentes de IA uno por uno: no aporta
 * nada sobre el comodín y solo agrega mantenimiento.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
