// import { posts } from "#site/content"
// import { CustomMDX } from "@/components/mdx/MdxRemote"

export default async function RemoteMdxPage() {
  return (
    <div>
      Impact-Site-Verification: 763281bb-1ea1-4c9c-bf30-a7c04175e90f
      {/* {posts.map((post, i) => (
        <div key={i}>
          <h1 className="text-3xl my-5">{post.title}</h1>
          <CustomMDX
            source={post.content} // Use the pre-defined markdown string
          />
          <hr />
        </div>
      ))} */}
    </div>
  )
}
