import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { StyledAppBar, StyledToolbar, StyledDrawer } from "./NavBar.styles";
import Logo from "./NavLogo/NavLogo";
import MenuList from "./MenuList/MenuList";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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

        {!isMobile && <MenuList isMobile={isMobile} />}
      </StyledAppBar>
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <MenuList onItemClick={handleDrawerToggle} />
      </StyledDrawer>
    </>
  );
};

export default NavBar;
