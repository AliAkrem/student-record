import {
  Container,
  Divider,
  MultiSelect,
  Paper,
  Select,
  Title,
} from "@mantine/core";
import { DateInput, YearPickerInput } from "@mantine/dates";
import React from "react";

type Register = {
  courseId: string;
  subject: string[];
};

type Props = {
  fn?: "create" | "edit";
  register?: Register;
};

export default function RegisterCourse({ fn, register }: Props) {
  return (
    <Container fluid my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={3}>Register</Title>

        <Divider my={"lg"} />

        <Select
          data={[
            { value: "1", label: "tech" },
            { value: "2", label: "web" },
          ]}
          defaultValue={register?.courseId ?? ""}
          id="courseId"
          name="courseId"
          label="Course"
          placeholder="Select Course"
          required
        />
        <MultiSelect
          data={[
            { value: "React", label: "React" },
            { value: "Angular", label: "Angular" },
            { value: "Vue", label: "Vue" },
            { value: "Svelte", label: "Svelte" },
          ]}
          defaultValue={register?.subject ?? []}
          id="subjects"
          name="subjects"
          label="subjects"
          placeholder="example : C language"
          required
          mt="md"
        />
        <YearPickerInput
          type="range"
          label="season"
          placeholder="season"
          disabled
          value={[new Date(2023, 1), new Date(2024, 1)]}
          mt="md"
        />
      </Paper>
    </Container>
  );
}
