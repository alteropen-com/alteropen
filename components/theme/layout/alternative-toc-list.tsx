import { Alternative, alternatives } from "@/.velite"

const AlternativeTocList = ({ post }: { post: Alternative }) => {
  const alternativeApp = alternatives.filter((item) =>
    item.alternative?.find((ia) => ia.id === post.id)
  )

  const postAlternative = post.alternative?.filter(
    (item) => !alternativeApp?.find((app) => item.id === app.id)
  )

  const alternativeApps = [...(postAlternative || []), ...alternativeApp]

  if (alternativeApps.length === 0) return null

  return (
    <div className="flex flex-col">
      <a
        className="py-2 text-md text-primary no-underline flex-1 hover:bg-muted hover:underline hover:cursor-pointer"
        href="#alternativeTo"
      >
        Best {alternativeApps.length > 10 ? "10+" : alternativeApps.length}{" "}
        Alternatives
      </a>
    </div>
  )
}

export default AlternativeTocList
