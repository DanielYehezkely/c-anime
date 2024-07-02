import { CardContent, Typography } from "@mui/material";
import React from "react";
import { Anime } from "../../../../types/Anime";

interface SingleAnimeDataProp {
  anime: Anime;
}

const SingleAnimeData:React.FC<SingleAnimeDataProp> = ({ anime }) => {
  return (
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
        {anime.background
          ? anime.background
          : "No Background Provided on this anime"}
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
  );
};

export default SingleAnimeData;
