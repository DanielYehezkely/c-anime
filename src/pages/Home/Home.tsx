import { Box, Container } from "@mui/material";
import React from "react";

import theme from "../../MUI/theme";
import { HeaderBox, SearchBox } from "./components";
import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Loader } from "../../components";



const Home: React.FC = () => {

  const { loading } = useAnimeApi();

 

  return (
    <>
    {loading && <Loader actionLabel="Fetching..."/>}
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
      <HeaderBox/>
      <SearchBox/>
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
        </>
  );
};

export default Home;
