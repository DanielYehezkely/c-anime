import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { Anime } from "../../types/Anime";
import { useAuth } from "../AuthContext/AuthContext";
import { useAnime } from "../FetchMalAnimeContext/FetchMalAnimeContext";
import { db } from "../../config/firebaseConfig";
import { FirebaseContextProps } from "./FirebaseContext.types";

const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { combinedAnimeList } = useAnime();
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [doneWatchingList, setDoneWatchingList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const watchlistIds = userData.watchlist || [];
          const doneWatchingIds = userData.doneWatching || [];

          const filteredWatchlist = combinedAnimeList.filter((anime) =>
            watchlistIds.includes(anime.mal_id.toString())
          );
          const filteredDoneWatchingList = combinedAnimeList.filter((anime) =>
            doneWatchingIds.includes(anime.mal_id.toString())
          );

          setWatchlist(filteredWatchlist);
          setDoneWatchingList(filteredDoneWatchingList);
        }
      }
      setLoading(false);
    };

    fetchLists();
  }, [user, combinedAnimeList]);

  const handleRemove = async (id: number) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        watchlist: arrayRemove(id.toString()),
        doneWatching: arrayRemove(id.toString()),
      });

      setWatchlist((prev) => prev.filter((anime) => anime.mal_id !== id));
      setDoneWatchingList((prev) =>
        prev.filter((anime) => anime.mal_id !== id)
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

      const movedAnime = watchlist.find((anime) => anime.mal_id === id);
      setWatchlist((prev) => prev.filter((anime) => anime.mal_id !== id));
      if (movedAnime) {
        setDoneWatchingList((prev) => [...prev, movedAnime]);
      }
    }
  };

  const addToWatchlist = async (animeId: string) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        watchlist: arrayUnion(animeId),
      });

      const animeToAdd = combinedAnimeList.find(
        (anime) => anime.mal_id.toString() === animeId
      );
      if (animeToAdd) {
        setWatchlist((prev) => [...prev, animeToAdd]);
      }
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        watchlist,
        doneWatchingList,
        loading,
        handleRemove,
        handleDoneWatching,
        addToWatchlist,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};