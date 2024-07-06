export interface AuthFormProps {
  formType: "SignIn" | "SignUp";
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleSignIn: () => void;
  handleResetDialogOpen: () => void;
  errors: { email: string; password: string; confirmPassword: string };
  error: string | null;
  setTabValue?: React.Dispatch<React.SetStateAction<number>>;
}
