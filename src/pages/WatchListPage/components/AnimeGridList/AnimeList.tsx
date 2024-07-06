import React from "react";
import { Grid, Typography } from "@mui/material";
import { CarouselAnimeCard } from "../../../../components";
import { Anime } from "../../../../types/Anime";



interface AnimeListProps {
  animeList: Anime[];
  emptyMessage: string;
  handleRemove: (id: number) => void;
  handleDoneWatching: (id: number) => void;
}

const AnimeList: React.FC<AnimeListProps> = ({
  animeList,
  emptyMessage,
  handleRemove,
  handleDoneWatching,
}) => {
  if (animeList.length === 0) {
    return (
      <Typography variant="h6" sx={{ color: "white" }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {animeList.map((anime) => (
        <Grid item key={anime.mal_id} xs={12} sm={6} md={4}>
          <CarouselAnimeCard
            anime={anime}
            onRemove={handleRemove}
            onDoneWatching={handleDoneWatching}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimeList;
