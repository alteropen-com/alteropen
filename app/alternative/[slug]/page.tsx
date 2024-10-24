import { alternatives } from "#site/content"
import { CustomMDX } from "@/components/mdx/MdxRemote"
import AlternativeTocList from "@/components/theme/layout/alternative-toc-list"
import BadgeOpenSource from "@/components/theme/layout/badge-opensource"
import ButtonDeals from "@/components/theme/layout/button-deals"
import ButtonEditPage from "@/components/theme/layout/button-edit-page"
import ButtonFollow from "@/components/theme/layout/button-save"
import ButtonVisitSite from "@/components/theme/layout/button-visit-site"
import DetailImage from "@/components/theme/layout/detail-image"
import DetailToc from "@/components/theme/layout/detail-toc"
import ItemAlternative from "@/components/theme/layout/item-alternative"
import ItemFeature from "@/components/theme/layout/item-feature"
import PopularSearch from "@/components/theme/layout/popular-search"
import Properties from "@/components/theme/layout/properties-list"
import SimilarProduct from "@/components/theme/layout/similar-product"
import StickyNav from "@/components/theme/layout/sticky-toc"
import TagItem from "@/components/theme/layout/tag-item"
import TimeUpdated from "@/components/theme/layout/time-updated"
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
import { notFound, redirect } from "next/navigation"
import "./styles.css"

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

  const { name, title, slug, image, deals } = app

  const href = `/alternative/${slug}`

  const imageUrl = image.url

  const alternateApps = alternatives.filter((item) =>
    item.alternative?.find((ia) => ia.id === app.id)
  )

  const postIdAlternative = app.alternative?.map((item) => ({ id: item.id }))

  const similarAlternative = alternatives.filter((app) =>
    app.alternative?.find((item) =>
      postIdAlternative?.find((itemId) => itemId.id === item.id)
    )
  )

  const pageTitle = `
    ${name || title} ${
    alternateApps.length > 0 || similarAlternative.length > 0
      ? " Top " + (alternateApps.length + similarAlternative.length) + "+"
      : ""
  } AlternativeTo (Free/OpenSource...) ${
    deals && deals.length > 0 ? `+${deals.length} Deals` : ""
  } in 2024. `

  const description = `Best Similar App with Top Deal, Coupon, Discount, Promotion for ${
    name || title
  }. Review. HowTo. Pricing.`

  return {
    title: pageTitle,
    description,
    authors: { name: siteConfig.author },
    alternates: {
      canonical: href,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: pageTitle,
      description: description,
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
      description: description,
      images: [imageUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = alternatives.find((app) => {
    return app.slug === params.slug
  })

  if (!post) {
    const redirectPost = alternatives.find((app) => {
      return app.slug === params.slug.toLowerCase()
    })
    if (redirectPost) {
      return redirect(redirectPost.slug)
    }
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
            <div className="hidden sm:block w-[40%] overflow-y-hidden">
              <DetailImage post={post} />
            </div>

            {/* Details Section */}
            <div className="sm:px-4 flex-1">
              <h1 className="text-2xl font-semibold mb-2">
                {post.name} - {post.title}
              </h1>
              <hr className="my-1 hidden sm:block" />
              <div className="mt-2 flex justify-between flex-col lg:flex-row">
                <VisitNumber app={post} />
              </div>

              <div className="sm:hidden">
                <DetailImage post={post} />
              </div>
              <div className="my-3 flex justify-between flex-col lg:flex-row">
                <span className="text-sm font-bold uppercase">
                  {post.pricing?.join(" | ")}
                </span>
              </div>
              {post.description ? (
                <p className="text-lg mt-0 mb-4 text-muted-foreground">
                  {post.description}
                </p>
              ) : null}

              <DetailToc toc={post.toc} />
              <div className="my-2">
                <BadgeOpenSource app={post} />
              </div>
              <Properties properties={post.properties} showDetails={true} />
              <AlternativeTocList post={post} />
            </div>

            {/* Action Buttons Section */}
            <div
              id="deals"
              className="w-full flex-shrink-0 space-y-3 sm:w-[240px] 2xl:w-[300px]"
            >
              <ButtonVisitSite app={post} />
              <ButtonFollow id={post.id} />
              <ButtonDeals app={post} />
              <div className="px-4 py-3 space-x-2 space-y-2">
                <div className="font-bold">Tasks:</div>
                {post.tasks?.map((t) => (
                  <TagItem tag={t} key={t} />
                ))}
              </div>
              <p className="px-4 mt-1">
                <TimeUpdated lastModified={post.lastModified} />
              </p>
            </div>
          </div>
          <StickyNav post={post} />
          <hr id="sticky-start" className="my-4" />
          <ItemFeature post={post} />
          <hr className="my-4" />
          <div className="flex justify-end">
            <ButtonEditPage app={post} />
          </div>
          <div className="prose dark:prose-invert max-w-[2000px]">
            <CustomMDX source={post.raw} />
          </div>
          <div className="flex justify-center my-4">
            <ButtonEditPage app={post} />
          </div>
          <hr className="my-4" />
        </div>
        <div className="w-full max-w-[1468px]">
          <PopularSearch search={post.popularSearch} />
          {/* <Comment /> */}
        </div>
        <div className="w-full max-w-[1468px]">
          <ItemAlternative post={post} />
          <hr className="my-4" />
        </div>
        <div className="w-full max-w-[1468px] flex flex-wrap justify-around">
          <div>
            <ButtonFollow id={post.id} />
          </div>
          {post.deals && post.deals.length > 0 && (
            <div>
              <ButtonDeals app={post} />
            </div>
          )}
        </div>
        <div className="w-full max-w-[1468px]">
          <hr className="my-4" />
          <SimilarProduct post={post} />
        </div>
      </div>
    </article>
  )
}
