import { alternatives, apps } from "#site/content"
import AlternativeList from "@/components/theme/layout/alternative-list"
import DetailsList from "@/components/theme/layout/details-list"
import NavLeft from "@/components/theme/layout/nav-left"
import SortList from "@/components/theme/layout/sort-list"
import { siteConfig } from "@/config/site"
import { capitalizeFirstLetter, encodeTitleToSlug } from "@/lib/utils"
import { Metadata } from "next"

interface PageProps {
  params: {
    slug: string
  }
  searchParams: { sortBy?: string }
}

const filterApps = (slug: string) => {
  return apps.filter((app) => {
    if (app.published === false) return false
    if (slug === "all") return true
    if (!app.tasks) return false
    const appTags = app.tasks.map((task) => encodeTitleToSlug(task))
    return appTags.includes(slug.trim())
  })
}

const filterAlternatives = (slug: string) => {
  return alternatives.filter((app) => {
    if (app.published === false) return false
    if (slug === "all") return true
    if (!app.tasks) return false
    const appTags = app.tasks.map((task) => encodeTitleToSlug(task))
    return appTags.includes(slug.trim())
  })
}

const pageTitle = (slug: string): string => {
  if (slug === "all")
    return "AlternativeTo and Deal List for Solo Developers and Startups in 2024"
  return `Top ${
    filterApps(slug).length
  } Apps and Deals for ${capitalizeFirstLetter(
    decodeURIComponent(slug.split("-").join(" "))
  )} (Free/ OpenSource...) in 2024`
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const title = pageTitle(slug)
  const description = `Top Alternatives for ${slug} with Review, HowTo. Pricing and more.`

  const href = `/tasks/${slug}`
  const imageUrl = siteConfig.image

  return {
    title: title,
    description: description,
    authors: { name: siteConfig.author },
    alternates: {
      canonical: href,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: title,
      description,
      type: "article",
      url: href,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [imageUrl],
    },
  }
}

export default function Page({ params, searchParams }: PageProps) {
  const { slug } = params
  const { sortBy } = searchParams

  const displayApps = filterApps(slug).sort((a, b) => {
    switch (sortBy) {
      case "top":
        return a?.visit[0] > b?.visit[0] ? -1 : 1
      case "lasted":
      default:
        return a.id > b.id ? -1 : 1
    }
  })

  const displayAlternatives = filterAlternatives(slug).sort((a, b) => {
    switch (sortBy) {
      case "top":
        return a?.visit[0] > b?.visit[0] ? -1 : 1
      case "lasted":
      default:
        return a.id > b.id ? -1 : 1
    }
  })

  return (
    <div className="container py-6 flex">
      <NavLeft />
      <div className="flex flex-col flex-1">
        {displayApps?.length > 0 && (
          <div className="flex flex-col flex-1">
            <div className="flex flex-wrap">
              <h2 className="font-bold flex-1 text-xl lg:text-2xl capitalize">
                {pageTitle(slug)}
              </h2>
            </div>
            <SortList sortBy={sortBy} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-y-8 mt-4">
              <DetailsList apps={displayApps} />
            </div>
          </div>
        )}
        {displayAlternatives?.length > 0 && (
          <div className="flex flex-col flex-1">
            <hr className="my-8" />
            <h2 className="font-bold text-xl lg:text-2xl capitalize">
              Best {displayAlternatives?.length} Alternative
            </h2>
            <SortList sortBy={sortBy} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-y-8 mt-4">
              <AlternativeList apps={displayAlternatives} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
