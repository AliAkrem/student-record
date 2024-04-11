"use client";

import { Group, ScrollArea } from "@mantine/core";
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

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Course",
    icon: IconNotes,
    link: "/course",
    links: [
      { label: "Add course", link: "/course/add" },
    ],
  },
  {
    label: "Subject",
    icon: IconCalendarStats,
    link: "/subject",
    links: [{ label: "Add Subject", link: "/subject/add" }],
  },
  { label: "Register", icon: IconUser, link : '/registration' },
  { label: "Students", icon: IconUsersGroup , link : '/students'},
  { label: "season", icon: IconCalendarMonth, link : '/season' },
  { label: "account", icon: IconSettings , link : '/account' },
];


export function NavbarNested() {
  const supabase = createClient();

  const router =  useRouter()

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <ColorSchemeButton />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {links}
          <div onClick={() => {supabase.auth.signOut(); router.replace('/login') } }>
            <LinksGroup {...{ label: "Logout", icon: IconLogout }} />
          </div>
        </div>
      </ScrollArea>

      <div className={classes.footer}></div>
    </nav>
  );
}
