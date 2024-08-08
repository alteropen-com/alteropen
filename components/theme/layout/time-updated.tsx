import { formatDateAgo } from "@/lib/utils"

export default function TimeUpdated({
  lastModified,
}: {
  lastModified: string
}) {
  return (
    <>
      Last Updated:{" "}
      <time dateTime={lastModified} itemProp="dateModified">
        {formatDateAgo(lastModified)}
      </time>
    </>
  )
}
