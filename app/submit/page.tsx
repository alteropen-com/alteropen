import { Button } from "@/components/ui/button"
import { SubmitVbout } from "@/components/ui/form"
import Link from "next/link"

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mt-10 mb-2">Submit Tool</h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        Submit Your Alternative Tool, Get Recommended
      </p>

      <div>
        <SubmitVbout />
      </div>

      <div className="mt-10 text-center">
        <p className="mb-4 text-lg">Add the code to your homepage.</p>
        <code className="bg-gray-100 p-2 rounded-md block mb-4">
          {
            '<a href="https://alteropen.com/" title="Alternative Open Directory">AlterOpen</a>'
          }
        </code>
        <p className="mb-2 text-lg">
          Your submission will be approved{" "}
          <span className="font-bold">Automatically for Free</span>
        </p>
        <p className="my-2">Or</p>
        <p className="mt-2 text-xl">
          Try the{" "}
          <Button variant="link" className="p-0 text-xl " asChild>
            <Link
              href="https://alteropen.lemonsqueezy.com/buy/94b8b283-addd-4392-8d2d-42fb9576cae3"
              className="no-underline"
            >
              Submit Pack
            </Link>
          </Button>
        </p>
      </div>
    </div>
  )
}