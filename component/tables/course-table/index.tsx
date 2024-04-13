"use client";
import { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Flex,
  ActionIcon,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import classes from "../table.module.css";
import Link from "next/link";
import { modals } from "@mantine/modals";
import { deleteCourse } from "../../../app/(admin)/course/action";

interface RowData {
  course_id: string;
  name: string;
  abv_name: string;
  created_at: string;
  updated_at: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th
      style={children === "Action" || children === "ID" ? { width: "12%" } : {}}
      className={classes.th}
    >
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

// const data: RowData[] = [
//   {
//     course_id: String(2),
//     name: "Bachelor of Technology",
//     abv_name: "B.Tech",
//     created_at: "2024-04-13T15:30:00.164368+00:00",
//     updated_at: "2024-04-13T15:30:00.164368+00:00",
//   },
// ];

type Props = {
  data: RowData[];
};

export function CourseTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const openLogoutModal = (courseId: number) =>
    modals.openConfirmModal({
      title: "Destructive action",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this course?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // await supabase.auth.signOut();
        deleteCourse(courseId);
        // router.refresh();
      },
    });

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.course_id}>
      <Table.Td>
        <Flex gap={"16px"}>
          <ActionIcon
            variant="transparent"
            component={Link}
            href={`/course/edit?course_id=${row.course_id}`}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => openLogoutModal(Number(row.course_id))}
            color="red"
          >
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
      <Table.Td>{row.course_id}</Table.Td>
      <Table.Td>{row.abv_name}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.created_at}</Table.Td>
      <Table.Td>{row.updated_at}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={1000}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "course_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course_id")}
              >
                Action
              </Th>
              <Th
                sorted={sortBy === "course_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course_id")}
              >
                ID
              </Th>
              <Th
                sorted={sortBy === "abv_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("abv_name")}
              >
                Abbreviation
              </Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "created_at"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("created_at")}
              >
                Created At
              </Th>
              <Th
                sorted={sortBy === "updated_at"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("updated_at")}
              >
                Updated At
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
