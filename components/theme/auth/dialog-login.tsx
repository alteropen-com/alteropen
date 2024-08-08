"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"

export function DialogLogin() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const supabase = supabaseBrowser()

  // Check if the login query parameter is present
  const isLoginDialogOpen = searchParams.get("login") === "true"

  const closeLoginDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("login")
    router.replace(pathname + "?" + params)
  }, [pathname, searchParams, router])

  useEffect(() => {
    const checkLogin = async () => {
      const { data: user } = await supabase.auth.getSession()

      if (user.session) {
        closeLoginDialog()
      }
    }
    checkLogin()
  }, [closeLoginDialog, supabase.auth])

  const loginGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + location.pathname,
      },
    })
  }

  return (
    <Dialog open={isLoginDialogOpen} onOpenChange={closeLoginDialog}>
      <DialogContent className="sm:max-w-[768px] w-full pb-2">
        <div className="flex flex-col items-center p-8">
          <h2 className="text-2xl font-bold mb-4">
            Sign in to continue (100% free)
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            To ensure a <span className="font-bold">safe and no spam</span>{" "}
            environment, some actions require signing in.
          </p>
          <Button variant="outline" className="h-14" onClick={loginGoogle}>
            <FcGoogle size={28} className="mr-2" />
            <span className="text-lg">Sign in with Google </span>
          </Button>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            It`s free and takes a few seconds.
          </p>
          <div className="mt-auto" />
        </div>
        <p className=" text-sm mt-4 text-center text-gray-400 dark:text-gray-500">
          By continuing, you agree to our{" "}
          <a
            href="/term"
            className="text-blue-500 no-underline"
            // rel="nofollow"
          >
            Terms
          </a>{" "}
          {/* <a
            href="/refund"
            className="text-blue-500 no-underline"
            // rel="nofollow"
          >
            Refund
          </a>{" "} */}
          and{" "}
          <a
            href="/privacy"
            className="text-blue-500 no-underline"
            // rel="nofollow"
          >
            Privacy
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}
