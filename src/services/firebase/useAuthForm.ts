import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext/AuthContext";


interface UseAuthFormProps {
  tabValue: number;
  setTabValue: (value: number) => void;
}

export const useAuthForm = ({ tabValue, setTabValue }: UseAuthFormProps) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, error, loading } =
    useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        if (tabValue === 0) {
          await loginWithEmail(email, password, () => navigate("/"));
        } else if (tabValue === 1) {
          await signUpWithEmail(email, password, () => setTabValue(0));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(() => navigate("/"));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return {
    errors,
    error,
    loading,
    handleSubmit,
    handleGoogleSignIn,
    setErrors,
  };
};
