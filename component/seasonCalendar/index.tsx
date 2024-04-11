"use client";

import { Button, Center, Divider, Fieldset, Group } from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import React, { useState } from "react";

export default function SeasonCalendar() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  console.log(value);

  return (
    <Center p={"md"}>
      <Group display={"block"} gap={"lg"}>
        <YearPicker
          defaultDate={new Date(2010, 1)}
          type="range"
          allowSingleDateInRange
          numberOfColumns={3}
          value={value}
          onChange={(value) =>
            setValue(() => [value[0], new Date(value[0]!.getFullYear() + 1, 1)])
          }
        />
        <Divider my={"lg"} />
        <Button>select season</Button>
      </Group>
    </Center>
  );
}
