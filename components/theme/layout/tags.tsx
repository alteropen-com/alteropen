import TagItem from "./tag-item"

export function Tags({
  tags,
  tasks,
}: {
  tags: string[] | undefined
  tasks: Record<string, number>
}) {
  return (
    <div className="flex flex-col space-y-3 items-start">
      {tags?.map((t) => (
        <TagItem
          tag={t}
          key={t}
          count={tasks[t]}
          variant={"secondary"}
          type="tasks"
        />
      ))}
    </div>
  )
}

export default Tags
