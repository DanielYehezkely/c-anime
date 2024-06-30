import { useEffect, useState } from "react"
import { getAnimeList } from "../services/animeApi/animeApiService";
import {  AnimeNode } from "../types/Anime";

export const useAnimeApi = () => {
  
  const [animeList, setAnimeList] = useState<AnimeNode[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnime = async () => {
    setError(null);
    setLoading(true);
    try {
      const animeList = await getAnimeList();
      setAnimeList(animeList)
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    
   fetchAnime();
  }, []);
 

  return {animeList ,error, loading}
}