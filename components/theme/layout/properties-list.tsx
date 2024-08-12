import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  capitalizeFirstLetter,
  formatDateAgo,
  formatNumber,
  isValidDate,
} from "@/lib/utils"
import Link from "next/link"

interface PropertiesProps {
  properties?: {
    [key: string]: string | number
  }
  showDetails?: boolean
}

const Properties = ({ properties, showDetails = false }: PropertiesProps) => {
  if (!properties) return null

  const propertyEntries = Object.entries(properties)

  return (
    <div className="py-2">
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
        return (
          <div key={key} className="flex mb-2 items-center">
            <span className="w-[186px] truncate">
              {capitalizeFirstLetter(key.replace(/_/g, " "))}
            </span>
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
                  {value.replace("https://", "")}
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
