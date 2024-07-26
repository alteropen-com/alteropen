"use client"

import { type DialogProps } from "@radix-ui/react-dialog"
import { useTheme } from "next-themes"
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
  CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { AppWindow, LaptopIcon, MoonIcon, SunIcon } from "lucide-react"

type Item = {
  name: string
  slug: string
}

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
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
        <CommandInput placeholder="Search..." />
        <CommandList className="max-h-[calc(100vh-300px)]">
          <CommandEmpty>No results found.</CommandEmpty>
          {isFetching && (
            <CommandItem>
              <span className="px-2">Loading...</span>
            </CommandItem>
          )}
          {data && (
            <ItemView
              data={data}
              textHeading="Apps"
              slugUrl="app/"
              runCommand={runCommand}
            />
          )}
          {data && (
            <ItemView
              data={data}
              textHeading="Alternatives"
              slugUrl="alternative/"
              runCommand={runCommand}
            />
          )}
          {data && (
            <ItemView
              data={data}
              textHeading="Tasks"
              slugUrl="tasks/"
              runCommand={runCommand}
            />
          )}

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

const ItemView = ({
  data,
  textHeading,
  slugUrl,
  runCommand,
}: {
  data: Item[]
  textHeading: string
  slugUrl: string
  runCommand: (command: () => unknown) => void
}) => {
  const router = useRouter()

  const matchItem = data.filter((item) => item.slug.includes(slugUrl))

  if (matchItem.length === 0) {
    return null
  }

  return (
    <CommandGroup heading={textHeading}>
      {matchItem
        .map((item) => (
          <CommandItem
            key={item.slug}
            value={item.name}
            onSelect={() => {
              runCommand(() => router.push(item.slug))
            }}
          >
            <AppWindow className="mr-2 h-4 w-4" />
            {item.name}
          </CommandItem>
        ))
        .slice(0, 30)}
    </CommandGroup>
  )
}
