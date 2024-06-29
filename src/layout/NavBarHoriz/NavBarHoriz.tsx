import React from "react";
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { menuItems } from "../../models/constants";
import bgImage from "/assets/svg/pattern-3.svg"; // Adjust the path as necessary

const NavBarHoriz: React.FC = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          width: "90%",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to top, #0C0C0C, rgba(0, 0, 0, 0.541))",
            zIndex: 1,
          }}
        />
        <Toolbar
          sx={{
            display: "flex",
            gap: "3rem",
            zIndex: 2,
          }}
        >
          {menuItems.map((item, index) => (
            <Button
              color="inherit"
              key={index}
              sx={{
                fontSize: "1.8rem",
                fontWeight: 600,
                color: "#727272",
                "&:hover": {
                  bgcolor: "#33333369",
                  color: "#fff",
                },
              }}
            >
              {item.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBarHoriz;
