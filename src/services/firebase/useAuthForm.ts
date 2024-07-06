import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext/AuthContext";

interface UseAuthFormProps {
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}

export const useAuthForm = ({ tabValue, setTabValue }: UseAuthFormProps) => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loginWithEmail, signUpWithEmail, loading, loginWithGoogle, error } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm-password") as string;
    let newErrors = { email: "", password: "", confirmPassword: "" };

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

    if (tabValue === 1 && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      try {
        if (tabValue === 0) {
          await loginWithEmail(email, password, () => navigate("/"));
        } else if (tabValue === 1) {
          await signUpWithEmail(email, password, () => setTabValue(0));
        }
      } catch (error) {
        console.error("Authentication error, check the context:", error);  
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(() => navigate("/"));
    } catch (error) {
      console.error("Error signing in with Google, check the context:", error);
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
