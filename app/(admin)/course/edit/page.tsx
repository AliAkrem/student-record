import React from "react";
import CourseForm from "../../../../component/forms/courseForm";
import { createClient } from "../../../../utils/supabase/server";
import { Blockquote, Code, Paper } from "@mantine/core";
import { IconInfoTriangle } from "@tabler/icons-react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditPage({ searchParams }: Props) {
  const supabase = createClient();

  const {
    data: course,
    error,
    count,
    status,
    statusText,
  } = await supabase
    .from("course")
    .select("*")
    .eq("course_id", searchParams.course_id)
    .single();

  return (
    <>
      <Paper p="lg">

      {!error ? (
        <CourseForm fn="edit" course={course} />
      ) : (
        <Blockquote color="red" icon={<IconInfoTriangle />}>
          <Code color="transparent" block>
            {JSON.stringify(
              { course, error, status, count, statusText },
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
