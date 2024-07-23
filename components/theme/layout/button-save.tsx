"use client"

import useUserProduct from "@/components/api/hook/useUserProduct"
import { Card } from "@/components/ui/card"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const ButtonFollow = ({ id }: { id: number }) => {
  const { isFetching, data: userProduct } = useUserProduct()
  const queryClient = useQueryClient()
  const router = useRouter()

  const isSaved = userProduct?.some((item) => item.product_id === id)

  const handleSave = async () => {
    const supabase = supabaseBrowser()
    const { data: user } = await supabase.auth.getSession()

    if (!user.session) {
      router.push("?login=true")
      return
    }

    if (!isSaved) {
      const { error } = await supabase
        .from("user_product")
        .upsert({ profile_id: user.session.user.id, product_id: id })
      if (error) {
        // show error
      }
    } else {
      const { error } = await supabase
        .from("user_product")
        .delete()
        .eq("profile_id", user.session.user.id)
        .eq("product_id", id)
      if (error) {
        // show error
      }
    }
    queryClient.invalidateQueries({ queryKey: ["user_product"] })
  }

  return (
    <Card className="px-4 py-3">
      <p className="text-sm text-center my-2">Follow this for later</p>
      <button
        onClick={handleSave}
        disabled={isFetching}
        className={`not-prose border-2 px-4 py-2 rounded-full font-bold  ease-in-out w-full transition-all duration-500 h-12 flex items-center justify-center
      ${
        isFetching
          ? "bg-background"
          : isSaved
          ? "bg-blue-500 text-white"
          : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
      }`}
      >
        {isFetching ? "" : isSaved ? "Followed" : "Follow Now"}
      </button>
      <p className="text-sm text-center my-2">
        Get notification with personalized deals just for you!
      </p>
    </Card>
  )
}

export default ButtonFollow
