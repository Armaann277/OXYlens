import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import appletConfig from '../firebase-applet-config.json';

// Client-side Firebase credentials
// Configured in .env or Settings or injected automatically
const metaEnv = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || localStorage.getItem('VITE_FIREBASE_API_KEY') || appletConfig.apiKey || "",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || localStorage.getItem('VITE_FIREBASE_AUTH_DOMAIN') || appletConfig.authDomain || "",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || localStorage.getItem('VITE_FIREBASE_PROJECT_ID') || appletConfig.projectId || "",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || localStorage.getItem('VITE_FIREBASE_STORAGE_BUCKET') || appletConfig.storageBucket || "",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || localStorage.getItem('VITE_FIREBASE_MESSAGING_SENDER_ID') || appletConfig.messagingSenderId || "",
  appId: metaEnv.VITE_FIREBASE_APP_ID || localStorage.getItem('VITE_FIREBASE_APP_ID') || appletConfig.appId || "",
};

const databaseId = metaEnv.VITE_FIREBASE_DATABASE_ID || localStorage.getItem('VITE_FIREBASE_DATABASE_ID') || appletConfig.firestoreDatabaseId || "(default)";

// Check if credentials exist for a real Firebase project connection
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let app;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    if (databaseId && databaseId !== "(default)") {
      db = getFirestore(app, databaseId);
    } else {
      db = getFirestore(app);
    }
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn('Firebase initialization failed. Slipped into simulator mode:', error);
  }
}

export { auth, db, googleProvider };

// Helper to standardise authentication actions
export async function logInWithGoogle() {
  if (isFirebaseConfigured && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  } else {
    // Simulator Sign-In
    const dummyUser = {
      uid: 'simulated-user-123',
      email: 'armaanadeel81@gmail.com',
      displayName: 'Armaan Adeel',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    };
    localStorage.setItem('oxylens_simulated_user', JSON.stringify(dummyUser));
    return dummyUser;
  }
}

export async function logOutUser() {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem('oxylens_simulated_user');
  }
}
