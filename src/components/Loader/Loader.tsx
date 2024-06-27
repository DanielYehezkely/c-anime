import React from "react";
import "./Loader.css";

interface LoaderProps {
  actionLabel: string;
}

const Loader: React.FC<LoaderProps> = ({ actionLabel }) => {
  return (
    <div className="loader-overlay">
    <div className="loader-container">
      <div className="Loader"></div> 
      <h2>{actionLabel}</h2>
    </div>
    </div>
  );
};

export default Loader;
