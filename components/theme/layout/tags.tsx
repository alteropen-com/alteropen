import { SearchParams } from "@/app/tasks/[slug]/page"
import TagItem from "./tag-item"

export function Tags({
  tags,
  tasks,
  slug,
  searchParams,
}: {
  tags: string[] | undefined
  tasks: Record<string, number>
  slug: string
  searchParams?: SearchParams
}) {
  return (
    <div className="flex flex-col space-y-3 items-start">
      {tags?.map((t) => (
        <TagItem
          tag={t}
          key={t}
          count={tasks[t]}
          variant={"secondary"}
          slug={slug}
          searchParams={searchParams}
        />
      ))}
    </div>
  )
}

export default Tags
