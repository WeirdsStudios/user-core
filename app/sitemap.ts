import type { MetadataRoute } from "next"
import { BLOG_POSTS } from "@/lib/blog"
import { PROJECTS } from "@/lib/projects"
import { SOLUTIONS } from "@/lib/solutions"
import { siteConfig } from "@/lib/site-config"

/**
 * Fecha del último cambio de contenido del sitio. Se actualiza a mano cuando
 * hay una edición real — usar `new Date()` haría que cada build reportara
 * "modificado hoy" para todo, que es una señal inútil para los buscadores.
 */
const LAST_CONTENT_UPDATE = new Date("2026-08-19")

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig

  const projectUrls: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${url}/proyectos/${project.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const solutionUrls: MetadataRoute.Sitemap = SOLUTIONS.map((solution) => ({
    url: `${url}/soluciones/${solution.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    { url, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 1 },
    {
      url: `${url}/analisis`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/soluciones`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...solutionUrls,
    {
      url: `${url}/proyectos`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/productos`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
    {
      url: `${url}/blog`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${url}/ayuda`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${url}/centro-de-atencion`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogUrls,
  ]
}
