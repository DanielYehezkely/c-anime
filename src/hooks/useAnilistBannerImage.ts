import { useEffect, useState } from "react";
import { Anime } from "../types/Anime";
import getAnimeBannerByTitle from "../services/animeAnilistApi/animeAnilistService";

const useAnilistBannerImage = (anime: Anime | undefined) => {
  const [bannerImageBackground, setBannerImageBackground] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  return bannerImageBackground;
};

export default useAnilistBannerImage;
