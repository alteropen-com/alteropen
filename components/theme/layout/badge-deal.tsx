import { Alternative } from "@/.velite"
import { Badge } from "@/components/ui/badge"

const BadgeDeals = ({
  app,
  showPrice = true,
}: {
  app?: Alternative
  showPrice?: boolean
}) => {
  if (!app) return null

  if (app.deals && app.deals.length > 0) {
    return <Badge variant="default">{app.deals[0].price}</Badge>
  }

  if (showPrice && !app.pricing?.includes("OpenSource")) {
    return <Badge variant="outline">{app.pricing?.join(", ")}</Badge>
  }

  if (!app.deals || app.deals.length === 0) return null
}

export default BadgeDeals
