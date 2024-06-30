import React from "react";

import { HORIZONTAL_NAVBAR_TITLES } from "../../constants/navbarConstants";
import { useNavigationHelper } from "../../hooks/useNavigationHelper";

import {
  StyledAppBar,
  StyledToolbar,
  StyledBox,
  StyledButton,
} from "./NavBarHoriz.styles";


const NavBarHoriz: React.FC = () => {

const navigateToPage = useNavigationHelper();

  const handleButtonClick = (pageName: string): void => {
    navigateToPage(pageName);
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
