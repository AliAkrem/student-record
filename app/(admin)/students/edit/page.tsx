import React from "react";
import RegisterCourse from "../../../../component/forms/registerCourse";
import PersonalInformationForm from "../../../../component/forms/personalInformation";
import ContactInformationForm from "../../../../component/forms/contactInformation";
import AcademicInformationForm from "../../../../component/forms/academicInformation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EditPage({ searchParams }: Props) {
  const pInfo = {
    firstName: "String",
    middleName: "String",
    lastName: "String",
    guardianName: "String",
    familyIncome: "2000",
    phC: "false" as "true" | "false",
    gender: "F" as "M" | "F",
    occupation: "String",
    category: "OBC",
    nationality: "String",
  };

  const cInfo = {
    mobileNumber: "string",
    country: "string",
    city: "string",
    guardianName: "string",
    email: "string",
    state: "alg",
    cAddress: "string",
    pAddress: "string",
  };

  const acad = {
    enrollment: [
      {
        noRoll: "string",
        board: "string",
        pYear: new Date,
      },
      {
        noRoll: "string",
        board: "string",
        pYear: new Date,
      },
    ],
    mark: [
      {
        SNo: "string",
        subject: "string",
        markObtained: "string",
        fullMark: "string",
      },
      {
        SNo: "string",
        subject: "string",
        markObtained: "string",
        fullMark: "string",
      },
    ],
  };

  return (
    <>
      <RegisterCourse register={{ courseId: "1", subject: ["React"] }} />
      <PersonalInformationForm personalInfo={pInfo} />
      <ContactInformationForm contactInfo={cInfo} />
      <AcademicInformationForm academicInformation={acad} />
    </>
  );
}
