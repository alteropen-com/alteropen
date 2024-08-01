import { alternatives, apps } from "#site/content"
import AlternativeList from "@/components/theme/layout/alternative-list"
import DetailsList from "@/components/theme/layout/details-list"
import FeaturePopover from "@/components/theme/layout/feature-popover"
import NavLeft from "@/components/theme/layout/nav-left"
import SortList from "@/components/theme/layout/sort-list"
import { SORT_TYPE } from "@/config/const"
import { PRICING_ITEM } from "@/config/selection"
import { siteConfig } from "@/config/site"
import { capitalizeFirstLetter, encodeTitleToSlug } from "@/lib/utils"
import { Metadata } from "next"

export interface SearchParams {
  sortBy?: string
  onlyDeal?: string
  feature?: string
  openSource?: string
  free?: string
}
export interface TaskPageProps {
  params: {
    slug: string
  }
  searchParams: SearchParams
}

const filterApps = (slug: string, searchParams: SearchParams) => {
  const { sortBy, onlyDeal, feature, openSource, free } = searchParams

  let featureQuery = feature?.split(",") || []

  return apps
    .filter((app) => {
      if (app.published === false) return false
      if (
        featureQuery.length > 0 &&
        (!app.features ||
          !featureQuery.every((f) => app?.features?.includes(f)))
      ) {
        return false
      }

      if (
        openSource === "true" &&
        !app.pricing?.includes(PRICING_ITEM.OpenSource)
      )
        return false

      if (free === "true" && !app.pricing?.includes(PRICING_ITEM.Free))
        return false

      if (slug === "all") return true
      if (!app.tasks) return false
      const appTags = app.tasks.map((task) => encodeTitleToSlug(task))

      return appTags.includes(slug.trim())
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "top":
          return a?.visit[0] > b?.visit[0] ? -1 : 1
        case "lasted":
        default:
          return a.id > b.id ? -1 : 1
      }
    })
    .filter((app) => {
      if (onlyDeal === "true") {
        return app.deals && app.deals?.length > 0
      }
      return true
    })
}

const filterAlternatives = (slug: string, searchParams: SearchParams) => {
  const { sortBy, onlyDeal, feature, openSource, free } = searchParams
  let featureQuery = feature?.split(",") || []

  return alternatives
    .filter((app) => {
      if (app.published === false) return false
      if (
        featureQuery.length > 0 &&
        (!app.features ||
          !featureQuery.every((f) => app?.features?.includes(f)))
      ) {
        return false
      }

      if (
        openSource === "true" &&
        !app.pricing?.includes(PRICING_ITEM["OpenSource"])
      )
        return false

      if (free === "true" && !app.pricing?.includes(PRICING_ITEM["Free"]))
        return false

      if (slug === "all") return true
      if (!app.tasks) return false

      const appTags = app.tasks.map((task) => encodeTitleToSlug(task))
      return appTags.includes(slug.trim())
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "top":
          return a?.visit[0] > b?.visit[0] ? -1 : 1
        case "lasted":
        default:
          return a.id > b.id ? -1 : 1
      }
    })
    .filter((app) => {
      if (onlyDeal === "true") {
        return app.deals && app.deals?.length > 0
      }
      return true
    })
}

const pageTitle = (slug: string, searchParams: SearchParams): string => {
  const { sortBy, onlyDeal, feature, openSource, free } = searchParams

  const sortTitle =
    sortBy === SORT_TYPE.top
      ? "Top"
      : sortBy === SORT_TYPE.latest
      ? "Lasted"
      : "Lasted"

  const dealTitle = onlyDeal === "true" ? "with Lifetime Deals" : ""

  const filterAppsList = filterApps(slug, searchParams)
  const filterAlternativesList = filterAlternatives(slug, searchParams)

  const appTittle = `${sortTitle} ${
    filterAppsList.length > 0 ? filterAppsList.length + " App" : ""
  } ${
    filterAppsList.length > 0 || filterAlternativesList.length > 0 ? " &" : ""
  } ${
    filterAlternativesList.length > 0
      ? filterAlternativesList.length + " Alternative"
      : ""
  } `
  const featureTitle = `${
    feature ? "for " + feature.replaceAll(",", " ").toUpperCase() : ""
  }`
  const tasksTitle = `${capitalizeFirstLetter(
    decodeURIComponent(slug.split("-").join(" "))
  )}`

  const openSourceTitle = openSource === "true" ? "OpenSource" : ""
  const freeTitle = free === "true" ? "Free" : ""

  const yearTitle = new Date().getFullYear()

  if (slug === "all")
    return `${appTittle} ${openSourceTitle} ${freeTitle} ${
      featureTitle || " for Indie/Saas"
    } ${dealTitle} in ${yearTitle}`

  return `${appTittle} ${openSourceTitle} ${freeTitle} ${featureTitle} in ${tasksTitle} ${dealTitle} ${yearTitle}`
}

export async function generateMetadata({
  params,
  searchParams,
}: TaskPageProps): Promise<Metadata> {
  const { slug } = params
  const title = pageTitle(slug, searchParams)
  const description = `Top Alternatives for ${slug} with Review, HowTo. Pricing and more.`

  const href = `/tasks/${slug}`
  const imageUrl = siteConfig.image

  return {
    title: title,
    description: description,
    authors: { name: siteConfig.author },
    alternates: {
      // canonical: href,
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

export default function Page({ params, searchParams }: TaskPageProps) {
  const { slug } = params
  const { sortBy, onlyDeal } = searchParams

  const displayApps = filterApps(slug, searchParams)

  const displayAlternatives = filterAlternatives(slug, searchParams)

  return (
    <div className="container py-6 flex">
      <NavLeft slug={slug} />
      <div className="flex flex-col flex-1">
        <h2 className="font-bold text-xl lg:text-2xl">
          {pageTitle(slug, searchParams)}
        </h2>
        <SortList slug={slug} searchParams={searchParams} />
        <div className="flex items-center space-x-2">
          <FeaturePopover
            searchParams={searchParams}
            appFilter={[...displayApps, ...displayAlternatives]}
          />
        </div>

        <hr className="mb-2 sm:mb-4" />

        {displayApps?.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <h3 className="font-bold flex-1 text-lg lg:text-xl">
                Best {displayApps?.length} Alternative
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-y-8 mt-4">
              <DetailsList apps={displayApps.slice(0, 40)} />
            </div>
          </div>
        )}
        {displayAlternatives?.length > 0 && (
          <div className="flex flex-col flex-1">
            <hr className="my-8" />
            <h3 className="font-bold text-lg lg:text-xl">
              Best {displayAlternatives?.length} Alternative
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-y-8 mt-4">
              <AlternativeList apps={displayAlternatives.slice(0, 40)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
