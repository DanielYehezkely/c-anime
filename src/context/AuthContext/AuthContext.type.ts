import { User } from "firebase/auth";

export interface AuthContextProps {
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>; // Added method type
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

