"use client";
import {
  ActionIcon,
  Button,
  Container,
  LoadingOverlay,
  Paper,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { IconPlus, IconX } from "@tabler/icons-react";
import React, { useState, useTransition } from "react";
import { combineValidators } from "../../../utils/validators/combinevalidator";
import { upsertSubjects } from "../../../app/(admin)/subject/actions";

type Props = {
  fn: "edit" | "create";
  course: {
    value: string;
    label: any;
    subjects: { name: string; subject_id?: string }[];
  }[];

  initialCourse?: {
    value: string;
    label: any;
    subjects: { name: string; subject_id?: string }[];
  };
};

export default function SubjectForm({ fn, initialCourse, course }: Props) {
  const [subjectNbr, setSubjectNbr] = useState<number>(
    initialCourse?.subjects.length ?? 0
  );

  const form = useForm({
    initialValues: {
      course_id: initialCourse?.value ?? "",
      subjects: initialCourse?.subjects ?? [{ name: "" }],
    },
    validate: {
      course_id: isNotEmpty("Filed can not be empty"),
      subjects: {
        name: combineValidators(
          isNotEmpty("Filed can not be empty"),
          hasLength(
            { min: 3, max: 40 },
            "Subject length must be between 3 and 40"
          )
        ),
      },
    },

    onValuesChange(values, previous) {
      if (values.course_id !== "" && previous.course_id != values.course_id) {
        let subs = course.filter((cs) => {
          return cs.value === values.course_id;
        })[0]?.subjects;

        if (subs) {
          form.setValues({
            subjects: subs,
          });

          setSubjectNbr(subs.length);
          form.resetDirty({ course_id: values.course_id, subjects: subs });
          // form.resetTouched();
        }
      }
    },
  });

  const [pending, setTransition] = useTransition();

  const subjectsFiled = form.values.subjects.map((item, index) => (
    <TextInput
      key={index}
      leftSection={
        index >= subjectNbr && (
          <ActionIcon
            variant="transparent"
            color="red"
            size={"lg"}
            onClick={() => form.removeListItem("subjects", index)}
          >
            <IconX />
          </ActionIcon>
        )
      }
      label={<Text display={"inline"}>Subject {index + 1} </Text>}
      placeholder="example : C LANGUAGE"
      {...form.getInputProps(`subjects.${index}.name`)}
      withAsterisk
    />
  ));

  return (
    <Container fluid my={40}>
      <LoadingOverlay visible={pending} />
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            setTransition(async () => {
              await upsertSubjects(values);
            });
          })}
        >
          <Select
            data={course}
            label="Course"
            type="text"
            placeholder="example : BACHELOR OF TECHNOLOGY"
            required
            {...form.getInputProps("course_id")}
          />
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }} mt={"md"}>
            {subjectsFiled}
          </SimpleGrid>
          <br />
          <ActionIcon
            size={"lg"}
            onClick={() =>
              form.insertListItem("subjects", {
                name: "",
              })
            }
          >
            <IconPlus />
          </ActionIcon>

          <Button
            disabled={!form.isDirty() || !form.values.course_id || pending}
            type="submit"
            fullWidth
            mt="xl"
          >
            save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
