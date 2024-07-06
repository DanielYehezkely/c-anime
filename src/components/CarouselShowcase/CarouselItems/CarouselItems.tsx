import React from "react";
import { Box } from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CarouselItems.css";
import { Anime } from "../../../types/Anime";
import CarouselAnimeCard from "../CarouselAnimeCard/CarouselAnimeCard";

interface CarouselItemsProps {
  onSlideChange: (currentSlide: number) => void;
  swiperRef: any;
  animeList: Anime[];
}

const CarouselItems: React.FC<CarouselItemsProps> = ({
  onSlideChange,
  swiperRef,
  animeList,
}) => {
 
  return (
    <Box
      component="section"
      sx={{
        height: "50rem",
        width: "100%",
        zIndex: 10,
        marginBottom: "6rem",
      }}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        spaceBetween={20}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        speed={800}
        onSlideChange={() => onSlideChange(swiperRef.current.swiper.realIndex)}
      >
        {animeList.map((anime) => (
          
          <SwiperSlide key={anime.mal_id} style={{ width: "25rem" }}>
            <CarouselAnimeCard anime={anime} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselItems;
