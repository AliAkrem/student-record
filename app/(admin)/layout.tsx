import React, { ReactNode } from "react";
import { Header } from "../../component/navbar";
import { Container, Divider, Flex, Title } from "@mantine/core";
import { NavbarNested } from "../../component/sidbar";
import { createClient } from "../../utils/supabase/server";
import { redirect, usePathname } from "next/navigation";
import PageTitle from "../../component/pageTitle";

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
      <Header />
      <Flex  >
        <NavbarNested />
          <Container w={"100%"} >
            <div style={{ marginTop: "40px" }}>
              <PageTitle />
              <Divider></Divider>
              {children}
            </div>
          </Container>
      </Flex>
    </>
  );
}
