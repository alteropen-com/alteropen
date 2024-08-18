"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { Menu } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { SearchDialog } from "./search-dialog"

export function MainNav() {
  const [open, setOpen] = useState(false)

  const openMenu = () => {
    setOpen(true)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="link"
        onClick={openMenu}
        className="w-10 px-0 hover:bg-gray-600"
      >
        <Menu className="h-5 w-5 text-white" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link
        href="/"
        className="mr-6 px-0 hidden sm:flex items-center space-x-2 hover:no-underline"
      >
        <span className="font-bold text-white">{siteConfig.name}</span>
      </Link>
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <SearchDialog />
      </div>
      <SheetContent side="top">
        <SheetLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center space-x-2"
        >
          <span className="font-bold">Home</span>
        </SheetLink>
        <div className="flex flex-col gap-3 my-3 ml-3">
          <SheetLink onOpenChange={setOpen} href="/tasks">
            Tasks
          </SheetLink>
          <SheetLink onOpenChange={setOpen} href="/alternative">
            Alternatives
          </SheetLink>
        </div>
        <hr className="border-gray-600" />
        <div className="flex flex-col gap-3 mt-5">
          <Link
            target="_blank"
            rel="nofollow"
            href={siteConfig.links.github}
            className="flex items-center space-x-2"
          >
            <FaGithub className="h-5 w-5" /> <span>Github</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface SheetLinkProps extends LinkProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}

function SheetLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: SheetLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      rel="nofollow"
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
