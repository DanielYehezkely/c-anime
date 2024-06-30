import React, { useEffect } from "react";

import { HORIZONTAL_NAVBAR_TITLES } from "../../constants/navbarConstants";
import { useNavigationHelper } from "../../hooks/useNavigationHelper";

import {
  StyledAppBar,
  StyledToolbar,
  StyledBox,
  StyledButton,
  ActiveStyledButton,
} from "./NavBarHoriz.styles";

const NavBarHoriz: React.FC = () => {
  const navigateToPage = useNavigationHelper();

  const handleButtonClick = (pageName: string): void => {
    navigateToPage(pageName);
  };

  useEffect(() => {}, []);

  return (
    <>
      <StyledAppBar position="static">
        <StyledBox />
        <StyledToolbar>
          {HORIZONTAL_NAVBAR_TITLES.map((item, index) => {
            const isActive = location.pathname === item.path;
            const ButtonComponent = isActive
              ? ActiveStyledButton
              : StyledButton;
            return (
              <ButtonComponent
                key={index}
                onClick={() => handleButtonClick(item.name)}
              >
                {item.name}
              </ButtonComponent>
            );
          })}
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default NavBarHoriz;
