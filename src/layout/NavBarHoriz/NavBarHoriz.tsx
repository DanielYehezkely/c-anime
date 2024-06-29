import React from "react";
import { HORIZONTAL_NAVBAR_TITLES } from "../../models/constants";
import {
  StyledAppBar,
  StyledToolbar,
  StyledBox,
  StyledButton,
} from "./NavBarHoriz.styles";
import { useNavigate } from "react-router";

const NavBarHoriz: React.FC = () => {

const navigate = useNavigate();

  const handleButtonClick = (pageName: string) => {
     if (pageName === "Home") {
       navigate("/");
     } else {
       navigate(`/${pageName.trim().toLowerCase().replace(/\s+/g, "")}`);
     }
  }

  return (
    <>
      <StyledAppBar position="static">
        <StyledBox />
        <StyledToolbar>
          {HORIZONTAL_NAVBAR_TITLES.map((item, index) => (
            <StyledButton key={index} onClick={() => handleButtonClick(item.name)}>
              {item.name}
            </StyledButton>
          ))}
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default NavBarHoriz;
