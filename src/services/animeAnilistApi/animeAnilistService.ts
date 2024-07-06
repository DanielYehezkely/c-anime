import axios from "axios";
import { Anime } from "../../types/Anime";

const ANILIST_API_URL = import.meta.env.VITE_ANILIST_API_URL;

const getAnimeBannerByTitle = async (anime: Anime): Promise<string | null> => {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        bannerImage
      }
    }
  `;
  const variables = {
    search: anime.title,
  };

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`GET_ANIME_ERR_MSG: ${response.statusText}`);
    }

    return response.data.data.Media.bannerImage;
  } catch (error: any) {
    throw new Error(`GET_ANIME_ERR_MSG: ${error.message}`);
  }
};

export default getAnimeBannerByTitle;
