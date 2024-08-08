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
  showLinks?: boolean
}

const Properties = ({ properties, showLinks = true }: PropertiesProps) => {
  if (!properties) return null

  const propertyEntries = Object.entries(properties)

  return (
    <div className="py-2">
      {propertyEntries.map(([key, value], index) => {
        if (typeof value !== "number" && value.includes("https:") && !showLinks)
          return null
        if (!showLinks && key.toLowerCase().includes("last")) return null
        return (
          <div key={key} className="flex mb-2 items-center">
            <span className="w-[220px]">
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
                  rel="noopener noreferrer"
                >
                  {value.replace("https://", "")}
                </Link>
              </Button>
            ) : (
              <span className="w-full">
                {typeof value === "number"
                  ? formatNumber(value)
                  : key === "Language"
                  ? value.split(";").slice(0, 2).join(";")
                  : isValidDate(value)
                  ? formatDateAgo(value)
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
