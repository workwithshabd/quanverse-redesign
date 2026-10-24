/**
 * Quanverse Student Profile Service
 * Manages student academic profile creation, retrieval, and persistent updates,
 * strictly anchored to the authenticated Firebase UID.
 */

import { logger } from './logger';

const PROFILE_KEY_PREFIX = 'quanverse_profile_';
const ACTIVE_PROFILE_KEY = 'quanverse_auth_user';

export const studentProfileService = {
  /**
   * Retrieve active session profile from localStorage
   */
  getActiveProfile() {
    try {
      const data = localStorage.getItem(ACTIVE_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error('Failed to parse active student profile:', err);
      return null;
    }
  },

  /**
   * Retrieve an existing student profile by Firebase UID
   * @param {string} uid - Authenticated Firebase UID
   */
  getProfile(uid) {
    if (!uid) return null;
    try {
      const data = localStorage.getItem(`${PROFILE_KEY_PREFIX}${uid}`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error('Failed to parse student profile from storage:', err);
      return null;
    }
  },

  /**
   * Determine whether a student profile exists for this UID
   * @param {string} uid - Authenticated Firebase UID
   */
  hasProfile(uid) {
    if (!uid) return false;
    return Boolean(localStorage.getItem(`${PROFILE_KEY_PREFIX}${uid}`));
  },

  /**
   * Create or update student profile from verified Firebase Authentication user
   * @param {object} firebaseUser - Authenticated Firebase User object
   * @param {object} [preferences] - Optional academic preferences (board, grade)
   */
  createOrSyncProfile(firebaseUser, preferences = {}) {
    if (!firebaseUser || !firebaseUser.uid) {
      throw new Error('Valid Firebase authenticated user is required for profile creation');
    }

    const uid = firebaseUser.uid;
    const existing = this.getProfile(uid);
    const now = Date.now();

    let studentProfile;
    let isNewUser = false;

    if (existing) {
      // Returning user: preserve academic progress, stats, and previous choices
      studentProfile = {
        ...existing,
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || existing.name || 'Quanverse Student',
        email: firebaseUser.email || existing.email,
        avatar: firebaseUser.photoURL || existing.avatar,
        provider: 'google',
        googleVerified: true,
        lastLoginAt: now,
        // Allow updating board if explicitly provided
        board: preferences.board || existing.board || 'CBSE',
        grade: preferences.grade || existing.grade || 'Class 10',
        stats: existing.stats || {
          mockTestsCompleted: 0,
          readinessScore: 85,
          predictedMarks: '72 / 80'
        }
      };
      logger.auth(`Returning student profile loaded for UID: ${uid}`);
    } else {
      // New user registration via Google
      isNewUser = true;
      const cleanName = firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Quanverse Student');
      
      studentProfile = {
        id: `usr_${uid}`,
        uid: firebaseUser.uid,
        name: cleanName,
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || null,
        role: 'student',
        board: preferences.board || 'CBSE',
        grade: preferences.grade || 'Class 10',
        targetYear: preferences.targetYear || '2027',
        provider: 'google',
        googleVerified: true,
        createdAt: now,
        lastLoginAt: now,
        onboardingComplete: Boolean(preferences.board),
        stats: {
          mockTestsCompleted: 0,
          readinessScore: 82,
          predictedMarks: 'Initial Assessment'
        }
      };
      logger.auth(`New student profile created for UID: ${uid}`);
    }

    // Persist profile keyed by stable Firebase UID
    try {
      localStorage.setItem(`${PROFILE_KEY_PREFIX}${uid}`, JSON.stringify(studentProfile));
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(studentProfile));
    } catch (err) {
      logger.error('Failed to persist student profile to local storage:', err);
      throw new Error('Student profile storage failure');
    }

    return { profile: studentProfile, isNewUser };
  },

  /**
   * Update student academic preferences (board, grade, targetYear)
   * @param {string} uid - Authenticated Firebase UID
   * @param {object} updates - Partial fields to update
   */
  updateProfile(uid, updates = {}) {
    if (!uid) throw new Error('UID required for profile update');
    const existing = this.getProfile(uid);
    if (!existing) throw new Error('Student profile not found for this UID');

    const updated = {
      ...existing,
      ...updates,
      uid, // UID can never be changed
      id: existing.id || `usr_${uid}`,
      updatedAt: Date.now()
    };

    try {
      localStorage.setItem(`${PROFILE_KEY_PREFIX}${uid}`, JSON.stringify(updated));
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(updated));
      logger.auth(`Student profile updated for UID: ${uid}`);
      return updated;
    } catch (err) {
      logger.error('Failed to update student profile:', err);
      throw err;
    }
  },

  /**
   * Clear active session cache on sign-out
   */
  clearActiveSession() {
    try {
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
    } catch (err) {
      logger.error('Failed to clear active session:', err);
    }
  }
};
