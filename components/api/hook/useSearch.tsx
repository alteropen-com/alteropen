import { useQuery } from "@tanstack/react-query"

type Item = {
  id: number
  slug: string
  name: string
  visit: number
}

export default function useSearch(shouldFetch: boolean) {
  return useQuery({
    queryKey: ["user-search"],
    queryFn: async () => {
      const url = `/static/search-index.json`
      const response = await fetch(url)
      const data = (await response.json()) as Item[] | undefined
      if (!data) {
        return []
      }
      return data.map(({ id, slug, name, visit }) => ({
        id,
        slug,
        name,
        visit,
      }))
    },
    enabled: shouldFetch,
  })
}
