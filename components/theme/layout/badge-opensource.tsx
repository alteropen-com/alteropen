import { Alternative } from "@/.velite"
import { Badge } from "@/components/ui/badge"

const BadgeOpenSource = ({ app }: { app?: Alternative }) => {
  if (!app) return null

  if (!app.pricing?.includes("OpenSource")) return null

  return (
    <Badge variant="outline" className="border-primary">
      OpenSource
    </Badge>
  )
}

export default BadgeOpenSource
