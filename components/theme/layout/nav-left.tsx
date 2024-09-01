import { alternatives } from "@/.velite"
import { SearchParams } from "@/app/tasks/[slug]/page"
import { badgeVariants } from "@/components/ui/badge"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import Tags from "./tags"

// Add searchParams to the props
export default function NavLeft({
  slug,
  searchParams,
}: {
  slug: string
  searchParams: SearchParams
}) {
  const { tasks } = getAllTags(alternatives)
  const sortedTasks = sortTagsByCount(tasks)

  // Create a URLSearchParams object from the current searchParams
  const urlSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  )

  return (
    <div className="hidden md:flex flex-col w-[238px] sm:w-[248px] lg:w-[268px]">
      <div className="flex-1 space-y-4">
        <p className="flex items-center text-sm font-semibold lg:text-xl">
          Filter by:
        </p>
        <Link
          rel="nofollow"
          href={`/app?${urlSearchParams.toString()}`}
          className={badgeVariants({
            variant: slug === "all" ? "default" : "secondary",
            className:
              "no-underline rounded-md px-2 py-1 text-primary capitalize",
          })}
        >
          All Tasks
        </Link>
        <Tags
          tags={sortedTasks}
          tasks={tasks}
          slug={slug}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
