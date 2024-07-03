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
  loading: boolean;
  error: any;
}

