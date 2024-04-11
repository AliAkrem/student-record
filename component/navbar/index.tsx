"use client";
import {  Group, Burger,  Title, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./navbar.module.css";
import {  ScrollArea } from "@mantine/core";
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
import { ColorSchemeButton } from "../colorSchemeButton";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";






export function Header() {

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Drawer opened={opened} onClose={toggle}>
            <NavbarNested />
          </Drawer>
          <Title order={4}>Student Management System</Title>
        </Group>
      </div>
    </header>
  );
}




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
    <nav >
      <div className={classes.header}>
        <Group justify="space-between">
          <ColorSchemeButton />
        </Group>
      </div>

      <ScrollArea >
        <div >
          {links}
          <div onClick={() => {supabase.auth.signOut(); router.replace('/login') } }>
            <LinksGroup {...{ label: "Logout", icon: IconLogout }} />
          </div>
        </div>
      </ScrollArea>

    </nav>
  );
}
