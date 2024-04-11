import React from "react";
import { CourseTable } from "../../../component/tables/course-table";
import { Paper } from "@mantine/core";

export default function CoursePage() {
  return (
    <>
      <Paper p="lg" >
        <CourseTable />
      </Paper>
    </>
  );
}
