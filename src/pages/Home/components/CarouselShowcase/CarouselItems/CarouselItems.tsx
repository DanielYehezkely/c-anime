import React from "react";
import { Box } from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CarouselItems.css";
import { Anime } from "../../../../../types/Anime";

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
        height: "40rem",
        width: "100%",
        zIndex: 10,
        marginBottom: "6rem",
      }}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={5.5}
        spaceBetween={20}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        speed={800}
        onSlideChange={() => onSlideChange(swiperRef.current.swiper.realIndex)}
      >
        {animeList.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <div className="item">{anime.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselItems;
