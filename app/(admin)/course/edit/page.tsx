import React from "react";
import CourseForm from "../../../../component/forms/courseForm";
import { createClient } from "../../../../utils/supabase/server";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditPage({ searchParams }: Props) {
  const supabase = createClient();

  const { data: course, error } = await supabase
    .from("course")
    .select("*")
    .eq("course_id", searchParams.course_id)
    .single();


  return (
    <>
      <CourseForm fn="edit" course={course} />
    </>
  );
}



