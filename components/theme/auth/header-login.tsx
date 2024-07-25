"use client"

import useUser from "@/components/api/hook/useUser"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HeaderLogin() {
  const { isFetching, data: user } = useUser()

  const queryClient = useQueryClient()
  const router = useRouter()

  if (isFetching) {
    return null
  }

  const handleLogout = async () => {
    queryClient.clear()
    await supabaseBrowser().auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex flex-1 items-center justify-end space-x-2">
      {user?.id !== "" ? (
        <Button
          variant="link"
          className="m-1 p-1 px-2 text-white flex flex-col items-start sm:space-x-1 hover:no-underline hover:bg-gray-600"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="link"
          asChild
          className="m-1 p-1 px-2 text-white flex flex-col items-center sm:space-x-1 hover:no-underline hover:bg-gray-600"
        >
          <Link href="?login=true">
            <span className="text-sm hidden sm:block">Sign in (100% free)</span>
            <span className="text-[12px] hidden sm:block">
              To Save Your Alternative
            </span>
            <span className="text-sm sm:hidden">Sign in</span>
            <span className="text-[12px] sm:hidden">(100% free)</span>
          </Link>
        </Button>
      )}
    </div>
  )
}
