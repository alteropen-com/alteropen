// pages/index.tsx
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
