import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
}
