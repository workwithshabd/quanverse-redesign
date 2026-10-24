import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

function GoogleAuthModalInner({ mode = 'signin', onClose }) {
  const { 
    signInWithGoogle, 
    isLoading, 
    authError, 
    setAuthError, 
    user, 
    isAuthenticated,
    updateStudentPreferences 
  } = useAuth();

  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [localError, setLocalError] = useState('');

  // Close on Escape key when not loading
  useEffect(() => {
    const handleKeyDown = (e) => {
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
      // Successfully authenticated
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
    <div className="google-auth-overlay" role="presentation">
      <div 
        className="google-auth-backdrop" 
        onClick={!isLoading ? onClose : undefined} 
        aria-hidden="true" 
      />

      <div 
        className="google-auth-dialog" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="google-auth-title"
      >
        {/* Header */}
        <div className="google-auth-header">
          <div className="google-brand-row">
            {/* Authentic Google Multi-Color G Logo SVG */}
            <svg className="google-g-logo" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
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
            <div className="google-header-text">
              <span className="google-title-text">Google Identity Services</span>
              <span className="google-project-tag">Project: teach-e5b6d</span>
            </div>
          </div>

          {!isLoading && (
            <button 
              type="button" 
              className="google-close-btn" 
              onClick={onClose}
              aria-label="Close Google sign-in window"
              title="Close window"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="google-auth-body">
          {/* If already authenticated via Google in this session */}
          {isAuthenticated && user && user.provider === 'google' ? (
            <div className="google-authenticated-view">
              <div className="auth-avatar-verified-wrap">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="auth-verified-avatar" />
                ) : (
                  <div className="auth-verified-initials">{user.name.charAt(0)}</div>
                )}
                <span className="verified-check-pill" title="Verified by Google">✓</span>
              </div>

              <h2 className="google-modal-heading">Account Verified!</h2>
              <p className="google-modal-sub">
                Authenticated as <strong>{user.name}</strong> ({user.email})
              </p>

              <div className="google-onboarding-card">
                <span className="onboarding-label">Class 10 Target Board:</span>
                <div className="board-selector-row">
                  {['CBSE', 'ICSE', 'State Board'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`board-btn ${user.board === b ? 'active' : ''}`}
                      onClick={() => updateStudentPreferences({ board: b })}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-full google-portal-launch-btn"
                onClick={onClose}
              >
                <span>Continue to Student Portal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* Unauthenticated: Real Google Authentication Gateway */
            <div className="google-unauthenticated-flow">
              <div className="google-heading-group">
                <h2 id="google-auth-title" className="google-modal-heading">
                  {mode === 'signup' ? 'Create Account with Google' : 'Sign in with Google'}
                </h2>
                <p className="google-modal-sub">
                  to access <strong className="text-navy-glow">Quanverse Class 10 Suite</strong>
                </p>
              </div>

              {/* Error Banner */}
              {activeError && (
                <div className="google-error-banner" role="alert">
                  <AlertCircle size={16} className="error-icon" />
                  <div className="error-text-wrap">
                    <span className="error-title">{activeError}</span>
                    {activeError.includes('authorized') && (
                      <span className="error-hint">
                        Tip: In Firebase Console, ensure <code>localhost</code> is added under Authentication &gt; Settings &gt; Authorized Domains.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Academic Board Choice (Sets initial student profile preference) */}
              <div className="google-board-pref-section">
                <label className="pref-label">
                  <span>Target Board for Class 10:</span>
                  <span className="pref-note">(Can be changed anytime)</span>
                </label>
                <div className="pref-board-chips">
                  {['CBSE', 'ICSE', 'State Board'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`pref-chip ${selectedBoard === b ? 'active' : ''}`}
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
                <div className="google-verifying-state">
                  <div className="google-spinner" aria-hidden="true" />
                  <p className="verifying-text">Connecting to Google Authentication...</p>
                  <span className="verifying-subtext">
                    Please select your Google account in the secure Google prompt window.
                  </span>
                </div>
              ) : (
                /* Primary Real Google Action */
                <div className="google-actions-wrap">
                  <button
                    type="button"
                    className="google-primary-auth-btn"
                    onClick={handleGooglePopup}
                    disabled={isLoading}
                    aria-label="Sign in with real Google Account"
                  >
                    <svg className="google-btn-g-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
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
                    <span className="btn-text">
                      {mode === 'signup' ? 'Create Account with Google' : 'Continue with Google'}
                    </span>
                  </button>

                  {/* Fallback button if popup blocked */}
                  <div className="google-redirect-fallback">
                    <button
                      type="button"
                      className="redirect-link-btn"
                      onClick={handleGoogleRedirect}
                      disabled={isLoading}
                    >
                      <ExternalLink size={13} />
                      <span>Popup blocked or mobile browser? Sign in via redirect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Privacy & Terms footer notice */}
          <div className="google-privacy-notice">
            <Shield size={14} className="notice-icon" />
            <p>
              Protected by official Google OAuth 2.0 &amp; Firebase Authentication.
              Quanverse securely verifies student identity and never requests private credentials.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .google-auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
        }

        .google-auth-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: googleFadeIn 0.18s ease-out;
        }

        @keyframes googleFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .google-auth-dialog {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xl);
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          animation: googleScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes googleScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .google-auth-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-surface);
        }

        .google-brand-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .google-header-text {
          display: flex;
          flex-direction: column;
        }

        .google-title-text {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
          font-family: var(--font-sans);
        }

        .google-project-tag {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .google-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.35rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .google-close-btn:hover {
          color: var(--text-main);
          background: var(--bg-hover);
        }

        .google-auth-body {
          padding: 1.5rem 1.35rem 1.25rem;
        }

        .google-heading-group {
          text-align: center;
          margin-bottom: 1.35rem;
        }

        .google-modal-heading {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin: 0 0 0.35rem;
        }

        .google-modal-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
        }

        .text-navy-glow {
          color: var(--c-navy);
          font-weight: 700;
        }
        [data-theme="dark"] .text-navy-glow {
          color: var(--c-mint);
        }

        .google-error-banner {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.75rem 0.9rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          margin-bottom: 1.15rem;
          color: #dc2626;
        }
        [data-theme="dark"] .google-error-banner {
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.15);
        }
        .error-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 0.8rem;
          line-height: 1.4;
        }
        .error-title {
          font-weight: 600;
        }
        .error-hint {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .error-hint code {
          background: rgba(0,0,0,0.1);
          padding: 1px 4px;
          border-radius: 3px;
        }

        .google-board-pref-section {
          margin-bottom: 1.25rem;
          padding: 0.85rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
        }

        .pref-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .pref-note {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: normal;
        }

        .pref-board-chips {
          display: flex;
          gap: 0.4rem;
        }

        .pref-chip {
          flex: 1;
          padding: 0.45rem 0.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }
        .pref-chip:hover:not(:disabled) {
          border-color: var(--c-jade);
          color: var(--text-main);
        }
        .pref-chip.active {
          background: var(--c-navy);
          color: #ffffff;
          border-color: var(--c-navy);
          box-shadow: 0 2px 6px var(--c-navy-wash);
        }
        [data-theme="dark"] .pref-chip.active {
          background: var(--c-mint);
          color: var(--c-navy);
          border-color: var(--c-mint);
        }

        .google-primary-auth-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          background: #ffffff;
          color: #3c4043;
          border: 1.5px solid #dadce0;
          border-radius: var(--radius-full);
          font-size: 0.94rem;
          font-weight: 700;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .google-primary-auth-btn:hover:not(:disabled) {
          background: #f8fafd;
          border-color: #4285f4;
          box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
          transform: translateY(-1px);
        }

        .google-primary-auth-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .google-primary-auth-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .google-redirect-fallback {
          text-align: center;
          margin-top: 0.75rem;
        }

        .redirect-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.74rem;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.25rem;
        }
        .redirect-link-btn:hover {
          color: var(--text-main);
        }

        .google-verifying-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          text-align: center;
        }

        .google-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(66, 133, 244, 0.2);
          border-top-color: #4285f4;
          border-radius: 50%;
          animation: googleSpin 0.75s linear infinite;
          margin-bottom: 0.9rem;
        }

        @keyframes googleSpin {
          to { transform: rotate(360deg); }
        }

        .verifying-text {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 0.35rem;
        }

        .verifying-subtext {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .google-authenticated-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0.5rem 0;
        }

        .auth-avatar-verified-wrap {
          position: relative;
          margin-bottom: 0.75rem;
        }

        .auth-verified-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--c-jade);
        }

        .auth-verified-initials {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--c-navy);
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--c-jade);
        }

        .verified-check-pill {
          position: absolute;
          bottom: 0;
          right: -2px;
          background: #10b981;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 900;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .google-onboarding-card {
          width: 100%;
          margin: 1.25rem 0;
          padding: 0.85rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          text-align: left;
        }

        .onboarding-label {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          margin-bottom: 0.45rem;
        }

        .board-selector-row {
          display: flex;
          gap: 0.4rem;
        }

        .board-btn {
          flex: 1;
          padding: 0.45rem;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
        }
        .board-btn.active {
          background: var(--c-navy);
          color: #ffffff;
          border-color: var(--c-navy);
        }
        [data-theme="dark"] .board-btn.active {
          background: var(--c-mint);
          color: var(--c-navy);
        }

        .google-portal-launch-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .google-privacy-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .notice-icon {
          color: var(--c-teal);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .google-privacy-notice p {
          margin: 0;
          font-size: 0.72rem;
          line-height: 1.4;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

export default function GoogleAuthModal({ isOpen, mode = 'signin', onClose }) {
  if (!isOpen) return null;
  return <GoogleAuthModalInner mode={mode} onClose={onClose} />;
}
