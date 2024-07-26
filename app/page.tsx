import { alternatives, apps } from "#site/content"
import AlternativeList from "@/components/theme/layout/alternative-list"
import DetailsList from "@/components/theme/layout/details-list"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

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
        <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
          <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
            <div className="flex flex-col items-center">
              <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                <span className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">
                  Build Alternative
                </span>
                <span className="text-primary bg-clip-text bg-gradient-to-br  block md:ml-0">
                  Sell in public
                </span>
              </h1>
              <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                Alteropen is an open source Appsumo alternative.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="?isSearch=true">Search Alternative </Link>
              </Button>
              <Button asChild>
                <Link href="/tasks">Sort by Tasks</Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
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
