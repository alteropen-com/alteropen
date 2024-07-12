import { App } from "@/.velite"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import VisitNumber from "./visit-number"

const DetailsList = ({ apps }: { apps: App[] }) => {
  return apps.map((app) => {
    const { id, slug, title, description, name, pricing, tasks } = app

    const image = app.image.url || siteConfig.image

    const tag = app.tasks?.[0] || ""

    return (
      <Card className="relative h-full flex flex-col" key={id}>
        <Link className="absolute h-full w-full" href={`/app/${slug}`}>
          <span className="sr-only">{name}</span>
        </Link>
        <div className="h-full flex flex-col">
          <img
            loading="lazy"
            src={image}
            className="w-full rounded-lg mb-2"
            alt={`${title}`}
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <div className="mt-1 px-2 pb-1 flex flex-col flex-1">
            <div className="flex-1 text-center">
              <h3 className="text-lg font-bold">{name}</h3>
              <Link
                href={`/app/${slug}`}
                className="relative z-1 underline capitalize"
              >
                {tag}
              </Link>
              <p className="mt-2 flex-1">{title}</p>
            </div>
          </div>
          <div className="mt-1 py-2 px-2 bg-muted/50 flex justify-between">
            <VisitNumber post={app} text="visit" />
            <span className="text-sm">{pricing?.join("|")}</span>
          </div>
        </div>
      </Card>
    )
  })
}

export default DetailsList
