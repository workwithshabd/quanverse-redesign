import { createContext } from 'react';

export interface StudentUser {
  id?: string;
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  board?: string;
  grade?: string;
  targetYear?: string;
  provider?: string;
  rememberMe?: boolean;
  avatar?: string | null;
  stats?: {
    mockTestsCompleted?: number;
    readinessScore?: number;
    predictedMarks?: string;
  };
  [key: string]: any;
}

export interface AuthContextType {
  user: StudentUser | null;
  firebaseUser: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  signInWithGoogle: (options?: { useRedirect?: boolean; preferences?: any }) => Promise<any>;
  updateStudentPreferences: (preferences?: any) => any;
  signOut: () => Promise<void>;
  signInWithEmail: (creds?: { email?: string; _password?: string; rememberMe?: boolean }) => Promise<any>;
  signUpWithEmail: (creds?: { name?: string; email?: string; _password?: string; board?: string; grade?: string }) => Promise<any>;
  openGoogleAuth: (mode?: 'signin' | 'signup') => void;
  closeGoogleAuth: () => void;
  isGoogleModalOpen: boolean;
  googleAuthMode: 'signin' | 'signup';
  quickDemoLogin: () => Promise<void>;
  toastNotification: { id: number; message: string; type: string } | null;
  clearToast: () => void;
  [key: string]: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);
