import QueryProvider from "@/components/api/query-provider"
import { SiteHeader } from "@/components/theme/layout/site-header"
import { ThemeProvider } from "@/components/theme/layout/theme-providers"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

export const runtime = "edge"
export const dynamicParams = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-MBRT9HS3" />
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
