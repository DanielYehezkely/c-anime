import { useEffect, useState } from "react";
import { getAnimeList } from "../services/animeApi/animeApiService";
import { Anime } from "../types/Anime";

export const useAnimeApi = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initially set loading to true

  const fetchAnime = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getAnimeList();
      setAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchAnime(); // Fetch anime data when the component mounts
  }, []);

  return { animeList, error, loading };
};
