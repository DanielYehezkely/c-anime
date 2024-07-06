import { Anime } from "../../types/Anime";

export interface FirebaseContextProps {
  watchlist: Anime[];
  doneWatchingList: Anime[];
  loading: boolean;
  handleRemove: (id: number) => Promise<void>;
  handleDoneWatching: (id: number) => Promise<void>;
  addToWatchlist: (animeId: string) => Promise<void>;
}
