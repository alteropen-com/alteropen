import { alternatives, apps } from "@/.velite"
import { badgeVariants } from "@/components/ui/badge"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import Tags from "./tags"

export default function NavLeft() {
  const { tasks } = getAllTags([...apps, ...alternatives])
  const sortedTasks = sortTagsByCount(tasks)

  return (
    <div className="hidden md:flex flex-col w-[238px] sm:w-[248px] lg:w-[268px]">
      <div className="flex-1 space-y-4">
        <p className="flex items-center text-sm font-semibold lg:text-xl">
          Filter by:
        </p>
        <Link
          href="/app"
          className={badgeVariants({
            variant: "secondary",
            className:
              "no-underline rounded-md px-2 py-1 text-primary capitalize",
          })}
        >
          All Tasks
        </Link>
        <Tags tags={sortedTasks} tasks={tasks} />
      </div>
    </div>
  )
}
