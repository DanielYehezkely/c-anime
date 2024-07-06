import React from "react";
import { Link } from "react-router-dom";

import { Card, CardMedia } from "@mui/material";
import { Anime } from "../../../../../types/Anime";

import {
 ButtonsBox,
 Description,
 EpisodeSubtitle,
 WatchTrailerButton,
  ContentBox,
  Content,
  Title,
  ViewDetailsButton
} from "./AnimeCardShow.styles";

const AnimeCardShow: React.FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        width: "70rem",
        gap: "2rem",
        bgcolor: "transparent",
      }}
    >
      <ContentBox>
        <Content>
          <Title variant="h3">{anime.title}</Title>
          <EpisodeSubtitle variant="subtitle1" color="text.secondary">
            {`${anime.episodes} Episodes`}
          </EpisodeSubtitle>
          <Description
            variant="subtitle1"
            color="text.secondary"
            className="custom-scrollbar"
          >
            {anime.synopsis}
          </Description>
        </Content>
        <ButtonsBox>
          <WatchTrailerButton
            //@ts-ignore
            target="_blank"
            variant="outlined"
            href={anime.trailer.url}
          >
            Watch Trailer
          </WatchTrailerButton>
          <ViewDetailsButton
            variant="outlined"
            //@ts-ignore
            component={Link}
            to={`/singleAnime/${anime.mal_id}`}
          >
            View Details
          </ViewDetailsButton>
        </ButtonsBox>
      </ContentBox>
      <CardMedia
        component="img"
        sx={{ width: "20rem", borderRadius: "1rem", height: "90%" }}
        image={anime.images.webp.image_url}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default AnimeCardShow;
