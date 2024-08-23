// import { alternatives } from "#site/content"
import { Alternative } from "@/.velite"
import { siteConfig } from "@/config/site"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { encodeTitleToSlug } from "@/lib/utils"
import { MetadataRoute } from "next"

// Fetch the alternatives JSON file
async function fetchAlternatives() {
  const response = await fetch(`${siteConfig.url}/static/alternatives.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch alternatives: ${response.statusText}`)
  }
  return response.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const alternatives = (await fetchAlternatives()) as Alternative[]
  const displayAlternatives = alternatives
    .filter((app) => app.published)
    .sort((a, b) => (a.id > b.id ? -1 : 1))

  const alternativesSiteMap = displayAlternatives.map((app) => {
    return {
      url: `${siteConfig.url}/alternative/${app.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: app.lastModified,
    }
  }) as MetadataRoute.Sitemap

  const { tasks } = getAllTags(alternatives)
  const sortedTasks = sortTagsByCount(tasks)

  const tasksSiteMap = sortedTasks.map((task) => {
    return {
      url: `${siteConfig.url}/tasks/${encodeTitleToSlug(task)}`,
      changeFrequency: "daily",
      priority: 0.6,
    }
  }) as MetadataRoute.Sitemap

  return [...tasksSiteMap, ...alternativesSiteMap]
}
