import { Alternative } from "@/.velite"
import { Badge } from "@/components/ui/badge"

const BadgeOpenSource = ({
  app,
  showDetail = true,
}: {
  app?: Alternative
  showDetail?: boolean
}) => {
  if (!app) return null

  if (!app.pricing?.includes("OpenSource")) return null

  const starProperties = app.properties?.["Website"]

  const githubOrgName =
    typeof starProperties !== "number" &&
    starProperties &&
    starProperties.includes("https://github.com")
      ? starProperties.replace("https://github.com/", "")
      : app?.url && app?.url.includes("https://github.com")
      ? app?.url.replace("https://github.com/", "")
      : null

  if (githubOrgName)
    return (
      <div className="flex justify-between items-center max-w-[320px]">
        <img
          className={`${showDetail ? "w-[48%]" : ""} max-w-[140px]`}
          src={`https://img.shields.io/github/stars/${githubOrgName}?style=flat&label=OpenSource`}
          alt="stars"
        />
        {showDetail && (
          <img
            className="w-[48%]"
            src={`https://img.shields.io/github/last-commit/${githubOrgName}?style=flat`}
            alt="stars"
          />
        )}
      </div>
    )

  return (
    <Badge variant="outline" className="border-primary">
      OpenSource
    </Badge>
  )
}

export default BadgeOpenSource
