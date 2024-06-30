import { Box } from "@mui/material";
import React from "react";
import { useAnimeApi } from "../../../../hooks/useAnimeApi";
import AnimeCardShow from "./AnimeCardShow/AnimeCardShow";
import { Anime } from "../../../../types/Anime";


const HeaderBox: React.FC = () => {

  const { animeList } = useAnimeApi();

 

  if (animeList.length === 0) {
    return <div>No anime found.</div>;
  }

  const anime: Anime = animeList[0];

  console.log(animeList);

  return (
    <>
      <Box
        position="absolute"
        sx={{
          right: 0,
          height: "54rem",
          width: "95%",
          zIndex: 1,
          backgroundImage: `linear-gradient(to top, rgba(12, 12, 12, 1), rgba(0, 0, 0, 0) 30%), url(${anime.images.webp.large_image_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: "0.8",
          filter: "blur(1px)",
        }}
      ></Box>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          height: "30rem",
          width: "95%",
          zIndex: 10,
          marginTop: "10rem",
        }}
      >
        <AnimeCardShow anime={anime} />
      </Box>
    </>
  );
};

export default HeaderBox;
