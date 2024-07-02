import React from "react";
import { Anime } from "../../../../types/Anime";
import {
  ThumbDown as DislikeIcon,
  ThumbUp as LikeIcon,
} from "@mui/icons-material";
import {
  ActionButtonsContainer,
  TrailerButton,
  MangaButton,
  LikeButton,
  UnlikeButton,
  WatchlistButton,
} from "./SingleAnimeActionBtns.styles";

interface SingleAnimeActionBtnsProps {
  anime: Anime;
}

const SingleAnimeActionBtns: React.FC<SingleAnimeActionBtnsProps> = ({
  anime,
}) => {
  return (
    <ActionButtonsContainer>
      <TrailerButton href={anime.trailer.url}>Watch Trailer</TrailerButton>
      <MangaButton
        variant="contained"
        href={anime.url}
      >
        Read Manga
      </MangaButton>
      <LikeButton variant="contained">
        Like <LikeIcon />
      </LikeButton>
      <UnlikeButton variant="contained">
        Unlike <DislikeIcon />
      </UnlikeButton>
      <WatchlistButton>Add to watch list</WatchlistButton>
    </ActionButtonsContainer>
  );
};

export default SingleAnimeActionBtns;
