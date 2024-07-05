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
  doc,
  getDocs,
  getDoc,
  query,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
}) => {
  const { user, addToWatchlist } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

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

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (!userData.likedAnimes.includes(String(anime.mal_id))) {
        await updateDoc(userRef, {
          likedAnimes: arrayUnion(String(anime.mal_id)),
          dislikedAnimes: arrayRemove(String(anime.mal_id)),
        });
        setLiked(true);
        setDisliked(false);
        setLikeCount((prevCount) => prevCount + 1);
        setIsLiked(true); 
        setIsDisliked(false);
      }
    }
  };

  const handleDislikeAnime = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (!userData.dislikedAnimes.includes(String(anime.mal_id))) {
        await updateDoc(userRef, {
          dislikedAnimes: arrayUnion(String(anime.mal_id)),
          likedAnimes: arrayRemove(String(anime.mal_id)),
        });
        setDisliked(true);
        setLiked(false);
        setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setIsDisliked(true); 
        setIsLiked(false);
      }
    }
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
        <Box display="flex">
        <LikeButton variant="contained" onClick={handleLikeAnime}>
          <LikeIcon isLiked={isLiked} /> {likeCount}
        </LikeButton>
        <DislikeButton variant="contained" onClick={handleDislikeAnime}>
          <DislikeIcon isDisliked={isDisliked} />
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
