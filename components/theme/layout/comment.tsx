"use client"
import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

export default function Comment() {
  const { theme } = useTheme()

  return (
    <div className="mt-8">
      <Giscus
        id="comments"
        repo="alteropen-com/alteropen"
        repoId="R_kgDOMVlEcA="
        category="Announcements"
        categoryId="DIC_kwDOMVlEcM4CgxnM"
        mapping="pathname"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="1"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        data-lang="en"
        data-loading="lazy"
        term="Welcome to AlterOpen!"
        loading="lazy"
      />
    </div>
  )
}
