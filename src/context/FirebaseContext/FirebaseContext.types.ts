import { Anime } from "../../types/Anime";
import { Comment } from "../../types/Comment";



export interface FirebaseContextProps {
  watchlist: Anime[];
  comments: Comment[];
  doneWatchingList: Anime[];
  loading: boolean;
  userAvatars: { [key: string]: string };
  handleRemove: (id: number) => Promise<void>;
  handleDoneWatching: (id: number) => Promise<void>;
  addToWatchlist: (animeId: string) => Promise<void>;
  fetchComments: (animeId: string) => Promise<void>;
  addComment: (animeId: string, comment: string) => Promise<void>;
  deleteComment: (animeId: string, commentId: string) => Promise<void>;
  editComment: (
    animeId: string,
    commentId: string,
    newComment: string
  ) => Promise<void>;
  fetchUserAvatars: (comments: Comment[]) => Promise<void>;
}
