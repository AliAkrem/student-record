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
  Button,
  Flex,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "../table.module.css";
import Link from "next/link";

interface RowData {
  SNo: string;
  shortName: string;
  fullName: string;
  createAt: string;
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
    <Table.Th className={classes.th}>
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

const data: RowData[] = [
  {
    SNo: "ba3b6261-8b62-4500-bf8c-b1245c791baf",
    fullName: "Lead Tactics Designer",
    shortName: "CSS",
    createAt: new Date("2023-11-13T14:52:31.664Z").toLocaleString(),
  },
  {
    SNo: "aef423b3-b4fd-4821-b216-8c3b957e8bf0",
    fullName: "Product Applications Officer",
    shortName: "GB",
    createAt: new Date("2024-02-01T05:27:45.290Z").toLocaleString(),
  },
  {
    SNo: "6b2d07ae-eda1-432a-906e-6222e9acbf7b",
    fullName: "Regional Program Engineer",
    shortName: "SQL",
    createAt: new Date("2023-10-31T01:58:45.752Z").toLocaleString(),
  },
  {
    SNo: "728f2528-cf30-4401-9639-48f147bd5311",
    fullName: "Lead Division Supervisor",
    shortName: "TCP",
    createAt: new Date("2023-06-26T12:31:09.124Z").toLocaleString(),
  },
  {
    SNo: "e0fbe5a5-9a22-4be5-8b18-cfd17fb2fa2a",
    fullName: "Global Applications Planner",
    shortName: "HDD",
    createAt: new Date("2023-07-06T14:19:32.656Z").toLocaleString(),
  },
  {
    SNo: "d655b95a-eaab-4b02-b9da-b2954d71a21d",
    fullName: "Chief Interactions Engineer",
    shortName: "PNG",
    createAt: new Date("2023-06-26T13:51:19.616Z").toLocaleString(),
  },
  {
    SNo: "49b56365-ea80-4168-a046-a8e9b227fe6b",
    fullName: "Senior Paradigm Agent",
    shortName: "SSL",
    createAt: new Date("2023-10-22T02:41:43.026Z").toLocaleString(),
  },
  {
    SNo: "d2708881-f882-441f-80d0-887225063ce0",
    fullName: "Customer Quality Agent",
    shortName: "RSS",
    createAt: new Date("2023-11-08T06:47:51.289Z").toLocaleString(),
  },
  {
    SNo: "1ae4a09e-c44f-47a1-a830-cb479c9a2ed6",
    fullName: "Investor Branding Coordinator",
    shortName: "PCI",
    createAt: new Date("2023-09-15T15:05:27.453Z").toLocaleString(),
  },
  {
    SNo: "372dc8b1-a652-413b-a1b5-aeb626420fb9",
    fullName: "District Communications Officer",
    shortName: "AGP",
    createAt: new Date("2023-05-17T18:18:16.754Z").toLocaleString(),
  },
  {
    SNo: "b99767e0-acd8-454f-8b0a-55a7c9b0c66c",
    fullName: "District Factors Planner",
    shortName: "RAM",
    createAt: new Date("2024-02-04T04:14:25.532Z").toLocaleString(),
  },
  {
    SNo: "3d1f3f1f-5589-4fa7-b548-eed894636105",
    fullName: "Chief Infrastructure Orchestrator",
    shortName: "PCI",
    createAt: new Date("2023-06-25T20:18:12.139Z").toLocaleString(),
  },
];

export function CourseTable() {
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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.SNo}>
      <Table.Td px={"xs"}>
        <Flex gap={"8px"}>
          <Button component={Link} href={`/course/edit?Sno=${row.SNo}`}>
            edit
          </Button>
          <Button color="red">delete</Button>
        </Flex>
      </Table.Td>
      <Table.Td>{row.SNo}</Table.Td>
      <Table.Td>{row.shortName}</Table.Td>
      <Table.Td>{row.fullName}</Table.Td>
      <Table.Td>{row.createAt}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
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
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "SNo"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("SNo")}
            >
              Action
            </Th>
            <Th
              sorted={sortBy === "SNo"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("SNo")}
            >
              SNo
            </Th>
            <Th
              sorted={sortBy === "shortName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("shortName")}
            >
              Short Name
            </Th>
            <Th
              sorted={sortBy === "fullName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("fullName")}
            >
              Full Name
            </Th>
            <Th
              sorted={sortBy === "createAt"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("createAt")}
            >
              Created Date
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
