import { SafeMdxRenderer } from "safe-mdx"
import Twitters from "../theme/layout/twitters"
import Test from "./Test"
import DetailYoutube from "./detail-youtube"
import Img from "./img"

const components = {
  Test: (props: any) => <Test {...props} />,
  Img: (props: any) => <Img {...props} />,
  DetailYoutube: (props: any) => <DetailYoutube {...props} />,
  Twitters: (props: any) => <Twitters {...props} />,
  /* Heading({ children }: { children: React.ReactNode }) {
    return <h1>{children}</h1>
  },
  p({ children }: { children: React.ReactNode }) {
    return <p style={{ color: "black" }}>{children}</p>
  },
  blockquote({ children }: { children: React.ReactNode }) {
    return <blockquote style={{ color: "black" }}>{children}</blockquote>
  }, */
}

export function CustomMDXSafe({ code }: { code: string }) {
  //TODO: cannot use rehype-slug because it will break the code
  return <SafeMdxRenderer code={code} components={components} />
}
