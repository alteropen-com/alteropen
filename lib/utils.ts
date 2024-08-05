import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  } else {
    return num.toString()
  }
}

export function capitalizeFirstLetter(input?: string): string {
  if (!input) return ""
  return input
    .trim() // Remove leading and trailing spaces
    .split(/\s+/) // Split by one or more spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function encodeTitleToSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading/trailing whitespace
    .normalize("NFD") // Normalize to Unicode NFD form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
}

export const parseImage = (img: string) => {
  const parts = img.split("::")
  return {
    url: parts[0].trim(),
    alt: parts[1] ? parts[1].trim() : "",
  }
}

export const isValidDate = (dateString: string | number) => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const formatDateAgo = (dateString: string | number) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime() // Calculate the difference in time
  const diffDays = Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24))

  if (diffTime === 0) {
    return "Today"
  } else if (diffTime > 0) { // Future dates
    if (diffDays === 1) {
      return "in 1 day"
    } else if (diffDays < 30) {
      return `in ${diffDays} days`
    } else if (diffDays < 365) {
      const diffMonths = Math.ceil(diffDays / 30)
      return `in ${diffMonths} month${diffMonths > 1 ? "s" : ""}`
    } else {
      const diffYears = Math.ceil(diffDays / 365)
      return `in ${diffYears} year${diffYears > 1 ? "s" : ""}`
    }
  } else { // Past dates
    if (diffDays === 1) {
      return "1 day ago"
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else if (diffDays < 365) {
      const diffMonths = Math.ceil(diffDays / 30)
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`
    } else {
      const diffYears = Math.ceil(diffDays / 365)
      return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`
    }
  }
}
