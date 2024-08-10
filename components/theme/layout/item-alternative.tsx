import { alternatives, apps } from "#site/content"
import { App } from "@/.velite"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"
import Properties from "./properties-list"
import VisitNumber from "./visit-number"

export default function ItemAlternative({
  post,
  type = "full",
}: {
  post: App
  type?: "full" | "carousel"
}) {
  const alternativeApp = apps
    .filter((app) => app.alternative?.find((item) => item.id === post.id))
    .map((app) => ({
      ...app,
      url: `/app/${app.slug}`,
    }))

  const alternativeAlternative = alternatives
    .filter((app) => app.alternative?.find((item) => item.id === post.id))
    .map((app) => ({
      ...app,
      url: `/alternative/${app.slug}`,
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
            ...alter,
            url: `/alternative/${alter.slug}`,
          }
        const app = apps.find((app) => app.id === item.id)
        if (app)
          return {
            ...app,
            url: `/app/${app.slug}`,
          }
        return { ...item }
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

  if (type === "full")
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
                      <p className="text-muted-foreground">
                        {app.pricing?.join(" | ")}
                      </p>
                    </div>
                    <div className="mt-2 text-sm">
                      <Properties
                        properties={app.properties}
                        showLinks={false}
                      />
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
                    <Properties
                      properties={item?.properties}
                      showLinks={false}
                    />
                  </div>
                </Card>
              )
          })}
        </div>
      </>
    )

  return (
    <>
      <h2 className="text-xl font-bold my-2" id="alternativeTo">
        Top {`${post.name.toUpperCase()} alternative to`}
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {alternative?.map((item, i) => {
            if (item.id) {
              let app = alternatives.find((app) => app.id === item.id)
              if (!app) app = apps.find((app) => app.id === item.id)
              if (!app) return ""
              return (
                <CarouselItem
                  key={item.id}
                  className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link
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
                            <Badge variant="default">
                              {item.deals[0].price}
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
                        <Properties
                          properties={app.properties}
                          showLinks={false}
                        />
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
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
                    <Properties
                      properties={item?.properties}
                      showLinks={false}
                    />
                  </div>
                </Card>
              )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
