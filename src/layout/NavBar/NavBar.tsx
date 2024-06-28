import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ICONS from "./icons"; // Single-line import for all icons

import "./NavBar.css";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Home", icon: <ICONS.Home sx={{ fontSize: "2.5rem" }} /> },
    { text: "About", icon: <ICONS.Info sx={{ fontSize: "2.5rem" }} /> },
    { text: "Contact", icon: <ICONS.Mail sx={{ fontSize: "2.5rem" }} /> },
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
          backgroundColor: "#0C0C0C",
          left: 0,
          top: 0,
          borderRight: isMobile ? "none" : "1px solid #252525",
          borderBottom: isMobile ? "1px solid #252525" : "none",
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
              <ICONS.Menu sx={{ fontSize: "2.5rem" }} />
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
            width: "100%",
            backgroundColor: "#0C0C0C",
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
