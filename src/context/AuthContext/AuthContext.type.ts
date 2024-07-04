import { User } from "firebase/auth";

export interface AuthContextProps {
  user: User | null;
  loginWithGoogle: (navigateCallback: () => void) => Promise<void>;
  loginWithEmail: (
    email: string,
    password: string,
    navigateCallback: () => void
  ) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    navigateCallback: () => void
  ) => Promise<void>;
  logout: (navigateCallback: () => void) => Promise<void>;
  addToWatchlist: (animeId: string) => Promise<void>;
  removeFromWatchlist: (animeId: string) => Promise<void>;
  likeAnime: (animeId: string) => Promise<void>;
  dislikeAnime: (animeId: string) => Promise<void>;
  addComment: (animeId: string, comment: string) => Promise<void>;
  editComment: (
    animeId: string,
    commentId: string,
    updatedComment: string
  ) => Promise<void>;
  fetchUserLikedDislikedAnimes: (userId: string) => Promise<{
    likedAnimes: string[];
    dislikedAnimes: string[];
  }>;
  loading: boolean;
  error: any;
}
