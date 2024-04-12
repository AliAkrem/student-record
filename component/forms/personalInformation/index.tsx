import {
  Container,
  Divider,
  Group,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

type PersonalInfo = {
  firstName: string;
  middleName: string;
  lastName: string;
  guardianName: string;
  familyIncome: string;
  phC: "true" | "false";
  gender: "M" | "F";
  occupation: string;
  category: string;
  nationality: string;
};

type Props = {
  fn?: "edit" | "create";
  personalInfo?: PersonalInfo;
};

export default function PersonalInformationForm({ fn, personalInfo }: Props) {
  return (
    <>
      <Container fluid my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title order={3}>Personal Information</Title>

          <Divider my={"lg"} />

          <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, lg: 3 }} mt={"md"}>
            <TextInput
              id="firstName"
              name="firstName"
              label="First Name"
              defaultValue={personalInfo?.firstName ?? ""}
              placeholder="First Name"
              required
            />

            <TextInput
              id="middleName"
              name="middleName"
              label="Middle Name"
              placeholder="Middle Name"
              defaultValue={personalInfo?.middleName ?? ""}
              required
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              defaultValue={personalInfo?.lastName ?? ""}
              required
            />
            <TextInput
              id="guardianName"
              name="guardianName"
              label="Guardian Name"
              placeholder="Guardian Name"
              defaultValue={personalInfo?.guardianName ?? ""}
              required
            />

            <Select
              id="familyIncome"
              name="familyIncome"
              label="Family Income"
              placeholder="Family Income"
              required
              defaultValue={personalInfo?.familyIncome ?? ""}
              data={["2000", "3000", "5000"]}
            />
            <Select
              id="phC"
              name="phC"
              label="Physically Challenged"
              placeholder="Physically Challenged"
              required
              defaultValue={personalInfo?.phC ?? ""}
              data={["true", "false"]}
            />
            <RadioGroup
              defaultValue={personalInfo?.gender ?? "M"}
              // my={"lg"}
              label="Gender"
              name="gender"
              withAsterisk
            >
              <Group mt="xs">
                <Radio value="M" label="Male" />
                <Radio value="F" label="Female" />
              </Group>
            </RadioGroup>
            <TextInput
              defaultValue={personalInfo?.occupation ?? ""}
              id="occupation"
              name="occupation"
              label="Occupation"
              placeholder="Occupation"
              required
            />

            <Select
              defaultValue={personalInfo?.category ?? ""}
              id="category"
              name="category"
              label="Category"
              placeholder="Category"
              required
              data={["General", "OBC", "ST", "SC", "other"]}
            />

            <TextInput
              defaultValue={personalInfo?.nationality ?? ""}
              id="nationality"
              name="nationality"
              label="Nationality"
              placeholder="Nationality"
              required
            />
          </SimpleGrid>
        </Paper>
      </Container>
    </>
  );
}
