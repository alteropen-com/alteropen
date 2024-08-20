"use client"
import { Alternative } from "#site/content"
import clsx, { ClassValue } from "clsx"
import Link from "next/link"
// https://github.com/BinarySenseiii/personal-website/blob/49b36ed9e02338c1d2fde0dd63d2bf11fa63e35c/src/components/post/post-toc.tsx

const TOC_STYLES: ClassValue =
  "el-focus-styles rounded-sm hover:underline text-muted-foreground hover:text-ring"

const DetailToc = ({ toc }: { toc: Alternative["toc"] }) => {
  const renderTocItems = (items: Alternative["toc"]) => {
    return (
      <ul role="list" className="space-y-2 list-none mt-2 ps-4">
        {items.map((item) => (
          <li key={item.url} className="text-base" role="listitem">
            <a
              href={item.url}
              className={clsx(TOC_STYLES, "no-underline")}
              aria-label={`Go to ${item.title}`}
            >
              {item.title}
            </a>
            {item.items.length > 0 && renderTocItems(item.items)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul role="list" className="space-y-2 list-none py-2 pl-0">
      {toc.map((tocItem) => (
        <li key={tocItem.url} className="text-base" role="listitem">
          <Link
            // rel="nofollow"
            href={tocItem.url}
            className={clsx(
              TOC_STYLES,
              "text-primary no-underline hover:underline"
            )}
            aria-label={`Go to ${tocItem.title}`}
          >
            {tocItem.title}
          </Link>
          {tocItem.items.length > 0 && renderTocItems(tocItem.items)}
        </li>
      ))}
    </ul>
  )
}

export default DetailToc
