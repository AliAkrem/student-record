"use client";

import { ScrollArea, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconUser,
  IconUsersGroup,
  IconCalendarMonth,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { LinksGroup } from "../linkGroups";
import classes from "./navbarnestd.module.css";
import { ColorSchemeButton } from "../colorSchemeButton";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { Header } from "../navbar";
import { modals } from "@mantine/modals";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Course",
    icon: IconNotes,
    link: "/course",
    links: [{ label: "Add course", link: "/course/add" }],
  },
  {
    label: "Subject",
    icon: IconCalendarStats,
    link: "/subject",
    links: [{ label: "Add Subject", link: "/subject/add" }],
  },
  { label: "Register", icon: IconUser, link: "/registration" },
  { label: "Students", icon: IconUsersGroup, link: "/students" },
  { label: "season", icon: IconCalendarMonth, link: "/season" },
  { label: "account", icon: IconSettings, link: "/account" },
];

export function NavbarNested() {
  const supabase = createClient();

  const router = useRouter();

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: "Sign-out",
      centered: true,
      children: <Text size="sm">Are you sure you want to sign-out?</Text>,
      labels: { confirm: "Sign-out", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await supabase.auth.signOut();
        router.refresh();
      },
    });




    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
      getInitialValueInEffect: true,
    });

  return (
    <>
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {links}
            <div onClick={openLogoutModal}>
              <LinksGroup {...{ label: "Logout", icon: IconLogout }} />
            </div>

            <div 
               onClick={() =>
                setColorScheme(computedColorScheme === "light" ? "dark" : "light")
              }
            >
              <LinksGroup {...{ label: "Theme", icon: ColorSchemeButton }} />
            </div>
          </div>
        </ScrollArea>

        <div className={classes.footer}></div>
      </nav>
    </>
  );
}
