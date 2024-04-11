"use client";
import { Button, Container, Paper, TextInput } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import React from "react";

type Course = {
  SNo: string;
  shortName: string;
  fullName: string;
  CreatedAt: DateValue;
};

type Props = {
  fn: "edit" | "create";
  course?: Course;
};

export default function CourseForm({ fn, course }: Props) {
  return (
    <Container fluid my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <TextInput
            id="shortName"
            name="shortName"
            label="Short Name"
            type="text"
            defaultValue={course?.shortName ?? ""}
            placeholder="example : B.TECH(BACHELOR OF TECHNOLOGY)"
            required
          />
          <TextInput
            id="fullName"
            name="fullName"
            label="Full Name"
            defaultValue={course?.fullName ?? ""}
            placeholder="example : BACHELOR OF TECHNOLOGY"
            required
            mt="md"
          />
          <DateInput
            mt="md"
            defaultValue={course?.CreatedAt ?? new Date()}
            label="Create Date"
            disabled
          />

          <Button type="submit" fullWidth mt="xl">
            save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
