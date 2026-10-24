/**
 * Firebase Authentication Error Normalizer & User Message Mapper
 * Maps Firebase Auth error codes to clear, actionable guidance for users and developers.
 */

import { logger } from './logger';

export function mapAuthError(error) {
  if (!error) return null;

  const code = error.code || '';
  const message = error.message || '';

  logger.error(`[AuthError] Code: ${code} | Raw message: ${message}`);

  switch (code) {
    case 'auth/popup-closed-by-user':
      return {
        code,
        message: 'Google Sign-In was cancelled before completing.',
        actionable: 'Please click Continue with Google and complete the sign-in prompt.',
        type: 'warning'
      };

    case 'auth/popup-blocked':
      return {
        code,
        message: 'The Google Sign-In popup was blocked by your browser.',
        actionable: 'Please allow popups for this site, or try the redirect option.',
        type: 'error',
        isPopupBlocked: true
      };

    case 'auth/unauthorized-domain':
      return {
        code,
        message: 'This web domain is not authorized in Firebase Authentication.',
        actionable: 'Add localhost and your deployment domain to Firebase Console > Authentication > Settings > Authorized Domains.',
        type: 'error',
        isConfigError: true
      };

    case 'auth/operation-not-allowed':
      return {
        code,
        message: 'Google Sign-In is not enabled in Firebase project "teach-e5b6d".',
        actionable: 'Enable Google under Firebase Console > Authentication > Sign-in method.',
        type: 'error',
        isConfigError: true
      };

    case 'auth/network-request-failed':
      return {
        code,
        message: 'Network connection issue during authentication.',
        actionable: 'Please check your internet connection and try again.',
        type: 'error'
      };

    case 'auth/account-exists-with-different-credential':
      return {
        code,
        message: 'An account already exists with this email using a different sign-in method.',
        actionable: 'Please sign in using your original method or link credentials.',
        type: 'error'
      };

    case 'auth/user-disabled':
      return {
        code,
        message: 'This student account has been disabled.',
        actionable: 'Please contact support@quanverse.in for assistance.',
        type: 'error'
      };

    case 'auth/invalid-api-key':
    case 'auth/app-deleted':
      return {
        code,
        message: 'Invalid Firebase configuration.',
        actionable: 'Check your VITE_FIREBASE_API_KEY and project setup.',
        type: 'error',
        isConfigError: true
      };

    default:
      if (message.toLowerCase().includes('popup')) {
        return {
          code: code || 'popup_error',
          message: 'Unable to open Google Authentication window.',
          actionable: 'Ensure popups are enabled in your browser settings.',
          type: 'error'
        };
      }
      return {
        code: code || 'auth_error',
        message: message || 'An error occurred during authentication. Please try again.',
        actionable: 'Please try again in a few moments.',
        type: 'error'
      };
  }
}
