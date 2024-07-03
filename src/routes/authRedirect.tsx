
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";
import React, { ReactNode } from "react";

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect:React.FC<AuthRedirectProps> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRedirect;
