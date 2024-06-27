import { User } from "firebase/auth";
import React from "react";


export interface AuthContextProps {
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>; 
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>; 
  loading: boolean;
  error: Error | null;
}

export interface ContextProviderProp {
  children: React.ReactNode;
}