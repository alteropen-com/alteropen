"use client"

import useSearch from "@/components/api/hook/useSearch"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { type DialogProps } from "@radix-ui/react-dialog"
import FlexSearch from "flexsearch"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useCallback, useEffect, useState } from "react"

type SearchResult = {
  name: string
  slug: string
}

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [shouldFetch, setShouldFetch] = useState(false)
  const { isFetching, data: data } = useSearch(shouldFetch)

  const [inputValue, setInputValue] = useState("")
  const [searchIndex, setSearchIndex] = useState<null | FlexSearch.Index>(null)
  const [foundItems, setFoundItems] = useState<SearchResult[]>([])

  const isOpen = searchParams.get("isSearch") === "true"

  useEffect(() => {
    const index = new FlexSearch.Index({
      preset: "match",
      tokenize: "full",
    })
    setSearchIndex(index)
  }, [])

  useEffect(() => {
    if (!data || !searchIndex) {
      return
    }
    data.forEach(({ name }, i) => {
      // TODO: better search with detail search?
      searchIndex.add(i, name.toLowerCase())
    })
  }, [data, searchIndex])

  useEffect(() => {
    if (isOpen) {
      setShouldFetch(true)
    }
  }, [isOpen])

  const toggleSearchDialog = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (isOpen) {
      newSearchParams.delete("isSearch")
    } else {
      newSearchParams.set("isSearch", "true")
    }
    router.push(`?${newSearchParams.toString()}`)
  }, [isOpen, router, searchParams])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        toggleSearchDialog()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleSearchDialog])

  const runCommand = useCallback(
    (command: () => unknown) => {
      toggleSearchDialog()
      command()
    },
    [toggleSearchDialog]
  )

  const startAutocomplete = () => {
    if (!shouldFetch) setShouldFetch(true)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (searchIndex && value.trim()) {
      const results = searchIndex.search(value.toLowerCase())
      const foundItems = results.map((index) => data![+index]) as SearchResult[]
      setFoundItems(foundItems.slice(0, 20))
    } else {
      setFoundItems([])
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-10 w-full justify-start rounded-[0.5rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 sm:w-80 lg:w-120"
        )}
        onMouseOver={startAutocomplete}
        onClick={() => {
          startAutocomplete()
          toggleSearchDialog()
        }}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search ...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={toggleSearchDialog}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-[18px] border-0 focus-visible:ring-0 "
            type="text"
            autoFocus
            name="q"
            onChange={handleOnChange}
            placeholder="Search..."
            value={inputValue}
            autoComplete="off"
          />
        </div>

        <CommandList className="max-h-[calc(100vh-300px)]">
          {isFetching && (
            <CommandItem>
              <span className="px-2">Loading...</span>
            </CommandItem>
          )}
          {inputValue.length > 0 && foundItems.length === 0 && (
            <CommandItem>
              <span className="px-4">No results found</span>
            </CommandItem>
          )}

          {inputValue.length > 0 && foundItems.length > 0 && (
            <>
              <ItemView
                data={foundItems}
                type="Tasks"
                slugUrl="/tasks/"
                runCommand={runCommand}
              />
              <ItemView
                data={foundItems}
                type="Apps"
                slugUrl="/app/"
                runCommand={runCommand}
              />
              <ItemView
                data={foundItems}
                type="Alternatives"
                slugUrl="/alternative/"
                runCommand={runCommand}
              />
            </>
          )}

          {(inputValue.length === 0 || foundItems.length === 0) && (
            <>
              <ItemView
                data={data}
                type="Tasks"
                slugUrl="/tasks/"
                runCommand={runCommand}
              />
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

const ItemView = ({
  data,
  type,
  slugUrl,
  runCommand,
}: {
  data: SearchResult[] | undefined
  type: "Apps" | "Tasks" | "Alternatives"
  slugUrl: string
  runCommand: (command: () => unknown) => void
}) => {
  const router = useRouter()

  if (!data) return null

  const matchItem = data.filter((item) => item.slug.includes(slugUrl))

  if (matchItem.length === 0) {
    return null
  }
  const icon = type === "Tasks" ? "📝" : type === "Apps" ? "📱" : "🔁"

  return (
    <CommandGroup heading={type}>
      {matchItem.map((item) => (
        <CommandItem
          key={item.slug}
          value={item.name}
          onSelect={() => {
            runCommand(() => router.push(item.slug))
          }}
        >
          {icon} {item.name}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
