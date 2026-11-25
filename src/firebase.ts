import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type Auth
} from 'firebase/auth';
import { logger } from './services/logger';

// Client Firebase configuration for project teach-e5b6d
// Uses environment variables with verified project fallbacks
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCK7_-yqvm5yiRhXb_bRJ5lO4hw4R_OBjY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "teach-e5b6d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "teach-e5b6d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "teach-e5b6d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "302934757435",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:302934757435:web:3954490267543882880c1e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W1NER1V19X"
};

// Singleton Firebase Application & Auth instances safely guarded
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  logger.auth('Firebase Authentication initialized for project:', firebaseConfig.projectId);
} catch (err) {
  logger.error('Failed to initialize Firebase app or auth:', err);
}

export {
  app,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  firebaseSignOut
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && auth);
}
