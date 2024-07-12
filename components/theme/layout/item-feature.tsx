import { App } from "@/.velite"
import TagItem from "./tag-item"

export default function ItemFeature({ post }: { post: App }) {
  return (
    <>
      <p className="font-bold my-2">Feature</p>
      <div className="flex gap-2 flex-wrap">
        {post.features?.map((t) => (
          <TagItem tag={t} key={t} type="features" variant="outline" />
        ))}
      </div>
    </>
  )
}
