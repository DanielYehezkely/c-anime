import { Box } from "@mui/material";
import React from "react";

const AnimeImage:React.FC = () => {
  return (
    <Box
      position="absolute"
      component="img"
      src="/assets/images/pngwing.com.png"
      sx={{
        width: "30rem",
        height: "50rem",
        bottom: "0",
        right: "10%",
      }}
    />
  );
};

export default AnimeImage;
