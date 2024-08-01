import { alternatives, apps } from "#site/content"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { encodeTitleToSlug } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

const title = "Alteropen is an open source Appsumo alternative."
const description = `Top Alternatives, Similar App (Free/ OpenSource or Deal) List in 2024 with Lifetime Deal. Review. HowTo. Pricing.`

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

export default function Page() {
  const { tasks } = getAllTags([...apps, ...alternatives])
  const sortedTasks = sortTagsByCount(tasks)

  return (
    <div className="container py-6">
      <div className="flex flex-col flex-1">
        <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
          <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
            <div className="flex flex-col items-center">
              <p className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                <span className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">
                  Build by Indie
                </span>
                <span className="text-primary bg-clip-text bg-gradient-to-br  block md:ml-0">
                  Sell to Indie
                </span>
              </p>
              <h1 className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                Alteropen is an open source Appsumo alternative.
              </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Button asChild>
                <Link href="/tasks">All Tasks</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="?isSearch=true">Search Alternative </Link>
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

        <div className="flex-1 flex-row mx-0 sm:mx-5 my-5">
          {sortedTasks?.map((t) => (
            <Link
              key={t}
              className={badgeVariants({
                variant: "secondary",
                className:
                  "no-underline rounded-md mx-2 my-2 sm:mx-3 sm:my-3 px-1 py-2 text-primary capitalize",
              })}
              href={`/tasks/${encodeTitleToSlug(t)}`}
            >
              {t} {tasks[t] ? `(${tasks[t]})` : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
