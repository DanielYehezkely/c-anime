import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

import { useNavigationHelper } from "../../hooks/useNavigationHelper";
import Logo from "./NavLogo/NavLogo";
import MenuList from "./MenuList/MenuList";

import { StyledAppBar, StyledToolbar, StyledDrawer } from "./NavBarVert.styles";

const VerticalNavBar: React.FC = () => {

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigateToPage = useNavigationHelper();

  const handleDrawerToggle = (): void => {
    setDrawerOpen(!drawerOpen);
  };

  const handleIconClick = (pageName: string): void => {
    setDrawerOpen(false);
    navigateToPage(pageName);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          {!isMobile && <Logo />}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: "2.5rem", color: "#727272" }} />
            </IconButton>
          )}
        </StyledToolbar>
        {!isMobile && (
          <MenuList isMobile={isMobile} onItemClick={handleIconClick} />
        )}
      </StyledAppBar>

      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <MenuList onItemClick={handleIconClick} />
      </StyledDrawer>
    </>
  );
};

export default VerticalNavBar;
