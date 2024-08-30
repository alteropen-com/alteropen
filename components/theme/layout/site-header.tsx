import { CirclePlus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { DialogLogin } from "../auth/dialog-login"
import HeaderLogin from "../auth/header-login"
import { MainNav } from "./main-nav"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="z-10 w-full border-b border-border bg-gray-900 h-12">
      <div className="px-1 sm:px-2 flex items-center justify-center">
        <MainNav />
        <div className="flex-1"></div>
        <div className="flex items-center justify-center mx-2">
          <Link href="/submit" className="sm:hidden" aria-label="Submit">
            <CirclePlus className="h-5 w-5 text-white" />
          </Link>
          <Link
            href="/submit"
            className="hidden sm:flex items-center space-x-2 text-white hover:text-gray-300"
          >
            <CirclePlus className="h-5 w-5" />
            <span>Submit</span>
          </Link>
        </div>
        <Suspense>
          <HeaderLogin />
          <DialogLogin />
        </Suspense>
        <ThemeToggle />
      </div>
    </header>
  )
}
