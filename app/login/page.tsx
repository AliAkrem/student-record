import React from "react";
import { LoginCard } from "../../component/loginCard";
import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "../../component/navbar";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function LoginPage({ searchParams }: Props) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      {searchParams.error ? (
        <Alert color="red" icon={<IconAlertTriangle />}>
          {searchParams.error}
        </Alert>
      ) : null}

      <Header/>
      <LoginCard />
    </>
  );
}
