export default function PopularSearch({
  search,
}: {
  search: string[] | undefined
}) {
  if (!search) {
    return null
  }

  return (
    <div className="flex flex-wrap space-x-2 items-center">
      <p className="my-2 font-bold">Popular Google Search:</p>
      <div className="flex gap-2 flex-wrap">
        {search.map((t) => (
          <span key={t} className="border-b rounded-md px-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
