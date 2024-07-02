import React from "react";
import {
  SingleAnimeCardBox,
  SingleAnimeContent,
  SynopsisTypography,
  TitleTypography,
  YearTypography,
  
} from "./SingleAnimeCard.styles";
import { CardMedia } from "@mui/material";
import { Anime } from "../../../../types/Anime";

interface SingleAnimeCardProp {
  anime: Anime;
}

const SingleAnimeCard: React.FC<SingleAnimeCardProp> = ({ anime }) => {
  return (
    <SingleAnimeCardBox component="header">
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
      <SingleAnimeContent>
        <TitleTypography variant="h3" gutterBottom>
          {anime.title}
        </TitleTypography>
        <SynopsisTypography variant="body1">
          {anime.synopsis}
        </SynopsisTypography>
        <YearTypography variant="h5">
          {anime.season} {anime.year}
        </YearTypography>
      </SingleAnimeContent>
    </SingleAnimeCardBox>
  );
};

export default SingleAnimeCard;
