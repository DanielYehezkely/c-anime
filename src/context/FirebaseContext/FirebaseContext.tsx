import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { Anime } from "../../types/Anime";
import { useAuth } from "../AuthContext/AuthContext";
import { useAnime } from "../FetchMalAnimeContext/FetchMalAnimeContext";
import { db } from "../../config/firebaseConfig";
import { FirebaseContextProps } from "./FirebaseContext.types";
import { Timestamp } from "firebase/firestore";

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
  const [comments, setComments] = useState<any[]>([]);
  const [doneWatchingList, setDoneWatchingList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchLists = async () => {
    console.log(`Fetching lists for user: ${user?.uid}`);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      console.log(`Read user document for user: ${user.uid}`);
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

  const fetchComments = async (animeId: string) => {
    const commentsRef = doc(db, "comments", animeId);
    const commentsDoc = await getDoc(commentsRef);
    setComments(commentsDoc.exists() ? commentsDoc.data().comments : []);
  };

  const addComment = async (animeId: string, comment: string) => {
    if (!user) return;
    const commentsRef = doc(db, "comments", animeId);
    const commentsDoc = await getDoc(commentsRef);
    const newComment = {
      id: `${user.uid}-${Timestamp.now().seconds}`,
      userId: user.uid,
      comment,
      timestamp: Timestamp.now(),
    };

    if (commentsDoc.exists()) {
      await updateDoc(commentsRef, {
        comments: arrayUnion(newComment),
      });
    } else {
      await setDoc(commentsRef, {
        comments: [newComment],
      });
    }

    setComments((prev) => [...prev, newComment]);
  };

  const deleteComment = async (animeId: string, commentId: string) => {
    const commentsRef = doc(db, "comments", animeId);
    const commentsDoc = await getDoc(commentsRef);
    if (commentsDoc.exists()) {
      const comments = commentsDoc
        .data()
        .comments.filter((comment: any) => comment.id !== commentId);
      await updateDoc(commentsRef, { comments });
      setComments(comments);
    }
  };

  const editComment = async (
    animeId: string,
    commentId: string,
    newComment: string
  ) => {
    const commentsRef = doc(db, "comments", animeId);
    const commentsDoc = await getDoc(commentsRef);
    if (commentsDoc.exists()) {
      const comments = commentsDoc
        .data()
        .comments.map((comment: any) =>
          comment.id === commentId
            ? { ...comment, comment: newComment }
            : comment
        );
      await updateDoc(commentsRef, { comments });
      setComments(comments);
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
        fetchComments,
        comments,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
