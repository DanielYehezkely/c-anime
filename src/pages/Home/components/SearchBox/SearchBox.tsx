import { Box } from "@mui/material";
import React from "react";

const SearchBox:React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        border: "1px solid white",
        height: "10rem",
        width: "95%",
        zIndex: 10,
      }}
    ></Box>
  );
};

export default SearchBox;
