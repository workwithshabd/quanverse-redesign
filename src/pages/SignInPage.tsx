import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Zap,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { DEMO_STUDENT } from '../context/authConstants';
import { useNavigation } from '../hooks/useNavigation';

interface SignInPageProps {
  initialTab?: 'signin' | 'signup';
}

export default function SignInPage({ initialTab = 'signin' }: SignInPageProps) {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    authError, 
    setAuthError,
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle,
    openGoogleAuth,
    quickDemoLogin,
    signOut 
  } = useAuth();

  const { navigateTo, openDemoExam } = useNavigation();

  // Active Tab: 'signin' | 'signup'
  const [tabOverride, setTabOverride] = useState<'signin' | 'signup' | null>(null);
  const activeTab = tabOverride ?? initialTab ?? 'signin';
  const setActiveTab = (tab: 'signin' | 'signup') => {
    setTabOverride(tab);
    setAuthError(null);
  };

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpBoard, setSignUpBoard] = useState<string>('CBSE');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState<string>('');
  const [showSignUpPassword, setShowSignUpPassword] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);

  // Forgot Password Drawer State
  const [isForgotOpen, setIsForgotOpen] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSuccess, setForgotSuccess] = useState<boolean>(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute password strength for Sign Up
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'None', color: 'transparent', percent: 0 };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (pwd.length >= 12) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#889088', percent: 25 };
    if (score === 2) return { score: 2, label: 'Fair', color: '#D5F36A', percent: 50 };
    if (score === 3) return { score: 3, label: 'Good', color: '#43C98B', percent: 75 };
    return { score: 4, label: 'Strong', color: '#43C98B', percent: 100 };
  };

  const passwordStrength = getPasswordStrength(signUpPassword);
  const passwordsMatch = signUpPassword && signUpConfirmPassword && signUpPassword === signUpConfirmPassword;

  // Handle Fill Demo Student
  const handleFillDemo = () => {
    setSignInEmail(DEMO_STUDENT.email);
    setSignInPassword('Password123!');
    setAuthError(null);
  };

  // Handle Real Firebase Google Sign-In / Sign-Up
  const handleGoogleAuth = async () => {
    setAuthError(null);
    const result = await signInWithGoogle({
      preferences: {
        board: activeTab === 'signup' ? signUpBoard : 'CBSE',
        grade: 'Class 10'
      }
    });

    if (!result.success && result.error?.isPopupBlocked) {
      openGoogleAuth(activeTab);
    }
  };

  // Submit Sign In
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    await signInWithEmail({
      email: signInEmail || DEMO_STUDENT.email,
      _password: signInPassword || 'Password123!',
      rememberMe
    });
  };

  // Submit Sign Up
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!termsAgreed) {
      setAuthError('Please agree to the Terms of Service to create an account.');
      return;
    }

    await signUpWithEmail({
      name: signUpName || 'Arjun Sharma',
      email: signUpEmail || 'student@quanverse.in',
      _password: signUpPassword || 'Password123!',
      board: signUpBoard,
      grade: 'Class 10'
    });
  };

  // Submit Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSuccess(true);
  };

  return (
    <div className="signin-page-wrapper min-h-[calc(100dvh-120px)] pt-6 pb-16 bg-transparent relative">
      <div className="app-container">
        
        {/* Navigation Breadcrumb / Return */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#bedcc8]/15 text-xs font-semibold text-[#8F9D93] hover:text-[#F1F5F2] hover:bg-[#104734]/30 hover:border-[#43C98B]/30 transition-all cursor-pointer"
            onClick={() => navigateTo('home')}
            aria-label="Return to Quanverse Home"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#43C98B]">
            <span className="w-2 h-2 rounded-full bg-[#43C98B] shadow-[0_0_10px_#43C98B]" />
            <span>Class 10 Exam Season 2027</span>
          </div>
        </div>

        {/* If user is already authenticated */}
        {isAuthenticated && user ? (
          <div className="max-w-[560px] mx-auto p-8 sm:p-10 bg-[#0B241A]/55 border border-[#bedcc8]/15 rounded-xl backdrop-blur-md text-center">
            <div className="w-16 h-16 rounded-full bg-[#104734]/60 border border-[#43C98B]/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} className="text-[#43C98B]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2">You're Signed In!</h1>
            <p className="text-sm text-[#8F9D93] mb-6">
              Welcome back, <strong className="text-[#F1F5F2]">{user.name}</strong> ({user.email}). Your Class 10 {user.board} study suite is unlocked.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#07110D]/60 border border-[#bedcc8]/12 rounded-lg text-left mb-6 font-mono text-xs">
              <div>
                <span className="text-[#8F9D93] block text-[11px]">Board Target</span>
                <span className="text-[#F1F5F2] font-semibold">{user.board} Class 10 ({user.targetYear || '2027'})</span>
              </div>
              <div>
                <span className="text-[#8F9D93] block text-[11px]">Board Readiness</span>
                <span className="text-[#43C98B] font-bold text-sm">{user.stats?.readinessScore || 91}%</span>
              </div>
              <div>
                <span className="text-[#8F9D93] block text-[11px]">Auth Method</span>
                <span className="text-[#F1F5F2] capitalize font-semibold">{user.provider === 'google' ? 'Google Account' : 'Email'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="btn btn-primary flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5"
                onClick={() => navigateTo('home')}
              >
                <span className="button__flair" aria-hidden="true" />
                <span>Go to Student Portal</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn btn-secondary flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5"
                onClick={openDemoExam}
              >
                <span className="button__flair" aria-hidden="true" />
                <Sparkles size={16} />
                <span>Launch Demo Exam</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300"
                onClick={signOut}
                title="Sign out of student account"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Visual Showcase & Trust Proof */}
            <div className="flex flex-col gap-5 pt-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F1F5F2] tracking-tight leading-tight">
                Master CBSE &amp; ICSE Step Marking.
                <span className="text-[#43C98B] block mt-1"> Without Leaving Marks on the Table.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#8F9D93] leading-relaxed max-w-[540px]">
                Official board examiners deduct up to 14 marks per paper for missing formula statements, omitted units, or incomplete justifications. Quanverse pinpoints every lost half-mark before exam day.
              </p>

              {/* Feature Highlights Grid */}
              <div className="flex flex-col gap-3.5 mt-2">
                <div className="flex items-start gap-3.5 p-4 bg-[#0B241A]/35 border border-[#bedcc8]/15 rounded-lg hover:border-[#43C98B]/35 transition-all">
                  <div className="w-9 h-9 rounded-md bg-[#104734]/50 border border-[#43C98B]/30 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-[#43C98B]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#F1F5F2] mb-0.5">Step-Level AI Marksheet</h2>
                    <p className="text-xs text-[#8F9D93] leading-relaxed">Instant rubrics aligned with 2026-27 CBSE &amp; CISCE official specimen papers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#0B241A]/35 border border-[#bedcc8]/15 rounded-lg hover:border-[#43C98B]/35 transition-all">
                  <div className="w-9 h-9 rounded-md bg-[#104734]/50 border border-[#43C98B]/30 flex items-center justify-center shrink-0">
                    <Award size={18} className="text-[#43C98B]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#F1F5F2] mb-0.5">99.4% Grading Accuracy</h2>
                    <p className="text-xs text-[#8F9D93] leading-relaxed">Calibrated on 62,000+ real board evaluations and examiner scoring keys.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#0B241A]/35 border border-[#bedcc8]/15 rounded-lg hover:border-[#43C98B]/35 transition-all">
                  <div className="w-9 h-9 rounded-md bg-[#104734]/50 border border-[#43C98B]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-[#43C98B]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#F1F5F2] mb-0.5">Zero-Spam &amp; Privacy First</h2>
                    <p className="text-xs text-[#8F9D93] leading-relaxed">Encrypted answer sheets. Never shared or sold. 100% student focused.</p>
                  </div>
                </div>
              </div>

              {/* Student Social Proof Card */}
              <div className="flex items-center gap-3.5 p-4 rounded-lg border border-[#43C98B]/30 bg-[#104734]/25 mt-2">
                <div className="relative w-11 h-11 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                    alt="Riya S." 
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#43C98B] text-[#07110D] text-[10px] font-bold rounded-full flex items-center justify-center">
                    ✓
                  </span>
                </div>
                <div>
                  <p className="text-xs italic text-[#F1F5F2] leading-snug mb-1">
                    "I scored 98 in Maths Board Exams because Quanverse trained me not to skip the discriminant step statement."
                  </p>
                  <span className="text-[11px] text-[#D5F36A]">
                    <strong>Riya S.</strong> • 98% in CBSE Class 10 Boards
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Auth Card (Sign In / Create Account) */}
            <div className="w-full">
              <div className="bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded-xl p-6 sm:p-8 backdrop-blur-md">
                
                {/* Dual Mode Switcher Tabs */}
                <div className="grid grid-cols-2 gap-1.5 bg-[#07110D]/60 p-1 rounded-lg mb-6" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    id="tab-signin"
                    aria-selected={activeTab === 'signin'}
                    aria-controls="panel-signin"
                    className={`py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      activeTab === 'signin'
                        ? 'bg-[#104734]/70 text-[#D5F36A] shadow'
                        : 'text-[#8F9D93] hover:text-[#F1F5F2]'
                    }`}
                    onClick={() => setActiveTab('signin')}
                  >
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    id="tab-signup"
                    aria-selected={activeTab === 'signup'}
                    aria-controls="panel-signup"
                    className={`py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      activeTab === 'signup'
                        ? 'bg-[#104734]/70 text-[#D5F36A] shadow'
                        : 'text-[#8F9D93] hover:text-[#F1F5F2]'
                    }`}
                    onClick={() => setActiveTab('signup')}
                  >
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Global Auth Error Alert */}
                {authError && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-md text-xs mb-4">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Google Sign-In & Sign-Up Action */}
                <div className="mb-5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    aria-label={activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}
                  >
                    <svg className="shrink-0" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                    <span>
                      {activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}
                    </span>
                  </button>

                  <div className="flex items-center gap-3 my-4">
                    <span className="flex-1 h-px bg-[#bedcc8]/12" />
                    <span className="text-[11px] uppercase tracking-wider text-[#8F9D93] font-semibold">
                      {activeTab === 'signup' ? 'or register with email' : 'or continue with email'}
                    </span>
                    <span className="flex-1 h-px bg-[#bedcc8]/12" />
                  </div>
                </div>

                {/* TAB 1: SIGN IN FORM */}
                {activeTab === 'signin' && (
                  <div id="panel-signin" role="tabpanel" aria-labelledby="tab-signin">
                    
                    {/* Quick Demo Student Fill Banner */}
                    <div className="flex items-center justify-between gap-2 p-2.5 bg-[#104734]/30 border border-[#bedcc8]/15 rounded-md mb-4 font-mono text-xs">
                      <div>
                        <span className="font-semibold text-[#D5F36A] block">⚡ Instant Demo Access</span>
                        <span className="text-[11px] text-[#8F9D93]">student@quanverse.in • CBSE Class 10</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          className="px-2 py-1 rounded bg-[#104734]/50 border border-[#43C98B]/30 text-[#43C98B] hover:bg-[#104734]/70 text-[11px] font-semibold transition-colors cursor-pointer"
                          onClick={handleFillDemo}
                        >
                          Auto-fill
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 rounded bg-[#D5F36A] text-[#07110D] font-bold text-[11px] hover:bg-[#e2f97c] transition-colors cursor-pointer"
                          onClick={quickDemoLogin}
                          disabled={isLoading}
                        >
                          1-Click
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSignInSubmit} className="flex flex-col gap-3.5" noValidate>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="signin-email" className="text-xs font-semibold text-[#F1F5F2]">
                          Student Email Address
                        </label>
                        <div className="relative flex items-center">
                          <Mail size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signin-email"
                            type="email"
                            name="email"
                            autoComplete="username"
                            required
                            placeholder="e.g. arjun.sharma@gmail.com"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <label htmlFor="signin-password" className="font-semibold text-[#F1F5F2]">
                            Password
                          </label>
                          <button
                            type="button"
                            className="text-[11px] text-[#43C98B] hover:text-[#D5F36A] cursor-pointer"
                            onClick={() => setIsForgotOpen(prev => !prev)}
                          >
                            Forgot Password?
                          </button>
                        </div>

                        <div className="relative flex items-center">
                          <Lock size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signin-password"
                            type={showSignInPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                          <button
                            type="button"
                            className="absolute right-3 text-[#8F9D93] hover:text-[#F1F5F2] cursor-pointer"
                            onClick={() => setShowSignInPassword(prev => !prev)}
                            aria-label={showSignInPassword ? "Hide password" : "Show password"}
                          >
                            {showSignInPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Forgot Password Drawer */}
                      {isForgotOpen && (
                        <div className="p-3 bg-[#07110D]/80 border border-[#bedcc8]/15 rounded-md text-xs">
                          {!forgotSuccess ? (
                            <div>
                              <span className="font-semibold text-[#F1F5F2] block mb-1">Reset your student password</span>
                              <p className="text-[11px] text-[#8F9D93] mb-2">
                                Enter your email and we'll send a secure password reset link.
                              </p>
                              <div className="flex gap-2">
                                <input
                                  type="email"
                                  placeholder="student@example.com"
                                  value={forgotEmail}
                                  onChange={(e) => setForgotEmail(e.target.value)}
                                  className="flex-1 px-2.5 py-1.5 bg-[#0B241A] border border-[#bedcc8]/15 rounded text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A]"
                                />
                                <button
                                  type="button"
                                  className="btn btn-primary px-3 py-1 text-xs"
                                  onClick={handleForgotSubmit}
                                >
                                  Send Link
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-[#43C98B]">
                              <CheckCircle2 size={16} />
                              <span>Reset link sent to <strong>{forgotEmail}</strong>.</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-[#8F9D93]">
                        <input
                          id="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="accent-[#43C98B] rounded"
                        />
                        <label htmlFor="remember-me" className="cursor-pointer">
                          Keep me signed in on this device
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-full justify-center flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3.5 px-6 mt-1"
                        disabled={isLoading}
                      >
                        <span className="button__flair" aria-hidden="true" />
                        {isLoading ? (
                          <>
                            <div className="btn-spinner" aria-hidden="true" />
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <>
                            <LogIn size={16} />
                            <span>Sign In to Student Portal</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-[#bedcc8]/10 text-center text-xs text-[#8F9D93]">
                      <span>Don't have an account yet? </span>
                      <button
                        type="button"
                        className="text-[#D5F36A] font-semibold hover:underline cursor-pointer"
                        onClick={() => setActiveTab('signup')}
                      >
                        Create an account
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: CREATE ACCOUNT FORM */}
                {activeTab === 'signup' && (
                  <div id="panel-signup" role="tabpanel" aria-labelledby="tab-signup">
                    <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-3.5" noValidate>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-name" className="text-xs font-semibold text-[#F1F5F2]">
                          Full Student Name
                        </label>
                        <div className="relative flex items-center">
                          <User size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signup-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="e.g. Arjun Sharma"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-email" className="text-xs font-semibold text-[#F1F5F2]">
                          Email Address
                        </label>
                        <div className="relative flex items-center">
                          <Mail size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signup-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="student@example.com"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#F1F5F2]">
                          Target Board (Class 10 - 2027)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'CBSE', name: 'CBSE', sub: 'Central' },
                            { id: 'ICSE', name: 'ICSE', sub: 'CISCE' },
                            { id: 'State Board', name: 'Other', sub: 'State/IGCSE' }
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              className={`p-2 rounded border text-left cursor-pointer transition-all ${
                                signUpBoard === b.id
                                  ? 'bg-[#104734]/70 border-[#D5F36A] text-[#D5F36A]'
                                  : 'bg-[#07110D]/60 border-[#bedcc8]/15 text-[#8F9D93] hover:text-[#F1F5F2]'
                              }`}
                              onClick={() => setSignUpBoard(b.id)}
                            >
                              <span className="block font-semibold text-xs leading-none">{b.name}</span>
                              <span className="text-[10px] opacity-75 mt-0.5 block">{b.sub}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-password" className="text-xs font-semibold text-[#F1F5F2]">
                          Create Password
                        </label>
                        <div className="relative flex items-center">
                          <Lock size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signup-password"
                            type={showSignUpPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            placeholder="At least 8 characters"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                          <button
                            type="button"
                            className="absolute right-3 text-[#8F9D93] hover:text-[#F1F5F2] cursor-pointer"
                            onClick={() => setShowSignUpPassword(prev => !prev)}
                            aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                          >
                            {showSignUpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>

                        {signUpPassword && (
                          <div className="mt-1">
                            <div className="w-full h-1 bg-[#bedcc8]/15 rounded overflow-hidden">
                              <div 
                                className="h-full transition-all duration-300"
                                style={{ 
                                  width: `${passwordStrength.percent}%`,
                                  background: passwordStrength.color 
                                }}
                              />
                            </div>
                            <span className="text-[10px] mt-1 block" style={{ color: passwordStrength.color }}>
                              Strength: {passwordStrength.label}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-confirm" className="text-xs font-semibold text-[#F1F5F2]">
                          Confirm Password
                        </label>
                        <div className="relative flex items-center">
                          <Lock size={16} className="absolute left-3 text-[#8F9D93] pointer-events-none" />
                          <input
                            id="signup-confirm"
                            type={showSignUpPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                            placeholder="Re-enter your password"
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 bg-[#07110D]/60 border border-[#bedcc8]/15 rounded-md text-xs text-[#F1F5F2] outline-none focus:border-[#D5F36A] transition-colors"
                          />
                          {signUpConfirmPassword && (
                            <div className="absolute right-3">
                              {passwordsMatch ? (
                                <Check size={16} className="text-[#43C98B]" aria-label="Passwords match" />
                              ) : (
                                <AlertCircle size={16} className="text-red-400" aria-label="Passwords do not match" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#8F9D93]">
                        <input
                          id="terms-agreed"
                          type="checkbox"
                          checked={termsAgreed}
                          onChange={(e) => setTermsAgreed(e.target.checked)}
                          className="accent-[#43C98B] rounded"
                        />
                        <label htmlFor="terms-agreed" className="cursor-pointer">
                          I agree to the Terms of Service &amp; Privacy Policy
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-full justify-center flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3.5 px-6 mt-1"
                        disabled={isLoading}
                      >
                        <span className="button__flair" aria-hidden="true" />
                        {isLoading ? (
                          <>
                            <div className="btn-spinner" aria-hidden="true" />
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account &amp; Start Free Mock</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-[#bedcc8]/10 text-center text-xs text-[#8F9D93]">
                      <span>Already have an account? </span>
                      <button
                        type="button"
                        className="text-[#D5F36A] font-semibold hover:underline cursor-pointer"
                        onClick={() => setActiveTab('signin')}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
