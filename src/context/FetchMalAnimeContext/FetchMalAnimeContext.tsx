import React, { createContext, useContext, useEffect, useState } from "react";

import { Anime } from "../../types/Anime";
import { getTopAnimeData } from "../../services/animeMalApi/animeMalApiService";
import { ContextProviderProp } from "../../types/Context";

interface AnimeContextProps {
  trendingAnimeList: Anime[];
  error: string | null;
  loading: boolean;
  fetchTrendingAnime: () => Promise<void>;
}

const AnimeContext = createContext<AnimeContextProps | undefined>(undefined);

export const AnimeProvider: React.FC<ContextProviderProp> = ({ children }) => {
  const [trendingAnimeList, settrendingAnimeList] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrendingAnime = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTopAnimeData("bypopularity");
      settrendingAnimeList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingAnime();
  }, []);

  return (
    <AnimeContext.Provider
      value={{ trendingAnimeList, error, loading, fetchTrendingAnime }}
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
