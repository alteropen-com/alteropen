"use client"

import useSearch from "@/components/api/hook/useSearch"
import { Input } from "@/components/ui/input"
import FlexSearch from "flexsearch"
import { useEffect, useRef, useState } from "react"

interface SearchResult {
  name: string
  slug: string
}

const ResultsOverlay = ({
  foundItems,
  inputValue,
  highlightedIndex,
  onMouseOver,
  onItemClick,
}: {
  foundItems: SearchResult[]
  inputValue: string
  highlightedIndex: number
  onMouseOver: () => void
  onItemClick: (index: number) => void
}) => {
  const highlightMatch = (name: string, query: string) => {
    const parts = name.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) => (
      <span
        key={i}
        className={`${
          part.toLowerCase() === query.toLowerCase()
            ? "bg-accent font-bold"
            : ""
        }`}
      >
        {part}
      </span>
    ))
  }

  return (
    <div
      className="absolute bg-background border border-gray-200 shadow-lg mt-2 rounded-lg w-[calc(100vw-40px)] sm:w-[480px] top-[17px] z-10"
      onMouseOver={onMouseOver}
    >
      {foundItems.map((item, i) => (
        <a
          key={i}
          href={item.slug}
          className={`block px-4 py-2 hover:bg-secondary/80 ${
            highlightedIndex === i ? "bg-muted hover:bg-accent" : ""
          }`}
          onClick={() => onItemClick(i)}
        >
          {highlightMatch(item.name, inputValue)}
        </a>
      ))}
      {inputValue.length > 0 && foundItems.length === 0 && (
        <div className="px-4 py-2">No results found</div>
      )}
    </div>
  )
}

export default function UserSearch() {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [searchIndex, setSearchIndex] = useState<null | FlexSearch.Index>(null)
  const [foundItems, setFoundItems] = useState<SearchResult[]>([])
  const [inputValue, setInputValue] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { isFetching, data: data } = useSearch(shouldFetch)

  useEffect(() => {
    const index = new FlexSearch.Index({
      preset: "match",
      tokenize: "full",
    })
    setSearchIndex(index)

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", down)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", down)
    }
  }, [])

  useEffect(() => {
    if (!data || !searchIndex) {
      return
    }
    data.forEach(({ name }, i) => {
      searchIndex.add(i, name.toLowerCase())
    })
  }, [data, searchIndex])

  const startAutocomplete = () => {
    if (!shouldFetch) setShouldFetch(true)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (searchIndex && value.trim()) {
      const results = searchIndex.search(value.toLowerCase())
      const foundItems = results.map((index) => data![+index]) as SearchResult[]
      setFoundItems(foundItems.slice(0, 10))
      setHighlightedIndex(foundItems.length > 0 ? 0 : -1) // Automatically highlight the first result
    } else {
      setFoundItems([])
      setHighlightedIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const cursorPosition = input.selectionStart

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, foundItems.length - 1)
      )
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition)
      }, 0)
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition)
      }, 0)
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        window.location.href = foundItems[highlightedIndex].slug
      }
    } else if (e.key === "Escape") {
      setInputValue("")
      setFoundItems([])
      inputRef.current?.blur()
    }
  }

  if (isFetching) {
    return <p>Loading...</p>
  }

  return (
    <div className="relative w-full sm:max-w-[480px]" ref={containerRef}>
      <Input
        className={`z-10 max-w-[480px] ${
          isFocused ? "absolute w-[calc(100vw-40px)] top-[-18px] left-0" : ""
        }`}
        type="search"
        name="q"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          startAutocomplete()
          setIsFocused(true)
        }}
        // onBlur={() => setIsFocused(false)}
        onMouseOver={startAutocomplete}
        placeholder="Search..."
        value={inputValue}
        autoComplete="off"
        ref={inputRef}
      />
      {!isFocused && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden sm:block">
          <p className="text-sm text-muted-foreground">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
      )}
      {isFocused && (
        <ResultsOverlay
          foundItems={foundItems}
          inputValue={inputValue}
          highlightedIndex={highlightedIndex}
          onMouseOver={() => setHighlightedIndex(-1)}
          onItemClick={(index) => setHighlightedIndex(index)}
        />
      )}
    </div>
  )
}
