import { Alternative, alternatives } from "@/.velite"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"
import Properties from "./properties-list"
import VisitNumber from "./visit-number"

export default function SimilarProduct({ post }: { post: Alternative }) {
  const alternativeAlternative = alternatives.filter((app) =>
    app.alternative?.find((item) => item.id === post.id)
  )

  const postIdAlternative = post.alternative?.map((item) => ({ id: item.id }))

  const similarAlternative = alternatives
    .filter((app) =>
      app.alternative?.find((item) =>
        postIdAlternative?.find((itemId) => itemId.id === item.id)
      )
    )
    .map((app) => ({
      ...app,
      url: `/alternative/${app.slug}`,
    }))

  // Remove duplicates by id and filter out the original post
  const alternative: Alternative[] = similarAlternative
    .reduce<Alternative[]>((acc, current) => {
      // Check if the current item ID already exists in the accumulator
      if (!acc.find((item) => item.id === current.id)) {
        acc.push(current)
      }
      return acc
    }, [])
    .sort((a, b) => {
      const sortA = a.visit && a.visit.length > 0 ? a.visit[0] : 0
      const sortB = b.visit && b.visit.length > 0 ? b.visit[0] : 0

      return sortB - sortA
    })
    .filter(
      (app) =>
        app.id !== post.id &&
        !post.alternative?.find((item) => item.id === app.id) &&
        // !alternativeApp.find((item) => item.id === app.id) &&
        !alternativeAlternative.find((item) => item.id === app.id)
    )

  if (alternative.length === 0) return null

  return (
    <>
      <h2 className="text-xl font-bold my-2" id="alternativeTo">
        {`${post.name.toUpperCase()} similar to`}
      </h2>
      <div className="grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {alternative?.map((item, i) => {
          if (item.id) {
            let app = alternatives.find((app) => app.id === item.id)
            if (!app) return ""
            return (
              <Link
                key={item.id}
                className="no-underline"
                href={item.url || ""}
                rel="nofollow"
              >
                <Card className="px-6 pt-6 pb-2 rounded-lg border border-primary/60 hover:bg-primary/10">
                  <h3 className="text-primary text-xl font-semibold mb-2 flex items-center">
                    {item.name}
                  </h3>
                  {item.image?.url && (
                    <img
                      loading="lazy"
                      src={item.image.url}
                      className="w-full rounded-lg mb-2"
                      alt={`${item.name}`}
                      style={{
                        aspectRatio: "60/40",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  )}
                  {item.deals && item.deals.length > 0 && (
                    <div className="relative">
                      <div className="absolute top-[-42px] right-0">
                        <Badge variant="default">{item.deals[0].price}</Badge>
                      </div>
                    </div>
                  )}
                  <p className="h-[4.5rem] line-clamp-3">{app.title}</p>
                  <div className="mt-2 text-sm">
                    <VisitNumber app={app} />
                    <p className="py-2 text-muted-foreground">
                      {app.pricing?.join(" | ")}
                    </p>
                  </div>
                  <div className="mt-2 text-sm">
                    <Properties properties={app.properties} showLinks={false} />
                  </div>
                </Card>
              </Link>
            )
          }

          if (item.name)
            return (
              <Card key={item.name} className="p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">
                  {item.url ? (
                    <a
                      className="text-primary no-underline hover:underline flex items-center"
                      href={item.url + `?ref=${siteConfig.ref}`}
                      target="_blank"
                      rel="nofollow"
                    >
                      {item.name} <RxOpenInNewWindow className="ml-1" />
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </h4>
                {item.image?.url && (
                  <img
                    loading="lazy"
                    src={item.image.url}
                    className="w-full rounded-lg mb-2"
                    alt={`${item.name}`}
                    style={{
                      aspectRatio: "60/40",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                )}
                <p className="">{item.description}</p>
                <div className="mt-2 text-sm">
                  <Properties properties={item?.properties} showLinks={false} />
                </div>
              </Card>
            )
        })}
      </div>
    </>
  )
}
