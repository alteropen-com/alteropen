import { alternatives, apps } from "#site/content"
import { siteConfig } from "@/config/site"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { encodeTitleToSlug } from "@/lib/utils"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const displayApps = apps
    .filter((app) => app.published)
    .sort((a, b) => (a.id > b.id ? -1 : 1))

  const appsSiteMap = displayApps.map((app) => {
    return {
      url: `${siteConfig.url}/app/${app.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }
  }) as MetadataRoute.Sitemap

  const displayAlternatives = alternatives
    .filter((app) => app.published)
    .sort((a, b) => (a.id > b.id ? -1 : 1))

  const alternativesSiteMap = displayAlternatives.map((app) => {
    return {
      url: `${siteConfig.url}/alternative/${app.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }
  }) as MetadataRoute.Sitemap

  const { tasks } = getAllTags([...apps, ...alternatives])
  const sortedTasks = sortTagsByCount(tasks)

  const tasksSiteMap = sortedTasks.map((task) => {
    return {
      url: `${siteConfig.url}/tasks/${encodeTitleToSlug(task)}`,
      changeFrequency: "daily",
      priority: 0.6,
    }
  }) as MetadataRoute.Sitemap

  return [...tasksSiteMap, ...appsSiteMap, ...alternativesSiteMap]
}
