import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform()
}

const isDev = process.argv.indexOf("dev") !== -1
const isBuild = process.argv.indexOf("build") !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1"
  const { build } = await import("velite")
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/tasks/all",
        permanent: false,
      },
      {
        source: "/tasks",
        destination: "/tasks/all",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/tasks/all",
        permanent: false,
      },
      {
        source: "/alternative",
        destination: "/alternative/all",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
