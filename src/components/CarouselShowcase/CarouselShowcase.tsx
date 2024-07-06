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
  const { trendingAnimeList, airingAnimeList, topAnimeList } = useAnime();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredAnimeList, setFilteredAnimeList] = useState<Anime[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    switch (carouselLabel) {
      case "Recommendations":
        setFilteredAnimeList(trendingAnimeList);
        break;
      case "Relations":
        setFilteredAnimeList(airingAnimeList);
        break;
      case "Top 25":
        setFilteredAnimeList(topAnimeList);
        break;
      default:
        setFilteredAnimeList(trendingAnimeList);
        break;
    }
  }, [carouselLabel, trendingAnimeList, airingAnimeList, topAnimeList]);

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
      switch (carouselLabel) {
        case "Recommendations":
          setFilteredAnimeList(trendingAnimeList);
          break;
        case "Relations":
          setFilteredAnimeList(airingAnimeList);
          break;
        case "Top 25":
          setFilteredAnimeList(topAnimeList);
          break;
        default:
          setFilteredAnimeList(trendingAnimeList);
          break;
      }
    } else {
      const listToFilter =
        carouselLabel === "Recommendations"
          ? trendingAnimeList
          : carouselLabel === "Relations"
          ? airingAnimeList
          : topAnimeList;

      const filteredList = listToFilter.filter((anime) =>
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
        pageCount={filteredAnimeList.length - 4}
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
