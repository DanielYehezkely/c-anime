import { Anime } from "../../types/Anime";

export interface AnimeContextProps {
  trendingAnimeList: Anime[];
  animeList: Anime[];
  error: string | null;
  loading: boolean;
  fetchAnimeList: () => Promise<void>;
}
