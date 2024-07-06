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
import { useDebounce } from "../../../../hooks/useDebounce";

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
  disliked,
}) => {
  const { user, addToWatchlist } = useAuth();
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

  const debouncedLikeAnime = useDebounce(async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    console.log("debounce");

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
        setIsLikedClicked(true);
        setIsDislikedClicked(false);
      }
    }
  }, 500);

  const debouncedDislikeAnime = useDebounce(async () => {
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
        setIsDislikedClicked(true);
        setIsLikedClicked(false);
      }
    }
  }, 500);

  const handleAddToWatchlist = async () => {
    if (!user) return;
    await addToWatchlist(String(anime.mal_id));
  };

  return (
    <>
      <ActionButtonsContainer>
        <TrailerButton
          // @ts-ignore
          component="a"
          href={anime.trailer.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Trailer
        </TrailerButton>
        <MangaButton
          // @ts-ignore
          component="a"
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
        >
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
          <LikeButton variant="contained" onClick={debouncedLikeAnime}>
            <LikeIcon isLikedClicked={isLikedClicked} liked={liked} />{" "}
            {likeCount}
          </LikeButton>
          <DislikeButton variant="contained" onClick={debouncedDislikeAnime}>
            <DislikeIcon
              isDislikedClicked={isDislikedClicked}
              disliked={disliked}
            />
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
