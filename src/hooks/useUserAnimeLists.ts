import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext/AuthContext";
import { useAnime } from "../context/FetchMalAnimeContext/FetchMalAnimeContext";
import { Anime } from "../types/Anime";
import { db } from "../config/firebaseConfig";


export const useUserAnimeLists = () => {
  const { user } = useAuth();
  const { combinedAnimeList } = useAnime();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [doneWatchingList, setDoneWatchingList] = useState<string[]>([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState<Anime[]>([]);
  const [filteredDoneWatchingList, setFilteredDoneWatchingList] = useState<
    Anime[]
  >([]);

  useEffect(() => {
    const fetchLists = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setWatchlist(userData.watchlist || []);
          setDoneWatchingList(userData.doneWatching || []);
        }
      }
    };

    fetchLists();
  }, [user]);

  useEffect(() => {
    if (combinedAnimeList.length && watchlist.length) {
      const filtered = combinedAnimeList.filter((anime) =>
        watchlist.includes(anime.mal_id.toString())
      );
      setFilteredWatchlist(filtered);
    }
  }, [combinedAnimeList, watchlist]);

  useEffect(() => {
    if (combinedAnimeList.length && doneWatchingList.length) {
      const filtered = combinedAnimeList.filter((anime) =>
        doneWatchingList.includes(anime.mal_id.toString())
      );
      setFilteredDoneWatchingList(filtered);
    }
  }, [combinedAnimeList, doneWatchingList]);

  const handleRemove = async (id: number) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        watchlist: arrayRemove(id.toString()),
        doneWatching: arrayRemove(id.toString()),
      });
      setWatchlist((prev) =>
        prev.filter((animeId) => animeId !== id.toString())
      );
      setDoneWatchingList((prev) =>
        prev.filter((animeId) => animeId !== id.toString())
      );
    }
  };

  const handleDoneWatching = async (id: number) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        watchlist: arrayRemove(id.toString()),
        doneWatching: arrayUnion(id.toString()),
      });
      setWatchlist((prev) =>
        prev.filter((animeId) => animeId !== id.toString())
      );
      setDoneWatchingList((prev) => [...prev, id.toString()]);
    }
  };

  return {
    watchlist: filteredWatchlist,
    doneWatchingList: filteredDoneWatchingList,
    handleRemove,
    handleDoneWatching,
  };
};
