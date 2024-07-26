import { alternatives, apps } from "#site/content"
import AlternativeList from "@/components/theme/layout/alternative-list"
import DetailsList from "@/components/theme/layout/details-list"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Link from "next/link"

const title =
  "Top AlternativeTo (Free/ OpenSource or Deal) App List in 2024. Review. HowTo. Pricing."
const description = `Top Alternatives, Similar App List in 2024. (Free/ OpenSource or Deal). Review. HowTo. Pricing.`

export async function generateMetadata(): Promise<Metadata> {
  const href = `/`
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

const wrapperCol =
  "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-y-8 mt-4"

export default function Page() {
  const displayApps = apps
    .filter((app) => app.published)
    .sort((a, b) => (a.id > b.id ? -1 : 1))
    .slice(0, 20)

  const displayAlternatives = alternatives
    .filter((app) => app.published)
    .sort((a, b) => (a.id > b.id ? -1 : 1))
    .slice(0, 20)

  return (
    <div className="container py-6 flex">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex justify-start items-center space-x-6">
            <h2 className="font-bold text-xl lg:text-2xl capitalize">
              Recently App
            </h2>
            <Button asChild variant="link">
              <Link href="/tasks/all">View All </Link>
            </Button>
          </div>
          <div className={wrapperCol}>
            {displayApps?.length > 0 && <DetailsList apps={displayApps} />}
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex justify-start items-center space-x-6">
          <h2 className="font-bold text-xl lg:text-2xl capitalize">
            Recently Alternative
          </h2>
          <Button asChild variant="link">
            <Link href="/alternative/all">View All </Link>
          </Button>
        </div>
        <div className={wrapperCol}>
          {displayAlternatives?.length > 0 && (
            <AlternativeList apps={displayAlternatives} />
          )}
        </div>
      </div>
    </div>
  )
}
