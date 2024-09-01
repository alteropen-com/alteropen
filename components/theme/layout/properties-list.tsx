import { Alternative } from "@/.velite"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  capitalizeFirstLetter,
  formatDateAgo,
  formatNumber,
  isValidDate,
} from "@/lib/utils"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"
import BadgeOpenSource from "./badge-opensource"

interface PropertiesProps {
  app?: Alternative
  properties?: {
    [key: string]: string | number
  }
  showDetails?: boolean
}

const Properties = ({
  app,
  properties,
  showDetails = false,
}: PropertiesProps) => {
  if (!properties) return null

  const propertyEntries = Object.entries(properties)

  return (
    <div className="">
      {app && (
        <div className="my-2">
          <BadgeOpenSource app={app} />
        </div>
      )}
      {propertyEntries.map(([key, value], index) => {
        if (
          typeof value !== "number" &&
          value.includes("https:") &&
          !showDetails
        )
          return null
        if (
          !showDetails &&
          ["fork", "issue", "request", "website"].some((el) =>
            key.toLowerCase().includes(el)
          )
        )
          return null

        if (key.toLowerCase().includes("visit")) return null

        if (key.toLowerCase().includes("star")) return null
        if (key.toLowerCase().includes("commit")) return null

        return (
          <div key={key} className="flex mb-2 items-center">
            {showDetails && (
              <span className="w-[186px] truncate">
                {capitalizeFirstLetter(key.replace(/_/g, " "))}
              </span>
            )}
            {typeof value !== "number" && value.includes("https:") ? (
              <Button
                variant="link"
                asChild
                className={`w-full justify-start px-0 py-0 `}
              >
                <Link
                  href={value + `?ref=${siteConfig.ref}`}
                  target="_blank"
                  rel="nofollow"
                >
                  {value.includes("github.com")
                    ? "github"
                    : value.replace("https://", "")}
                  <RxOpenInNewWindow className="ml-1" />
                </Link>
              </Button>
            ) : (
              <span className="w-full truncate">
                {typeof value === "number"
                  ? formatNumber(value)
                  : key === "Language"
                  ? value.split(";").slice(0, 2).join("; ")
                  : key === "Category"
                  ? value.split(";").slice(0, 1).join("; ")
                  : key === "Features"
                  ? value.split(";").slice(0, 2).join("; ")
                  : isValidDate(value)
                  ? formatDateAgo(value, true)
                  : value}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Properties
