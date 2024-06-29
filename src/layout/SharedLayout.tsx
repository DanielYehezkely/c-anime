import React from "react";

import NavBar from "./NavBar/NavBar";


import './SharedLayout.css'
import { Outlet } from "react-router";


const SharedLayout:React.FC = () => {
  return (
    <>
      <div className="SharedLayout container">
      <NavBar />
      <Outlet/>
      </div>
    </>
  );
};

export default SharedLayout;
