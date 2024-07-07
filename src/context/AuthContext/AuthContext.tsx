import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { AUTH_PROVIDER_ERR_MSG } from "../../constants/globalConstants";
import { ContextProviderProp } from "../../types/Context";
import { AuthContextProps } from "./AuthContext.type";

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
  console.log(`Creating user document for user: ${user.uid}`);
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  console.log(`Read user document for user: ${user.uid}`);
  if (!docSnap.exists()) {
    const displayName = user.displayName
      ? user.displayName
      : user.email
      ? user.email.split("@")[0]
      : "Anonymous";
    await setDoc(userRef, {
      name: displayName,
      watchlist: [],
      likedAnimes: [],
      dislikedAnimes: [],
    });
    console.log(`Created user document for user: ${user.uid}`);
  }
};

  const loginWithGoogle = async (callback: () => void) => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      await createUserDocument(result.user);
      callback();
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string,
    callback: () => void
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
      await createUserDocument(userCredential.user);
      callback();
    } catch (error: any) {
      setError(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    callback: () => void
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await createUserDocument(userCredential.user);
      callback();
    } catch (error: any) {
      setError(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (callback: () => void): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await auth.signOut();
      setUser(null);
      callback();
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

   const sendPasswordReset = async (email: string) => {
     setLoading(true);
     setError(null);
     try {
       await sendPasswordResetEmail(auth, email);
     } catch (error: any) {
       setError(`Firebase Error: ${error.message}`);
     } finally {
       setLoading(false);
     }
   };

const addComment = async (animeId: string, comment: string) => {
  if (!user) return;
  const commentsRef = doc(db, "comments", animeId);
  const newComment = {
    id: `${user.uid}-${Timestamp.now().seconds}`, // Create a unique ID for each comment
    userId: user.uid,
    comment,
    timestamp: new Date(),
  };

  const commentsDoc = await getDoc(commentsRef);
  if (commentsDoc.exists()) {
    await updateDoc(commentsRef, {
      comments: arrayUnion(newComment),
    });
  } else {
    await setDoc(commentsRef, {
      comments: [newComment],
    });
  }
};

const editComment = async (
  animeId: string,
  commentId: string,
  updatedComment: string
) => {
  if (!user) return;
  const commentsRef = doc(db, "comments", animeId);
  const commentsDoc = await getDoc(commentsRef);
  if (commentsDoc.exists()) {
    const comments = commentsDoc.data().comments;
    const commentIndex = comments.findIndex(
      (c: any) => c.id === commentId && c.userId === user.uid
    );
    if (commentIndex > -1) {
      comments[commentIndex].comment = updatedComment;
      comments[commentIndex].timestamp = new Date();
      await updateDoc(commentsRef, { comments });
    }
  }
};

  const deleteComment = async (animeId: string, commentId: string) => {
    if (!user) return;
    const commentsRef = doc(db, "comments", animeId);
    const commentsDoc = await getDoc(commentsRef);
    if (commentsDoc.exists()) {
      const comments = commentsDoc.data().comments;
      const commentToRemove = comments.find((c: any) => c.id === commentId);
      if (commentToRemove) {
        await updateDoc(commentsRef, {
          comments: arrayRemove(commentToRemove),
        });
      }
    }
  };


  const fetchUserLikedDislikedAnimes = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        likedAnimes: userData.likedAnimes || [],
        dislikedAnimes: userData.dislikedAnimes || [],
      };
    }
    return { likedAnimes: [], dislikedAnimes: [] };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        logout,
        loading,
        error,
        deleteComment,
        addComment,
        editComment,
        fetchUserLikedDislikedAnimes,
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
