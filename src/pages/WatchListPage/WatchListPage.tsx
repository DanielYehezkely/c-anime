import React, { useState } from "react";
import { useFirebase } from "../../context/FirebaseContext/FirebaseContext";
import {
  a11yProps,
  AnimeList,
  WatchlistTabPanel,
  WatchlistTabs,
} from "./components";
import { Loader } from "../../components";
import { StyledContainer, StyledTypography } from "./WatchListPage.styles"; // Import your styled components

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
      </StyledContainer>
    </>
  );
};

export default WatchListPage;
