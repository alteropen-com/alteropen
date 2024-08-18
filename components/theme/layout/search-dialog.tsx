"use client"

import useSearch from "@/components/api/hook/useSearch"
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { cn, formatNumber } from "@/lib/utils"
import { Command as CommandIcon, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useCallback, useEffect, useState } from "react"

type SearchResult = {
  id: number
  name: string
  slug: string
  visit: number
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <SearchTrigger setOpen={setOpen} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <SearchForm isOpen={open} setOpen={setOpen} />
      </CommandDialog>
    </>
  )
}

function SearchTrigger({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <button
      className={cn(
        "group",
        "flex-grow md:w-80 lg:w-120 h-[40px] rounded-md",
        "pl-1.5 md:pl-2 pr-1",
        "flex items-center justify-between",
        "bg-background",
        // "bg-surface-100/75 text-foreground-lighter border",
        "hover:bg-opacity-100 hover:border-strong",
        "focus-visible:!outline-4 focus-visible:outline-offset-1 focus-visible:outline-brand-600",
        "transition"
      )}
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center space-x-2 text-foreground-muted">
        <Search size={18} strokeWidth={2} />
        <p className="flex text-sm pr-2 truncate">Search with AI...</p>
      </div>
      <div className="hidden md:flex items-center space-x-1">
        <div
          aria-hidden="true"
          className="md:flex items-center justify-center h-full px-1 border rounded bg-surface-300 gap-0.5"
        >
          <CommandIcon size={12} strokeWidth={1.5} />
          <span className="text-[12px]">K</span>
        </div>
      </div>
    </button>
  )
}

function SearchForm({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const [shouldFetch, setShouldFetch] = useState(false)
  const { isFetching, data: data } = useSearch(shouldFetch)

  const [inputValue, setInputValue] = useState("")
  const [foundItems, setFoundItems] = useState<SearchResult[]>([])

  useEffect(() => {
    if (isOpen) {
      setShouldFetch(true)
    }
  }, [isOpen])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInputValue(value)
    if (data && value) {
      const foundItems = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      ) as SearchResult[]
      setFoundItems(foundItems.slice(0, 100))
    } else {
      setFoundItems([])
    }
  }

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <div className="flex flex-col p-0 sm:max-w-[525px] lg:max-w-[700px] h-[86dvh] sm:h-[68dvh]">
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          className="flex my-2 h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-[18px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          type="text"
          autoFocus
          name="q"
          onChange={handleOnChange}
          placeholder="Search with AI..."
          value={inputValue}
          autoComplete="off"
        />
      </div>
      <CommandList className="max-h-[calc(86dvh-68px)] sm:max-h-[calc(68vh-68px)]">
        {isFetching && (
          <CommandItem key="loading">
            <span className="px-2">Loading...</span>
          </CommandItem>
        )}
        {inputValue.length > 0 && foundItems.length === 0 && (
          <CommandItem key="no-results">
            <span className="px-4">No results found</span>
          </CommandItem>
        )}

        {inputValue.length > 0 && foundItems.length > 0 && (
          <>
            <ItemView
              data={foundItems}
              type="Alternatives"
              slugUrl="/alternative/"
              runCommand={runCommand}
            />
            <ItemView
              data={foundItems}
              type="Tasks"
              slugUrl="/tasks/"
              runCommand={runCommand}
            />
          </>
        )}

        {inputValue.length === 0 && (
          <ItemView
            data={data}
            type="Tasks"
            slugUrl="/tasks/"
            runCommand={runCommand}
          />
        )}
      </CommandList>
    </div>
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
    <CommandGroup key={type} heading={type}>
      {matchItem.map((item) => (
        <CommandItem
          key={item.id}
          value={item.name}
          onSelect={() => {
            runCommand(() => router.push(item.slug))
          }}
        >
          {icon} {item.name}{" "}
          {item.visit > 0 && (
            <span className="ml-auto text-xs text-muted-foreground">
              {formatNumber(item.visit)}
            </span>
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
