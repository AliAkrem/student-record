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

interface RowData {
  Sno: string;
  course: string;
  subject1: string;
  subject2: string;
  subject3: string;
  subject4: string;
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
    Sno: "03af84c9-ee83-4d94-a41f-0da9036d36b0",
    course: "Dynamic Creative Administrator",
    subject1: "Senior Implementation Planner",
    subject2: "Lead Brand Strategist",
    subject4: "Customer Operations Facilitator",
    subject3: "District Quality Orchestrator",
  },
  {
    Sno: "6b435233-1569-4dde-bf3e-86a077020e6e",
    course: "Senior Program Manager",
    subject1: "Direct Solutions Producer",
    subject2: "Senior Creative Administrator",
    subject4: "Future Integration Architect",
    subject3: "Dynamic Integration Analyst",
  },
  {
    Sno: "746db32a-3ede-444a-91cd-9a1f232b81b5",
    course: "Product Factors Administrator",
    subject1: "Customer Tactics Officer",
    subject2: "Senior Brand Producer",
    subject4: "Lead Metrics Director",
    subject3: "Future Accountability Administrator",
  },
  {
    Sno: "c81584cf-c3d8-4fcd-98ce-8acc9be9ba54",
    course: "Dynamic Communications Designer",
    subject1: "Lead Infrastructure Consultant",
    subject2: "Senior Research Engineer",
    subject4: "National Solutions Consultant",
    subject3: "Corporate Operations Orchestrator",
  },
  {
    Sno: "3197cb4b-b53c-4110-944d-88ae43e13486",
    course: "Principal Optimization Facilitator",
    subject1: "Corporate Brand Planner",
    subject2: "Forward Solutions Representative",
    subject4: "Global Quality Producer",
    subject3: "Central Intranet Assistant",
  },
  {
    Sno: "371377f1-032a-40fd-a50c-0280129fc9bd",
    course: "Principal Security Administrator",
    subject1: "Customer Branding Administrator",
    subject2: "Dynamic Group Specialist",
    subject4: "National Integration Supervisor",
    subject3: "Dynamic Identity Officer",
  },
  {
    Sno: "ce0af8eb-bf16-4b3c-992c-293e5e31d1ed",
    course: "Product Marketing Specialist",
    subject1: "District Factors Representative",
    subject2: "Central Response Representative",
    subject4: "Product Program Technician",
    subject3: "Human Identity Strategist",
  },
  {
    Sno: "35086055-e717-4635-bd77-7cdb786284d2",
    course: "Senior Optimization Agent",
    subject1: "Corporate Factors Technician",
    subject2: "Senior Markets Planner",
    subject4: "Lead Creative Associate",
    subject3: "Investor Solutions Orchestrator",
  },
  {
    Sno: "a9827cb2-c06f-4b89-b0b3-071491afa758",
    course: "Corporate Infrastructure Producer",
    subject1: "Customer Factors Planner",
    subject2: "Product Infrastructure Agent",
    subject4: "Forward Markets Supervisor",
    subject3: "Product Response Producer",
  },
  {
    Sno: "a9a0855b-ad05-4e6c-94a6-1d639c185885",
    course: "Legacy Intranet Specialist",
    subject1: "Global Solutions Liaison",
    subject2: "Lead Brand Liaison",
    subject4: "Internal Operations Supervisor",
    subject3: "Legacy Intranet Strategist",
  },
  {
    Sno: "8146adb3-053c-4aef-b13f-114aa1e79061",
    course: "Direct Response Executive",
    subject1: "Principal Accounts Administrator",
    subject2: "Regional Paradigm Officer",
    subject4: "Human Infrastructure Supervisor",
    subject3: "Future Security Analyst",
  },
  {
    Sno: "3b610acb-fcff-455b-ab2a-919e809ff173",
    course: "Corporate Mobility Developer",
    subject1: "National Data Technician",
    subject2: "Senior Security Executive",
    subject4: "Regional Assurance Assistant",
    subject3: "Regional Markets Strategist",
  },
];

export function SubjectTable() {
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
    <Table.Tr key={row.Sno}>
      <Table.Td>
        <Flex gap={"8px"}>
          <ActionIcon
            variant="transparent"
            component={Link}
            href={`/subject/edit?Sno=${row.Sno}`}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="transparent" color="red">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
      <Table.Td>
        {" "}
        <Text truncate="end"> {row.Sno} </Text>{" "}
      </Table.Td>
      <Table.Td>{row.course}</Table.Td>
      <Table.Td>{row.subject1}</Table.Td>
      <Table.Td>{row.subject2}</Table.Td>
      <Table.Td>{row.subject3}</Table.Td>
      <Table.Td>{row.subject4}</Table.Td>
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
          miw={1300}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "Sno"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("Sno")}
              >
                Action
              </Th>
              <Th
                sorted={sortBy === "Sno"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("Sno")}
              >
                SNo
              </Th>
              <Th
                sorted={sortBy === "course"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course")}
              >
                Course
              </Th>
              <Th
                sorted={sortBy === "subject1"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subject1")}
              >
                Subject 1
              </Th>
              <Th
                sorted={sortBy === "subject2"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subject2")}
              >
                Subject 2
              </Th>
              <Th
                sorted={sortBy === "subject3"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subject4")}
              >
                Subject 3
              </Th>
              <Th
                sorted={sortBy === "subject4"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subject4")}
              >
                Subject 4
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
    </>
  );
}
