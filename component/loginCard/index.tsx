"use client";
import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { login } from "../../app/login/action";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { combineValidators } from "../../utils/validators/combinevalidator";
import { isStrongPassword } from "../../utils/validators/validateSchema";
import { useTransition } from "react";

export function LoginCard() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: combineValidators(isNotEmpty("filed can not be empty"), isEmail()),
      password: combineValidators(
        isNotEmpty("filed can not be empty"),
        isStrongPassword(
          "password must contain at least 8 character, lowercase, uppercase and  numbers "
        )
      ),
    },
  });

  const [pending, startTransition] = useTransition();

  return (
    <Container size={420} my={40}>
      <Paper pos={"relative"} withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay visible={pending} />

        <form
          onSubmit={form.onSubmit((values) => {
            startTransition(() => {
              login(values);
            });
          })}
        >
          <TextInput
            label="Email"
            placeholder="username@example.com"
            {...form.getInputProps("email")}
            disabled={pending}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
            disabled={pending}
            mt="md"
          />
          <Button disabled={pending} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
