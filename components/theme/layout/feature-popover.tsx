"use client"
import { Alternative } from "@/.velite"
import { SearchParams } from "@/app/tasks/[slug]/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDown, ChevronUp, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import FeatureList from "./feature-list"

export default function FeaturePopover({
  searchParams,
  appFilter,
}: {
  searchParams: SearchParams
  appFilter: Alternative[]
}) {
  const router = useRouter()

  const [showAll, setShowAll] = useState(false)

  const params = new URLSearchParams(searchParams as Record<string, string>)
  let featureQuery = params.get("feature")?.split(",") || []

  const { features } = getAllTags(appFilter)

  const sortedFeatures = sortTagsByCount(features).filter((f) =>
    appFilter.some((app) => app.features?.includes(f))
  )

  const isFeatureActive = (feature: string) => {
    const activeFeatures = searchParams.feature?.split(",") || []
    return activeFeatures.includes(feature)
  }

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

  const handleClear = () => {
    params.delete("feature")
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl)
  }

  return (
    <div className="flex flex-1 flex-col mt-4">
      <div className="flex flex-1 space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-10 border-dashed w-full max-w-[300px]"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Features</span>
              {featureQuery.length > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {featureQuery.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {featureQuery.length > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {featureQuery.length} selected
                      </Badge>
                    ) : (
                      featureQuery
                        .filter((f) => isFeatureActive(f))
                        .map((f) => (
                          <Badge
                            variant="secondary"
                            key={f}
                            className="rounded-sm px-1 font-normal"
                          >
                            {f}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Feature" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {sortedFeatures.map((t) => {
                    const count = features[t]
                    const isActive = isFeatureActive(t)
                    return (
                      <CommandItem key={t} onSelect={() => handleClick(t)}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span>{t}</span>
                        {count && (
                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            {count}
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
                {featureQuery.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={handleClear}
                        className="justify-center text-center"
                      >
                        Clear
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      {showAll ? (
        <FeatureList searchParams={searchParams} appFilter={appFilter} />
      ) : (
        <div className="flex w-full my-2 flex-1 flex-wrap justify-start"></div>
      )}
    </div>
  )
}
