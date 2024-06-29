import React from "react";

import NavBar from "./NavBar/NavBar";

import './SharedLayout.css'


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
