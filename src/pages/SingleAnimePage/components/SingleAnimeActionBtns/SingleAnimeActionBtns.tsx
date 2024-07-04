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
  liked: boolean;
  disliked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setDisliked: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
}

const SingleAnimeActionBtns: React.FC<SingleAnimeActionBtnsProps> = ({
  anime,
  setLiked,
  setDisliked,
  likeCount,
  setLikeCount,
}) => {
  const { addToWatchlist, likeAnime, dislikeAnime } = useAuth();

  const handleAddToWatchlist = () => addToWatchlist(String(anime.mal_id));
  const handleLikeAnime = async () => {
    await likeAnime(String(anime.mal_id));
    setLiked(true);
    setDisliked(false);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleDislikeAnime = async () => {
    await dislikeAnime(String(anime.mal_id));
    setDisliked(true);
    setLiked(false);
    setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <ActionButtonsContainer>
      <TrailerButton href={anime.trailer.url}>Watch Trailer</TrailerButton>
      <MangaButton variant="contained" href={anime.url}>
        Read Manga
      </MangaButton>
      <LikeButton variant="contained" onClick={handleLikeAnime}>
        Like <LikeIcon /> {likeCount}
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
