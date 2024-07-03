import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { AuthContextProps } from "./AuthContext.type";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { AUTH_PROVIDER_ERR_MSG } from "../../constants/globalConstants";
import { ContextProviderProp } from "../../types/Context";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<ContextProviderProp> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await createUserDocument(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUserDocument = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        watchlist: [],
        likedAnimes: [],
        dislikedAnimes: [],
      });
    }
  };

  const loginWithGoogle = async (navigateCallback: () => void) => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      setUser(result.user);
      await createUserDocument(result.user);
      navigateCallback();
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string,
    navigateCallback: () => void
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      setUser(userCredential.user);
      await createUserDocument(userCredential.user);
      navigateCallback();
    } catch (error: any) {
      console.error("Firebase error:", error.message);
      setError(`Firebase Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    navigateCallback: () => void
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      console.log(userCredential.user);
      setUser(userCredential.user);
      await createUserDocument(userCredential.user);
      navigateCallback();
    } catch (error: any) {
      console.error("Firebase error:", error.message);
      setError(`Firebase Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (navigateCallback: () => void): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await auth.signOut();
      console.log(`user: ${user} has signed out .`);
      setUser(null);
      navigateCallback();
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (animeId: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      watchlist: arrayUnion(animeId),
    });
  };

  const removeFromWatchlist = async (animeId: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      watchlist: arrayRemove(animeId),
    });
  };

  const likeAnime = async (animeId: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      likedAnimes: arrayUnion(animeId),
    });
  };

  const dislikeAnime = async (animeId: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      dislikedAnimes: arrayUnion(animeId),
    });
  };

  const addComment = async (animeId: string, comment: string) => {
    if (!user) return;
    const commentsRef = doc(db, "comments", animeId);
    await updateDoc(commentsRef, {
      comments: arrayUnion({
        userId: user.uid,
        comment,
        timestamp: new Date(),
      }),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        logout,
        loading,
        error,
        addToWatchlist,
        removeFromWatchlist,
        likeAnime,
        dislikeAnime,
        addComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(AUTH_PROVIDER_ERR_MSG);
  }
  return context;
};
