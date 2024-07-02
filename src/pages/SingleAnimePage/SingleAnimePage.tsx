import {
  Box,
  Container,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Anime } from "../../types/Anime";
import { Loader } from "../../components";
import getAnimeBannerByTitle from "../../services/animeMalApi/animeAnilistService";

const SingleAnimePage: React.FC = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const { animeList } = useAnimeApi();
  const [bannerImageBackground, setBannerImageBackground] = useState<
    string | null
  >(null);

  const anime = animeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );

  useEffect(() => {
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  if (!anime) {
    return <Loader actionLabel="fetching..." />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        component="div"
        sx={{
          position: "fixed",
          zIndex: 1,
          left: 0,
          width: "100%",
          minHeight: "85%",
          filter: "blur(1px)",
          backgroundImage: `
            linear-gradient(to right, #000000 10%, rgba(0, 0, 0, 0.425) 50%),
            linear-gradient(to top, #0c0c0c, rgba(0, 0, 0, 0) 20%),
            url(${bannerImageBackground || anime.images.jpg.large_image_url})
          `,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Box
        component="header"
        sx={{
          width: "95%",
          height: "25rem",
          zIndex: 2,
          marginTop: "10rem",
          display: "flex",
          padding: "2rem 0 0 2rem",
        }}
      >
        <CardMedia
          component="img"
          image={anime.images.jpg.large_image_url}
          alt={anime.title}
          sx={{
            width: "20rem",
            height: "22.5rem",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />

        <CardContent
          sx={{
            width: "50%",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {anime.title}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            fontSize="1.4rem"
            maxHeight="70%"
            overflow="scroll"
          >
            {anime.synopsis}
          </Typography>
          <Typography variant="h5" color="#9b9a9a">
            {anime.season} {anime.year}
          </Typography>
        </CardContent>
      </Box>
      <Box
        component="div"
        sx={{
          width: "95%",
          height: "27rem",
          zIndex: 2,
          display: "flex",
          padding: "0 0 0 2rem",
        }}
      >
        <CardContent
          sx={{
            width: "50%",

            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" color="#b967da">
            Rank (out of 100): {anime.rank}
          </Typography>
          <Typography component="p" gutterBottom fontWeight="bold">
            {anime.background}
          </Typography>
          <Typography variant="body1" gutterBottom fontSize="1.4rem">
            Released : {anime.aired.string}
          </Typography>
          <Typography variant="h5" color="#9b9a9a">
            Daily Stream: {anime.broadcast.day}
          </Typography>
          <Typography variant="h5" color="#9b9a9a">
            Episodes : {anime.episodes}
          </Typography>
          <Typography variant="h5" color="#d10707">
            {anime.rating}
          </Typography>
        </CardContent>
      </Box>
    </Container>
  );
};

export default SingleAnimePage;
