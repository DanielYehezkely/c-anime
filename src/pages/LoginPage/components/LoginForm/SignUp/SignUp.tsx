import React from "react";
import { AuthForm } from "../../../../../components";
import { AuthFormProps } from "../../../../../components/AuthForm/AuthForm.types";

const SignUp: React.FC<
  Omit<AuthFormProps, "formType" | "handleResetDialogOpen">
> = ({ handleSubmit, handleGoogleSignIn, errors, error, setTabValue }) => {
  return (
    <AuthForm
      formType="SignUp"
      handleSubmit={handleSubmit}
      handleGoogleSignIn={handleGoogleSignIn}
      handleResetDialogOpen={() => {}}
      errors={errors}
      error={error}
      setTabValue={setTabValue}
    />
  );
};

export default SignUp;
