import React from "react";
import CourseForm from "../../../../component/forms/courseForm";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EditPage({ searchParams }: Props) {

  const course= {
    SNo: "9186a26a-ba27-476c-8f82-309153faa2fe",
    fullName: "National Optimization Associate",
    shortName:  "SCSI",
    CreatedAt:  new Date("2023-10-27T04:48:35.933Z"),

  };

  return (
    <>
      <CourseForm fn="edit" {...{course}} />
    </>
  );
}
