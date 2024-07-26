import { apps } from "#site/content"
import { CustomMDX } from "@/components/mdx/MdxRemote"
import ButtonDealsApp from "@/components/theme/layout/button-deals-app"
import ButtonEditPage from "@/components/theme/layout/button-edit-page"
import ButtonFollow from "@/components/theme/layout/button-save"
import ButtonVisitSite from "@/components/theme/layout/button-visit-site"
import Comment from "@/components/theme/layout/comment"
import DetailImage from "@/components/theme/layout/detail-image"
import DetailToc from "@/components/theme/layout/detail-toc"
import ItemAlternative from "@/components/theme/layout/item-alternative"
import ItemFeature from "@/components/theme/layout/item-feature"
import TagItem from "@/components/theme/layout/tag-item"
import VisitNumber from "@/components/theme/layout/visit-number"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { siteConfig } from "@/config/site"
import { encodeTitleToSlug } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import "./styles.css"

interface PostPageProps {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  const paths = apps.map((app) => ({ slug: app.slug }))

  return paths
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const app = apps.find((app) => {
    return app.slug === params.slug
  })

  if (!app) {
    return {}
  }

  const { name, title, slug, description, image, deals } = app

  const href = `/app/${slug}`

  const imageUrl = image.url

  const pageTitle = `
    ${name || title} Review, Price and ${
    deals && deals.length > 0 ? deals.length : "Good"
  } Deal in 2024. `
  const pageDescription = `HowTo. Pricing. Top ${
    app.alternative && app.alternative.length > 0
      ? " " + app.alternative.length
      : ""
  } Alternative App (Free/ OpenSource...) in 2024.`

  return {
    title: pageTitle,
    description: pageDescription,
    authors: { name: siteConfig.author },
    alternates: {
      canonical: href,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
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
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const app = apps.find((app) => {
    return app.slug === params.slug
  })

  if (!app) {
    notFound()
  }

  return (
    <article className="px-2 sm:px-4 md:px-5 xl:px-8 2xl:px-0 py-2 max-w-[1868px] mx-auto">
      <div className="main flex flex-col items-center">
        <div className="w-full max-w-[1468px]">
          <Breadcrumb className="mb-3">
            <BreadcrumbList className="text-xs">
              {app.tasks
                ?.filter((tag: string) => tag)
                .slice(0, 3)
                .map((tag, index) => (
                  <div key={index} className="flex space-x-1">
                    {index > 0 && <BreadcrumbSeparator>›</BreadcrumbSeparator>}
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        className="capitalize font-bold"
                        href={`/tasks/${encodeTitleToSlug(tag)}`}
                      >
                        {tag}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
                ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Main Content */}
          <div className="min-h-[500px] flex flex-col sm:flex-row rounded-lg">
            {/* Image Section */}
            <div className="hidden sm:block flex-[2_1_60%]">
              <DetailImage post={app} />
            </div>

            {/* Details Section */}
            <div className="sm:px-4 flex-[2_1_40%]">
              <h1 className="text-2xl font-semibold mb-2">{app.title}</h1>
              <div className="mt-2 flex justify-between flex-col lg:flex-row">
                <VisitNumber app={app} />
                <ButtonVisitSite app={app} />
              </div>

              <hr className="my-1 hidden sm:block" />
              <div className="sm:hidden">
                <DetailImage post={app} />
              </div>
              <div className="my-3 flex justify-between flex-col lg:flex-row">
                <span className="text-sm font-bold uppercase">
                  {app.pricing?.join(" | ")}
                </span>

                {app?.alternative && (
                  <Link
                    className="text-md text-primary no-underline hover:underline"
                    href="#alternativeTo"
                  >
                    Best Alternatives
                  </Link>
                )}
              </div>

              {app.description ? (
                <p className="text-lg mt-0 text-muted-foreground">
                  {app.description}
                </p>
              ) : null}
              <DetailToc toc={app.toc} />
            </div>

            {/* Action Buttons Section */}
            <div className="w-full flex-shrink-0 space-y-3 sm:w-[240px] 2xl:w-[300px]">
              <ButtonFollow id={app.id} />
              <ButtonDealsApp app={app} />
              <div className="px-4 py-3 mt-4 space-y-2">
                <div>Tasks:</div>
                {app.tasks?.map((t) => (
                  <TagItem tag={t} key={t} type="tasks" />
                ))}
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <ItemAlternative post={app} />
          <hr className="my-4" />
          <ItemFeature post={app} />
          <hr className="my-4" />
          <div className="flex justify-end">
            <ButtonEditPage app={app} />
          </div>
          <div className="prose dark:prose-invert max-w-[2000px]">
            <Suspense>
              <CustomMDX source={app.raw} />
            </Suspense>
          </div>
          <div className="flex justify-center my-4">
            <ButtonEditPage app={app} />
          </div>
          <hr className="my-4" />
        </div>
        <div className="w-full max-w-[1468px]">
          <Comment />
        </div>
      </div>
    </article>
  )
}
