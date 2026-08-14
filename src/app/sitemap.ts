import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { getPosts } from "@/lib/posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fph-solutions.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projets`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projets/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Blog pages
  const posts = await getPosts()
  const blogPages = posts.map((post) => {
    const d = post.date ? new Date(post.date) : new Date()
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(d.getTime()) ? new Date() : d,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  })

  return [...staticPages, ...projectPages, ...blogPages]
}

