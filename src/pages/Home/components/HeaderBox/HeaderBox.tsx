import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AnimeCardShow from "./AnimeCardShow/AnimeCardShow";
import { Anime } from "../../../../types/Anime";
import { useAnimeApi } from "../../../../hooks/useAnimeApi";
import getAnimeBannerByTitle from "../../../../services/animeMalApi/animeAnilistService";

const HeaderBox: React.FC = () => {
  
  const { animeList } = useAnimeApi();
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [translateY, setTranslateY] = useState<string>("0rem");

  useEffect(() => {
    if (animeList.length > 0) {
      const updateAnime = async () => {
        setOpacity(0);
        setTranslateY("-3.5rem");
        setTimeout(async () => {
          const index = Math.floor(Math.random() * animeList.length);
          const selectedAnime = animeList[index];
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
  }, [animeList]);

  if (!currentAnime) {
    return <div>No anime found.</div>;
  }

  return (
    <>
      <Box
        position="absolute"
        sx={{
          right: 0,
          height: "54rem",
          width: "95%",
          zIndex: 1,
          transition:
            "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
          backgroundImage: `linear-gradient(to top, rgba(12, 12, 12, 1), rgba(0, 0, 0, 0.445) 30%), url(${
            bannerImage || currentAnime.images.webp.large_image_url
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: opacity,
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
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          opacity: opacity,
          transform: `translateY(${translateY})`,
        }}
      >
        <AnimeCardShow anime={currentAnime} />
      </Box>
    </>
  );
};

export default HeaderBox;
