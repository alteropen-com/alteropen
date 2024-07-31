import TagItem from "./tag-item"

export function Tags({
  tags,
  tasks,
  slug,
}: {
  tags: string[] | undefined
  tasks: Record<string, number>
  slug: string
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
        />
      ))}
    </div>
  )
}

export default Tags
