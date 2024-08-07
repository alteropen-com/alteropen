import { Tweet } from "react-tweet"

export default function Twitters({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null

  return (
    <div className="not-prose grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => (
        <div key={id} className="px-2">
          <Tweet id={id} />
        </div>
      ))}
    </div>
  )
}
