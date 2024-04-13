import React from "react";
import CourseForm from "../../../../component/forms/courseForm";
import { Alert } from "@mantine/core";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function AddPage({ searchParams }: Props) {
  return (
    <>
      {searchParams.error && <Alert color="red"> {searchParams.error} </Alert>}
      <CourseForm fn="create" />
    </>
  );
}
