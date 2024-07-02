import { Container } from "@mui/material";
import React from "react";

import theme from "../../MUI/theme";
import { HeaderBox, SearchBox } from "./components";
import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Loader } from "../../components";
import CarouselShowcase from "../../components/CarouselShowcase/CarouselShowcase";

const Home: React.FC = () => {
  
  const { loading } = useAnimeApi();

  return (
    <>
      {loading && <Loader actionLabel="Fetching..." />}
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
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
        <HeaderBox />
        <SearchBox />
       <CarouselShowcase carouselLabel="Trending this season"/>
      </Container>
    </>
  );
};

export default Home;
