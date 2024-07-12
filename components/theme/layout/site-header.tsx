// import { MainNav } from "./main-nav";
// import { MobileNav } from "./mobile-nav";
// import { ThemeToggle } from "./theme/theme-toggle";
import { Suspense } from "react"
import { DialogLogin } from "../auth/dialog-login"
import HeaderLogin from "../auth/header-login"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="z-10 w-full border-b border-border bg-gray-900 h-12">
      <div className="px-1 sm:px-4 md:px-6 flex items-center justify-center">
        <MobileNav />
        {/* <MainNav /> */}
        <div className="flex-1"></div>
        <Suspense>
          <HeaderLogin />
          <DialogLogin />
        </Suspense>
        <ThemeToggle />
      </div>
    </header>
  )
}
