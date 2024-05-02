"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export async function upsertSubjects({
  course_id,
  subjects,
}: {
  course_id: string;
  subjects: {
    subject_id?: string;
    name: string;
  }[];
}) {
  const supabase = createClient();

  const updateData = subjects.map((sub) => {
    if (sub.subject_id) {
      return {
        subject_id: sub.subject_id,
        name: sub.name,
        course_id: course_id,
      };
    }
  }).filter((data) => data !== undefined);

  const insertData = subjects.map((sub) => {
    if (!sub.subject_id) {
      return {
        name: sub.name,
        course_id: course_id,
      };
    }
  }).filter((data) => data !== undefined);

  const { error: updateError } = await supabase.from("subject").upsert(
    updateData,
  );

  const { error: insetError } = await supabase.from("subject").insert(
    insertData,
  );

  console.log({ updateError, insetError });

  if (updateError || insetError) {
    redirect(
      `/subject/edit?error=updateError:${updateError?.message}insertError:${insetError?.message}`,
    );
  }

  revalidatePath("/", "layout");
  redirect("/subject?updateSuccess");
}

export async function deleteSubject(subject_id: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("subject").delete().eq(
    "subject_id",
    subject_id,
  );

  if (error) {
    redirect(
      `/subject?error=${error.message}`,
    );
  }
  
  revalidatePath("/", 'layout');
  redirect("/subject?deleteSuccess");
}
