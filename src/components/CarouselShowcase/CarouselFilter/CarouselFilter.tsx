import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GENRES_FILTER } from "../../../constants/globalConstants";

import "./CarouselFilter.css";

interface CarouselFilterProps {
  onFilterChange: (genre: string) => void;
}

const CarouselFilter: React.FC<CarouselFilterProps> = ({ onFilterChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth === scrollWidth);
    }
  };

  const scrollToMax = (direction: "left" | "right") => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollLeft = 0;
      } else if (direction === "right") {
        scrollRef.current.scrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      }
      checkScrollPosition();
    }
  };

  useEffect(() => {
    checkScrollPosition();
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleFilterClick = (genre: string) => {
    setActiveFilter(genre);
    onFilterChange(genre);
  };

  return (
    <Box
      component="section"
      className={`carousel-filter-container ${isAtStart ? "at-start" : ""} ${
        isAtEnd ? "at-end" : ""
      }`}
    >
      <IconButton
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "1.2rem",
        }}
        onClick={() => scrollToMax("left")}
      >
        <ArrowBackIosIcon
          sx={{
            color: "white",
            fontSize: "2.5rem",
            zIndex: 2,
          }}
        />
      </IconButton>
      <Box component="div" className="carousel-filter" ref={scrollRef}>
        {GENRES_FILTER.map((genre) => (
          <Box
            key={genre}
            className={`filter-item ${activeFilter === genre ? "active" : ""}`}
            onClick={() => handleFilterClick(genre)}
          >
            {genre}
          </Box>
        ))}
      </Box>
      <IconButton
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "1.2rem",
        }}
        onClick={() => scrollToMax("right")}
      >
        <ArrowForwardIosIcon
          sx={{
            color: "white",
            fontSize: "2.5rem",
            zIndex: 2,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default CarouselFilter;
