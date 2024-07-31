"use client"

import { Alternative } from "@/.velite"
import { SearchParams } from "@/app/tasks/[slug]/page"
import { Button } from "@/components/ui/button"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { useRouter } from "next/navigation"

export default function FeatureList({
  searchParams,
  appFilter,
}: {
  searchParams: SearchParams
  appFilter: Alternative[]
}) {
  const router = useRouter()

  const params = new URLSearchParams(searchParams as Record<string, string>)
  let featureQuery = params.get("feature")?.split(",") || []

  const { features } = getAllTags(appFilter)

  const isFeatureActive = (feature: string) => {
    const activeFeatures = searchParams.feature?.split(",") || []
    return activeFeatures.includes(feature)
  }

  const sortedFeatures = sortTagsByCount(features)
    .filter((f) => appFilter.some((app) => app.features?.includes(f)))
    .sort((a, b) => (isFeatureActive(a) ? -1 : 1))

  const handleClick = (featureToToggle: string) => {
    if (featureQuery.includes(featureToToggle)) {
      featureQuery = featureQuery.filter((f) => f !== featureToToggle)
    } else {
      featureQuery.push(featureToToggle)
    }

    featureQuery.sort((a, b) => a.localeCompare(b))

    if (featureQuery.length > 0) {
      params.set("feature", featureQuery.join(","))
    } else {
      params.delete("feature")
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl)
  }

  return (
    <>
      <div className="my-2 flex flex-wrap justify-start">
        {sortedFeatures?.map((t) => {
          const count = features[t]
          const isActive = isFeatureActive(t)
          return (
            <Button
              key={t}
              variant={isActive ? "default" : "outline"}
              className="mx-1 my-1 py-0 px-2 text-sm"
              onClick={() => handleClick(t)}
            >
              {t} {count ? `(${count})` : null}
            </Button>
          )
        })}
      </div>
    </>
  )
}
