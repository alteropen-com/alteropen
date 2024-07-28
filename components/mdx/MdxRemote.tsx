"use client"

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import { Tweet } from "react-tweet"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import Test from "./Test"
import DetailYoutube from "./detail-youtube"
import Img from "./img"

interface CustomMDXProps extends MDXRemoteProps {
  components?: any
}

const components = {
  Test: (props: any) => <Test {...props} />,
  Img: (props: any) => <Img {...props} />,
  DetailYoutube: (props: any) => <DetailYoutube {...props} />,
  Tweet: (props: any) => <Tweet {...props} />,
}

export function CustomMDX(props: CustomMDXProps) {
  return (
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
  )
}
