import { useEffect, useState } from "react";
import { getTopAnimeData } from "../services/animeMalApi/animeMalApiService";
import { Anime } from "../types/Anime";

export const useAnimeApi = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnime = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTopAnimeData();
      setAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchAnime();
  }, []);

  return { animeList, error, loading, fetchAnime };
};
