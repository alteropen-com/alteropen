import { App } from "@/.velite"
import { siteConfig } from "@/config/site"
import { RxOpenInNewWindow } from "react-icons/rx"

const ButtonEditPage = ({ app }: { app: App }) => {
  return (
    <a
      className="text-md text-primary no-underline hover:underline flex items-center"
      href={siteConfig.links.github + "/edit/main/content/" + app.path + ".mdx"}
      target="_blank"
      rel="nofollow"
    >
      Edit this page on Github <RxOpenInNewWindow className="ml-1" />
    </a>
  )
}

export default ButtonEditPage
