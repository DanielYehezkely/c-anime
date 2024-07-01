import { Box } from "@mui/material";
import React from "react";
import CarouselPagination from "./CarouselPagination/CarouselPagination";
import CarouselFilter from "./CarouselFilter/CarouselFilter";

const CarouselShowcase:React.FC = () => {

  

  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "4rem",
      }}
    >
      <CarouselPagination label="Trending this season" pageCount={16} />
      <CarouselFilter/>
      <Box
        component="section"
        sx={{
          border: "1px solid white",
          height: "40rem",
          width: "100%",
          zIndex: 10,
          marginBottom: "6rem",
        }}
        />
    </Box>    
  );
};

export default CarouselShowcase;
