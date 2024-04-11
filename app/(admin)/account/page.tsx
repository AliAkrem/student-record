import React from "react";
import { createClient } from "../../../utils/supabase/server";
import ChangePassword from "../../../component/forms/changePassword";
import { AccountInfo } from "../../../component/accountInfo";
import { changePassword } from "./changePassword/action";
import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export default function AccountPage({ searchParams }: Props) {


  return (
    <>
      {searchParams.error && <Alert  icon={<IconAlertTriangle />} color="red">{searchParams.error}</Alert>}
      {searchParams.update ? (
        <Alert color="green" >
          password updated successfully!
        </Alert>
      ) : null}
      <AccountInfo />
      <ChangePassword  />
    </>
  );
}
