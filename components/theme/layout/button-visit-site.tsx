import { Alternative } from "@/.velite"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { RxOpenInNewWindow } from "react-icons/rx"

const ButtonVisitSite = ({ app }: { app?: Alternative }) => {
  const url = app?.url

  return (
    <Card className="px-4 bg-background border-background shadow-none">
      <p className="text-sm text-center my-1">Visit website</p>
      <a
        className="not-prose border-2 px-4 py-2 rounded-full font-bold  ease-in-out w-full transition-all duration-500 h-12 flex items-center justify-center bg-background"
        href={url + `${url?.includes("?") ? "&" : "?"}ref=${siteConfig.ref}`}
        target="_blank"
        rel="nofollow"
      >
        {app?.name} <RxOpenInNewWindow className="ml-1" />
      </a>
    </Card>
  )
}

export default ButtonVisitSite
