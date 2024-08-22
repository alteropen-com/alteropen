import { useQuery } from "@tanstack/react-query"

export type ItemSearch = {
  id: number
  slug: string
  name: string
  visit: number
  title: string
  alternative: string
}

export default function useSearch(shouldFetch: boolean) {
  return useQuery({
    queryKey: ["user-search"],
    queryFn: async () => {
      const url = `/static/search-index.json`
      const response = await fetch(url)
      const data = (await response.json()) as ItemSearch[] | undefined
      if (!data) {
        return []
      }
      return data
    },
    enabled: shouldFetch,
  })
}
