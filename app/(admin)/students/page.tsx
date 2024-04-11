import { Paper } from "@mantine/core";
import React from "react";
import { StudentTable } from "../../../component/tables/student-table";

export default function StudentPage() {
  return (
    <>
      <Paper p="lg">
      <StudentTable />
      </Paper>
    </>
  );
}
