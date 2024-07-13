import { alternatives, apps } from "#site/content"
import { CustomMDX } from "@/components/mdx/MdxRemote"
import ButtonEditPage from "@/components/theme/layout/button-edit-page"
import ButtonVisitSite from "@/components/theme/layout/button-visit-site"
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

export const runtime = "edge"
export const dynamicParams = false

interface PostPageProps {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  const paths = alternatives.map((app) => ({ slug: app.slug }))

  return paths
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const app = alternatives.find((app) => {
    return app.slug === params.slug
  })

  if (!app) {
    return {}
  }

  const { name, title, slug, description, image } = app

  const href = `/alternative/${slug}`

  const imageUrl = image.url

  const alternateApps = apps.filter((item) =>
    item.alternative?.find((ia) => ia.id === app.id)
  )

  const pageTitle =
    (name || title) +
    " Alternative." +
    (alternateApps.length > 0 ? " Top " + alternateApps.length : "") +
    " Similar App. (Free or Paid). Review. HowTo. Pricing. " +
    siteConfig.title

  const pageDescription = title + ". " + description

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
  const post = alternatives.find((app) => {
    return app.slug === params.slug
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="px-2 sm:px-4 md:px-5 xl:px-8 2xl:px-0 py-2 max-w-[1868px] mx-auto">
      <div className="main flex flex-col items-center">
        <div className="w-full max-w-[1468px]">
          <Breadcrumb className="mb-3">
            <BreadcrumbList className="text-xs">
              {post.tasks
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
              <DetailImage post={post} />
            </div>

            {/* Details Section */}
            <div className="sm:px-4 flex-[2_1_40%]">
              <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
              <div className="mt-2 flex justify-between flex-col lg:flex-row">
                <VisitNumber app={post} />
                <ButtonVisitSite app={post} />
              </div>

              <hr className="my-1 hidden sm:block" />
              <div className="sm:hidden">
                <DetailImage post={post} />
              </div>
              <div className="my-3 flex justify-between flex-col lg:flex-row">
                <span className="text-sm font-bold uppercase">
                  {post.pricing?.join(" | ")}
                </span>
              </div>

              <Link
                className="text-md text-primary no-underline hover:underline"
                href="#alternativeTo"
              >
                Best Alternatives
              </Link>

              {post.description ? (
                <p className="text-lg mt-0 text-muted-foreground">
                  {post.description}
                </p>
              ) : null}
              <DetailToc toc={post.toc} />
            </div>

            {/* Action Buttons Section */}
            <div className="w-full flex-shrink-0 sm:w-[240px] 2xl:w-[300px]">
              {/* <Card className="px-4 py-3">
                <p className="text-sm text-center my-2">Save this for later</p>
                <ButtonSave id={post.id} />
                <p className="text-sm text-center my-2">
                  Unlocks personalized recommendations just for you!
                </p>
              </Card> */}
              <div className="px-4 py-3 mt-4 space-y-2">
                <div>Tasks:</div>
                {post.tasks?.map((t) => (
                  <TagItem tag={t} key={t} type="tasks" />
                ))}
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <ItemAlternative post={post} />
          <hr className="my-4" />
          <ItemFeature post={post} />
          <hr className="my-4" />
          <div className="flex justify-end">
            <ButtonEditPage app={post} />
          </div>
          <div className="prose dark:prose-invert max-w-[2000px]">
            <Suspense>
              <CustomMDX source={post.raw} />
            </Suspense>
          </div>
          <div className="flex justify-center my-4">
            <ButtonEditPage app={post} />
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </article>
  )
}
