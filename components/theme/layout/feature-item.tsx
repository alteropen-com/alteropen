import { badgeVariants } from "@/components/ui/badge"
import Link from "next/link"

interface Props {
  tag: string
  current?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline"
  count?: number // TODO: add count in page detail?
}
export default function FeatureItem({ tag, variant, count }: Props) {
  if (!tag) return null

  return (
    <Link
      className={badgeVariants({
        variant: variant ? variant : "outline",
        className: "no-underline rounded-md px-2 py-1 text-primary",
      })}
      href={`/tasks/all?feature=${encodeURI(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  )
}
