"use client";
import {
  Button,
  Container,
  LoadingOverlay,
  Paper,
  TextInput,
} from "@mantine/core";
import { hasLength, isNotEmpty, matches, useForm } from "@mantine/form";
import React, { useTransition } from "react";
import { combineValidators } from "../../../utils/validators/combinevalidator";
import { addCourse, updateCourse } from "../../../app/(admin)/course/action";
import { DateTimePicker } from "@mantine/dates";

type Course = {
  course_id: number;
  name: string;
  abv_name: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  fn: "edit" | "create";
  course?: Course;
};

export default function CourseForm({ fn, course }: Props) {
  const form = useForm({
    initialValues: {
      name: fn === "edit" ? course?.name ?? "" : "",
      abvName: fn === "edit" ? course?.abv_name ?? "" : "",
    },
    validate: {
      name: combineValidators(
        isNotEmpty("Filed can not be empty"),
        hasLength({ max: 35 }, "Value must have 35 or less characters"),
        hasLength({ min: 6 }, "Value must have 6  or more characters")
      ),
      abvName: combineValidators(
        isNotEmpty("Filed can not be empty"),
        hasLength({ max: 12 }, "Value must have 12 or less characters"),
        hasLength({ min: 2 }, "Value must have 2  or more characters")
      ),
    },
  });

  const [pending, startTransition] = useTransition();

  return (
    <Container fluid my={40}>
      <Paper pos={"relative"} withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay visible={pending} />
        <form
          onSubmit={form.onSubmit((values) => {
            startTransition(() => {
              if (fn === "create") {
                addCourse(values);
              } else if (fn === "edit") {
                if (course) {
                  updateCourse({
                    courseId: course?.course_id,
                    newAbvName: values.abvName,
                    newName: values.name,
                    oldAbvName: course?.abv_name,
                    oldName: course?.name,
                  });
                }
              }
            });
          })}
        >
          <TextInput
            label="Full Name"
            placeholder="example : BACHELOR OF TECHNOLOGY"
            {...form.getInputProps("name")}
            disabled={pending}
          />
          <TextInput
            mt="md"
            label="Abbreviation"
            type="text"
            placeholder="example : B.TECH(BACHELOR OF TECHNOLOGY)"
            {...form.getInputProps("abvName")}
            disabled={pending}
          />
          {fn === "edit" ? (
            <>
              <DateTimePicker
                mt="md"
                label="Created At"
                value={new Date(course?.created_at!)}
                disabled
              />
              <DateTimePicker
                mt="md"
                label="Last Updated At"
                value={new Date(course?.updated_at!)}
                disabled
              />
            </>
          ) : null}

          <Button
            type="submit"
            fullWidth
            mt="xl"
            disabled={
              pending ||
              (fn === "edit" &&
                !new RegExp("^(?!(\\s*" + course?.name + "\\s*)$).*$").test(
                  form.values.name
                ) &&
                !new RegExp("^(?!(\\s*" + course?.abv_name + "\\s*)$).*$").test(
                  form.values.abvName!
                ))
            }
          >
            save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
