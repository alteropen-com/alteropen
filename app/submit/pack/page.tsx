import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PricePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mt-10">
        Submit and
        <br className="sm:hidden" /> Get Traffic!
      </h1>
      <Card className="my-4 border-primary max-w-lg mx-auto">
        <CardHeader className="flex flex-col items-center">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            POPULAR
          </span>
          <CardTitle className="text-2xl font-bold mt-2">Submit Pack</CardTitle>
          <CardDescription className="text-gray-600">
            Submit without backlink!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-4">
            <ul className="text-gray-600 mb-6 flex flex-col space-y-2 items-center">
              <li className="text-4xl font-bold text-blue-600">$8.90</li>
              <li className="text-gray-500">$18.90 for the next batch</li>
              <li className="text-gray-500">$28.90 for the next batch</li>
              <li className="text-gray-500">$38.90 for the next batch</li>
            </ul>
          </div>
          <ul className="text-gray-600 mb-6 flex flex-col space-y-2 items-start">
            <li className="flex items-center justify-center">
              <CheckCircle className="text-blue-500 mr-2" />
              Review in 24 hours
            </li>
            <li className="flex items-center justify-center">
              <CheckCircle className="text-blue-500 mr-2" />
              Free update in 7 days
            </li>
            <li className="flex items-center justify-center">
              <CheckCircle className="text-blue-500 mr-2" />
              Listing on website forever
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="default" className="w-full py-3" asChild>
            <Link
              href="https://alteropen.lemonsqueezy.com/buy/94b8b283-addd-4392-8d2d-42fb9576cae3"
              className="no-underline"
            >
              Get Submit Pack
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
