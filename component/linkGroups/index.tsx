"use client";

import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
  ActionIcon,
} from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./linkgroup.module.css";
import Link from "next/link";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      fz={"sm"}
      component={Link}
      href={link.link}
      className={classes.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        variant="transparent"
        component={Link}
        href={link ?? "#"}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">
              <Text fz={"sm"}>{label}</Text>
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={true}>{items}</Collapse> : null}
    </>
  );
}

// const mockdata = {
//   label: "Releases",
//   icon: IconCalendarStats,
//   links: [
//     { label: "Upcoming releases", link: "/" },
//     { label: "Previous releases", link: "/" },
//     { label: "Releases schedule", link: "/" },
//   ],
// };

// export function NavbarLinksGroup() {
//   return (
//     <Box mih={220} p="md">
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }
