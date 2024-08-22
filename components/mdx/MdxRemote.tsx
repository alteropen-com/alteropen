"use client"

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import { Suspense } from "react"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import Twitters from "../theme/layout/twitters"
import Test from "./Test"
import DetailYoutube from "./detail-youtube"
import Img from "./img"

interface CustomMDXProps extends MDXRemoteProps {
  components?: any
}

const components = {
  Test: (props: any) => <Test {...props} />,
  a: (props: any) => {
    return (
      <a {...props} rel="nofollow" className="text-primary">
        {props.children}
      </a>
    )
  },
  Img: (props: any) => <Img {...props} />,
  DetailYoutube: (props: any) => <DetailYoutube {...props} />,
  Twitters: (props: any) => <Twitters {...props} />,
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["subheading-anchor"],
                    ariaLabel: "Link to section",
                  },
                },
              ],
            ],
            remarkPlugins: [],
            format: "mdx",
          },
        }}
      />
    </Suspense>
  )
}
