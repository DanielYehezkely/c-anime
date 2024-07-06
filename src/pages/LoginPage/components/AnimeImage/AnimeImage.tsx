import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import theme from "../../../../MUI/theme";

const AnimeImage:React.FC = () => {
  
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box
      position="fixed"
      component="img"
      src={
        isXs
          ? "/assets/images/Naruto-Akatsuki-PNG-Transparent-Image.png"
          : "/assets/images/pngwing.com.png"
      }
      sx={{
        width: {
          xs: "50%",
          sm: "20rem", 
        },
        height: {
          xs: "20%", 
          sm: "30rem", 
         
        },
        bottom: isXs ? "5%" : 0 ,
        right: {
          xs: "30%", 
          sm: "7%", 
        },
      }}
    />
  );
};

export default AnimeImage;
