import React from "react";
import SubjectForm from "../../../../component/forms/subjectForm";
import { Blockquote, Code, Paper } from "@mantine/core";
import { createClient } from "../../../../utils/supabase/server";
import { group } from "console";
import { IconInfoTriangle } from "@tabler/icons-react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AddSubjectPage({ searchParams }: Props) {
  const supabase = createClient();

  const { data, error, count, status, statusText } = await supabase
    .from("course")
    .select("course_id, name, subject(subject_id,name)");

  const course = data?.map((cs) => {
    return {
      value: String(cs.course_id),
      label: cs.name,
      subjects: cs.subject,
    };
  });




  const initialCourse = course?.find((cs) => {
    return cs.value === String(searchParams.course_id);
  });

  return (
    <>
      <Paper p={"lg"}>
        {!error ? (
          <SubjectForm
            initialCourse={initialCourse}
            course={course!}
            fn="create"
          />
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
