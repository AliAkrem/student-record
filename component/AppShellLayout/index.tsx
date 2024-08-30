"use client";
import { AppShell, AppShellNavbar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { ReactNode } from "react";
import { Header } from "../navbar";
import { NavbarNested } from "../sidbar";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: { base: 60, lg: 70 } }}
        navbar={{
          width: { base: 200, md: 250, lg: 270 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <>
          <Header opened={opened} toggle={toggle} />
          <AppShellNavbar>
            <NavbarNested toggle={toggle} />
          </AppShellNavbar>

          {children}
        </>
      </AppShell>
    </>
  );
}
