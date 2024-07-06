import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AnimeCardShow from "./AnimeCardShow/AnimeCardShow";
import { Anime } from "../../../../types/Anime";

import getAnimeBannerByTitle from "../../../../services/animeAnilistApi/animeAnilistService";
import HeaderBoxUnderlay from "./AnimeCardShow/HeaderBoxUnderlay";
import { useAnime } from "../../../../context/FetchMalAnimeContext/FetchMalAnimeContext";
import theme from "../../../../MUI/theme";

const HeaderBox: React.FC = () => {
  const { trendingAnimeList } = useAnime();
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [translateY, setTranslateY] = useState<string>("0rem");
   const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    if (trendingAnimeList.length > 0) {
      const updateAnime = async () => {
        setOpacity(0);
        setTranslateY("-3.5rem");
        setTimeout(async () => {
          const index = Math.floor(Math.random() * trendingAnimeList.length);
          const selectedAnime = trendingAnimeList[index];
          setCurrentAnime(selectedAnime);
          if (selectedAnime) {
            const bannerImg = await getAnimeBannerByTitle(selectedAnime);
            setBannerImage(bannerImg);
          }

          setOpacity(1);
          setTranslateY("0rem");
        }, 900);
      };
      updateAnime();
      const intervalId = setInterval(updateAnime, 8000);
      return () => clearInterval(intervalId);
    }
  }, [trendingAnimeList]);

  if (!currentAnime) {
    return <div>No anime found.</div>;
  }

return (
  <>
  {isXs &&
  <Box
    component="h1"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "10rem",
        width: "100%",
        color: "white",
        fontSize: "2.5rem",
        marginTop: "10rem",
      }}
      > 
      Welcome to My Anime App !
    </Box>
    }
    
    {!isXs && (
      <>
      <HeaderBoxUnderlay
        bannerImage={bannerImage}
        currentAnime={currentAnime}
        opacity={opacity}
      />
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          height: "30rem",
          width: "95%",
          zIndex: 10,
          marginTop: "10rem",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          opacity: opacity,
          transform: `translateY(${translateY})`,
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
        >
        <AnimeCardShow anime={currentAnime} />
      </Box>
        </>
    )}
  </>
);
};


export default HeaderBox;
