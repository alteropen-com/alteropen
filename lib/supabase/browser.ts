import { Database } from "@/lib/types/supabase"
import { createBrowserClient } from "@supabase/ssr"

export function supabaseBrowser() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
      "https://yjogdfbbxgfdhtvjfujz.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqb2dkZmJieGdmZGh0dmpmdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNzI4MTksImV4cCI6MjAzMDY0ODgxOX0.CO5kfF6Df4rMHpK8HKw9fRAUKngqQwEqCRR685kz_JI"
  )
}
