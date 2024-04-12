"use client";

import {
  Button,
  Center,
  Divider,
  Group,
  ScrollArea,
} from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";

export default function SeasonCalendar() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const lg = useMediaQuery("(min-width: 75em)");
  const xs = useMediaQuery("(min-width: 36em)");

  return (
    <ScrollArea scrollbars="x">
      <Center p={"md"}>
        <Group display={"block"} gap={"lg"}>
          <YearPicker
            defaultDate={new Date(2010, 1)}
            type="range"
            allowSingleDateInRange
            numberOfColumns={lg ? 3 : xs ? 2 : 1}
            value={value}
            onChange={(value) =>
              setValue(() => [
                value[0],
                new Date(value[0]!.getFullYear() + 1, 1),
              ])
            }
          />
        </Group>
      </Center>
      <Divider my={"lg"} />
      <Group pl={"20px"}>
        <Button >select season</Button>
      </Group>
    </ScrollArea>
  );
}
