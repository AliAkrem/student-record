import React from "react";
import SubjectForm from "../../../../component/forms/subjectForm";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EditPage({ searchParams }: Props) {
  console.log(searchParams.Sno);

  const subject= {
    Sno: "03af84c9-ee83-4d94-a41f-0da9036d36b0",
    course: "Dynamic Creative Administrator",
    subject1: "Senior Implementation Planner",
    subject2: "Lead Brand Strategist",
    subject3: "District Quality Orchestrator",
    subject4: "Customer Operations Facilitator",
  };

  return (
    <>
      <SubjectForm fn="edit" subject={subject}  />
    </>
  );
}
