import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext/AuthContext";
import LoginPromptModal from "../components/LoginPromptModal/LoginPromptModal";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setModalOpen(true);
    }
  }, [user]);

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  if (!user && !modalOpen) {
    return null;
  }

  return (
    <>
      {!user ? (
        <LoginPromptModal open={modalOpen} handleClose={handleCloseModal} />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;

//*TODO - mention its in the frontend for name convention because usually it used for backend.
