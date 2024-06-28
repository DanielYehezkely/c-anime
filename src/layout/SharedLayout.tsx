import React from "react";

import './SharedLayout.css'
import NavBar from "./NavBar/NavBar";


const SharedLayout:React.FC = () => {
  return (
    <>
      <div className="SharedLayout">
      <NavBar />
      </div>
    </>
  );
};

export default SharedLayout;
