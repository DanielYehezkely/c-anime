import React from "react";
import { Box, Typography } from "@mui/material";

interface ErrorProps {
  message: string;
}

const ErrorComp: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default ErrorComp;
