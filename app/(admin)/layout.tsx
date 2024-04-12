import React, { ReactNode } from "react";
import { Header } from "../../component/navbar";
import { Container,  Flex,  } from "@mantine/core";
import { NavbarNested } from "../../component/sidbar";
import { createClient } from "../../utils/supabase/server";
import { redirect, usePathname } from "next/navigation";
import PageTitle from "../../component/pageTitle";

import classes from "./layout.module.css";

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
      <div
        style={{
          zIndex : 'calc(var(--mantine-z-index-max) + 1)',
          position: "sticky",
          top: 0,
          backgroundColor : 'var(--mantine-color-default)'
        }}
      >
        <Header />
      </div>

      <Flex w={"100%"} justify={"space-between"}  >
        <div className={classes.sidbar}>
          <NavbarNested />
          
        </div>

        <Container fluid className={classes.pages}>
          <div style={{ marginTop: "40px" }}>
            <PageTitle />
            {children}
          </div>
        </Container>
      </Flex>
    </>
  );
}
