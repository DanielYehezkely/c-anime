import axios from "axios";
import {  Anime, AnimeResponse } from "../../types/Anime"; 

export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<AnimeResponse>(
      "https://api.jikan.moe/v4/top/anime"
    );
    return response.data.data; 
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GET_ANIME_ERR_MSG: ${error.message}`);
    }
    throw new Error("GET_ANIME_ERR_MSG: An unexpected error occurred");
  }
};



