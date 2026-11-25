import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface GoogleAuthModalInnerProps {
  mode?: 'signin' | 'signup';
  onClose: () => void;
}

export interface GoogleAuthModalProps {
  isOpen: boolean;
  mode?: 'signin' | 'signup';
  onClose: () => void;
}

function GoogleAuthModalInner({ mode = 'signin', onClose }: GoogleAuthModalInnerProps) {
  const { 
    signInWithGoogle, 
    isLoading, 
    authError, 
    setAuthError, 
    user, 
    isAuthenticated,
    updateStudentPreferences 
  } = useAuth();

  const [selectedBoard, setSelectedBoard] = useState<string>('CBSE');
  const [localError, setLocalError] = useState<string>('');

  // Close on Escape key when not loading
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, onClose]);

  // Handle Real Firebase Google Popup Flow
  const handleGooglePopup = async () => {
    setLocalError('');
    setAuthError(null);
    const result = await signInWithGoogle({
      useRedirect: false,
      preferences: { board: selectedBoard, grade: 'Class 10' }
    });

    if (result.success && !result.redirectInitiated) {
      setTimeout(() => {
        onClose();
      }, 700);
    } else if (result.error) {
      setLocalError(result.error.message || 'Authentication error');
    }
  };

  // Handle Real Firebase Google Redirect Flow (Fallback)
  const handleGoogleRedirect = async () => {
    setLocalError('');
    setAuthError(null);
    await signInWithGoogle({
      useRedirect: true,
      preferences: { board: selectedBoard, grade: 'Class 10' }
    });
  };

  const activeError = localError || authError;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" role="presentation">
      <div 
        className="fixed inset-0 bg-[#07110d]/80 backdrop-blur-md" 
        onClick={!isLoading ? onClose : undefined} 
        aria-hidden="true" 
      />

      <div 
        className="relative z-10 w-full max-w-[440px] bg-[#0c1c15] border border-[#276447]/50 rounded-2xl shadow-2xl overflow-hidden" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="google-auth-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#276447]/30 bg-[#07110d]">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-white">Google Identity Services</span>
              <span className="text-[10px] text-[#748d78]">Project: teach-e5b6d</span>
            </div>
          </div>

          {!isLoading && (
            <button 
              type="button" 
              className="text-[#748d78] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer" 
              onClick={onClose}
              aria-label="Close Google sign-in window"
              title="Close window"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          {isAuthenticated && user && user.provider === 'google' ? (
            <div className="text-center flex flex-col items-center gap-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#43c98b] mx-auto">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#163a2a] text-[#43c98b] font-bold text-xl flex items-center justify-center">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 bg-[#43c98b] text-[#07110d] rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">✓</span>
              </div>

              <h2 className="text-lg font-bold text-white">Account Verified!</h2>
              <p className="text-xs text-[#b5c0b8]">
                Authenticated as <strong className="text-white">{user.name}</strong> ({user.email})
              </p>

              <div className="w-full bg-[#07110d] border border-[#276447]/30 rounded-lg p-3 flex flex-col gap-2 text-left">
                <span className="text-[11px] text-[#748d78]">Class 10 Target Board:</span>
                <div className="flex gap-2">
                  {['CBSE', 'ICSE', 'State Board'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`flex-1 py-1 text-xs rounded border cursor-pointer transition-all ${user.board === b ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#0c1c15] border-[#276447]/40 text-[#748d78] hover:text-white'}`}
                      onClick={() => updateStudentPreferences({ board: b })}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#d5f36a] hover:bg-[#bce347] text-[#07110d] font-bold text-xs transition-colors cursor-pointer mt-2"
                onClick={onClose}
              >
                <span>Continue to Student Portal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <h2 id="google-auth-title" className="text-base font-bold text-white mb-1">
                  {mode === 'signup' ? 'Create Account with Google' : 'Sign in with Google'}
                </h2>
                <p className="text-xs text-[#748d78]">
                  to access <strong className="text-[#43c98b]">Quanverse Class 10 Suite</strong>
                </p>
              </div>

              {/* Error Banner */}
              {activeError && (
                <div className="flex items-start gap-2 p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs" role="alert">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{activeError}</span>
                    {activeError.includes('authorized') && (
                      <span className="text-[11px] text-red-400/80 mt-1">
                        Tip: In Firebase Console, ensure <code>localhost</code> is added under Authentication &gt; Settings &gt; Authorized Domains.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Academic Board Choice */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center justify-between text-xs text-[#b5c0b8]">
                  <span>Target Board for Class 10:</span>
                  <span className="text-[10px] text-[#748d78]">(Can be changed anytime)</span>
                </label>
                <div className="flex gap-2">
                  {['CBSE', 'ICSE', 'State Board'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`flex-1 py-1.5 text-xs rounded border cursor-pointer transition-all ${selectedBoard === b ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'}`}
                      onClick={() => setSelectedBoard(b)}
                      disabled={isLoading}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Loading State */}
              {isLoading ? (
                <div className="py-6 flex flex-col items-center gap-2.5 text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-t-[#43c98b] border-r-transparent border-b-[#43c98b] border-l-transparent animate-spin" aria-hidden="true" />
                  <p className="text-xs font-semibold text-white">Connecting to Google Authentication...</p>
                  <span className="text-[11px] text-[#748d78]">
                    Please select your Google account in the secure Google prompt window.
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white hover:bg-[#ebf3ee] text-[#07110d] rounded-lg font-semibold text-xs transition-colors cursor-pointer shadow-sm"
                    onClick={handleGooglePopup}
                    disabled={isLoading}
                    aria-label="Sign in with real Google Account"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>
                      {mode === 'signup' ? 'Create Account with Google' : 'Continue with Google'}
                    </span>
                  </button>

                  <div className="text-center mt-1">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#748d78] hover:text-[#43c98b] cursor-pointer transition-colors"
                      onClick={handleGoogleRedirect}
                      disabled={isLoading}
                    >
                      <ExternalLink size={12} />
                      <span>Popup blocked or mobile browser? Sign in via redirect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Privacy & Terms footer notice */}
          <div className="flex items-start gap-2 pt-3 border-t border-[#276447]/20 text-[10px] text-[#748d78]">
            <Shield size={14} className="shrink-0 text-[#43c98b] mt-0.5" />
            <p className="leading-tight">
              Protected by official Google OAuth 2.0 &amp; Firebase Authentication.
              Quanverse securely verifies student identity and never requests private credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

export default function GoogleAuthModal({ isOpen, mode = 'signin', onClose }: GoogleAuthModalProps) {
  if (!isOpen) return null;
  return <GoogleAuthModalInner mode={mode} onClose={onClose} />;
}
