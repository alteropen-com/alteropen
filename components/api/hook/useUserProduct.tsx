"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useUserProduct() {
  return useQuery({
    queryKey: ["user_product"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      const { data: user } = await supabase.auth.getSession();

      if (user.session?.user) {
        const { data } = await supabase
          .from("user_product")
          .select("*")
          .eq("profile_id", user.session.user.id);

        return data;
      }
      return [];
    },
  });
}
