import axios from "axios";
import { AnimeApiResponse, AnimeNode } from "../../types/Anime"; 
import { GET_ANIME_ERR_MSG } from "../../constants/globalConstants";

const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "X-MAL-CLIENT-ID": CLIENT_ID,
  },
});



export const getAnimeList = async (): Promise<AnimeNode[]> => {
  try {
    const response = await axiosInstance.get<AnimeApiResponse>(
      "/anime?q=one&limit=1"
    );
    // console.log(response.data);
    // console.log(response.data.data);
    return response.data.data.map((item) => item.node); 
  } catch (error: unknown) {
    throw new Error(GET_ANIME_ERR_MSG);  
  }
};


