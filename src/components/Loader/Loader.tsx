import  { forwardRef } from "react";
import "./Loader.css";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoaderProps {
  actionLabel: string;
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ actionLabel }, ref) => {
    return (
      <div ref={ref} className="loader-overlay">
        <Box className="loader-container" textAlign="center">
          <CircularProgress sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ color: "white" }}>
            {actionLabel}
          </Typography>
        </Box>
      </div>
    );
  }
);

export default Loader;
