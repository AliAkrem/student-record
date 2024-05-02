"use client";
import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { login } from "../../app/login/action";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { combineValidators } from "../../utils/validators/combinevalidator";
import { isStrongPassword } from "../../utils/validators/validateSchema";
import { useTransition } from "react";
import { useMediaQuery } from "@mantine/hooks";

import classes from "./login.module.css";

export function LoginCard() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: combineValidators(
        isNotEmpty("Filed can not be empty"),
        isEmail("Invalid email address")
      ),
      password: combineValidators(
        isNotEmpty("Filed can not be empty"),
        isStrongPassword(
          "Password must contain at least 8 character, lowercase, uppercase and number "
        )
      ),
    },
  });

  const [pending, startTransition] = useTransition();

  const match = useMediaQuery("(min-width : 36em)");

  return (
    <Container className={classes.container}>
      <Title className={classes.title}>Sign-in</Title>
      <Paper className={classes.inner} withBorder shadow="md" radius="md">
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
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
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
