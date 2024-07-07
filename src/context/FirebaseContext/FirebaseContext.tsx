import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  collection,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../AuthContext/AuthContext";
import { useAnime } from "../FetchMalAnimeContext/FetchMalAnimeContext";
import { db } from "../../config/firebaseConfig";
import { FirebaseContextProps } from "./FirebaseContext.types";
import { Timestamp } from "firebase/firestore";
import { useDebounce } from "../../hooks/useDebounce";
import { Anime } from "../../types/Anime";

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
  const [userAvatars, setUserAvatars] = useState<{ [key: string]: string }>({});

  const memoizedCombinedAnimeList = useMemo(
    () => combinedAnimeList,
    [combinedAnimeList]
  );

  const fetchLists = useDebounce(async () => {
    if (user) {
      console.log(`Fetching lists for user: ${user.uid}`);
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      console.log(`Read user document for user: ${user.uid}`);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const watchlistIds = userData.watchlist || [];
        const doneWatchingIds = userData.doneWatching || [];

        const filteredWatchlist = memoizedCombinedAnimeList.filter((anime) =>
          watchlistIds.includes(anime.mal_id.toString())
        );
        const filteredDoneWatchingList = memoizedCombinedAnimeList.filter(
          (anime) => doneWatchingIds.includes(anime.mal_id.toString())
        );

        setWatchlist(filteredWatchlist);
        setDoneWatchingList(filteredDoneWatchingList);
        console.log(`Set watchlist and doneWatchingList for user: ${user.uid}`);
      }
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchLists();
  }, [user, memoizedCombinedAnimeList]);

  const fetchUserAvatars = useCallback(
    async (comments: any[]) => {
      console.log(`Fetching user avatars for comments`);
      const avatars: { [key: string]: string } = { ...userAvatars };
      const userIdsToFetch = comments
        .map((comment) => comment.userId)
        .filter((userId) => !avatars[userId]);

      if (userIdsToFetch.length > 0) {
        const usersQuery = query(
          collection(db, "users"),
          where("uid", "in", userIdsToFetch)
        );
        const usersSnapshot = await getDocs(usersQuery);
        usersSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          avatars[userDoc.id] = userData.photoURL || "";
          console.log(`Read user document for user: ${userDoc.id}`);
        });
      }

      setUserAvatars(avatars);
    },
    [userAvatars]
  );

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
        fetchUserAvatars,
        userAvatars,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
