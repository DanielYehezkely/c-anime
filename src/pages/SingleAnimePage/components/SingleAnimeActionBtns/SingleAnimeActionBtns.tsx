import React, { useState, useEffect } from "react";
import { Anime } from "../../../../types/Anime";
import {
  LikeIcon,
  DislikeIcon,
  ActionButtonsContainer,
  TrailerButton,
  MangaButton,
  LikeButton,
  DislikeButton,
  WatchlistButton,
} from "./SingleAnimeActionBtns.styles";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { db } from "../../../../config/firebaseConfig";
import {
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { Box } from "@mui/material";

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
  liked,
  disliked
}) => {
  const { user, addToWatchlist, likeAnime, dislikeAnime } = useAuth();
  const [isLikedClicked, setIsLikedClicked] = useState(false);
  const [isDislikedClicked, setIsDislikedClicked] = useState(false);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const usersSnapshot = await getDocs(query(collection(db, "users")));
      let count = 0;
      usersSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        if (
          userData.likedAnimes &&
          userData.likedAnimes.includes(String(anime.mal_id))
        ) {
          count++;
        }
      });
      setLikeCount(count);
    };
    fetchLikeCount();
  }, [anime.mal_id, setLikeCount]);

 const handleLikeAnime = async () => {
   if (!user) return;

   await likeAnime(String(anime.mal_id));
   setLiked(true);
   setDisliked(false);
   setLikeCount((prevCount) => prevCount + 1);
   setIsLikedClicked(true);
   setIsDislikedClicked(false);
 };

   const handleDislikeAnime = async () => {
     if (!user) return;

     await dislikeAnime(String(anime.mal_id));
     setDisliked(true);
     setLiked(false);
     setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
     setIsDislikedClicked(true);
     setIsLikedClicked(false);
   };

  const handleAddToWatchlist = async () => {
    if (!user) return;
    await addToWatchlist(String(anime.mal_id));
  };

  return (
    <>
      <ActionButtonsContainer>
        <TrailerButton href={anime.trailer.url}>Watch Trailer</TrailerButton>
        <MangaButton variant="contained" href={anime.url}>
          Read Manga
        </MangaButton>
        <Box
          display="flex"
          sx={{
            border: "1px solid white",
            borderRadius: "3rem",
            overflow: "hidden",
          }}
        >
          <LikeButton variant="contained" onClick={handleLikeAnime}>
            <LikeIcon isLiked={isLikedClicked} liked={liked} /> {likeCount}
          </LikeButton>
          <DislikeButton variant="contained" onClick={handleDislikeAnime}>
            <DislikeIcon isDisliked={isDislikedClicked} disliked={disliked} />
          </DislikeButton>
        </Box>
        <WatchlistButton onClick={handleAddToWatchlist}>
          Add to Watchlist
        </WatchlistButton>
      </ActionButtonsContainer>
    </>
  );
};

export default SingleAnimeActionBtns;
