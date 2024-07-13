import { App } from "@/.velite"
import { formatNumber } from "@/lib/utils"

const VisitNumber = ({
  app,
  text = "visit in last month",
}: {
  app?: App
  text?: string
}) => {
  if (!app) return null

  const lastMonth = app.visit[0]

  if (lastMonth > 0)
    return (
      <span className="flex items-center">
        <span className="text-sm font-bold">{formatNumber(lastMonth)}</span>
        <span className="text-sm ml-1">{text}</span>
      </span>
    )
}

export default VisitNumber
