/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Refund",
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function Page() {
  return (
    <div className="prose container my-4">
      <h1>Refund Policy</h1>
      <p>Last updated: July 31, 2024</p>
      <p>
        You can get a full refund within 14 days of your purchase for most
        products. Check the Deal Terms on the product detail page to see if a
        product is eligible for a refund or have more refund time. Some items,
        like digital downloads, are not refundable.
      </p>
      <p>
        Make sure to start using your purchase right away to decide if it fits
        your needs before the refund period ends. Once the 60-day window is
        over, refunds are not possible. Unredeemed or unused items cannot be
        refunded after this period.
      </p>
      <p>
        Refer to our <a href="/terms">Terms</a> for more details. Note that
        AlterOpen may suspend accounts if there are excessive refund requests.
      </p>
    </div>
  )
}
