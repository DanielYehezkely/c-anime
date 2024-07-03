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
import { useAuth } from "../../../../context/AuthContext/AuthContext";

interface SingleAnimeActionBtnsProps {
  anime: Anime;
}

const SingleAnimeActionBtns: React.FC<SingleAnimeActionBtnsProps> = ({
  anime,
}) => {
  const { addToWatchlist, likeAnime, dislikeAnime } = useAuth();

const handleAddToWatchlist = () => addToWatchlist(String(anime.mal_id));
const handleLikeAnime = () => likeAnime(String(anime.mal_id));
const handleDislikeAnime = () => dislikeAnime(String(anime.mal_id));

  return (
    <ActionButtonsContainer>
      <TrailerButton href={anime.trailer.url}>Watch Trailer</TrailerButton>
      <MangaButton variant="contained" href={anime.url}>
        Read Manga
      </MangaButton>
      <LikeButton variant="contained" onClick={handleLikeAnime}>
        Like <LikeIcon />
      </LikeButton>
      <UnlikeButton variant="contained" onClick={handleDislikeAnime}>
        Unlike <DislikeIcon />
      </UnlikeButton>
      <WatchlistButton onClick={handleAddToWatchlist}>
        Add to Watchlist
      </WatchlistButton>
    </ActionButtonsContainer>
  );
};

export default SingleAnimeActionBtns;
