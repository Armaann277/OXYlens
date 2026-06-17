import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  isFirebaseConfigured, 
  logInWithGoogle, 
  logOutUser 
} from '../firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface GroundedQuery {
  id?: string;
  query: string;
  answer: string;
  sources: Array<{ title: string; url: string }>;
  userId: string;
  createdAt: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  saveSearchQuery: (queryText: string, answerText: string, sourcesList: Array<{ title: string; url: string }>) => Promise<void>;
  getSearchHistory: () => Promise<GroundedQuery[]>;
  isLiveFirebase: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is a real Firebase connection configured
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const appUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          setUser(appUser);
          
          // Persist user record to Firestore DB
          try {
            if (db) {
              const userRef = doc(db, 'users', firebaseUser.uid);
              await setDoc(userRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                lastLoginAt: new Date().toISOString()
              }, { merge: true });
            }
          } catch (e) {
            console.error("Error saving user profile to Firestore:", e);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Simulator fallback state from localStorage
      const cached = localStorage.getItem('oxylens_simulated_user');
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch (_) {}
      }
      setLoading(false);
    }
  }, []);

  const googleSignIn = async () => {
    try {
      const loggedUser = await logInWithGoogle();
      const appUser: AppUser = {
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
      };
      setUser(appUser);
      
      // Persist to DB in simulated mode (e.g., local storage) or Firestore
      if (isFirebaseConfigured && db) {
        const userRef = doc(db, 'users', loggedUser.uid);
        await setDoc(userRef, {
          uid: loggedUser.uid,
          email: loggedUser.email,
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
          lastLoginAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Sign-In failed", error);
    }
  };

  const logout = async () => {
    await logOutUser();
    setUser(null);
  };

  const saveSearchQuery = async (queryText: string, answerText: string, sourcesList: Array<{ title: string; url: string }>) => {
    const userId = user?.uid || 'anonymous';
    const newQuery: Omit<GroundedQuery, 'id'> = {
      query: queryText,
      answer: answerText,
      sources: sourcesList,
      userId,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'search_queries'), newQuery);
      } catch (e) {
        console.error("Failed saving search query to Firestore:", e);
      }
    } else {
      // Local Storage Simulator fallback for database
      const cachedHistory = localStorage.getItem('oxylens_simulated_queries');
      let arr: GroundedQuery[] = [];
      if (cachedHistory) {
        try {
          arr = JSON.parse(cachedHistory);
        } catch (_) {}
      }
      const itemWithId: GroundedQuery = {
        id: `sim-${Date.now()}`,
        ...newQuery
      };
      arr.unshift(itemWithId);
      localStorage.setItem('oxylens_simulated_queries', JSON.stringify(arr.slice(0, 30)));
    }
  };

  const getSearchHistory = async (): Promise<GroundedQuery[]> => {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(
          collection(db, 'search_queries'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GroundedQuery[];
      } catch (e) {
        console.error("Failed fetching search history from Firestore, falling back:", e);
      }
    }
    
    // Local Storage simulator fallback
    const cachedHistory = localStorage.getItem('oxylens_simulated_queries');
    if (cachedHistory) {
      try {
        return JSON.parse(cachedHistory).slice(0, 10);
      } catch (_) {}
    }
    return [];
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      googleSignIn,
      logout,
      saveSearchQuery,
      getSearchHistory,
      isLiveFirebase: isFirebaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
