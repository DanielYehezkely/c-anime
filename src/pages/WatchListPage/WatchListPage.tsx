import React, { useState } from "react";
import { useFirebase } from "../../context/FirebaseContext/FirebaseContext";
import {
  a11yProps,
  AnimeList,
  WatchlistTabPanel,
  // WatchlistTabs,
} from "./components";
import { Loader } from "../../components";
import { StyledContainer, StyledTypography } from "./WatchListPage.styles"; // Import your styled components
import { Tab, Tabs } from "@mui/material";

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
      <StyledContainer>
        <StyledTypography variant="h4" gutterBottom>
          My Anime Lists
        </StyledTypography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="anime lists tabs"
          sx={{
            "& .MuiTab-root": {
              color: "white",
            },
            "& .css-bjr47-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: "#ffffe0",
              fontSize: "1.6rem",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              backgroundColor: "#0c0c0c",
              border: "1px solid #ffffff57",
              borderBottom: "none",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label="Watchlist" {...a11yProps(0)} />
          <Tab label="Done Watching" {...a11yProps(1)} />
        </Tabs>
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
      </StyledContainer>
    </>
  );
};

export default WatchListPage;
