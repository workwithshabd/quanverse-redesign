import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AuthContext } from './authContextDefinition';
import { DEMO_STUDENT } from './authConstants';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  firebaseSignOut,
  isFirebaseConfigured
} from '../firebase';
import { studentProfileService } from '../services/studentProfileService';
import { mapAuthError } from '../services/authErrorHandler';
import { logger } from '../services/logger';

export function AuthProvider({ children }) {
  // Raw Firebase User
  const [firebaseUser, setFirebaseUser] = useState(null);

  // Quanverse Student Profile (anchored to Firebase UID or local session)
  const [user, setUser] = useState(() => studentProfileService.getActiveProfile());

  // Initial authentication loading state (true until onAuthStateChanged resolves)
  const [isLoading, setIsLoading] = useState(false);

  // Error handling
  const [authError, setAuthError] = useState(null);

  // Google Modal State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleAuthMode, setGoogleAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Global Toast Feedback
  const [toastNotification, setToastNotification] = useState(null);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastNotification) {
      const timer = setTimeout(() => {
        if (isMounted.current) setToastNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastNotification]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#aaffc7', '#67c090', '#215b63', '#124170']
      });
    } catch {
      // Confetti visual accent
    }
  }, []);

  // Synchronize application with Firebase Authentication state
  useEffect(() => {
    if (!auth) {
      logger.warn('Firebase auth instance is not available. Skipping real-time listener.');
      return;
    }

    logger.auth('Setting up Firebase onAuthStateChanged listener...');

    // First handle any pending redirect sign-in results (e.g. mobile or popup-blocked fallbacks)
    try {
      getRedirectResult(auth)
        .then((result) => {
          if (result && result.user) {
            logger.auth('Google redirect sign-in completed successfully for:', result.user.email);
            const { profile, isNewUser } = studentProfileService.createOrSyncProfile(result.user);
            setUser(profile);
            setFirebaseUser(result.user);
            triggerConfetti();
            setToastNotification({
              id: Date.now(),
              message: isNewUser
                ? `Welcome to Quanverse, ${profile.name}!`
                : `Welcome back, ${profile.name}!`,
              type: 'success'
            });
          }
        })
        .catch((err) => {
          const mapped = mapAuthError(err);
          logger.error('Error handling redirect sign-in result:', err);
          setAuthError(mapped.message);
        });
    } catch (err) {
      logger.error('getRedirectResult caught synchronous error:', err);
    }

    // Listen to real-time auth changes from Firebase
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        logger.auth('Firebase onAuthStateChanged fired:', fbUser ? fbUser.email : 'null');

        if (fbUser) {
          setFirebaseUser(fbUser);
          try {
            const { profile } = studentProfileService.createOrSyncProfile(fbUser);
            setUser(profile);
          } catch (err) {
            logger.error('Failed to sync student profile on state change:', err);
          }
        } else {
          setFirebaseUser(null);
          // Only clear user if the current user was authenticated via Firebase
          setUser((currentUser) => {
            if (currentUser && (currentUser.provider === 'demo' || currentUser.provider === 'email')) {
              return currentUser; // Preserve explicit demo or local email mode if active
            }
            studentProfileService.clearActiveSession();
            return null;
          });
        }

        setIsLoading(false);
      });
    } catch (err) {
      logger.error('onAuthStateChanged listener failed to register:', err);
    }

    return () => unsubscribe();
  }, [triggerConfetti]);

  /**
   * Real Google Sign-In and Sign-Up using Firebase Authentication
   * @param {object} [options]
   * @param {boolean} [options.useRedirect=false] - Force redirect flow instead of popup
   * @param {object} [options.preferences] - Initial student academic preferences (board, grade)
   */
  const signInWithGoogle = async ({ useRedirect = false, preferences = {} } = {}) => {
    setIsLoading(true);
    setAuthError(null);

    if (!isFirebaseConfigured()) {
      const errObj = {
        code: 'auth/invalid-configuration',
        message: 'Firebase configuration is incomplete. Check VITE_FIREBASE_API_KEY.'
      };
      setAuthError(errObj.message);
      setIsLoading(false);
      return { success: false, error: errObj };
    }

    try {
      if (useRedirect) {
        logger.auth('Initiating Firebase Google Sign-In via redirect...');
        await signInWithRedirect(auth, googleProvider);
        return { success: true, redirectInitiated: true };
      }

      logger.auth('Initiating Firebase Google Sign-In via popup...');
      const result = await signInWithPopup(auth, googleProvider);

      if (!result || !result.user) {
        throw new Error('Google authentication returned no user credentials');
      }

      const verifiedUser = result.user;
      logger.auth(`Google verification success: UID ${verifiedUser.uid} (${verifiedUser.email})`);

      // Persist student profile keyed by stable Firebase UID
      const { profile, isNewUser } = studentProfileService.createOrSyncProfile(verifiedUser, preferences);

      setUser(profile);
      setFirebaseUser(verifiedUser);
      setIsLoading(false);
      setIsGoogleModalOpen(false);

      triggerConfetti();
      setToastNotification({
        id: Date.now(),
        message: isNewUser
          ? `Welcome to Quanverse, ${profile.name}! Your Class 10 profile is active.`
          : `Signed in as ${profile.name} (${profile.board} Class 10)`,
        type: 'success'
      });

      return { success: true, user: profile, isNewUser };
    } catch (err) {
      const mapped = mapAuthError(err);
      logger.error('Google Sign-In failed:', err);

      // If popup was blocked by the browser, fallback to redirect or notify cleanly
      if (mapped.isPopupBlocked) {
        logger.warn('Popup was blocked by the browser. Attempting redirect fallback...');
        try {
          await signInWithRedirect(auth, googleProvider);
          return { success: true, redirectInitiated: true };
        } catch (redirectErr) {
          const redirectMapped = mapAuthError(redirectErr);
          setAuthError(redirectMapped.message);
          setIsLoading(false);
          return { success: false, error: redirectMapped };
        }
      }

      setAuthError(mapped.message);
      setIsLoading(false);
      return { success: false, error: mapped };
    }
  };

  /**
   * Update student academic profile preferences (board, grade, targetYear)
   */
  const updateStudentPreferences = (preferences = {}) => {
    if (!user || !user.uid) return null;
    try {
      const updated = studentProfileService.updateProfile(user.uid, preferences);
      setUser(updated);
      setToastNotification({
        id: Date.now(),
        message: `Preferences saved: ${updated.board} Class 10`,
        type: 'success'
      });
      return updated;
    } catch (err) {
      logger.error('Failed to update student preferences:', err);
      return null;
    }
  };

  /**
   * Real Sign Out across Firebase and application state
   */
  const signOut = async () => {
    logger.auth('Signing out user across Firebase and local state...');
    setIsLoading(true);
    setAuthError(null);

    try {
      await firebaseSignOut(auth);
    } catch (err) {
      logger.error('Firebase signOut error:', err);
    } finally {
      studentProfileService.clearActiveSession();
      setUser(null);
      setFirebaseUser(null);
      setIsLoading(false);
      setToastNotification({
        id: Date.now(),
        message: 'Signed out of student account successfully.',
        type: 'info'
      });
    }
  };

  /**
   * Standard Email Sign-In
   */
  const signInWithEmail = async ({ email = '', _password = '', rememberMe = true } = {}) => {
    setIsLoading(true);
    setAuthError(null);

    await new Promise((r) => setTimeout(r, 350));

    const rawEmail = typeof email === 'string' ? email.trim() : '';
    const cleanEmail = (rawEmail || DEMO_STUDENT.email).toLowerCase();

    if (rawEmail && (!cleanEmail.includes('@') || !cleanEmail.includes('.'))) {
      setIsLoading(false);
      setAuthError('Please enter a valid email address (e.g. student@gmail.com).');
      return { success: false, error: 'Invalid email' };
    }

    const isDemo = cleanEmail === 'student@quanverse.in';
    const displayName = isDemo
      ? DEMO_STUDENT.name
      : cleanEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Student';

    const signedInUser = {
      id: `usr_${Date.now()}`,
      uid: `local_${Date.now()}`,
      name: displayName,
      email: cleanEmail,
      role: 'student',
      board: 'CBSE',
      grade: 'Class 10',
      targetYear: '2027',
      provider: 'email',
      rememberMe,
      avatar: isDemo ? DEMO_STUDENT.avatar : null,
      stats: {
        mockTestsCompleted: isDemo ? 4 : 1,
        readinessScore: isDemo ? 92 : 86,
        predictedMarks: isDemo ? '74 / 80' : '70 / 80'
      }
    };

    setUser(signedInUser);
    setIsLoading(false);
    triggerConfetti();
    setToastNotification({
      id: Date.now(),
      message: `Signed in as ${signedInUser.name} (${signedInUser.board} 10th)`,
      type: 'success'
    });
    return { success: true, user: signedInUser };
  };

  /**
   * Standard Email Sign-Up
   */
  const signUpWithEmail = async ({
    name = '',
    email = '',
    _password = '',
    board = 'CBSE',
    grade = 'Class 10'
  } = {}) => {
    setIsLoading(true);
    setAuthError(null);

    await new Promise((r) => setTimeout(r, 400));

    const cleanName = (name || 'Arjun Sharma').trim();
    const cleanEmail = (email || 'student@quanverse.in').trim().toLowerCase();

    if (email && (!cleanEmail.includes('@') || !cleanEmail.includes('.'))) {
      setIsLoading(false);
      setAuthError('Please enter a valid email address.');
      return { success: false, error: 'Invalid email' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      uid: `local_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: 'student',
      board,
      grade,
      targetYear: '2027',
      provider: 'email',
      avatar: null,
      stats: {
        mockTestsCompleted: 0,
        readinessScore: 78,
        predictedMarks: 'New Student'
      }
    };

    setUser(newUser);
    setIsLoading(false);
    triggerConfetti();
    setToastNotification({
      id: Date.now(),
      message: `Welcome to Quanverse, ${cleanName}! Your account is ready.`,
      type: 'success'
    });
    return { success: true, user: newUser };
  };

  /**
   * Explicit isolated demo login for preview testing
   */
  const quickDemoLogin = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    setUser(DEMO_STUDENT);
    setIsLoading(false);
    triggerConfetti();
    setToastNotification({
      id: Date.now(),
      message: 'Signed in as Demo Student (Arjun Sharma - CBSE Class 10)',
      type: 'success'
    });
    logger.auth('Logged in via Quick Demo Account');
  };

  const openGoogleAuth = (mode = 'signin') => {
    setGoogleAuthMode(mode);
    setAuthError(null);
    setIsGoogleModalOpen(true);
  };

  const closeGoogleAuth = () => {
    setIsGoogleModalOpen(false);
    setAuthError(null);
  };

  const clearToast = () => setToastNotification(null);

  const value = {
    user,
    firebaseUser,
    isAuthenticated: Boolean(user),
    isLoading,
    authError,
    setAuthError,
    signInWithGoogle,
    updateStudentPreferences,
    signOut,
    signInWithEmail,
    signUpWithEmail,
    openGoogleAuth,
    closeGoogleAuth,
    isGoogleModalOpen,
    googleAuthMode,
    quickDemoLogin,
    toastNotification,
    clearToast
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
