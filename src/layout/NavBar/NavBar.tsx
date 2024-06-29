import React, { useState } from "react";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import "./NavBar.css";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme(); 
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
    { text: "About", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
    { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
  ];

  return (
    <>
      
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? "100%" : "8rem",
          height: isMobile ? "auto" : "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          left: 0,
          top: 0,
          borderRight: isMobile ? "none" : "1px solid #252525",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: isMobile ? "space-between" : "center",
          }}
        >
          {isMobile ? (
            ""
          ) : (
            <Box
              component="div"
              sx={{
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/public/assets/images/C-icon.png"
                alt="logo"
                className="logo"
              />
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
        </Toolbar>
        {!isMobile && (
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        )}
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            //* The & symbol in & .MuiDrawer-paper is a reference to the parent component in CSS-in-JS syntax allowing me to target nested elements.
            width: "100%",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={handleDrawerToggle}>
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
