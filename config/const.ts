export const SORT_TYPES = [
  { value: "lasted", name: "Latest" },
  { value: "top", name: "Top Visit" },
]

// SORT_TYPES to key and name object
export const SORT_TYPE = SORT_TYPES.map(({ value, name }) => ({
  [value]: name,
}))

export const MAX_TITLE_LENGTH = 60
