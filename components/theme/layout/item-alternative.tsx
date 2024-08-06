import { alternatives, apps } from "#site/content"
import { App } from "@/.velite"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"
import Properties from "./properties-list"
import VisitNumber from "./visit-number"

export default function ItemAlternative({ post }: { post: App }) {
  const alternativeApp = apps
    .filter((app) => app.alternative?.find((item) => item.id === post.id))
    .map((app) => ({
      id: app.id,
      name: app.name,
      image: app.image,
      description: app.description,
      visit: app.visit,
      url: `/app/${app.slug}`,
      deals: app.deals,
    }))

  const alternativeAlternative = alternatives
    .filter((app) => app.alternative?.find((item) => item.id === post.id))
    .map((app) => ({
      id: app.id,
      name: app.name,
      image: app.image,
      description: app.description,
      visit: app.visit,
      url: `/alternative/${app.slug}`,
      deals: app.deals,
    }))

  const postAlternative = post.alternative
    ?.filter(
      (item) =>
        ![...alternativeApp, ...alternativeApp]?.find(
          (app) => item.id === app.id
        )
    )
    .map((item) => {
      if (item.id) {
        const alter = alternatives.find((app) => app.id === item.id)
        if (alter)
          return {
            id: alter.id,
            name: alter.name,
            image: alter.image,
            description: alter.description,
            url: `/alternative/${alter.slug}`,
            deals: alter.deals,
            visit: alter.visit,
          }
        const app = apps.find((app) => app.id === item.id)
        if (app)
          return {
            id: app.id,
            name: app.name,
            image: app.image,
            description: app.description,
            url: `/app/${app.slug}`,
            deals: app.deals,
            visit: app.visit,
          }
        return {
          name: "",
          image: { url: "" },
          visit: [0],
        }
      }
      return { ...item }
    })

  // Remove duplicates by id
  const alternative = [
    ...(postAlternative || []),
    ...[...alternativeApp, ...alternativeAlternative].sort((a, b) => {
      const sortA = a.visit && a.visit?.length > 0 ? a.visit[0] : 0
      const sortB = b.visit && b.visit?.length > 0 ? b.visit[0] : 0

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
            if (!app) app = apps.find((app) => app.id === item.id)
            if (!app) return ""
            return (
              <Link
                key={item.id}
                className="no-underline"
                href={item.url || ""}
              >
                <Card className="px-6 pt-6 pb-2 rounded-lg border border-primary/60 hover:bg-primary/10">
                  <h4 className="text-primary text-xl font-semibold mb-2 flex items-center">
                    {item.name}
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
                  {item?.deals && (
                    <div className="relative">
                      <div className="absolute top-[-55px] right-[-12px]">
                        <Badge variant="destructive">
                          {item.deals.length} Deal
                          {item.deals.length > 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <p className="h-[4.5rem] line-clamp-3">{app.title}</p>
                  <div className="mt-2 text-sm">
                    <VisitNumber app={app} />
                    <p className="text-muted-foreground">
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
                      rel="noopener noreferrer"
                    >
                      {item.name} <RxOpenInNewWindow className="ml-1" />
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </h4>
                <p className="">{item.description}</p>
              </Card>
            )
        })}
      </div>
    </>
  )
}
