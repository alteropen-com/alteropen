import { Alternative } from "@/.velite"
import FeatureItem from "./feature-item"

export default function ItemFeature({ post }: { post: Alternative }) {
  if (!post.features) return null
  return (
    <>
      <p className="font-bold my-2">Feature</p>
      <div className="flex gap-2 flex-wrap">
        {post.features.map((t) => (
          <FeatureItem tag={t} key={t} variant="outline" />
        ))}
      </div>
    </>
  )
}
