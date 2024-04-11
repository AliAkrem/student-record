"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../../utils/supabase/server";

export async function changePassword({
  password,
  confirm,
}: {
  password: string;
  confirm: string;
}) {
  const supabase = createClient();

  if (password === confirm) {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      redirect(`/account?error=${error.message}`);
    }
  } else {
    redirect(`/account?error=password not match`);
  }

  revalidatePath("/", "layout");
  redirect("/account?update=success");
}
