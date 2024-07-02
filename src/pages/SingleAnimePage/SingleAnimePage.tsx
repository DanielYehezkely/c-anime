import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Anime } from "../../types/Anime";
import getAnimeBannerByTitle from "../../services/animeMalApi/animeAnilistService";

import { Loader } from "../../components";
import {
  CarouselShowcase,
  CommentSection,
  SingleAnimeActionBtns,
  SingleAnimeCard,
  SingleAnimeData,
} from "./components";

import {
  SingleAnimePageContainer,
  UnderlayBackgroundBox,
} from "./SingleAnimePage.styles";

const SingleAnimePage: React.FC = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const { animeList } = useAnimeApi();
  const [bannerImageBackground, setBannerImageBackground] = useState<
    string | null
  >(null);
  const [scrollY, setScrollY] = useState<number>(0);

  const anime = animeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  const backgroundColor =
    scrollY > 150 ? "0.1" : 1 ;

  if (!anime) {
    return <Loader actionLabel="fetching..." />;
  }

  return (
    <SingleAnimePageContainer maxWidth={false}>
      <UnderlayBackgroundBox
        component="div"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 11%, rgba(0, 0, 0, 0.466) 50%),
            linear-gradient(to top, #0C0C0C, #00000000 20%),
            url(${bannerImageBackground || anime.images.jpg.large_image_url})
          `,
          opacity: backgroundColor,
        }}
      />
      <SingleAnimeCard anime={anime} />
      <SingleAnimeData anime={anime} />
      <SingleAnimeActionBtns anime={anime} />
      <CommentSection />
      <CarouselShowcase carouselLabel={"Recommendations"} />
      <CarouselShowcase carouselLabel={"Relations"} />
    </SingleAnimePageContainer>
  );
};

export default SingleAnimePage;
