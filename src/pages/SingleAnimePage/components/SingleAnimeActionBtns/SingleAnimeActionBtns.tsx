import React, { useEffect } from "react";
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
      }
    }
  };

  const handleAddToWatchlist = () => addToWatchlist(String(anime.mal_id));

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
