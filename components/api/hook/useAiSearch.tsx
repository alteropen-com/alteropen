"use client"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { useQuery } from "@tanstack/react-query"

export default function useAiSearch(shouldFetch: boolean, query: string) {
  return useQuery({
    queryKey: ["ai-search", query],
    queryFn: async () => {
      if (!shouldFetch) return {}
      const supabase = supabaseBrowser()
      const { data, error } = await supabase.functions.invoke("search", {
        body: { search: query },
      })

      if (error) {
        return {}
      }

      return data
    },
    enabled: shouldFetch,
  })
}
