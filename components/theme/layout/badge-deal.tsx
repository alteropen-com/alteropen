import { Alternative } from "@/.velite"
import { Badge } from "@/components/ui/badge"

const BadgeDeals = ({ app }: { app?: Alternative }) => {
  if (!app) return null

  if (!app.deals || app.deals.length === 0) return null

  return <Badge variant="default">{app.deals[0].price}</Badge>
}

export default BadgeDeals
