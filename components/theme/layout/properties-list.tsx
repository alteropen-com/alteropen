import { Button } from "@/components/ui/button"
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
}

const Properties = ({ properties }: PropertiesProps) => {
  if (!properties) return null

  const propertyEntries = Object.entries(properties)

  return (
    <div className="py-2">
      {propertyEntries.map(([key, value], index) => (
        <div key={key} className="flex mb-2 items-center">
          <span className="w-1/3">
            {capitalizeFirstLetter(key.replace(/_/g, " "))}
          </span>
          {typeof value !== "number" && value.includes("https:") ? (
            <Button
              variant="link"
              asChild
              className={`w-2/3 justify-start px-0 py-0 `}
            >
              <Link href={value} target="_blank" rel="noopener noreferrer">
                {value.replace("https://", "")}
              </Link>
            </Button>
          ) : (
            <span className="w-2/3">
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
      ))}
    </div>
  )
}

export default Properties
