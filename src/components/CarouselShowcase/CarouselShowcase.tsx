import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import CarouselPagination from "./CarouselPagination/CarouselPagination";
import CarouselFilter from "./CarouselFilter/CarouselFilter";
import CarouselItems from "./CarouselItems/CarouselItems";
import { CarouselShowcaseProps } from "./CarouselShowcase.types";
import { Anime } from "../../types/Anime";
import { useAnime } from "../../context/FetchMalAnimeContext/FetchMalAnimeContext";

const CarouselShowcase: React.FC<CarouselShowcaseProps> = ({
  carouselLabel,
}) => {
  const { trendingAnimeList } = useAnime();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredtrendingAnimeList, setFilteredtrendingAnimeList] = useState<
    Anime[]
  >([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setFilteredtrendingAnimeList(trendingAnimeList);
  }, [trendingAnimeList]);

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
      setFilteredtrendingAnimeList(trendingAnimeList);
    } else {
      const filteredList = trendingAnimeList.filter((anime) =>
        anime.genres.some((g) => g.name === genre)
      );
      setFilteredtrendingAnimeList(filteredList);
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
        pageCount={
          filteredtrendingAnimeList ? filteredtrendingAnimeList.length - 4 : 21
        }
        onPageChange={handlePageChange}
      />
      <CarouselFilter onFilterChange={handleFilterChange} />
      <CarouselItems
        onSlideChange={handleSlideChange}
        swiperRef={swiperRef}
        trendingAnimeList={filteredtrendingAnimeList}
      />
    </Box>
  );
};

export default CarouselShowcase;
