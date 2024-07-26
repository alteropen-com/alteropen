import { alternatives, apps } from "@/.velite"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SORT_TYPES } from "@/config/const"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import { MdChevronRight } from "react-icons/md"
import Tags from "./tags"

export default function SortList({
  sortBy = SORT_TYPES[0].value,
  onlyDeal = "false",
}: {
  sortBy?: string
  onlyDeal?: string
}) {
  const { tasks } = getAllTags([...apps, ...alternatives])
  const sortedTasks = sortTagsByCount(tasks)

  const createHref = (newSortBy?: string, newOnlyDeal?: string) => {
    const params = new URLSearchParams()
    if (newSortBy && newSortBy !== SORT_TYPES[0].value)
      params.set("sortBy", newSortBy)
    if (newOnlyDeal === "true") params.set("onlyDeal", "true")
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
                <Tags tags={sortedTasks} tasks={tasks} />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-x-2 sm:space-x-3 lg:space-x-4 mt-1 sm:mt-2 flex">
        {SORT_TYPES.map((type) => (
          <Button
            key={type.value}
            variant={sortBy === type.value ? "default" : "secondary"}
            className="rounded-full min-w-[100px]"
            asChild
          >
            <Link href={createHref(type.value, onlyDeal)}>{type.name}</Link>
          </Button>
        ))}
        <Button
          variant={onlyDeal === "true" ? "default" : "secondary"}
          className="rounded-full min-w-[100px]"
          asChild
        >
          <Link
            href={createHref(sortBy, onlyDeal === "true" ? "false" : "true")}
          >
            Deals
          </Link>
        </Button>
      </div>
    </>
  )
}
