import { App } from "@/.velite"
import { siteConfig } from "@/config/site"
import { RxOpenInNewWindow } from "react-icons/rx"

const ButtonVisitSite = ({
  href,
  text,
  target = "_black",
  className,
  app,
}: {
  href?: string
  text?: string
  target?: string
  className?: string
  app?: App
}) => {
  return (
    <a
      className={`${
        className
          ? className
          : "text-md text-primary no-underline hover:underline"
      } flex items-center`}
      href={(href || app?.url) + `?ref=${siteConfig.ref}`}
      target={target}
      rel="noopener noreferrer"
    >
      {text || app?.name} <RxOpenInNewWindow className="ml-1" />
    </a>
  )
}

export default ButtonVisitSite
