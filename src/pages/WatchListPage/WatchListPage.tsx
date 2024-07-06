import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { a11yProps, WatchlistTabPanel, WatchlistTabs } from "./components";
import AnimeList from "./components/AnimeGridList/AnimeList";
import { Loader } from "../../components";
import { useFirebase } from "../../context/FirebaseContext/FirebaseContext";

const WatchListPage: React.FC = () => {
  const {
    watchlist,
    doneWatchingList,
    loading,
    handleRemove,
    handleDoneWatching,
  } = useFirebase();
  const [value, setValue] = useState(0);

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
            animeList={watchlist}
            emptyMessage="Your Watchlist is Empty"
            handleDoneWatching={handleDoneWatching}
            handleRemove={handleRemove}
          />
        </WatchlistTabPanel>
        <WatchlistTabPanel value={value} index={1}>
          <AnimeList
            animeList={doneWatchingList}
            emptyMessage="Your Done Watchinglist is Empty"
            handleDoneWatching={handleDoneWatching}
            handleRemove={handleRemove}
          />
        </WatchlistTabPanel>
      </Container>
    </>
  );
};

export default WatchListPage;
