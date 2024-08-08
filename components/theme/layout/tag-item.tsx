import { badgeVariants } from "@/components/ui/badge"
import { encodeTitleToSlug } from "@/lib/utils"
import Link from "next/link"

interface TagProps {
  tag: string
  current?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline"
  count?: number
  slug?: string
}
export default function TagItem({ tag, variant, count, slug }: TagProps) {
  if (!tag) return null

  const isActive = slug === encodeTitleToSlug(tag)

  return (
    <Link
      className={badgeVariants({
        variant: isActive ? "default" : variant ? variant : "outline",
        className: "no-underline rounded-md px-2 py-1 text-primary capitalize",
      })}
      rel="nofollow"
      href={`/tasks/${encodeTitleToSlug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  )
}
