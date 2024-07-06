import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../MUI/theme";

interface LoginPromptModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  open,
  handleClose,
}) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          bgcolor: "white",
          boxShadow: "1px 1px 15px 1px white",
          p: 4,
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            width: "80%",
          },
        }}
      >
        <Box
          component="img"
          src="/assets/images/Luffy-PNG-Pic.png"
          alt="Anime Character"
          sx={{
            position: "absolute",
            bottom: -20,
            right: -80,
            width: "60%",
            height: "60%",
            objectFit: "contain",
            zIndex: -1,
          }}
        />
        <Typography variant="h2" component="h2">
          Not Registered ?
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Do it now before any one else !
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: 2,
            gap: "1rem",
          }}
        >
          <Button
            onClick={handleLoginRedirect}
            variant="contained"
            sx={{
              fontSize: "1.6rem",
              bgcolor: "green",
            }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Forgot you are total Anime boss ?
        </Typography>
        <Button
          onClick={handleLoginRedirect}
          variant="contained"
          sx={{
            fontSize: "1.6rem",
            mt: 2,
            bgcolor: "purple",
          }}
        >
          Sing in
        </Button>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            fontSize: "1.6rem",
            position: "absolute",
            bottom: 15,
            left: 10,
          }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginPromptModal;
