"use client";
import {
  Button,
  Container,
  Fieldset,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import {  isNotEmpty, matchesField, useForm } from "@mantine/form";
import React, { useTransition } from "react";
import { combineValidators } from "../../../utils/validators/combinevalidator";
import { isStrongPassword } from "../../../utils/validators/validateSchema";
import { changePassword } from "../../../app/(admin)/account/changePassword/action";

export default function ChangePassword() {
  const form = useForm({
    initialValues: {
      password: "",
      confirm: "",
    },
    validate: {
      password: combineValidators(
        isNotEmpty("Password can not be empty"),
        isStrongPassword(
          "Password contain at least 8 character, lowercase, uppercase and  numbers"
        )
      ),
      confirm: matchesField("password", "Passwords are not the same"),
    },
  });

  const [pending, startTransition] = useTransition();


  return (
    <>
      <Container fluid my={40}>
        <Fieldset pos={"relative"} legend="Change Password">
          <form
            onSubmit={form.onSubmit((values) => {
              startTransition(() => {
                changePassword(values);
              });
            })}
          >
            <LoadingOverlay visible={pending} />
            <PasswordInput
              id="password"
              name="password"
              label="New Password"
              placeholder="New Password"
              {...form.getInputProps("password")}
              mt="md"
            />
            <PasswordInput
              id="confirm"
              name="confirm"
              label="Confirm Password"
              placeholder="Confirm Password"
              {...form.getInputProps("confirm")}
              mt="md"
            />
            <Button disabled={pending} type="submit" fullWidth mt="xl">
              update password
            </Button>
          </form>
        </Fieldset>
      </Container>
    </>
  );
}
