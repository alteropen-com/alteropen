import { alternatives } from "#site/content"
import { SearchDialog } from "@/components/theme/layout/search-dialog"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { getAllTags, sortTagsByCount } from "@/lib/helper"
import { encodeTitleToSlug } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"

const title =
  "Alternative to popular SaaS products (Free/ OpenSource or with Great Deals) build by Indie, suggest by Indie"
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

const popularAlternatives = [
  {
    title: "Google Analytics Alternatives",
    href: "/alternative/google-analytics",
  },
  {
    title: "Firebase Alternatives",
    href: "/alternative/firebase",
  },
  {
    title: "Auth0 Alternatives",
    href: "/alternative/auth0",
  },

  {
    title: "Notion Alternatives",
    href: "/alternative/notion",
  },
  {
    title: "Salesforce Alternatives",
    href: "/alternative/salesforce",
  },
  {
    title: "Retool Alternatives",
    href: "/alternative/retool",
  },
  {
    title: "Trello Alternatives",
    href: "/alternative/trello",
  },
  {
    title: "Teamviewer Alternatives",
    href: "/alternative/teamviewer",
  },
  {
    title: "Webflow Alternatives",
    href: "/alternative/webflow",
  },
  {
    title: "Bitly Alternatives",
    href: "/alternative/bitly",
  },
  {
    title: "Mailchimp Alternatives",
    href: "/alternative/mailchimp",
  },
  {
    title: "Shopify Alternatives",
    href: "/alternative/shopify",
  },
  {
    title: "Datadog Alternatives",
    href: "/alternative/datadog",
  },
  {
    title: "Zendesk Alternatives",
    href: "/alternative/zendesk",
  },
  {
    title: "Zapier Alternatives",
    href: "/alternative/zapier",
  },
  {
    title: "Airtable Alternatives",
    href: "/alternative/airtable",
  },
  {
    title: "Render Alternatives",
    href: "/alternative/render-com",
  },
  {
    title: "LucidChart Alternatives",
    href: "/alternative/lucidchart",
  },
  {
    title: "Power BI Alternatives",
    href: "/alternative/power-bi",
  },
  {
    title: "Make.com Alternatives",
    href: "/alternative/make-com",
  },
  {
    title: "Slack Alternatives",
    href: "/alternative/slack",
  },
  {
    title: "Heroku Alternatives",
    href: "/alternative/heroku",
  },
  {
    title: "Photoshop Alternatives",
    href: "/alternative/photoshop",
  },
]

export default function Page() {
  const { tasks } = getAllTags(alternatives)
  const sortedTasks = sortTagsByCount(tasks)

  return (
    <div className="container py-6">
      <div className="flex flex-col flex-1">
        <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
          <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto lg:mx-0 w-full gap-4 lg:gap-8">
            <div className="flex flex-col items-center">
              <p className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                <span className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">
                  Build by Indie
                </span>
                <span className="text-primary bg-clip-text bg-gradient-to-br  block md:ml-0">
                  Suggest by Indie
                </span>
              </p>
              <h1 className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                <span className="text-xl sm:text-2xl">
                  Alternative to popular SaaS products
                </span>
                <br />
                <span className="italic">
                  (Free/ OpenSource or with Great Deals)
                </span>
              </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 border-2 border-gray-300 px-3 py-2 rounded-xl w-full">
              <SearchDialog />
            </div>
          </div>
        </div>
        <div className="flex-1 flex-row mx-0 sm:mx-5 my-5">
          <h2 className="text-xl mx-2 sm:mx-3 my-2 sm:my-3 font-bold">
            Popular Alternatives
          </h2>
          {popularAlternatives.map((alternative) => (
            <Button
              asChild
              variant="outline"
              key={alternative.href}
              className="mx-2 my-2"
            >
              <Link href={`${alternative.href}`}>{alternative.title}</Link>
            </Button>
          ))}
        </div>
        <hr />
        <div className="flex-1 flex-row mx-0 sm:mx-5 my-5">
          <Button asChild variant="default" className="mx-2 my-2">
            <Link href="/tasks">All Tasks</Link>
          </Button>
          {sortedTasks?.map((t) => (
            <Button key={t} asChild variant="secondary" className="mx-2 my-2">
              <Link href={`/tasks/${encodeTitleToSlug(t)}`}>
                {t} {tasks[t] ? `(${tasks[t]})` : null}
              </Link>
            </Button>
          ))}
        </div>
        <hr />
      </div>
    </div>
  )
}
