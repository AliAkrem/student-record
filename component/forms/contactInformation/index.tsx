import {
  Container,
  Divider,
  Group,
  Paper,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

type ContactInfo = {
  mobileNumber: string;
  country: string;
  city: string;
  guardianName: string;
  email: string;
  state: string;
  cAddress: string;
  pAddress: string;
};

type Props = {
  fn?: "create" | "edit";
  contactInfo?: ContactInfo;
};

export default function ContactInformationForm({ fn, contactInfo }: Props) {
  return (
    <>
      <Container fluid my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title order={3}>Contact Information</Title>

          <Divider my={"lg"} />

          <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, lg: 3 }} mt={"md"}>
            <TextInput
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              placeholder="Mobile Number"
              required
              defaultValue={contactInfo?.mobileNumber ?? ""}
            />

            <TextInput
              id="country"
              name="country"
              label="Country"
              placeholder="Country"
              required
              defaultValue={contactInfo?.country ?? ""}
            />
            <TextInput
              id="city"
              name="city"
              label="City"
              placeholder="City"
              required
              defaultValue={contactInfo?.city ?? ""}
            />
            <TextInput
              id="guardianName"
              name="guardianName"
              label="Guardian Name"
              placeholder="Guardian Name"
              required
              defaultValue={contactInfo?.guardianName ?? ""}
            />

            <TextInput
              id="cAddress"
              name="cAddress"
              label="Correspondence Address"
              placeholder="Correspondence Address"
              required
              defaultValue={contactInfo?.cAddress ?? ""}
            />
            <TextInput
              id="email"
              name="email"
              label="Eamil"
              placeholder="Email"
              required
              defaultValue={contactInfo?.email ?? ""}
            />
            <Select
              data={["alg"]}
              id="state"
              name="state"
              label="State"
              placeholder="State"
              required
              defaultValue={contactInfo?.state ?? ""}
            />

            <TextInput
              id="pAddress"
              name="pAddress"
              label="Permanent Address"
              placeholder="Permanent Address"
              required
              defaultValue={contactInfo?.pAddress ?? ""}
            />
          </SimpleGrid>
        </Paper>
      </Container>
    </>
  );
}
