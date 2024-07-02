import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import CarouselPagination from "./CarouselPagination/CarouselPagination";
import CarouselFilter from "./CarouselFilter/CarouselFilter";
import CarouselItems from "./CarouselItems/CarouselItems";
import { useAnimeApi } from "../../../../hooks/useAnimeApi";

const CarouselShowcase: React.FC = () => {
  const { animeList } = useAnimeApi(); //*TODO - refactor when i can no need to prop it i will make context out of the anime api
  const [currentPage, setCurrentPage] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (index: number) => {
    setCurrentPage(index);
    currentPage;
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(selected); 
    }
  };

    useEffect(() => {
      const interval = setInterval(() => {
        if (swiperRef.current) {
          const swiper = swiperRef.current.swiper;
          swiper.slideNext();
        }
      }, 5000);

      return () => clearInterval(interval); 
    }, []);

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
      <CarouselPagination
        currentPage={currentPage}
        label="Trending this season"
        pageCount={animeList ? animeList.length - 4 : 21} 
        onPageChange={handlePageChange}
      />
      <CarouselFilter />
      <CarouselItems
        onSlideChange={handleSlideChange}
        swiperRef={swiperRef}
        animeList={animeList}
      />
    </Box>
  );
};

export default CarouselShowcase;
