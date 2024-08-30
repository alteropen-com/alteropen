"use client"
import Script from "next/script"

export function SubmitForm() {
  return (
    <div>
      <iframe
        data-tally-src="https://tally.so/embed/n9OeGK?hideTitle=1&transparentBackground=1"
        loading="lazy"
        width="100%"
        height="269"
      ></iframe>

      <Script
        src="https://tally.so/widgets/embed.js"
        // @ts-ignore
        onLoad={() => Tally.loadEmbeds()}
      />
    </div>
  )
}

export function SubmitVbout() {
  return (
    <>
      <Script
        src="https://www.vbt.io/ext/vbtforms.js?lang=en"
        strategy="afterInteractive"
      />
      <div id="vbtEFWrapper-142525">
        <div
          className="vboutEmbedFormBox"
          id="vboutEmbedFormBox-142525"
          data-vbtfc="cba4cfc08f7b1859f6d5f745cbd411c3"
        ></div>
      </div>
    </>
  )
}
