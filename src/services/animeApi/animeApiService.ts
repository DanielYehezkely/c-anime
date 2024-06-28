import axios from "axios";
import { Anime } from "../../types/Anime"; 
import { GET_ANIME_ERR_MSG } from "../../models/constants";

const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

const axiosInstance = axios.create({
  baseURL: "https://api.myanimelist.net/v2",
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
    console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
    console.log("MAL Client ID:", import.meta.env.VITE_MAL_CLIENT_ID);
    console.log(response.data);
    console.log(response.data.data);
    return response.data.data; 
  } catch (error: unknown) {
    throw new Error(GET_ANIME_ERR_MSG);
  }
};


