import { Box } from "@mui/material";
import React from "react";

const AnimeImage:React.FC = () => {
  return (
    <Box
      position="fixed"
      component="img"
      src="/assets/images/pngwing.com.png"
      sx={{
        width: {
          xs: "12rem", // width for extra small screens
          sm: "20rem", // width for small screens
          md: "25rem", // width for medium screens
          lg: "30rem", // width for large screens
          xl: "35rem", // width for extra large screens
        },
        height: {
          xs: "20rem", // height for extra small screens
          sm: "30rem", // height for small screens
          md: "40rem", // height for medium screens
          lg: "50rem", // height for large screens
          xl: "60rem", // height for extra large screens
        },
        bottom: 0,
        right: {
          xs: "32%", // right position for extra small screens
          sm: "7%", // right position for small screens
          md: "10%", // right position for medium screens
          lg: "12%", // right position for large screens
          xl: "15%", // right position for extra large screens
        },
      }}
    />
  );
};

export default AnimeImage;
