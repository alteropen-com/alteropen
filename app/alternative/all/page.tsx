import { alternatives } from "#site/content"
import AlternativeList from "@/components/theme/layout/alternative-list"
import { Button } from "@/components/ui/button"
import { SORT_TYPES } from "@/config/const"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Link from "next/link"

interface PageProps {
  searchParams: { sortBy?: string }
}

const title =
  "Top AlternativeTo (Free/ OpenSource or Deal) App List in 2024. Review. HowTo. Pricing."
const description = `Top Alternatives, Similar App List in 2024. (Free/ OpenSource or Deal). Review. HowTo. Pricing.`

export async function generateMetadata(): Promise<Metadata> {
  const href = `/alternative/all`
  const imageUrl = siteConfig.image

  return {
    title: title,
    description: description,
    authors: { name: siteConfig.author },
    alternates: {
      canonical: href,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: title,
      description,
      type: "article",
      url: href,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [imageUrl],
    },
  }
}

export default function Page({ searchParams }: PageProps) {
  // TODO: sort by tasks with searchParams
  const { sortBy } = searchParams

  const displayPosts = alternatives
    .filter((app) => app.published)
    .sort((a, b) => {
      switch (sortBy) {
        case "top":
          return a?.visit[0] > b?.visit[0] ? -1 : 1
        case "lasted":
        default:
          return a.id > b.id ? -1 : 1
      }
    })

  return (
    <div className="container py-6 flex">
      <div className="flex flex-col flex-1">
        <div className="flex flex-wrap">
          <h2 className="font-bold flex-1 text-xl lg:text-2xl capitalize">
            {title}
          </h2>
        </div>
        <div className="space-x-2 sm:space-x-3 lg:space-x-4 mt-1 sm:mt-2 flex">
          {SORT_TYPES.map((type, index) => (
            <Button
              key={type.value}
              variant={
                (sortBy === undefined && index === 0) || sortBy === type.value
                  ? "default"
                  : "secondary"
              }
              className="rounded-full min-w-[100px]"
              asChild
            >
              <Link href={`?sortBy=${type.value}`}>{type.name}</Link>
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-y-8 mt-4">
          {displayPosts?.length > 0 && <AlternativeList apps={displayPosts} />}
        </div>
      </div>
    </div>
  )
}
