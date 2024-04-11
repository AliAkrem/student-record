"use client";
import { Button, Container, Paper, Select, TextInput } from "@mantine/core";
import React from "react";

type Subject = {
  Sno: string;
  course: string;
  subject1: string;
  subject2: string;
  subject3: string;
  subject4: string;
};

type Props = {
  fn: "edit" | "create";
  subject?: Subject;
};

export default function SubjectForm({ fn, subject }: Props) {
  return (
    <Container fluid my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <Select
            data={['AW(Athena  DD Weissnat1)', 'AE(Athena  DD Weissnat1)']}
            id="course"
            name="course"
            label="Course"
            type="text"
            defaultValue={subject?.course ?? ""}
            placeholder="example : BACHELOR OF TECHNOLOGY"
            required
          />
          <TextInput
            id="subject1"
            name="subject1"
            label="Subject 1"
            defaultValue={subject?.subject1 ?? ""}
            placeholder="example : C LANGUAGE"
            
            mt="md"
          />
          <TextInput
            id="subject2"
            name="subject2"
            label="Subject 2"
            defaultValue={subject?.subject2 ?? ""}
            placeholder="example : OPERATING SYSTEM"
            
            mt="md"
          />
          <TextInput
            id="subject3"
            name="subject3"
            label="Subject 3"
            defaultValue={subject?.subject3 ?? ""}
            placeholder="example : DATA STRUCTURE"
            
            mt="md"
          />
          <TextInput
           id="subject4"
           name="subject4"
           label="Subject 4"
            defaultValue={subject?.subject4 ?? ""}
            placeholder="example : MATHMATICS"
            
            mt="md"
          />

          <Button type="submit" fullWidth mt="xl">
            save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
