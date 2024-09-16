import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SubmitVbout } from "@/components/ui/form"
import Link from "next/link"

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mt-10 mb-2">Submit Tool</h1>
      <p className="text-xl text-center text-gray-600 mt-5">
        Submit Your Tool, Get Recommended
      </p>
      <div className="flex justify-center items-center">
        <Badge className="scale-[125%] mt-2">DR:39</Badge>
      </div>
      <div className="mt-8 text-center">
        <p className="mt-2 text-xl">
          Try the{" "}
          <Button variant="link" className="p-0 text-xl " asChild>
            <Link href="/submit/pack" className="no-underline">
              Submit Pack
            </Link>
          </Button>
        </p>
        <p className="mt-5 my-2">Or</p>
      </div>
      <div className="mt-8 text-center">
        <p className="mb-4 text-lg">Add the code to your homepage.</p>
        <code className="bg-foreground/10 p-2 rounded-md block mb-4">
          {
            '<a href="https://alteropen.com/" title="Alternative Open Directory">AlterOpen</a>'
          }
        </code>
        <p className="mb-2 text-lg">
          Your submission will be approved{" "}
          <span className="font-bold">Automatically for Free</span>
        </p>
        <div className="min-h-[450px]">
          <SubmitVbout />
        </div>
      </div>
    </div>
  )
}
