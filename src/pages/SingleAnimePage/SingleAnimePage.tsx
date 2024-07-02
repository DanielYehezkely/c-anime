import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Anime } from "../../types/Anime";
import getAnimeBannerByTitle from "../../services/animeMalApi/animeAnilistService";

import { Loader } from "../../components";
import { CarouselShowcase, CommentSection, SingleAnimeActionBtns, SingleAnimeCard, SingleAnimeData } from "./components";

import { SingleAnimePageContainer, UnderlayBackgroundBox } from "./SingleAnimePage.styles";


const SingleAnimePage: React.FC = () => {
  
  const { animeId } = useParams<{ animeId: string }>();
  const { animeList } = useAnimeApi();
  const [bannerImageBackground, setBannerImageBackground] = useState<   //*Todo - Refactor the api call to a context / hook
    string | null 
  >(null);

  const anime = animeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );

  useEffect(() => {
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  if (!anime) {
    return <Loader actionLabel="fetching..." />;
  }

  return (
    <SingleAnimePageContainer  maxWidth={false}>
      <UnderlayBackgroundBox
      component="div"
        style={{
          backgroundImage: `
      linear-gradient(to right, #000000 10%, rgba(0, 0, 0, 0.425) 50%),
      linear-gradient(to top, #0C0C0C, #00000000 20%),
      url(${bannerImageBackground || anime.images.jpg.large_image_url})
    `,
        }}
      />
    <SingleAnimeCard anime={anime}/>
     <SingleAnimeData anime={anime}/>
     <SingleAnimeActionBtns anime={anime}/>
      <CommentSection/>
      <CarouselShowcase carouselLabel={"Recommendations"} />
    </SingleAnimePageContainer>
  );
};

export default SingleAnimePage;
