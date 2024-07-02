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

interface SingleAnimeDataProp {
  anime: Anime;
}

const SingleAnimeData: React.FC<SingleAnimeDataProp> = ({ anime }) => {
  return (
    <StyledCardContent>
      <RankTypography variant="h5" gutterBottom>
        Rank (out of 100): {anime.rank}
      </RankTypography>
      <BackgroundInfoTypography gutterBottom fontWeight="bold">
        {anime.background
          ? anime.background
          : "No Background Provided on this anime"}
      </BackgroundInfoTypography>
      <BodyTypography variant="body1" gutterBottom>
        Released : {anime.aired.string}
      </BodyTypography>
      <StreamTypography variant="h5">
        Daily Stream: {anime.broadcast.day}
      </StreamTypography>
      <StreamTypography variant="h5">
        Episodes : {anime.episodes}
      </StreamTypography>
      <RatingTypography variant="h5">{anime.rating}</RatingTypography>
    </StyledCardContent>
  );
};

export default SingleAnimeData;
