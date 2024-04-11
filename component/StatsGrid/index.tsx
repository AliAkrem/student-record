import {
  ActionIcon,
  Anchor,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconFile,
  IconFiles,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";

const icons = {
  file: IconFile,
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
  files: IconFiles,
  users: IconUsersGroup,
  planet: IconWorld,
};

const data = [
  {
    title: "Listed Courses",
    icon: "file",
    value: "13,456",
    goto: "/",
    redirectMessage: "view details",
  },
  {
    title: "Subjects",
    icon: "files",
    value: "4,145",
    goto: "/",
    redirectMessage: "view details",
  },
  {
    title: "Total Students",
    icon: "users",
    value: "745",
    goto: "/",
    redirectMessage: "view details",
  },
  { title: "Listed Countries", icon: "planet", value: "188" },
  { title: "Listed States", icon: "file", value: "13,456" },
  { title: "Listed Cities", icon: "file", value: "13,456" },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="start">
          <Icon className={classes.icon} size="2rem" stroke={1.5} />
          <Text size="md" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>

        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>

        {"goto" in stat && (
          <>
            <Divider my={"xs"}></Divider>
            <Anchor fz="xs" c="dimmed">
              <Group align="center" gap="xs">
                {stat.redirectMessage}

                <ActionIcon size="1.4rem" variant="light">
                  <IconArrowUpRight size="1rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </Anchor>
          </>
        )}
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base : 1 ,  xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
