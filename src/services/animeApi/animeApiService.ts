import axios from "axios";
import {  Anime, AnimeResponse } from "../../types/Anime"; 
// import { GET_ANIME_ERR_MSG } from "../../constants/globalConstants";

// const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

// const axiosInstance = axios.create({
//   baseURL: "/api",
//   headers: {
//     "X-MAL-CLIENT-ID": CLIENT_ID,
//   },
// });


// export const getAnimeDetails = async (animeId: number): Promise<AnimeDetails> => {
//   try {
//     const response = await axiosInstance.get(`/anime/${animeId}`, {
//       params: {
//         fields:
//           "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics",
//       },
//     });
//     return response.data; // Assuming the data is formatted as expected
//   } catch (error) {
//     throw new Error("Failed to fetch anime details");
//   }
// };



export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<AnimeResponse>(
      "https://api.jikan.moe/v4/anime?&limit=1"
    );
    return response.data.data; 
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GET_ANIME_ERR_MSG: ${error.message}`);
    }
    throw new Error("GET_ANIME_ERR_MSG: An unexpected error occurred");
  }
};



