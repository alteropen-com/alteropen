import { SearchParams } from "@/app/tasks/[slug]/page"
import { badgeVariants } from "@/components/ui/badge"
import { encodeTitleToSlug } from "@/lib/utils"
import Link from "next/link"

interface TagProps {
  tag: string
  current?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline"
  count?: number
  slug?: string
  searchParams: SearchParams
}

export default function TagItem({
  tag,
  variant,
  count,
  slug,
  searchParams,
}: TagProps) {
  if (!tag) return null

  const isActive = slug === encodeTitleToSlug(tag)

  // Create a URLSearchParams object from the current searchParams
  const urlSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  )

  return (
    <Link
      className={badgeVariants({
        variant: isActive ? "default" : variant ? variant : "outline",
        className: "no-underline rounded-md px-2 py-1 text-primary capitalize",
      })}
      rel="nofollow"
      href={`/tasks/${encodeTitleToSlug(tag)}?${urlSearchParams.toString()}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  )
}
