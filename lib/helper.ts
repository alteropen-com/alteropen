import { Alternative } from "@/.velite"

export function getAllTags(posts: Array<Alternative>) {
  const tasks: Record<string, number> = {}
  posts
    .filter((post) => post.published)
    .forEach((post) => {
      post.tasks?.forEach((task) => {
        if (task !== "") tasks[task] = (tasks[task] ?? 0) + 1
      })
    })

  const features: Record<string, number> = {}
  posts.forEach((post) => {
    post.features?.forEach((feature) => {
      features[feature] = (features[feature] ?? 0) + 1
    })
  })

  return { features, tasks }
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}
