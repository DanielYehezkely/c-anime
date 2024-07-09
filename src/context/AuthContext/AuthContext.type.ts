import { User } from "firebase/auth";

export interface AuthContextProps {
  user: User | null;
  loginWithGoogle: (callback: () => void) => Promise<void>;
  loginWithEmail: (
    email: string,
    password: string,
    callback: () => void
  ) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    callback: () => void
  ) => Promise<void>;
  logout: (callback: () => void) => Promise<void>;
  fetchUserLikedDislikedAnimes: (userId: string) => Promise<{
    likedAnimes: string[];
    dislikedAnimes: string[];
  }>;
  sendPasswordReset: (email: string) => Promise<void>;
  loading: boolean;
  error: any;
}
