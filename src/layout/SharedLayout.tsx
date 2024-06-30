import React from "react";
import { Outlet } from "react-router";

import NavBarHoriz from "./NavBarHoriz/NavBarHoriz";
import VerticalNavBar from "./NavBarVert/NavBarVert";

import "./SharedLayout.css";

const SharedLayout: React.FC = () => {
  return (
    <>
      <div className="SharedLayout container">
        <VerticalNavBar />
        <NavBarHoriz />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SharedLayout;
