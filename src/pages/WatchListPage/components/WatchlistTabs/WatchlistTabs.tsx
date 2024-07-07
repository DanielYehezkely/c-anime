import React from "react";
import { Tab, Box } from "@mui/material";
import { StyledTabs } from "./WatchlistTabs.styles"; // Import your styled components

interface WatchlistTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  a11yProps: (index: number) => { id: string; "aria-controls": string };
}

const WatchlistTabs: React.FC<WatchlistTabsProps> = ({
  value,
  handleChange,
  a11yProps,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="anime lists tabs"
      >
        <Tab label="Watchlist" {...a11yProps(0)} />
        <Tab label="Done Watching" {...a11yProps(1)} />
      </StyledTabs>
    </Box>
  );
};

export default WatchlistTabs;
