import React from "react";
import { Alert, Blockquote, Code, Paper } from "@mantine/core";
import { SubjectTable } from "../../../component/tables/subject-table";
import { createClient } from "../../../utils/supabase/server";
import { IconInfoTriangle } from "@tabler/icons-react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SubjectPage( {searchParams} : Props) {
  const supabase = createClient();

  const { data, error, count, status, statusText } = await supabase
    .from("course")
    .select(
      "subject(subject_id, name, created_at, updated_at), course_id, name"
    );

  // TODO: create view calculate the subject metadata for optimization
  const course = data?.map((cs) => {
    return {
      ...cs,
      subjectMetadata: cs.subject.map((sub) => sub.name).toString(),
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
            ? "subject updated!"
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
          <SubjectTable data={course ?? []} />
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
