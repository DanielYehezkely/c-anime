import React from "react";
import { Outlet } from "react-router";

import NavBar from "./NavBarVert/NavBarVert";

import "./SharedLayout.css";
import NavBarHoriz from "./NavBarHoriz/NavBarHoriz";

const SharedLayout: React.FC = () => {
  return (
    <>
      <div className="SharedLayout container">
        <NavBar />
        <NavBarHoriz />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SharedLayout;
