import { apps } from "@/.velite"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SORT_TYPES } from "@/config/const"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import { MdChevronRight } from "react-icons/md"
import Tags from "./tags"

export default function SortList({ sortBy }: { sortBy?: string }) {
  const { tasks } = getAllTags(apps)
  const sortedTasks = sortTagsByCount(tasks)

  return (
    <>
      <div className="my-2 flex justify-center items-center space-x-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild className="flex-1">
            <Button variant="outline">
              <MdChevronRight size={16} className="mr-2" /> Filter Alternative
              By
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="text-sm lg:text-xl capitalize">Alternative To</div>
            <div className="my-4">
              <Tags tags={sortedTasks} tasks={tasks} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-x-2 sm:space-x-3 lg:space-x-4 mt-1 sm:mt-2 flex">
        {SORT_TYPES.map((type, index) => (
          <Button
            key={type.value}
            variant={
              (sortBy === undefined && index === 0) || sortBy === type.value
                ? "default"
                : "secondary"
            }
            className="rounded-full min-w-[100px]"
            asChild
          >
            <Link href={`?sortBy=${type.value}`}>{type.name}</Link>
          </Button>
        ))}
      </div>
    </>
  )
}
