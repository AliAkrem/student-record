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
  ActionIcon,
  Tooltip,
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
  regNo: string;
  name: string;
  email: string;
  mobNO: string;
  course: string;
  subject: string;
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
    Sno: "7b72dd4b-0efc-4f51-a88b-3bae3db1f9f3",
    regNo: "79843",
    name: "Adele",
    email: "Aliyah_Franecki@yahoo.com",
    mobNO: "1-373-514-9381 x84837",
    course: "Senior Data Supervisor",
    subject: "National Identity Associate",
  },
  {
    Sno: "d03afe1c-a184-4755-9e3e-68f8746bce8f",
    regNo: "58557",
    name: "Lavada",
    email: "Tate23@yahoo.com",
    mobNO: "904-231-8572 x54570",
    course: "Principal Marketing Supervisor",
    subject: "Internal Applications Engineer",
  },
  {
    Sno: "116cf988-0435-4871-a08a-86bbf96d35df",
    regNo: "84905",
    name: "Sabryna",
    email: "Sandra46@gmail.com",
    mobNO: "(725) 566-4301 x6248",
    course: "Dynamic Metrics Liaison",
    subject: "Investor Optimization Orchestrator",
  },
  {
    Sno: "de20ce2d-3151-4b2d-861b-eb3971db49e4",
    regNo: "22622",
    name: "Amparo",
    email: "Kiana61@yahoo.com",
    mobNO: "324.582.0394 x0845",
    course: "Legacy Tactics Manager",
    subject: "Human Operations Executive",
  },
  {
    Sno: "3cc7ef2e-2522-43ff-b243-238f095f067b",
    regNo: "72840",
    name: "Clay",
    email: "Evan39@hotmail.com",
    mobNO: "560-999-7683",
    course: "Legacy Configuration Architect",
    subject: "Principal Directives Representative",
  },
  {
    Sno: "a3396778-50e1-41e4-ac72-40a95d6a9360",
    regNo: "77448",
    name: "Sister",
    email: "Marina_Ferry@hotmail.com",
    mobNO: "779.378.9942",
    course: "International Mobility Assistant",
    subject: "Investor Web Specialist",
  },
  {
    Sno: "13c5a896-030f-4a85-8b32-1367773ca7fb",
    regNo: "24746",
    name: "Sean",
    email: "Hayden_Hagenes84@gmail.com",
    mobNO: "544-524-1536",
    course: "Human Directives Facilitator",
    subject: "Customer Functionality Strategist",
  },
  {
    Sno: "24592aa1-a41a-4f75-836f-0ae845065715",
    regNo: "95672",
    name: "Cecilia",
    email: "Raymundo94@hotmail.com",
    mobNO: "1-237-467-2322",
    course: "Global Security Specialist",
    subject: "Lead Marketing Facilitator",
  },
  {
    Sno: "331daaae-b154-4610-8364-5e32f2ce9fef",
    regNo: "61978",
    name: "Brielle",
    email: "Rashad55@yahoo.com",
    mobNO: "(476) 543-7725 x529",
    course: "Human Web Analyst",
    subject: "Central Optimization Engineer",
  },
  {
    Sno: "488a05a6-290c-438f-a2a1-78fcd5fb736d",
    regNo: "50088",
    name: "Marianne",
    email: "Kailey.Hegmann@gmail.com",
    mobNO: "725.353.0129 x46615",
    course: "Internal Accounts Architect",
    subject: "Dynamic Mobility Coordinator",
  },
  {
    Sno: "e70fb955-6cd6-4d25-8b6b-1db46205cc8d",
    regNo: "84549",
    name: "Donato",
    email: "Kathleen.Jast40@hotmail.com",
    mobNO: "1-565-313-4420",
    course: "National Configuration Planner",
    subject: "Chief Branding Assistant",
  },
  {
    Sno: "84e0339f-a7cf-43db-a9bc-8bc6c0201a64",
    regNo: "99110",
    name: "Samanta",
    email: "Raymond69@hotmail.com",
    mobNO: "983-389-7411 x4206",
    course: "Future Solutions Executive",
    subject: "Customer Marketing Officer",
  },
];

export function StudentTable() {
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
      <Table.Td px={"xs"}>
        <Flex gap={"8px"}>
          <ActionIcon
            variant="transparent"
            component={Link}
            href={`/students/edit?Sno=${row.Sno}`}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="transparent" color="red">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
      <Table.Td>{row.Sno}</Table.Td>
      <Table.Td>{row.regNo}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Tooltip label={row.email}   >
        <Text truncate="end">{row.email} </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>{row.mobNO}</Table.Td>
      <Table.Td>{row.course}</Table.Td>
      <Table.Td>{row.subject}</Table.Td>
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
          w={"1400px"}
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={1000}
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
                S.No
              </Th>
              <Th
                sorted={sortBy === "regNo"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("regNo")}
              >
                Reg.No
              </Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Full Name
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "mobNO"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("mobNO")}
              >
                Mob.no
              </Th>
              <Th
                sorted={sortBy === "course"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("course")}
              >
                Course
              </Th>
              <Th
                sorted={sortBy === "subject"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("subject")}
              >
                Subject
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
