import { apps } from "@/.velite"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import Link from "next/link"
import { MdChevronRight } from "react-icons/md"
import Tags from "./tags"

export default function NavLeft() {
  const { tasks } = getAllTags(apps)
  const sortedTasks = sortTagsByCount(tasks)

  return (
    <div className="hidden md:flex flex-col w-[238px] sm:w-[248px] lg:w-[268px]">
      <div className="flex-1 space-y-4">
        <Link
          href="/app"
          className="flex items-center text-sm font-semibold lg:text-xl"
        >
          <MdChevronRight size={16} className="mr-2" /> Alternative by
        </Link>
        <Tags tags={sortedTasks} tasks={tasks} />
      </div>
    </div>
  )
}
