"use client";
import { Title } from "@mantine/core";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function PageTitle() {
  const pathname = usePathname();

  const pageName =
    pathname.split("/")[1] === "course"
      ? "Course"
      : pathname.split("/")[1] === "subject"
      ? "Subjects"
      : pathname.split("/")[1] === "registration"
      ? "Registration"
      : pathname.split("/")[1] === "account"
      ? "Account"
      :
      pathname.split("/")[1] === "students"
      ? "Students"
      :
      pathname.split("/")[1] === "season"
      ? "Season"

      : "Dashboard";

  return (
    <>
      <Title order={2} fw={"lighter"}>
        {pageName}
      </Title>
    </>
  );
}
