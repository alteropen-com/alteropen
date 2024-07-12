"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { Menu } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <>
          <Button variant="link" className="w-10 px-0 hover:bg-gray-600">
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="font-bold text-white">{siteConfig.name}</span>
          </Link>
        </>
      </SheetTrigger>
      <SheetContent side="top">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/tasks">
            Tasks
          </MobileLink>
          {/* <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink> */}
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
          >
            Twitter
          </Link> */}
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
