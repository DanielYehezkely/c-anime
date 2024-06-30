import React from "react";
import { Link } from "react-router-dom";

import { Button, Card, CardMedia } from "@mui/material";
import { Props } from "./AnimeCardShow.types";

import {
  StyledCard,
  StyledCardContent,
  StyledTitle,
  StyledSubtitle,
  StyledDescription,
  StyledButtonBox,
  StyledButton,
} from "./AnimeCardShow.styles";
import "./AnimeCardShow.css";

const AnimeCardShow: React.FC<Props> = ({ anime }) => {
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
      <StyledCard>
        <StyledCardContent>
          <StyledTitle variant="h3">{anime.title}</StyledTitle>
          <StyledSubtitle variant="subtitle1" color="text.secondary">
            {`${anime.episodes} Episodes`}
          </StyledSubtitle>
          <StyledDescription
            variant="subtitle1"
            color="text.secondary"
            className="custom-scrollbar"
          >
            {anime.background}
          </StyledDescription>
        </StyledCardContent>
        <StyledButtonBox>
          <StyledButton variant="outlined" href={anime.trailer.url}>
            Watch Trailer
          </StyledButton>
          <Button
            variant="outlined"
            component={Link}
            to={`/singleAnime/${anime.mal_id}`}
            sx={{
              fontSize: "1.4rem",
              height: "4rem",
              color: "white",
              border: "white 1px solid",
            }}
          >
            View Details
          </Button>
        </StyledButtonBox>
      </StyledCard>
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
