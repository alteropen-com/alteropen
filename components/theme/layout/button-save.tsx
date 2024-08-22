"use client"

import useUserProduct from "@/components/api/hook/useUserProduct"
import { Card } from "@/components/ui/card"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const ButtonFollow = ({
  id,
  onlyButton = false,
}: {
  id: number
  onlyButton?: boolean
}) => {
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
        .insert({ profile_id: user.session.user.id, product_id: id })
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

  if (onlyButton)
    return (
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
        {isFetching ? "" : isSaved ? "Saved" : "Save Now"}
      </button>
    )

  return (
    <Card className="px-4 py-3 bg-background border-background shadow-none">
      <p className="text-md text-center my-2 font-bold">
        {isSaved ? "You saved this product" : "Looking for a better deal?"}
      </p>
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
        {isFetching ? "" : isSaved ? "Saved" : "Save Now"}
      </button>
      <p className="text-sm text-center my-2">
        {isSaved
          ? "and we try the best to make it available for you."
          : "and we will notify you when the deal is available."}
      </p>
    </Card>
  )
}

export default ButtonFollow
