import { Box, Container } from "@mui/material";
import React from "react";

import theme from "../../MUI/theme";

const Home: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display:"flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: 0,
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      }}
    >
      <Box
        position="absolute"
        sx={{
          right: 0,
          bgcolor: "#00ff0036",
          height: "54rem",
          width: "95%",
          backgroundImage:
            "linear-gradient(to top, #0C0C0C , rgba(0, 0, 0, 0) 30%)",
          zIndex: 1,
        }}
      >
        
      </Box>
      <Box
        component="header"
        sx={{
          border: "1px solid white",
          height: "30rem",
          width: "95%",
          zIndex: 10,
          marginTop: "10rem",
        }}
      ></Box>
      <Box
        component="section"
        sx={{
          border: "1px solid white",
          height: "10rem",
          width: "95%",
          zIndex: 10,
        }}
      ></Box>
      <Box
        component="section"
        sx={{
          border: "1px solid white",
          height: "15rem",
          width: "95%",
          zIndex: 10,
          marginTop: "6rem"
        }}
      ></Box>
      <Box
        component="section"
        sx={{
          border: "1px solid white",
          height: "40rem",
          width: "95%",
          zIndex: 10,
          marginBottom: "6rem"
        }}
      ></Box>
    </Container>
  );
};

export default Home;
