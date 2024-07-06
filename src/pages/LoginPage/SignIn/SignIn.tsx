import React from "react";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { AuthFormProps } from "../../../components/AuthForm/AuthForm.types";

const SignIn: React.FC<Omit<AuthFormProps, "formType" | "setTabValue">> = ({
  handleSubmit,
  handleGoogleSignIn,
  handleResetDialogOpen,
  errors,
  error,
}) => {
  return (
    <AuthForm
      formType="SignIn"
      handleSubmit={handleSubmit}
      handleGoogleSignIn={handleGoogleSignIn}
      handleResetDialogOpen={handleResetDialogOpen}
      errors={errors}
      error={error}
    />
  );
};

export default SignIn;
