import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../hooks/useNavigation';
import { DEMO_STUDENT } from '../../context/authConstants';

function SignInModalInner({ initialTab = 'signin', onClose }) {
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle,
    openGoogleAuth, 
    quickDemoLogin,
    isLoading,
    authError,
    setAuthError
  } = useAuth();

  const { navigateTo } = useNavigation();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [rememberMe, setRememberMe] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const result = await signInWithEmail({
      email: email || DEMO_STUDENT.email,
      password: password || 'Password123!',
      rememberMe
    });
    if (result.success) {
      onClose();
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const result = await signUpWithEmail({
      name: name || 'Student',
      email: email || `student_${Date.now()}@example.com`,
      password: password || 'StudentPass123!',
      board,
      grade: 'Class 10'
    });
    if (result.success) {
      onClose();
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError(null);
    const result = await signInWithGoogle({
      preferences: {
        board: activeTab === 'signup' ? board : 'CBSE',
        grade: 'Class 10'
      }
    });
    if (result.success && !result.redirectInitiated) {
      onClose();
    } else if (!result.success && result.error?.isPopupBlocked) {
      openGoogleAuth(activeTab);
    }
  };

  const handleAutoFillDemo = () => {
    setEmail(DEMO_STUDENT.email);
    setPassword('Password123!');
    setAuthError(null);
  };

  const handleOpenFullPage = () => {
    onClose();
    navigateTo('signin');
  };

  const modalContent = (
    <div className="signin-modal-overlay" role="presentation">
      <div className="signin-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div 
        className="signin-modal-dialog glass-panel-elevated" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="signin-modal-heading"
      >
        {/* Modal Header */}
        <div className="signin-modal-header">
          <div className="modal-header-brand">
            <div className="modal-logo-icon">Q</div>
            <div className="modal-brand-text">
              <span className="modal-brand-title">quanverse</span>
              <span className="modal-brand-sub">Class 10 Board Portal</span>
            </div>
          </div>

          <div className="modal-header-actions">
            <button
              type="button"
              className="modal-icon-btn"
              onClick={handleOpenFullPage}
              title="Open full page view"
              aria-label="Open full page view"
            >
              <Maximize2 size={16} />
            </button>
            <button
              type="button"
              className="modal-icon-btn modal-close-btn"
              onClick={onClose}
              title="Close window"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="signin-modal-body">
          {/* Tab Switcher */}
          <div className="modal-tab-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signin'}
              className={`modal-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => { setActiveTab('signin'); setAuthError(null); }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`modal-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => { setActiveTab('signup'); setAuthError(null); }}
            >
              Create Account
            </button>
          </div>

          {authError && (
            <div className="modal-error-box" role="alert">
              <AlertCircle size={15} className="error-icon" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In / Sign Up Button */}
          <div className="modal-google-wrap">
            <button
              type="button"
              className="modal-google-btn"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}</span>
            </button>

            <div className="modal-divider">
              <span className="line"></span>
              <span className="text">or continue with email</span>
              <span className="line"></span>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="modal-demo-strip">
            <div className="demo-strip-info">
              <span className="demo-strip-title">⚡ Instant Test Student</span>
              <span className="demo-strip-sub">student@quanverse.in</span>
            </div>
            <div className="demo-strip-actions">
              <button
                type="button"
                className="demo-btn-autofill"
                onClick={handleAutoFillDemo}
              >
                Auto-fill
              </button>
              <button
                type="button"
                className="demo-btn-login"
                onClick={async () => {
                  await quickDemoLogin();
                  onClose();
                }}
              >
                1-Click Login
              </button>
            </div>
          </div>

          {/* Form */}
          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} className="modal-form">
              <div className="modal-input-field">
                <label htmlFor="modal-signin-email">Student Email</label>
                <div className="input-wrap">
                  <Mail size={15} className="field-icon" />
                  <input
                    id="modal-signin-email"
                    type="email"
                    placeholder="student@quanverse.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="modal-input-field">
                <label htmlFor="modal-signin-password">Password</label>
                <div className="input-wrap">
                  <Lock size={15} className="field-icon" />
                  <input
                    id="modal-signin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-pwd-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="modal-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full modal-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Student Portal</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="modal-form">
              <div className="modal-input-field">
                <label htmlFor="modal-signup-name">Full Name</label>
                <div className="input-wrap">
                  <User size={15} className="field-icon" />
                  <input
                    id="modal-signup-name"
                    type="text"
                    placeholder="e.g. Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="modal-input-field">
                <label htmlFor="modal-signup-email">Email Address</label>
                <div className="input-wrap">
                  <Mail size={15} className="field-icon" />
                  <input
                    id="modal-signup-email"
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="modal-input-field">
                <label>Class 10 Board</label>
                <div className="modal-board-chips">
                  <button
                    type="button"
                    className={`board-chip ${board === 'CBSE' ? 'active' : ''}`}
                    onClick={() => setBoard('CBSE')}
                  >
                    CBSE Board
                  </button>
                  <button
                    type="button"
                    className={`board-chip ${board === 'ICSE' ? 'active' : ''}`}
                    onClick={() => setBoard('ICSE')}
                  >
                    ICSE Board
                  </button>
                </div>
              </div>

              <div className="modal-input-field">
                <label htmlFor="modal-signup-password">Create Password</label>
                <div className="input-wrap">
                  <Lock size={15} className="field-icon" />
                  <input
                    id="modal-signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-pwd-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full modal-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account &amp; Start</span>
                    <Sparkles size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch tab prompt footer */}
          <div className="modal-footer-switch">
            {activeTab === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button type="button" onClick={() => setActiveTab('signup')}>
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button type="button" onClick={() => setActiveTab('signin')}>
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .signin-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99990;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .signin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          animation: modalFadeIn 0.18s ease-out;
        }

        .signin-modal-dialog {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-medium);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-elevated);
          overflow: hidden;
          animation: modalScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .signin-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-surface);
        }

        .modal-header-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .modal-logo-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, var(--c-navy), var(--c-teal));
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .modal-brand-text {
          display: flex;
          flex-direction: column;
        }

        .modal-brand-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.1;
        }

        .modal-brand-sub {
          font-size: 0.7rem;
          color: var(--c-teal);
          font-weight: 600;
        }

        .modal-header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .modal-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border-light);
          border-radius: 50%;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.16s ease;
        }
        .modal-icon-btn:hover {
          background-color: rgba(16, 71, 52, 0.4);
          color: var(--accent-lime);
          border-color: rgba(67, 201, 139, 0.4);
        }
        .modal-icon-btn:focus-visible {
          outline: 2px solid var(--accent-emerald);
          outline-offset: 2px;
        }

        .signin-modal-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .modal-tab-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-light);
          padding: 3px;
          border-radius: var(--radius-lg);
          margin-bottom: 1.1rem;
        }

        .modal-tab-btn {
          padding: 0.55rem;
          border: 1px solid transparent;
          background: transparent;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.16s ease;
        }
        .modal-tab-btn:hover:not(.active) {
          color: #F1F5F2;
          background-color: rgba(16, 71, 52, 0.35);
        }
        .modal-tab-btn.active {
          background-color: rgba(16, 71, 52, 0.7);
          background-image: radial-gradient(rgba(67, 201, 139, 0.15) 1px, transparent 0);
          background-size: 4px 4px;
          color: #F1F5F2;
          border-color: rgba(67, 201, 139, 0.4);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(213, 243, 106, 0.2);
        }
        .modal-tab-btn:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 1px;
        }

        .modal-error-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #b91c1c;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .modal-google-wrap {
          margin-bottom: 1rem;
        }

        .modal-google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          background: #ffffff;
          border: 1px solid #dadce0;
          color: #1f2937;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .modal-google-btn:hover {
          background: #f8fafd;
          border-color: #1a73e8;
          box-shadow: 0 2px 6px rgba(26, 115, 232, 0.15);
        }

        .modal-divider {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.9rem 0 0.8rem;
        }
        .modal-divider .line {
          flex: 1;
          height: 1px;
          background: var(--border-light);
        }
        .modal-divider .text {
          font-size: 0.72rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .modal-demo-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--c-mint-wash);
          border: 1px solid var(--c-jade);
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .demo-strip-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--c-navy);
          display: block;
        }

        .demo-strip-sub {
          font-size: 0.68rem;
          color: var(--c-teal);
          display: block;
        }

        .demo-strip-actions {
          display: flex;
          gap: 0.35rem;
        }

        .demo-btn-autofill,
        .demo-btn-login {
          border: none;
          padding: 0.3rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .demo-btn-autofill {
          background: rgba(33, 91, 99, 0.15);
          color: var(--c-teal);
        }
        .demo-btn-autofill:hover {
          background: rgba(33, 91, 99, 0.25);
        }

        .demo-btn-login {
          background: var(--c-navy);
          color: #ffffff;
        }
        .demo-btn-login:hover {
          background: var(--c-teal);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .modal-input-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          text-align: left;
        }

        .modal-input-field label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .input-wrap input {
          width: 100%;
          min-height: 42px;
          padding: 0.55rem 2.25rem 0.55rem 2.2rem;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          color: var(--text-main);
          transition: all 0.15s ease;
        }
        .input-wrap input:focus {
          outline: none;
          border-color: var(--accent-emerald);
          box-shadow: 0 0 0 3px rgba(67, 201, 139, 0.2);
        }

        .toggle-pwd-btn {
          position: absolute;
          right: 0.65rem;
          background: transparent;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px;
        }

        .modal-checkbox-row {
          display: flex;
          align-items: center;
        }

        .checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.76rem;
          color: var(--text-muted);
          cursor: pointer;
        }
        .checkbox-label input {
          accent-color: var(--accent-emerald);
        }

        .modal-board-chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .board-chip {
          padding: 0.5rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-light);
          background-color: var(--bg-surface);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.16s ease;
        }
        .board-chip:hover:not(.active) {
          border-color: rgba(67, 201, 139, 0.4);
          background-color: rgba(16, 71, 52, 0.35);
          background-image: radial-gradient(rgba(213, 243, 106, 0.1) 1px, transparent 0);
          background-size: 4px 4px;
        }
        .board-chip.active {
          border-color: var(--accent-lime);
          background-color: rgba(16, 71, 52, 0.65);
          background-image: radial-gradient(rgba(67, 201, 139, 0.18) 1.2px, transparent 0);
          background-size: 4px 4px;
          color: #F1F5F2;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(213, 243, 106, 0.2);
        }
        .board-chip:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 1px;
        }

        .modal-submit-btn {
          margin-top: 0.35rem;
        }

        .modal-footer-switch {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .modal-footer-switch button {
          background: transparent;
          border: none;
          color: var(--c-navy);
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }
      `}</style>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

export default function SignInModal({ isOpen, initialTab = 'signin', onClose }) {
  if (!isOpen) return null;
  return <SignInModalInner initialTab={initialTab} onClose={onClose} />;
}
