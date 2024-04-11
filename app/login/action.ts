"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const data = {
    email: email as string,
    password: password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
