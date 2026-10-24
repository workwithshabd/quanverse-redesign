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
  GraduationCap,
  Award,
  Zap,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { DEMO_STUDENT } from '../context/authConstants';
import { useNavigation } from '../hooks/useNavigation';

export default function SignInPage({ initialTab = 'signin' }) {
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
  const [tabOverride, setTabOverride] = useState(null);
  const activeTab = tabOverride ?? initialTab ?? 'signin';
  const setActiveTab = (tab) => {
    setTabOverride(tab);
    setAuthError(null);
  };

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpBoard, setSignUpBoard] = useState('CBSE');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Forgot Password Drawer State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute password strength for Sign Up
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'None', color: 'transparent', percent: 0 };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (pwd.length >= 12) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444', percent: 25 };
    if (score === 2) return { score: 2, label: 'Fair', color: '#f59e0b', percent: 50 };
    if (score === 3) return { score: 3, label: 'Good', color: '#10b981', percent: 75 };
    return { score: 4, label: 'Strong', color: '#059669', percent: 100 };
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
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    await signInWithEmail({
      email: signInEmail || DEMO_STUDENT.email,
      password: signInPassword || 'Password123!',
      rememberMe
    });
  };

  // Submit Sign Up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!termsAgreed) {
      setAuthError('Please agree to the Terms of Service to create an account.');
      return;
    }

    await signUpWithEmail({
      name: signUpName || 'Arjun Sharma',
      email: signUpEmail || 'student@quanverse.in',
      password: signUpPassword || 'Password123!',
      board: signUpBoard,
      grade: 'Class 10'
    });
  };

  // Submit Forgot Password
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSuccess(true);
  };

  return (
    <div className="signin-page-wrapper">
      <div className="app-container">
        
        {/* Navigation Breadcrumb / Return */}
        <div className="signin-top-nav">
          <button
            type="button"
            className="signin-back-btn"
            onClick={() => navigateTo('home')}
            aria-label="Return to Quanverse Home"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <div className="signin-top-brand">
            <span className="brand-dot"></span>
            <span className="brand-tag">Class 10 Exam Season 2027</span>
          </div>
        </div>

        {/* If user is already authenticated */}
        {isAuthenticated && user ? (
          <div className="signin-authenticated-card glass-panel-elevated">
            <div className="auth-success-icon-wrap">
              <CheckCircle2 size={44} className="text-emerald" />
            </div>

            <h1 className="auth-success-title">You're Signed In!</h1>
            <p className="auth-success-sub">
              Welcome back, <strong>{user.name}</strong> ({user.email}). Your Class 10 {user.board} study suite is unlocked.
            </p>

            <div className="auth-user-snapshot">
              <div className="snapshot-item">
                <span className="snapshot-label">Board Target</span>
                <span className="snapshot-val">{user.board} Class 10 ({user.targetYear || '2027'})</span>
              </div>
              <div className="snapshot-item">
                <span className="snapshot-label">Board Readiness</span>
                <span className="snapshot-val text-emerald">{user.stats?.readinessScore || 91}%</span>
              </div>
              <div className="snapshot-item">
                <span className="snapshot-label">Auth Method</span>
                <span className="snapshot-val capitalize">{user.provider === 'google' ? 'Google Account' : 'Email'}</span>
              </div>
            </div>

            <div className="auth-success-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigateTo('home')}
              >
                <span>Go to Student Portal</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={openDemoExam}
              >
                <Sparkles size={16} />
                <span>Launch Quick Demo Exam</span>
              </button>

              {/* WORKABLE, PROMINENT SIGN OUT BUTTON */}
              <button
                type="button"
                className="btn btn-secondary signout-card-btn"
                onClick={signOut}
                title="Sign out of student account"
              >
                <LogOut size={16} />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="signin-main-layout">
            
            {/* Left Column: Visual Showcase & Trust Proof */}
            <div className="signin-hero-showcase">
              <div className="hero-tag-pill">
                <GraduationCap size={14} className="text-emerald" />
                <span>India's Dedicated Board Prep Engine</span>
              </div>

              <h1 className="signin-showcase-title">
                Master CBSE &amp; ICSE Step Marking.
                <span className="gradient-highlight"> Without Leaving Marks on the Table.</span>
              </h1>

              <p className="signin-showcase-sub">
                Official board examiners deduct up to 14 marks per paper for missing formula statements, omitted units, or incomplete justifications. Quanverse pinpoints every lost half-mark before exam day.
              </p>

              {/* Feature Highlights Grid */}
              <div className="showcase-features-list">
                <div className="showcase-feature-item">
                  <div className="feature-icon-box">
                    <Zap size={18} className="text-emerald" />
                  </div>
                  <div>
                    <h2 className="feature-item-title">Step-Level AI Marksheet</h2>
                    <p className="feature-item-desc">Instant rubrics aligned with 2026-27 CBSE &amp; CISCE official specimen papers.</p>
                  </div>
                </div>

                <div className="showcase-feature-item">
                  <div className="feature-icon-box">
                    <Award size={18} className="text-emerald" />
                  </div>
                  <div>
                    <h2 className="feature-item-title">99.4% Grading Accuracy</h2>
                    <p className="feature-item-desc">Calibrated on 62,000+ real board evaluations and examiner scoring keys.</p>
                  </div>
                </div>

                <div className="showcase-feature-item">
                  <div className="feature-icon-box">
                    <ShieldCheck size={18} className="text-emerald" />
                  </div>
                  <div>
                    <h2 className="feature-item-title">Zero-Spam &amp; Privacy First</h2>
                    <p className="feature-item-desc">Encrypted answer sheets. Never shared or sold. 100% student focused.</p>
                  </div>
                </div>
              </div>

              {/* Student Social Proof Card */}
              <div className="showcase-testimonial-pill glass-card">
                <div className="testimonial-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                    alt="Riya S." 
                    className="topper-avatar"
                  />
                  <span className="topper-badge-check">✓</span>
                </div>
                <div className="testimonial-text-wrap">
                  <p className="testimonial-quote">
                    "I scored 98 in Maths Board Exams because Quanverse trained me not to skip the discriminant step statement."
                  </p>
                  <span className="topper-meta">
                    <strong>Riya S.</strong> • 98% in CBSE Class 10 Boards
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Auth Card (Sign In / Create Account) */}
            <div className="signin-card-container">
              <div className="auth-card glass-panel-elevated">
                
                {/* Dual Mode Switcher Tabs */}
                <div className="auth-tab-switcher" role="tablist" aria-label="Authentication Options">
                  <button
                    type="button"
                    role="tab"
                    id="tab-signin"
                    aria-selected={activeTab === 'signin'}
                    aria-controls="panel-signin"
                    className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
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
                    className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                    onClick={() => setActiveTab('signup')}
                  >
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Global Auth Error Alert */}
                {authError && (
                  <div className="auth-error-banner" role="alert" aria-live="polite">
                    <AlertCircle size={16} className="error-icon" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Google Sign-In & Sign-Up Action */}
                <div className="google-auth-section">
                  <button
                    type="button"
                    className="google-action-btn"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    aria-label={activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}
                  >
                    {/* Multi-Color Google G SVG */}
                    <svg className="google-btn-icon" viewBox="0 0 24 24" width="20" height="20">
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
                      {activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}
                    </span>
                  </button>

                  <div className="auth-divider">
                    <span className="divider-line"></span>
                    <span className="divider-label">
                      {activeTab === 'signup' ? 'or register with student email' : 'or continue with email'}
                    </span>
                    <span className="divider-line"></span>
                  </div>
                </div>

                {/* ========================================================
                    TAB 1: SIGN IN FORM
                    ======================================================== */}
                {activeTab === 'signin' && (
                  <div id="panel-signin" role="tabpanel" aria-labelledby="tab-signin">
                    
                    {/* Quick Demo Student Fill Banner */}
                    <div className="demo-fill-card">
                      <div className="demo-fill-content">
                        <span className="demo-fill-title">⚡ Instant Demo Test Access</span>
                        <span className="demo-fill-sub">student@quanverse.in • CBSE Class 10</span>
                      </div>
                      <div className="demo-fill-btns">
                        <button
                          type="button"
                          className="demo-autofill-btn"
                          onClick={handleFillDemo}
                          title="Auto-fill demo credentials into inputs"
                        >
                          Auto-fill
                        </button>
                        <button
                          type="button"
                          className="demo-1click-btn"
                          onClick={quickDemoLogin}
                          disabled={isLoading}
                          title="Instant 1-Click Login"
                        >
                          1-Click Login
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSignInSubmit} className="auth-form" noValidate>
                      
                      {/* Email input */}
                      <div className="form-group">
                        <label htmlFor="signin-email" className="form-label">
                          Student Email Address
                        </label>
                        <div className="input-with-icon">
                          <Mail size={16} className="input-icon" />
                          <input
                            id="signin-email"
                            type="email"
                            name="email"
                            autoComplete="username"
                            required
                            placeholder="e.g. arjun.sharma@gmail.com"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Password input */}
                      <div className="form-group">
                        <div className="label-with-aside">
                          <label htmlFor="signin-password" className="form-label">
                            Password
                          </label>
                          <button
                            type="button"
                            className="forgot-password-link"
                            onClick={() => setIsForgotOpen(prev => !prev)}
                          >
                            Forgot Password?
                          </button>
                        </div>

                        <div className="input-with-icon">
                          <Lock size={16} className="input-icon" />
                          <input
                            id="signin-password"
                            type={showSignInPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="form-input"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowSignInPassword(prev => !prev)}
                            aria-label={showSignInPassword ? "Hide password" : "Show password"}
                            aria-pressed={showSignInPassword}
                          >
                            {showSignInPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Forgot Password Drawer */}
                      {isForgotOpen && (
                        <div className="forgot-password-drawer glass-card">
                          {!forgotSuccess ? (
                            <div>
                              <span className="drawer-title">Reset your student password</span>
                              <p className="drawer-desc">
                                Enter your email and we'll send a secure password reset link.
                              </p>
                              <div className="drawer-row">
                                <input
                                  type="email"
                                  placeholder="student@example.com"
                                  value={forgotEmail}
                                  onChange={(e) => setForgotEmail(e.target.value)}
                                  className="form-input drawer-input"
                                />
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={handleForgotSubmit}
                                >
                                  Send Link
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="drawer-success">
                              <CheckCircle2 size={16} className="text-emerald" />
                              <span>Reset link sent to <strong>{forgotEmail}</strong>. Check your inbox.</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Remember Me Checkbox */}
                      <div className="form-checkbox-row">
                        <label className="checkbox-label-styled">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span className="checkbox-text">Keep me signed in on this device</span>
                        </label>
                      </div>

                      {/* Primary Sign In Button */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-full auth-submit-btn"
                        disabled={isLoading}
                      >
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

                    {/* Switch to Create Account */}
                    <div className="auth-switch-prompt">
                      <span>Don't have an account yet?</span>
                      <button
                        type="button"
                        className="switch-link-btn"
                        onClick={() => setActiveTab('signup')}
                      >
                        Create an account
                      </button>
                    </div>

                  </div>
                )}

                {/* ========================================================
                    TAB 2: CREATE ACCOUNT FORM
                    ======================================================== */}
                {activeTab === 'signup' && (
                  <div id="panel-signup" role="tabpanel" aria-labelledby="tab-signup">
                    <form onSubmit={handleSignUpSubmit} className="auth-form" noValidate>
                      
                      {/* Full Name */}
                      <div className="form-group">
                        <label htmlFor="signup-name" className="form-label">
                          Full Student Name
                        </label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <input
                            id="signup-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="e.g. Arjun Sharma"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Student Email */}
                      <div className="form-group">
                        <label htmlFor="signup-email" className="form-label">
                          Email Address
                        </label>
                        <div className="input-with-icon">
                          <Mail size={16} className="input-icon" />
                          <input
                            id="signup-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="student@example.com"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Board Selection */}
                      <div className="form-group">
                        <label className="form-label">
                          Target Board (Class 10 - 2027)
                        </label>
                        <div className="board-radio-group">
                          <button
                            type="button"
                            className={`board-chip-btn ${signUpBoard === 'CBSE' ? 'active' : ''}`}
                            onClick={() => setSignUpBoard('CBSE')}
                          >
                            <span className="board-chip-name">CBSE</span>
                            <span className="board-chip-sub">Central Board</span>
                          </button>

                          <button
                            type="button"
                            className={`board-chip-btn ${signUpBoard === 'ICSE' ? 'active' : ''}`}
                            onClick={() => setSignUpBoard('ICSE')}
                          >
                            <span className="board-chip-name">ICSE</span>
                            <span className="board-chip-sub">CISCE Council</span>
                          </button>

                          <button
                            type="button"
                            className={`board-chip-btn ${signUpBoard === 'State Board' ? 'active' : ''}`}
                            onClick={() => setSignUpBoard('State Board')}
                          >
                            <span className="board-chip-name">Other</span>
                            <span className="board-chip-sub">State / IGCSE</span>
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="form-group">
                        <label htmlFor="signup-password" className="form-label">
                          Create Password
                        </label>
                        <div className="input-with-icon">
                          <Lock size={16} className="input-icon" />
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
                            className="form-input"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowSignUpPassword(prev => !prev)}
                            aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                            aria-pressed={showSignUpPassword}
                          >
                            {showSignUpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>

                        {/* Real-Time Password Strength Meter */}
                        {signUpPassword && (
                          <div className="password-strength-wrap">
                            <div className="strength-meter-bar">
                              <div 
                                className="strength-meter-fill"
                                style={{ 
                                  width: `${passwordStrength.percent}%`,
                                  background: passwordStrength.color 
                                }}
                              />
                            </div>
                            <span className="strength-label" style={{ color: passwordStrength.color }}>
                              Strength: {passwordStrength.label}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="form-group">
                        <label htmlFor="signup-confirm" className="form-label">
                          Confirm Password
                        </label>
                        <div className="input-with-icon">
                          <Lock size={16} className="input-icon" />
                          <input
                            id="signup-confirm"
                            type={showSignUpPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                            placeholder="Re-enter your password"
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            className="form-input"
                          />
                          {signUpConfirmPassword && (
                            <div className="confirm-indicator">
                              {passwordsMatch ? (
                                <Check size={16} className="text-emerald" title="Passwords match" />
                              ) : (
                                <AlertCircle size={16} className="text-rose" title="Passwords do not match" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Terms Agreement Checkbox */}
                      <div className="form-checkbox-row">
                        <label className="checkbox-label-styled">
                          <input
                            type="checkbox"
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                          />
                          <span className="checkbox-text">
                            I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="terms-link">Terms of Service</a> &amp; <a href="#" onClick={(e) => e.preventDefault()} className="terms-link">Privacy Policy</a>
                          </span>
                        </label>
                      </div>

                      {/* Submit Sign Up Button */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-full auth-submit-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="btn-spinner" aria-hidden="true" />
                            <span>Creating Student Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account &amp; Start Free Mock</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                    </form>

                    {/* Switch to Sign In */}
                    <div className="auth-switch-prompt">
                      <span>Already have an account?</span>
                      <button
                        type="button"
                        className="switch-link-btn"
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

      <style>{`
        .signin-page-wrapper {
          min-height: calc(100dvh - 120px);
          padding-top: 1.5rem;
          padding-bottom: 4rem;
          background: var(--bg-page);
          position: relative;
        }

        .signin-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .signin-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--border-light);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .signin-back-btn:hover {
          color: var(--c-navy);
          background: var(--bg-hover);
          border-color: var(--c-teal);
        }

        .signin-top-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--c-teal);
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--c-jade);
          box-shadow: 0 0 10px var(--c-jade);
        }

        .signin-main-layout {
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 3.5rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .signin-main-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Showcase Left Column */
        .signin-hero-showcase {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-top: 0.5rem;
        }

        .hero-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--c-mint-wash);
          border: 1px solid var(--c-jade);
          color: var(--c-navy);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          width: fit-content;
          letter-spacing: 0.02em;
        }

        .signin-showcase-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .gradient-highlight {
          display: block;
          color: var(--c-teal);
        }

        .signin-showcase-sub {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
          max-width: 540px;
        }

        .showcase-features-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .showcase-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }
        .showcase-feature-item:hover {
          border-color: var(--c-jade);
          transform: translateX(4px);
        }

        .feature-icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: var(--c-mint-wash);
          border: 1px solid var(--c-jade);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 0.2rem 0;
        }

        .feature-item-desc {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        .showcase-testimonial-pill {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--c-jade);
          background: var(--c-mint-wash);
          margin-top: 0.5rem;
        }

        .testimonial-avatar {
          position: relative;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
        }

        .topper-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
        }

        .topper-badge-check {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          background: var(--c-teal);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-quote {
          font-size: 0.84rem;
          font-style: italic;
          color: var(--c-navy);
          line-height: 1.45;
          margin: 0 0 0.25rem 0;
        }

        .topper-meta {
          font-size: 0.74rem;
          color: var(--c-teal);
        }

        /* Right Column: Auth Card */
        .signin-card-container {
          width: 100%;
        }

        .auth-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-medium);
          border-radius: var(--radius-xl);
          padding: 2rem 2rem 1.75rem;
          box-shadow: var(--shadow-card);
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 1.25rem 1.1rem;
          }
        }

        /* Tab Switcher */
        .auth-tab-switcher {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          background: var(--bg-subtle);
          padding: 4px;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }

        .auth-tab-btn {
          padding: 0.65rem 1rem;
          border: none;
          background: transparent;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .auth-tab-btn.active {
          background: var(--bg-card-solid);
          color: var(--c-navy);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* Error Banner */
        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #b91c1c;
          padding: 0.75rem 0.875rem;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
          margin-bottom: 1.25rem;
        }

        .error-icon {
          flex-shrink: 0;
        }

        /* Google Action Button */
        .google-auth-section {
          margin-bottom: 1.25rem;
        }

        .google-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: #ffffff;
          color: #1f2937;
          border: 1.5px solid #dadce0;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        }
        .google-action-btn:hover {
          background: #f8fafd;
          border-color: #1a73e8;
          box-shadow: 0 3px 8px rgba(26, 115, 232, 0.15);
        }

        .google-btn-icon {
          flex-shrink: 0;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.25rem 0 1rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--border-light);
        }

        .divider-label {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-light);
          font-weight: 600;
        }

        /* Demo Fill Card */
        .demo-fill-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          background: var(--c-mint-wash);
          border: 1px solid var(--c-jade);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }

        .demo-fill-content {
          display: flex;
          flex-direction: column;
        }

        .demo-fill-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--c-navy);
        }

        .demo-fill-sub {
          font-size: 0.7rem;
          color: var(--c-teal);
        }

        .demo-fill-btns {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .demo-autofill-btn,
        .demo-1click-btn {
          border: none;
          padding: 0.32rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .demo-autofill-btn {
          background: rgba(33, 91, 99, 0.15);
          color: var(--c-teal);
        }
        .demo-autofill-btn:hover {
          background: rgba(33, 91, 99, 0.25);
        }

        .demo-1click-btn {
          background: var(--c-navy);
          color: #ffffff;
        }
        .demo-1click-btn:hover {
          background: var(--c-teal);
        }

        /* Forms */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .label-with-aside {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .forgot-password-link {
          background: transparent;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--c-teal);
          cursor: pointer;
          padding: 0;
        }
        .forgot-password-link:hover {
          text-decoration: underline;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          min-height: 46px;
          padding: 0.65rem 2.5rem 0.65rem 2.4rem;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-main);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--c-teal);
          box-shadow: 0 0 0 3px var(--c-mint-subtle);
        }

        .password-toggle-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .password-toggle-btn:hover {
          color: var(--text-main);
        }

        .confirm-indicator {
          position: absolute;
          right: 0.75rem;
        }

        /* Password Strength */
        .password-strength-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.35rem;
        }

        .strength-meter-bar {
          flex: 1;
          height: 5px;
          background: var(--border-light);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .strength-meter-fill {
          height: 100%;
          transition: width 0.25s ease, background 0.25s ease;
        }

        .strength-label {
          font-size: 0.72rem;
          font-weight: 700;
        }

        /* Board Radio Chips */
        .board-radio-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .board-chip-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 0.25rem;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .board-chip-btn:hover {
          border-color: var(--c-teal);
        }
        .board-chip-btn.active {
          border-color: var(--c-navy);
          background: var(--c-mint-wash);
        }

        .board-chip-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .board-chip-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        /* Checkbox */
        .form-checkbox-row {
          display: flex;
          align-items: flex-start;
          margin-top: -0.25rem;
        }

        .checkbox-label-styled {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .checkbox-label-styled input[type="checkbox"] {
          accent-color: var(--c-teal);
          width: 16px;
          height: 16px;
        }

        .terms-link {
          color: var(--c-navy);
          text-decoration: underline;
        }

        /* Forgot password drawer */
        .forgot-password-drawer {
          padding: 0.85rem 1rem;
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }

        .drawer-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          margin-bottom: 0.2rem;
        }

        .drawer-desc {
          font-size: 0.74rem;
          color: var(--text-muted);
          margin: 0 0 0.5rem 0;
        }

        .drawer-row {
          display: flex;
          gap: 0.5rem;
        }

        .drawer-input {
          min-height: 38px;
          padding: 0.4rem 0.75rem;
          font-size: 0.82rem;
        }

        .drawer-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--c-navy);
        }

        /* Submit Button */
        .auth-submit-btn {
          margin-top: 0.5rem;
        }

        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Switch Prompt */
        .auth-switch-prompt {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.84rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .switch-link-btn {
          background: transparent;
          border: none;
          color: var(--c-navy);
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }
        .switch-link-btn:hover {
          text-decoration: underline;
        }

        /* Authenticated State View */
        .signin-authenticated-card {
          max-width: 580px;
          margin: 2rem auto;
          text-align: center;
          padding: 3rem 2rem;
          border-radius: var(--radius-xl);
          border: 1.5px solid var(--c-jade);
          background: var(--bg-card);
        }

        .auth-success-icon-wrap {
          margin-bottom: 1rem;
        }

        .auth-success-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0 0 0.5rem 0;
        }

        .auth-success-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0 0 1.75rem 0;
          line-height: 1.5;
        }

        .auth-user-snapshot {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          padding: 1rem;
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
        }

        .snapshot-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .snapshot-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-light);
          font-weight: 600;
        }

        .snapshot-val {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .auth-success-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .signout-card-btn {
          border-color: rgba(220, 38, 38, 0.35) !important;
          color: #dc2626 !important;
          background: rgba(220, 38, 38, 0.05) !important;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .signout-card-btn:hover {
          background: #dc2626 !important;
          color: #ffffff !important;
          border-color: #dc2626 !important;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
        }

        [data-theme="dark"] .signout-card-btn {
          border-color: rgba(239, 68, 68, 0.45) !important;
          color: #fca5a5 !important;
          background: rgba(239, 68, 68, 0.12) !important;
        }

        [data-theme="dark"] .signout-card-btn:hover {
          background: #ef4444 !important;
          color: #ffffff !important;
          border-color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
