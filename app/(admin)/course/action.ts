"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export async function addCourse({
  abvName,
  name,
}: {
  abvName: string;
  name: string;
}) {
  const supabase = createClient();

  const data = {
    name: name as string,
    abv_name: abvName as string,
  };

  const { error } = await supabase.from("course").insert(data);

  if (error) {
    redirect(`/course/add?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/course?addSuccess");
}

export async function updateCourse({
  courseId,
  newAbvName,
  newName,
  oldAbvName,
  oldName,
}: {
  courseId: number;
  newAbvName: string;
  newName: string;
  oldName: string;
  oldAbvName: string;
}) {
  const supabase = createClient();

  let data = {};

  if (newName != oldName) {
    data = { ...data, name: newName };
  }

  if (newAbvName != oldAbvName) {
    data = { ...data, abv_name: newAbvName };
  }



  if (Object.keys(data).length <= 0) {
    return;
  }

  const { error } = await supabase
    .from("course")
    .update(data)
    .eq("course_id", courseId);

  if (error) {
    redirect(`/course/edit?course_id=${courseId}?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/course?updateSuccess");
}

export async function deleteCourse(course_id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("course").delete().eq(
    "course_id",
    course_id,
  );

  if (error) {
    redirect(`/course?error=${error.message}`);
  }

  revalidatePath("/", "layout");

  redirect("/course?deleteSuccess");
}
