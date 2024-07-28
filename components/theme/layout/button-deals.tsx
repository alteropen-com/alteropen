import { Alternative } from "@/.velite"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"

export default function ButtonDeals({ app }: { app: Alternative }) {
  const { deals } = app
  if (deals == undefined || deals?.length === 0) {
    return null
  }
  return (
    <>
      {deals.map((deal, index) => {
        const href =
          deal.name?.toLowerCase() === "appsumo"
            ? deal.url + `?ref=${siteConfig.ref}`
            : deal.url.includes("?")
            ? deal.url + `&ref=${siteConfig.ref}`
            : deal.url + `?ref=${siteConfig.ref}`
        return (
          <Card className="px-4 py-3" key={index}>
            <p className="text-xl font-bold text-center mb-2 my-2">
              {deal.name}
            </p>
            <p className="gradient-text text-lg font-bold text-center my-2">
              {deal.price}
            </p>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="not-prose border-2 px-4 py-2 rounded-full font-bold ease-in-out w-full transition-all duration-500 h-12 flex items-center justify-center bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            >
              Get Deal
            </a>
          </Card>
        )
      })}
      <p className="text-sm italic text-center">
        Deals may change or end without notice.
      </p>
    </>
  )
}
