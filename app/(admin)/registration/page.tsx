import React from "react";
import RegisterCourse from "../../../component/forms/registerCourse";
import PersonalInformationForm from "../../../component/forms/personalInformation";
import ContactInformationForm from "../../../component/forms/contactInformation";
import AcademicInformationForm from "../../../component/forms/academicInformation";

export default function RegistrationPage() {
  return (
    <>
      <RegisterCourse />
      <PersonalInformationForm />
      <ContactInformationForm />
      <AcademicInformationForm />
    </>
  );
}
