import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { PassResetDialogProps } from "./PasswordResetDialog.types";

const PasswordResetDialog: React.FC<PassResetDialogProps> = ({
  open,
  handleClose,
}) => {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email address below to receive a password reset link.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetDialog;
