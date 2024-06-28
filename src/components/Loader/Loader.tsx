import React from "react";
import "./Loader.css";
import { CircularProgress } from "@mui/material";

interface LoaderProps {
  actionLabel: string;
}

const Loader: React.FC<LoaderProps> = ({ actionLabel }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <CircularProgress />
        <h2>{actionLabel}</h2>
      </div>
    </div>
  );
};

export default Loader;
