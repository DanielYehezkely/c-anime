import React, { createContext, useContext, useEffect, useState } from "react";
import { Anime } from "../../types/Anime";
import { getTopAnimeData } from "../../services/animeMalApi/animeMalApiService";
import { ContextProviderProp } from "../../types/Context";
import { AnimeContextProps } from "./FetchMalAnimeContext.types";

const AnimeContext = createContext<AnimeContextProps | undefined>(undefined);

const removeDuplicates = (animes: Anime[]): Anime[] => {
  const uniqueAnimes: { [key: string]: Anime } = {};
  animes.forEach((anime) => {
    uniqueAnimes[anime.mal_id] = anime;
  });
  return Object.values(uniqueAnimes);
};

export const AnimeProvider: React.FC<ContextProviderProp> = ({ children }) => {
  const [trendingAnimeList, setTrendingAnimeList] = useState<Anime[]>([]);
  const [topAnimeList, setTopAnimeList] = useState<Anime[]>([]);
  const [airingAnimeList, setAiringAnimeList] = useState<Anime[]>([]);
  const [combinedAnimeList, setCombinedAnimeList] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrendingAnime = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTopAnimeData("bypopularity");
      
      setTrendingAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopAnimeList = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTopAnimeData("");
      
      setTopAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiringAnimeList = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTopAnimeData("airing");
      
      setAiringAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingAnime();
    fetchTopAnimeList();
    fetchAiringAnimeList();
  }, []);

  useEffect(() => {
    const combined = removeDuplicates([
      ...trendingAnimeList,
      ...topAnimeList,
      ...airingAnimeList,
    ]);
    
    setCombinedAnimeList(combined);
  }, [trendingAnimeList, topAnimeList, airingAnimeList]);

  return (
    <AnimeContext.Provider
      value={{
        trendingAnimeList,
        topAnimeList,
        airingAnimeList,
        combinedAnimeList,
        error,
        loading,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnime = (): AnimeContextProps => {
  const context = useContext(AnimeContext);
  if (context === undefined) {
    throw new Error("useAnime must be used within an AnimeProvider");
  }
  return context;
};
