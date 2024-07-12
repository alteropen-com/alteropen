import { badgeVariants } from "@/components/ui/badge"
import { encodeTitleToSlug } from "@/lib/utils"
import Link from "next/link"

interface TagProps {
  tag: string
  type: "tasks" | "features"
  current?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline"
  count?: number
}
export default function TagItem({ tag, variant, count, type }: TagProps) {
  if (!tag) return null

  switch (type) {
    case "tasks":
      return (
        <Link
          className={badgeVariants({
            variant: variant ?? "outline",
            className:
              "no-underline rounded-md px-2 py-1 text-primary capitalize",
          })}
          href={`/${type}/${encodeTitleToSlug(tag)}`}
        >
          {tag} {count ? `(${count})` : null}
        </Link>
      )
    case "features":
      return (
        <span className="border-b rounded-md px-1">
          {tag} {count ? `(${count})` : null}
        </span>
      )

    default:
      break
  }
}
