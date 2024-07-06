import { Anime } from "../../types/Anime";

export interface AnimeContextProps {
  airingAnimeList: Anime[];
  trendingAnimeList: Anime[];
  topAnimeList: Anime[];
  combinedAnimeList: Anime[];
  error: string | null;
  loading: boolean;
}
