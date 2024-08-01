export const SORT_TYPES = [
  { value: "latest", name: "Latest" },
  { value: "top", name: "Top Visit" },
] as const

type SortType = (typeof SORT_TYPES)[number]["value"]

export const SORT_TYPE = SORT_TYPES.reduce((acc, curr) => {
  acc[curr.value] = curr.value
  return acc
}, {} as Record<SortType, SortType>)

export const MAX_TITLE_LENGTH = 60
