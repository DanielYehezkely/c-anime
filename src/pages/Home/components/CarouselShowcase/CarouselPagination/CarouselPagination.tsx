import React from "react";

import { Box } from "@mui/material";

import './CarouselPagination.css'

interface CarouselPaginationProps {
  label: string;
}

const CarouselPagination: React.FC<CarouselPaginationProps> = ({ label, }) => {
  return (

    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems:"center",
        border: "1px solid white",
        height: "7.5rem",
        width: "100%",
        paddingLeft: "1.5rem"
      }}
    >
      <h1 className="carousel-label">{label}</h1>
    </Box>
  );
};

export default CarouselPagination;
