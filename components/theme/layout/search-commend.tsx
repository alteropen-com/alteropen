"use client"

import { type DialogProps } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import * as React from "react"

import useSearch from "@/components/api/hook/useSearch"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

type Item = {
  name: string
  slug: string
}

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false)
  const [shouldFetch, setShouldFetch] = React.useState(false)

  const { isFetching, data: data } = useSearch(shouldFetch)

  React.useEffect(() => {
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
        setOpen((open) => !open)
        setShouldFetch(true)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const startAutocomplete = () => {
    if (!shouldFetch) setShouldFetch(true)
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
          setOpen(true)
        }}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search alternative...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." className="text-[18px]" />
        <CommandList className="max-h-[calc(100vh-300px)]">
          <CommandEmpty>No results found.</CommandEmpty>
          {isFetching && (
            <CommandItem>
              <span className="px-2">Loading...</span>
            </CommandItem>
          )}
          <ItemView
            data={data}
            type="Tasks"
            slugUrl="/tasks/"
            runCommand={runCommand}
          />
          <ItemView
            data={data}
            type="Apps"
            slugUrl="/app/"
            runCommand={runCommand}
          />

          <ItemView
            data={data}
            type="Alternatives"
            slugUrl="/alternative/"
            runCommand={runCommand}
          />
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
  data: Item[] | undefined
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
