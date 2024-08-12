import { Alternative } from "@/.velite"
import { Badge } from "@/components/ui/badge"
import { capitalizeFirstLetter, formatNumber } from "@/lib/utils"

const VisitNumber = ({
  app,
  text = "visit in last month",
}: {
  app?: Alternative
  text?: string
}) => {
  if (!app) return null

  if (app.visit.length === 0 || app.visit[0] === 0) return null

  const lastMonth = app.visit[0]

  if (lastMonth > 0)
    return (
      <span className="flex items-center">
        <Badge variant="default" className="text-sm font-bold">
          {formatNumber(lastMonth)}
        </Badge>
        <span className="text-sm ml-1">{text}</span>
      </span>
    )

  const firstProperty =
    app.properties &&
    Object.entries(app.properties).length > 0 &&
    Object.entries(app.properties)[0]

  if (firstProperty) {
    return (
      <Badge variant="secondary" className="text-sm font-bold">
        {capitalizeFirstLetter(firstProperty[0].replace(/_/g, " "))}{" "}
        {typeof firstProperty[1] === "number"
          ? formatNumber(firstProperty[1])
          : firstProperty[1]}
      </Badge>
    )
  }
}

export default VisitNumber
