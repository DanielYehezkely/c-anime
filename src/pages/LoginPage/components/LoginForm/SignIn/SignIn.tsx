import React from "react";

import { AuthFormProps } from "../../../../../components/AuthForm/AuthForm.types";
import { AuthForm } from "../../../../../components";

const SignIn: React.FC<Omit<AuthFormProps, "formType">> = ({
  handleSubmit,
  handleGoogleSignIn,
  errors,
  error,
  handleResetDialogOpen,
  setTabValue,
}) => {
  return (
    <AuthForm
      formType="SignIn"
      handleSubmit={handleSubmit}
      handleGoogleSignIn={handleGoogleSignIn}
      handleResetDialogOpen={handleResetDialogOpen}
      errors={errors}
      error={error}
      setTabValue={setTabValue}
    />
  );
};

export default SignIn;
