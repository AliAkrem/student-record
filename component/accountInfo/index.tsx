"use client";
import { UnstyledButton, Group, Avatar, Text, rem, Flex } from "@mantine/core";
import classes from "./accountInfo.module.css";
import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function AccountInfo() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUser(user);
      }
    };

    getUser();
  }, []);


  return (
    <UnstyledButton size={"xl"} className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="lg" fw={500}>
            Admin
          </Text>

          <Text c="dimmed" size="lg">
            {user?.email}
          </Text>
          <Flex gap={'md'}>
            <Text c="blue" size="lg" >last sign in at</Text>
            <Text c="dimmed" size="lg">
              {user?.last_sign_in_at &&
                new Date(user?.last_sign_in_at ?? "").toLocaleString()}
            </Text>
          </Flex>
        </div>
      </Group>
    </UnstyledButton>
  );
}
