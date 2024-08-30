import React, { ReactNode } from "react";
import { Header } from "../../component/navbar";

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import PageTitle from "../../component/pageTitle";



import AppShellLayout from "../../component/AppShellLayout";
import { AppShellMain } from "@mantine/core";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <AppShellLayout>
       
        <AppShellMain>
          <PageTitle />
          {children}
        </AppShellMain>
      </AppShellLayout>
    </>
  );
}
