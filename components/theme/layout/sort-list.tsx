import { alternatives, apps } from "@/.velite"
import { SearchParams } from "@/app/tasks/[slug]/page"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SORT_TYPE, SORT_TYPES } from "@/config/const"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import { MdChevronRight } from "react-icons/md"
import Tags from "./tags"

export default function SortList({
  slug,
  searchParams,
}: {
  slug: string
  searchParams: SearchParams
}) {
  const { tasks } = getAllTags([...apps, ...alternatives])
  const sortedTasks = sortTagsByCount(tasks)

  const { sortBy, onlyDeal, openSource, free } = searchParams

  const createHref = (
    newParam: Record<string, string | undefined>,
    searchParams: SearchParams
  ) => {
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    )
    Object.entries(newParam).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    return `?${params.toString()}`
  }

  return (
    <>
      <div className="my-2 flex justify-center items-center space-x-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild className="flex-1">
            <Button variant="outline">
              Filter by <MdChevronRight size={16} className="mr-2" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <ScrollArea className="h-[95vh]">
              <div className="text-sm lg:text-xl">Filter by:</div>
              <div className="my-4">
                <Tags tags={sortedTasks} tasks={tasks} slug={slug} />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-x-2 sm:space-x-3 lg:space-x-4 mt-1 sm:mt-2 flex h-12 max-w-[95vw] overflow-x-auto overflow-y-hidden">
        {SORT_TYPES.map((type) => (
          <Button
            key={type.value}
            variant={
              !sortBy && type.value === SORT_TYPE.latest
                ? "default"
                : sortBy === type.value
                ? "default"
                : "secondary"
            }
            className="rounded-full min-w-[100px]"
            asChild
          >
            <Link
              href={createHref(
                { sortBy: sortBy === type.value ? undefined : type.value },
                searchParams
              )}
            >
              {type.name}
            </Link>
          </Button>
        ))}
        <Button
          variant={onlyDeal === "true" ? "default" : "outline"}
          className="rounded-md min-w-[100px]"
          asChild
        >
          <Link
            href={createHref(
              { onlyDeal: onlyDeal === "true" ? undefined : "true" },
              searchParams
            )}
          >
            Deals
          </Link>
        </Button>
        <Button
          variant={openSource === "true" ? "default" : "outline"}
          className="rounded-md min-w-[100px]"
          asChild
        >
          <Link
            href={createHref(
              { openSource: openSource === "true" ? undefined : "true" },
              searchParams
            )}
          >
            OpenSource
          </Link>
        </Button>
        <Button
          variant={free === "true" ? "default" : "outline"}
          className="rounded-md min-w-[100px]"
          asChild
        >
          <Link
            href={createHref(
              { free: free === "true" ? undefined : "true" },
              searchParams
            )}
          >
            Free
          </Link>
        </Button>
      </div>
    </>
  )
}
