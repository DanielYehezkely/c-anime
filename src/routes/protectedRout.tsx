import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext/AuthContext";
import LoginPromptModal from "../components/LoginPromptModal/LoginPromptModal";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (location.pathname !== "/") {
      navigate('/')
    }
  };

  useEffect(() => {
    if (!user) {
      handleShowModal();
    }
  }, [user]);

  if (!user && !modalOpen) {
    return null; 
  }

  return (
    <>
      {!user ? (
        <>
          <LoginPromptModal open={modalOpen} handleClose={handleCloseModal} />
        </>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;

//*TODO - mention its in the frontend for name convention because usually it used for backend.
