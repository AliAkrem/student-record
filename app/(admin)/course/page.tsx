import React from "react";
import { CourseTable } from "../../../component/tables/course-table";
import { Alert, Blockquote, Center, Code, Paper } from "@mantine/core";
import { createClient } from "../../../utils/supabase/server";
import { IconInfoTriangle } from "@tabler/icons-react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CoursePage({ searchParams }: Props) {
  const supabase = createClient();

  const { data, error, status, count, statusText } = await supabase
    .from("course")
    .select("*");

  const courses = data?.map((course) => {
    return {
      course_id: String(course.course_id),
      name: course.name,
      abv_name: course.abv_name,
      created_at: new Date(course.created_at).toLocaleString(),
      updated_at: new Date(course.updated_at).toLocaleString(),
    };
  });

  return (
    <>
      {Object.keys(searchParams)[0] && (
        <Alert
          color={
            Object.keys(searchParams)[0] === "updateSuccess" ||
            Object.keys(searchParams)[0] === "addSuccess"
              ? "green"
              : Object.keys(searchParams)[0] === "deleteSuccess" ||
                Object.keys(searchParams)[0] === "error"
              ? "red"
              : "yellow"
          }
        >
          {Object.keys(searchParams)[0] === "updateSuccess"
            ? "course updated!"
            : Object.keys(searchParams)[0] === "addSuccess"
            ? "course added!"
            : Object.keys(searchParams)[0] === "deleteSuccess"
            ? "course deleted!"
            : Object.keys(searchParams)[0] === "error"
            ? searchParams.error
            : "Unpredictable Error, please contact the developer if something wrong happen "}
        </Alert>
      )}

      <Paper p="lg">
        {!error && data.length >= 0 ? (
          <CourseTable data={courses ?? []} />
        ) : (
          <Blockquote color="red" icon={<IconInfoTriangle />}>
            <Code color="transparent" block>
              {JSON.stringify(
                { data, error, status, count, statusText },
                null,
                4
              )}
            </Code>
          </Blockquote>
        )}
      </Paper>
    </>
  );
}
