import axios from "axios";
import { Anime } from "../../types/Anime"; 

const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "X-MAL-CLIENT-ID": CLIENT_ID,
  },
});

interface AnimeApiResponse {
  data: Anime[];
}

export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axiosInstance.get<AnimeApiResponse>(
      "/anime?q=one&limit=4"
    );
    return response.data.data; 
  } catch (error: unknown) {
    throw new Error("Error occurred while fetching the anime list.");
  }
};
