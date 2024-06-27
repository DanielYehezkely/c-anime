import React, { createContext, useContext, useState, useEffect } from "react";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { AuthContextProps, ContextProviderProp } from "./AuthContext.type";
import { auth } from "../../config/firebaseConfig";

const AuthContext = createContext<AuthContextProps | undefined>(undefined); 

export const AuthProvider: React.FC<ContextProviderProp> = ({ children }) => { 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error))); // *? Why error is so problematic ? 
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error))); // *? Why error is so problematic ?
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await auth.signOut();
      setUser(null);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error))); // *? Why error is so problematic ?
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, loginWithEmail, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
