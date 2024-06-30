import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";


interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

//*TODO - mention its in the frontend for name convention because usually it used for backend.