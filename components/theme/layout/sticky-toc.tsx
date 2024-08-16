"use client"
import { Alternative } from "@/.velite"
import { ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ButtonFollow from "./button-save"
import "./css/sticky-nav.css"

type SectionLinkProps = {
  href: string
  label: string
  isVisible?: boolean
}

function SectionLink({ href, label, isVisible = true }: SectionLinkProps) {
  if (!isVisible) return null
  return (
    <a
      className="whitespace-nowrap px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-md no-underline hover:underline"
      href={href}
    >
      {label}
    </a>
  )
}

const scrollThreshold = 100 // Minimum scroll delta to trigger the check

export default function StickyNav({ post }: { post: Alternative }) {
  const [isSticky, setIsSticky] = useState(false)
  const [hasSections, setHasSections] = useState({
    reviewFeatures: false,
    pricing: false,
    similar: false,
  })
  const [showArrow, setShowArrow] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const lastScrollY = useRef(0)
  const isThrottling = useRef(false) // Ref to track throttling state

  useEffect(() => {
    const checkElements = () => {
      const reviewFeaturesElement = document.getElementById("review-features")
      const pricingElement = document.getElementById("pricing")
      const similarElement = document.getElementById("similar")

      setHasSections({
        reviewFeatures: !!reviewFeaturesElement,
        pricing: !!pricingElement,
        similar: !!similarElement,
      })

      setShowArrow(
        !!(reviewFeaturesElement && pricingElement && similarElement)
      )
    }

    // Check elements after the page has fully loaded
    if (document.readyState === "complete") {
      checkElements()
    } else {
      window.addEventListener("load", checkElements)
      return () => window.removeEventListener("load", checkElements)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (isThrottling.current) return // Skip if throttling
      isThrottling.current = true

      const stickyStartElement = document.getElementById("sticky-start")
      if (stickyStartElement) {
        const stickyStartOffset =
          stickyStartElement.getBoundingClientRect().top + window.scrollY - 300

        const currentScrollY = window.scrollY
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)

        if (scrollDelta < scrollThreshold) {
          isThrottling.current = false
          return // Skip if the scroll delta is too small
        }

        // Make sticky when the user crosses the stickyStartOffset
        setIsSticky(currentScrollY > stickyStartOffset)

        // Detect if user is scrolling up or down
        setIsScrollingUp(currentScrollY < lastScrollY.current)
        lastScrollY.current = currentScrollY
      }

      setTimeout(() => {
        isThrottling.current = false // Reset throttling after a delay
      }, 100) // Adjust the delay as needed (e.g., 100ms)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      id="sticky-nav"
      className={`${isSticky ? "sticky" : ""} ${
        isScrollingUp ? "scrolling-up" : ""
      } bg-background`}
    >
      <div id="sticky-nav-button" className="bg-background">
        <div className="flex items-center justify-end px-0 sm:px-4 md:px-5 xl:px-8 2xl:px-0 w-full max-w-[1468px] mx-auto overflow-x-auto overflow-y-hidden">
          <div className="mr-8 mt-2">
            <SectionLink href="#deals" label="Check Deals" />
          </div>
          <div className="max-w-[200px] w-full mr-2 mt-2">
            <ButtonFollow id={post.id} onlyButton />
          </div>
        </div>
      </div>
      <div
        id="sticky-wrapper"
        className="flex items-center px-0 sm:px-4 md:px-5 xl:px-8 2xl:px-0 w-full max-w-[1468px] mx-auto overflow-x-auto overflow-y-hidden pr-[20px]"
      >
        <div className="hidden md:block">
          <SectionLink href="#deals" label="Deals" />
        </div>
        <SectionLink href="#alternativeTo" label="Alternatives" />
        <SectionLink
          href="#review-features"
          label="Review & Features"
          isVisible={hasSections.reviewFeatures}
        />
        <SectionLink
          href="#pricing"
          label="Pricing"
          isVisible={hasSections.pricing}
        />
        <SectionLink
          href="#similar"
          label="Similar"
          isVisible={hasSections.similar}
        />
        {showArrow && (
          <button className="absolute right-0 h-[50px] py-2 opacity-60 sm:hidden bg-white">
            <span className="sr-only">Arrow right</span>
            <ChevronRight />
          </button>
        )}
        <div className="hidden ml-auto md:block w-full max-w-[200px]">
          <ButtonFollow id={post.id} onlyButton />
        </div>
      </div>
      <hr />
    </div>
  )
}
