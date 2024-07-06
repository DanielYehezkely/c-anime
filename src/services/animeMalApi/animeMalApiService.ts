import axios from "axios";
import { Anime, AnimeResponse } from "../../types/Anime";

const JIKAN_API_BASE_URL = import.meta.env.VITE_JIKAN_API_BASE_URL;
const JIKAN_API_TOP_ANIME_URL = import.meta.env.VITE_JIKAN_API_TOP_ANIME_URL;

export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<AnimeResponse>(JIKAN_API_BASE_URL);
    return response.data.data;
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
