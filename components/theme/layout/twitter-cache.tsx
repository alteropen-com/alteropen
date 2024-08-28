import { unstable_cache } from "next/cache"
import { Suspense } from "react"
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "react-tweet"
import { getTweet as _getTweet } from "react-tweet/api"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  { revalidate: 3600 * 24 }
)

const TweetPage = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id)
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />
  } catch (error) {
    // console.error(error)
    return <TweetNotFound error={error} />
  }
}

export default function TweetCache({ id }: { id: string }) {
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <TweetPage id={id} />
    </Suspense>
  )
}
