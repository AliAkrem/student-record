import React from "react";
import {  Paper, ScrollArea } from "@mantine/core";
import { SubjectTable } from "../../../component/tables/subject-table";

export default function CoursePage() {
  return (
    <>
      <Paper p="lg">
        <SubjectTable />
      </Paper>
    </>
  );
}
