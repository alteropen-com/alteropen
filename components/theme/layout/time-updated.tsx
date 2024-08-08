import { formatDateAgo } from "@/lib/utils"

export default function TimeUpdated({
  lastModified,
}: {
  lastModified: string
}) {
  return (
    <span className="text-sm text-gray-500">
      Last Updated:{" "}
      <time dateTime={lastModified} itemProp="dateModified">
        {formatDateAgo(lastModified)}
      </time>
    </span>
  )
}
