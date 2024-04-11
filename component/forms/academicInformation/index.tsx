"use client";
import {
  ActionIcon,
  Container,
  Divider,
  Fieldset,
  Flex,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {  IconPlus, IconX } from "@tabler/icons-react";
import React from "react";

type AcademicInformation = {
  enrollment: {
    noRoll: string;
    board: string;
    pYear: Date;
  }[];
  mark: {
    SNo: string;
    subject: string;
    markObtained: string;
    fullMark: string;
  }[];
};

type Props = {
  fn?: "edit" | "create";
  academicInformation?: AcademicInformation;
};

export default function AcademicInformationForm({
  fn,
  academicInformation,
}: Props) {
  const form = useForm({
    initialValues: {
      enrollment: academicInformation?.enrollment ?? [
        { noRoll: "", board: "", pYear: new Date() },
      ],
    },
  });

  const markForm = useForm({
    initialValues: {
      mark: academicInformation?.mark ?? [
        { SNo: "", subject: "", markObtained: "", fullMark: "" },
      ],
    },
  });

  const enrollmentFields = form.values.enrollment.map((item, index) => (
    <Flex w={"100%"} justify={"space-between"} align={"end"}>
      <Group w={"95%"} grow justify="flex-end" mt={"md"}>
        <TextInput
          id="noRoll"
          name="noRoll"
          label="No Roll"
          placeholder="No Roll"
          {...form.getInputProps(`enrollment.${index}.noRoll`)}
          required
        />
        <TextInput
          id="board"
          name="board"
          label="Board"
          placeholder="Board"
          {...form.getInputProps(`enrollment.${index}.board`)}
          required
        />
        <YearPickerInput
          defaultValue={new Date()}
          label="Year Of Passing"
          placeholder=" Year Of Passing"
          {...form.getInputProps(`enrollment.${index}.pYear`)}
          required
          clearable
        />
      </Group>
      <Group justify="end" mt="md">
        <ActionIcon
          variant="transparent"
          color="red"
          size={"lg"}
          onClick={() => form.removeListItem("enrollment", index)}
        >
          <IconX />
        </ActionIcon>
      </Group>
    </Flex>
  ));

  const markFields = markForm.values.mark.map((item, index) => (
    <Flex w={"100%"} justify={"space-between"} align={"end"}>
      <Group w={"90%"} grow justify="flex-end" mt={"md"}>
        <TextInput
          id="SNo"
          name="SNo"
          label="S.No"
          placeholder="S.No"
          {...markForm.getInputProps(`mark.${index}.SNo`)}
          required
        />
        <TextInput
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Subject"
          {...markForm.getInputProps(`mark.${index}.subject`)}
          required
        />
        <Flex justify={"space-between"} gap={"10px"}>
          <TextInput
            id="markObtained"
            name="markObtained"
            label="Mark Obtained"
            placeholder="Mark Obtained"
            {...markForm.getInputProps(`mark.${index}.markObtained`)}
            required
          />
          <TextInput
            id="fullMark"
            name="fullMark"
            label="Full Mark"
            placeholder="Full Mark"
            {...markForm.getInputProps(`mark.${index}.fullMark`)}
            required
          />
        </Flex>
      </Group>
      <Group justify="end" mt="md">
        <ActionIcon
          variant="transparent"
          color="red"
          size={"lg"}
          onClick={() => markForm.removeListItem("mark", index)}
        >
          <IconX />
        </ActionIcon>
      </Group>
    </Flex>
  ));

  return (
    <>
      <Container fluid my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title order={3}>Academic Information</Title>

          <Divider my={"lg"} />
          <Fieldset legend="Enrollment">
            {form.values.enrollment.length > 0
              ? enrollmentFields
              : "No Enrollment"}{" "}
          </Fieldset>
          <Group justify="start" mt="md">
            <ActionIcon
              size={"lg"}
              onClick={() =>
                form.insertListItem("enrollment", {
                  noRoll: "",
                  board: "",
                  pYear: new Date(),
                })
              }
            >
              <IconPlus />
            </ActionIcon>
          </Group>

          <Divider my={"lg"} />

          <Fieldset legend="Marks">
            {markForm.values.mark.length > 0 ? markFields : "No Mark"}{" "}
          </Fieldset>
          <Group justify="start" mt="md">
            <ActionIcon
              size={"lg"}
              onClick={() =>
                markForm.insertListItem("mark", {
                  SNo: "",
                  subject: "",
                  markObtained: "",
                  fullMark: "",
                })
              }
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </Paper>
      </Container>
    </>
  );
}
