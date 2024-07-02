import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Anime } from "../../../../types/Anime";
import { SingleAnimeCardBox } from "./SingleAnimeCard.styles";

interface SingleAnimeCardProp {
  anime: Anime;
}

const SingleAnimeCard:React.FC<SingleAnimeCardProp> = ({ anime }) => {
  return (
    <SingleAnimeCardBox>
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
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
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
    </SingleAnimeCardBox>
  );
};

export default SingleAnimeCard;
