import { Alternative } from "@/.velite"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { encodeTitleToSlug } from "@/lib/utils"
import Link from "next/link"
import BadgeDeals from "./badge-deal"
import BadgeOpenSource from "./badge-opensource"
import VisitNumber from "./visit-number"

const AlternativeList = ({ apps }: { apps: Alternative[] }) => {
  return apps.map((app) => {
    const { id, slug, title, description, name, pricing, tasks, deals } = app

    const image = app.image.url || siteConfig.image

    const tag = app.tasks?.[0] || ""

    return (
      <Card
        className="relative h-full flex flex-col hover:bg-primary/10"
        key={id}
      >
        <Link
          rel="nofollow"
          className="absolute h-full w-full"
          href={`/alternative/${slug}`}
        >
          <span className="sr-only">{name}</span>
        </Link>
        <div className="h-full flex flex-col">
          <img
            loading="lazy"
            src={image}
            className="w-full rounded-lg mb-2"
            alt={`${title}`}
            style={{
              aspectRatio: "60/40",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <div className="mt-1 px-2 pb-1 flex flex-col flex-1">
            <div className="flex-1 text-center">
              {/* {deals && deals.length > 0 && (
                <div className="relative">
                  <div className="absolute top-[-42px] right-0">
                    <Badge variant="destructive">{deals[0].price}</Badge>
                  </div>
                </div>
              )} */}
              <h3 className="text-lg font-bold">{name}</h3>
              <Link
                rel="nofollow"
                href={`/tasks/${encodeTitleToSlug(tag)}`}
                className="relative z-1 underline capitalize"
              >
                {tag}
              </Link>
              <p className="mt-2 flex-1">{title}</p>
            </div>
          </div>
          <div className="mt-1 py-2 px-2 bg-muted/50 flex justify-between">
            <VisitNumber app={app} text="visit" />
            <BadgeOpenSource app={app} />
            <BadgeDeals app={app} />
          </div>
        </div>
      </Card>
    )
  })
}

export default AlternativeList
