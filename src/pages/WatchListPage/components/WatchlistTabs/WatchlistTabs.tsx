import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

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
    </Box>
  );
};

export default WatchlistTabs;
