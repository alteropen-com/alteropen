"use client"

import { useEffect } from "react"

const GoogleCSE = () => {
  useEffect(() => {
    const injectCSS = () => {
      const style = document.createElement("style")
      style.innerHTML = `
        .gsc-adBlock {
          display: none;
        }
      `
      document.head.appendChild(style)
    }

    // Check if the CSE script is already loaded
    const cseScript = document.querySelector(
      'script[src="https://cse.google.com/cse.js?cx=10302812493ac43c8"]'
    )
    if (cseScript) {
      cseScript.addEventListener("load", injectCSS)
    } else {
      const script = document.createElement("script")
      script.src = "https://cse.google.com/cse.js?cx=10302812493ac43c8"
      script.async = true
      script.onload = injectCSS
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-[70px]">
      <div className="gcse-search"></div>
    </div>
  )
}

export default GoogleCSE
