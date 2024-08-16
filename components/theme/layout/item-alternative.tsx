import { Alternative, alternatives } from "#site/content"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"
import Properties from "./properties-list"
import VisitNumber from "./visit-number"

export default function ItemAlternative({ post }: { post: Alternative }) {
  const alternativeApp = alternatives
    .filter((app) => app.alternative?.find((item) => item.id === post.id))
    .map((app) => ({
      ...app,
      url: `/alternative/${app.slug}`,
    }))

  const postAlternative = post.alternative
    ?.filter((item) => !alternativeApp?.find((app) => item.id === app.id))
    .map((item) => {
      if (item.id) {
        const alter = alternatives.find((app) => app.id === item.id)
        if (alter)
          return {
            ...alter,
            url: `/alternative/${alter.slug}`,
          }
        return { ...item, recommend: 0 }
      }
      return { ...item, recommend: 0 }
    })

  // Remove duplicates by id
  const alternative = [
    ...(postAlternative || []),
    ...alternativeApp.sort((a, b) => {
      // First, compare by `recommend`
      if (a.recommend !== b.recommend) {
        return b.recommend - a.recommend
      }

      // If `recommend` is equal, compare by `visit`
      const sortA = a.visit && a.visit.length > 0 ? a.visit[0] : 0
      const sortB = b.visit && b.visit.length > 0 ? b.visit[0] : 0

      return sortB - sortA
    }),
  ]

  return (
    <>
      <h2 className="text-xl font-bold my-2" id="alternativeTo">
        Top {`${post.name.toUpperCase()} alternative to`}
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
                <Card className="relative px-6 pt-6 pb-2 rounded-lg border border-primary/60 hover:bg-primary/10">
                  <h3 className="text-primary text-xl font-semibold mb-2 flex items-center capitalize">
                    {item.name}
                  </h3>
                  {item.recommend > 0 && (
                    <div className="absolute top-[28px] right-[-40px] bg-primary text-primary-foreground text-white text-[9px] font-bold px-2 py-1 transform rotate-[20deg] -translate-x-1/2 -translate-y-1/2 rounded-xl">
                      Recommended
                    </div>
                  )}
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
                        <Badge variant="destructive">
                          {item.deals[0].price}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <p className="h-[4.5rem] line-clamp-3">{app.title}</p>
                  <div className="mt-2 text-sm flex space-x-2 items-center justify-between">
                    <VisitNumber app={app} text="Visits" />
                    {app.pricing?.includes("OpenSource") && (
                      <Badge variant="secondary">OpenSource</Badge>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    <Properties properties={app.properties} />
                  </div>
                </Card>
              </Link>
            )
          }

          if (item.name)
            return (
              <Card key={item.name} className="p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2 capitalize">
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
                  <Properties properties={item?.properties} />
                </div>
              </Card>
            )
        })}
      </div>
    </>
  )
}
