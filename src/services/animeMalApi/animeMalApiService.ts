import axios from "axios";
import { Anime, AnimeResponse } from "../../types/Anime";

const JIKAN_API_BASE_URL = import.meta.env.VITE_JIKAN_API_BASE_URL;
const JIKAN_API_TOP_ANIME_URL = import.meta.env.VITE_JIKAN_API_TOP_ANIME_URL;

// export const getAnimeList = async (): Promise<Anime[]> => {
//   try {
//     const response = await axios.get<AnimeResponse>(JIKAN_API_BASE_URL);
//     return response.data.data;
//   } catch (error: any) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(`GET_ANIME_ERR_MSG: ${error.message}`);
//     }
//     throw new Error("GET_ANIME_ERR_MSG: An unexpected error occurred");
//   }
// };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAnimeList = async (): Promise<Anime[]> => {
  let allAnime: Anime[] = [];
  let currentPage = 1;
  const animePerPage = 25; // Jikan API returns 25 anime per page
  const totalAnime = 100; // Total number of anime we want to fetch
  const totalPages = Math.ceil(totalAnime / animePerPage);

  try {
    while (currentPage <= totalPages) {
      const response = await axios.get<AnimeResponse>(JIKAN_API_BASE_URL, {
        params: { page: currentPage },
      });
      allAnime = allAnime.concat(response.data.data);
      currentPage++;

      // Check if we need to delay to respect the rate limit
      if (currentPage % 3 === 0) {
        await delay(1000); // Delay for 1 second every 3 requests to respect the 3 requests/second limit
      }

      if (currentPage % 60 === 0) {
        await delay(60000); // Delay for 1 minute every 60 requests to respect the 60 requests/minute limit
      }
    }
    return allAnime;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GET_ANIME_ERR_MSG: ${error.message}`);
    }
    throw new Error("GET_ANIME_ERR_MSG: An unexpected error occurred");
  }
};

export const getTopAnimeData = async (
  filter: string = "",
  sfw: boolean = true
): Promise<Anime[]> => {
  try {
    const response = await axios.get<AnimeResponse>(JIKAN_API_TOP_ANIME_URL, {
      params: { filter, sfw },
    });
    return response.data.data;
  } catch (error: any) {
    console.error(`FETCH_ANIME_DATA_ERR: ${error}`);
    throw new Error("Failed to fetch anime data");
  }
};

export const getAnimePictures = async (id: number): Promise<string[]> => {
  try {
    const response = await axios.get<{
      data: { jpg: { image_url: string } }[];
    }>(`${JIKAN_API_BASE_URL}/${id}/pictures`);
    return response.data.data.map((picture) => picture.jpg.image_url);
  } catch (error: any) {
    console.error(`FETCH_ANIME_PICTURES_ERR: ${error}`);
    throw new Error("Failed to fetch anime pictures");
  }
};
