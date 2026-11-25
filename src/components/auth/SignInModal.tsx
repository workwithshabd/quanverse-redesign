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

interface SignInModalInnerProps {
  initialTab?: string;
  onClose: () => void;
}

export interface SignInModalProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
}

function SignInModalInner({ initialTab = 'signin', onClose }: SignInModalInnerProps) {
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

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [board, setBoard] = useState<string>('CBSE');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const result = await signInWithEmail({
      email: email || DEMO_STUDENT.email,
      _password: password || 'Password123!',
      rememberMe
    });
    if (result.success) {
      onClose();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const result = await signUpWithEmail({
      name: name || 'Student',
      email: email || `student_${Date.now()}@example.com`,
      _password: password || 'StudentPass123!',
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
      openGoogleAuth(activeTab as 'signin' | 'signup');
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
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4" role="presentation">
      <div className="fixed inset-0 bg-[#07110d]/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <div 
        className="relative z-10 w-full max-w-[440px] bg-[#0c1c15] border border-[#276447]/50 rounded-2xl shadow-2xl overflow-hidden" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="signin-modal-heading"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#276447]/30 bg-[#07110d]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-[#43c98b] to-[#276447] text-[#07110d] rounded-lg flex items-center justify-center font-bold text-sm">Q</div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white leading-tight">quanverse</span>
              <span className="text-[11px] text-[#748d78]">Class 10 Board Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="text-[#748d78] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              onClick={handleOpenFullPage}
              title="Open full page view"
              aria-label="Open full page view"
            >
              <Maximize2 size={16} />
            </button>
            <button
              type="button"
              className="text-[#748d78] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              onClick={onClose}
              title="Close window"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-[#07110d] border border-[#276447]/30 rounded-lg" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signin'}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${activeTab === 'signin' ? 'bg-[#104734] text-white shadow-sm' : 'text-[#748d78] hover:text-white'}`}
              onClick={() => { setActiveTab('signin'); setAuthError(null); }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${activeTab === 'signup' ? 'bg-[#104734] text-white shadow-sm' : 'text-[#748d78] hover:text-white'}`}
              onClick={() => { setActiveTab('signup'); setAuthError(null); }}
            >
              Create Account
            </button>
          </div>

          {authError && (
            <div className="flex items-center gap-2 p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs" role="alert">
              <AlertCircle size={15} className="shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In / Sign Up Button */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white hover:bg-[#ebf3ee] text-[#07110d] rounded-lg font-semibold text-xs transition-colors cursor-pointer shadow-sm"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}</span>
            </button>

            <div className="flex items-center gap-2 my-1">
              <span className="flex-1 h-px bg-[#276447]/30"></span>
              <span className="text-[11px] text-[#748d78]">or continue with email</span>
              <span className="flex-1 h-px bg-[#276447]/30"></span>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07110d] border border-[#276447]/30">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">⚡ Instant Test Student</span>
              <span className="text-[10px] text-[#748d78]">student@quanverse.in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-2 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-[#b5c0b8] hover:text-white cursor-pointer transition-colors"
                onClick={handleAutoFillDemo}
              >
                Auto-fill
              </button>
              <button
                type="button"
                className="px-2 py-1 text-[11px] font-semibold rounded bg-[#d5f36a] text-[#07110d] hover:bg-[#bce347] cursor-pointer transition-colors"
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
            <form onSubmit={handleSignIn} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="modal-signin-email">Student Email</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                  <Mail size={15} className="text-[#748d78] shrink-0" />
                  <input
                    id="modal-signin-email"
                    type="email"
                    placeholder="student@quanverse.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="modal-signin-password">Password</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                  <Lock size={15} className="text-[#748d78] shrink-0" />
                  <input
                    id="modal-signin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    className="text-[#748d78] hover:text-white cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#748d78]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#43c98b]"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#d5f36a] hover:bg-[#bce347] text-[#07110d] font-bold text-xs transition-colors cursor-pointer mt-1"
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
            <form onSubmit={handleSignUp} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="modal-signup-name">Full Name</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                  <User size={15} className="text-[#748d78] shrink-0" />
                  <input
                    id="modal-signup-name"
                    type="text"
                    placeholder="e.g. Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="modal-signup-email">Email Address</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                  <Mail size={15} className="text-[#748d78] shrink-0" />
                  <input
                    id="modal-signup-email"
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]">Class 10 Board</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`flex-1 py-1.5 text-xs rounded border cursor-pointer transition-all ${board === 'CBSE' ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'}`}
                    onClick={() => setBoard('CBSE')}
                  >
                    CBSE Board
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-1.5 text-xs rounded border cursor-pointer transition-all ${board === 'ICSE' ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'}`}
                    onClick={() => setBoard('ICSE')}
                  >
                    ICSE Board
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="modal-signup-password">Create Password</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                  <Lock size={15} className="text-[#748d78] shrink-0" />
                  <input
                    id="modal-signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    className="text-[#748d78] hover:text-white cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#d5f36a] hover:bg-[#bce347] text-[#07110d] font-bold text-xs transition-colors cursor-pointer mt-1"
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
          <div className="text-center text-xs text-[#748d78] pt-2 border-t border-[#276447]/20">
            {activeTab === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button type="button" className="text-[#d5f36a] hover:underline font-bold cursor-pointer" onClick={() => setActiveTab('signup')}>
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button type="button" className="text-[#d5f36a] hover:underline font-bold cursor-pointer" onClick={() => setActiveTab('signin')}>
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

export default function SignInModal({ isOpen, initialTab = 'signin', onClose }: SignInModalProps) {
  if (!isOpen) return null;
  return <SignInModalInner initialTab={initialTab} onClose={onClose} />;
}
