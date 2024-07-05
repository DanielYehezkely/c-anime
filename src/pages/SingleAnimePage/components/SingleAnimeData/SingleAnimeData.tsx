import React from "react";
import {
  StyledCardContent,
  RankTypography,
  BodyTypography,
  StreamTypography,
  RatingTypography,
  BackgroundInfoTypography,
} from "./SingleAnimeData.styles";
import { Anime } from "../../../../types/Anime";
import { Rating } from "@mui/material";

interface SingleAnimeDataProp {
  anime: Anime;
}

const SingleAnimeData: React.FC<SingleAnimeDataProp> = ({ anime }) => {
  return (
    <StyledCardContent>
      <RankTypography variant="h5" gutterBottom>
        Score:
        <Rating
          name="anime-score"
          value={anime.score / 2}
          precision={0.5}
          readOnly
        />
        ({anime.score})
      </RankTypography>
      <BackgroundInfoTypography gutterBottom fontWeight="bold">
        {anime.background
          ? anime.background
          : "No Background Provided on this anime"}
      </BackgroundInfoTypography>
      <BodyTypography variant="body1" gutterBottom>
        Released: {anime.aired.string}
      </BodyTypography>
      <StreamTypography variant="h5">
        Daily Stream: {anime.broadcast.day}
      </StreamTypography>
      <StreamTypography variant="h5">
        Episodes: {anime.episodes}
      </StreamTypography>
      <RatingTypography variant="h5">{anime.rating}</RatingTypography>
    </StyledCardContent>
  );
};

export default SingleAnimeData;
