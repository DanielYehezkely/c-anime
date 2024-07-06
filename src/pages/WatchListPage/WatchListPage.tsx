import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { db } from "../../config/firebaseConfig";
import { Anime } from "../../types/Anime";
import { useAnime } from "../../context/FetchMalAnimeContext/FetchMalAnimeContext";
import { a11yProps, WatchlistTabPanel, WatchlistTabs } from "./components";
import AnimeList from "./components/AnimeGridList/AnimeList";
import { Loader } from "../../components";


const WatchListPage: React.FC = () => {
  const { user } = useAuth();
  const { combinedAnimeList, loading } = useAnime();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [doneWatchingList, setDoneWatchingList] = useState<string[]>([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState<Anime[]>([]);
  const [filteredDoneWatchingList, setFilteredDoneWatchingList] = useState<
    Anime[]
  >([]);
  const [value, setValue] = useState(0);

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
      setWatchlist(watchlist.filter((animeId) => animeId !== id.toString()));
      setDoneWatchingList(
        doneWatchingList.filter((animeId) => animeId !== id.toString())
      );
      setFilteredWatchlist(
        filteredWatchlist.filter((anime) => anime.mal_id !== id)
      );
      setFilteredDoneWatchingList(
        filteredDoneWatchingList.filter((anime) => anime.mal_id !== id)
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
      setWatchlist(watchlist.filter((animeId) => animeId !== id.toString()));
      setDoneWatchingList([...doneWatchingList, id.toString()]);
      setFilteredWatchlist(
        filteredWatchlist.filter((anime) => anime.mal_id !== id)
      );
      const movedAnime = filteredWatchlist.find((anime) => anime.mal_id === id);
      if (movedAnime) {
        setFilteredDoneWatchingList((prev) => [...prev, movedAnime]);
      }
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {loading && <Loader actionLabel="Loading Your Watchlist ..." />}
      <Container sx={{ paddingTop: "10rem" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          My Anime Lists
        </Typography>
        <WatchlistTabs
          value={value}
          handleChange={handleChange}
          a11yProps={a11yProps}
        />
        <WatchlistTabPanel value={value} index={0}>
        <AnimeList
        animeList={filteredWatchlist}
        emptyMessage="Your Watchlist is Empty"
        handleDoneWatching={handleDoneWatching}
        handleRemove={handleRemove}
        />
        </WatchlistTabPanel>
        <WatchlistTabPanel value={value} index={1}>
          <AnimeList animeList={filteredDoneWatchingList} emptyMessage="Your Done Watchinglist is Empty" handleDoneWatching={handleDoneWatching} handleRemove={handleRemove}/>
        </WatchlistTabPanel>
      </Container>
    </>
  );
};

export default WatchListPage;
