import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import CarouselPagination from "./CarouselPagination/CarouselPagination";
import CarouselFilter from "./CarouselFilter/CarouselFilter";
import CarouselItems from "./CarouselItems/CarouselItems";
import { useAnimeApi } from "../../hooks/useAnimeApi";
import { CarouselShowcaseProps } from "./CarouselShowcase.types";
import { Anime } from "../../types/Anime";

const CarouselShowcase: React.FC<CarouselShowcaseProps> = ({
  carouselLabel,
}) => {
  const { animeList } = useAnimeApi(); // *TODO - refactor when i can no need to prop it i will make context out of the anime api
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredAnimeList, setFilteredAnimeList] = useState<Anime[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setFilteredAnimeList(animeList);
  }, [animeList]);

  const handleSlideChange = (index: number) => {
    setCurrentPage(index);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(selected);
    }
  };

  const handleFilterChange = (genre: string) => {
    if (genre === "All") {
      setFilteredAnimeList(animeList);
    } else {
      const filteredList = animeList.filter((anime) =>
        anime.genres.some((g) => g.name === genre)
      );
      setFilteredAnimeList(filteredList);
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
        label={carouselLabel}
        pageCount={filteredAnimeList ? filteredAnimeList.length - 4 : 21}
        onPageChange={handlePageChange}
      />
      <CarouselFilter onFilterChange={handleFilterChange} />
      <CarouselItems
        onSlideChange={handleSlideChange}
        swiperRef={swiperRef}
        animeList={filteredAnimeList}
      />
    </Box>
  );
};

export default CarouselShowcase;
