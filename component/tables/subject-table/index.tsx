"use client";
import { useEffect, useState, useTransition } from "react";
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
  Badge,
  MantineStyleProps,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import classes from "../table.module.css";

import Link from "next/link";
import { deleteSubject } from "../../../app/(admin)/subject/actions";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { useForceUpdate } from "@mantine/hooks";

type RowData = {
  course_id: number;
  name: string;
  subject: {
    name: string;
    created_at: string;
    subject_id: number;
    updated_at: string;
  }[];
  subjectMetadata?: string;
};

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
  style?: MantineStyleProps;
}

function Th({ style, children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th} {...style}>
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
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
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
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

type Props = {
  data: RowData[];
};

export function SubjectTable({ data }: Props) {
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

  const router = useRouter();

  const forceUpdate = useForceUpdate();

  const [pending, setTransition] = useTransition();

  useEffect(() => {
    if (!pending) setSortedData(data);
  }, [pending]);

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.course_id}>
      <Table.Td>
        <Flex gap={"8px"}>
          <ActionIcon
            variant="transparent"
            component={Link}
            href={`/subject/edit?course_id=${row.course_id}`}
          >
            <IconEdit />
          </ActionIcon>
          {/* <ActionIcon variant="transparent" color="red">
            <IconTrash />
          </ActionIcon> */}
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text truncate="end"> {row.course_id} </Text>{" "}
      </Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        {row.subject.length > 0
          ? row.subject.map((subject) => {
              return (
                <Badge
                  size="lg"
                  leftSection={
                    <ActionIcon

                      variant="light"
                      color="red"
                      radius={'xl'}
                      onClick={() => {
                        modals.openConfirmModal({
                          
                          id: `delete${subject.subject_id}`,
                          title: "Destructive action",

                          centered: true,
                          children: (
                            <Text size="sm">
                              Are you sure you want to Delete this Subject (
                              {subject.name})
                         
                            </Text>
                          ),
                          closeOnConfirm: false,

                          labels: { confirm: "Delete", cancel: "Cancel" },
                          confirmProps: { color: "red"  },
                          onConfirm: async () => {
                            setTransition(async () => {
                              await deleteSubject(subject?.subject_id);
                            });
                            modals.closeAll()

                            

                          },
                        });
                      }}
                    >
                      <IconX
                        color="red"
                        style={{ width: rem(20), height: rem(20) }}
                      />
                    </ActionIcon>
                  }
                  key={subject.subject_id}
                >
                  {subject.name}
                </Badge>
              );
            })
          : null}
      </Table.Td>
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
        <LoadingOverlay visible={pending} ></LoadingOverlay>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "course_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course_id")}
                style={{ w: "15%" }}
              >
                Action
              </Th>
              <Th
                sorted={sortBy === "course_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course_id")}
                style={{ w: "15%" }}
              >
                ID
              </Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style={{ w: "30%" }}
              >
                Course Name
              </Th>
              <Th
                reversed={reverseSortDirection}
                onSort={() => setSorting("subjectMetadata")}
                sorted={sortBy === "subjectMetadata"}
              >
                Subjects
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
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
