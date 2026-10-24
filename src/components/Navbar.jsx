import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Menu, 
  X, 
  Briefcase,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  LogIn,
  User
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { 
    currentPage, 
    navigateTo, 
    openDemoExam, 
    openTeacherSignup,
    openSignIn
  } = useNavigation();

  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-user-dropdown-wrap')) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [userDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, page, hash = '') => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(page, hash);
  };

  const getSubtitle = () => {
    if (currentPage === 'careers') return 'Careers';
    if (currentPage === 'teachers') return 'Educators';
    if (currentPage === 'signin') return 'Sign In';
    return 'Class 10';
  };

  return (
    <>
      <header className={`sticky-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="app-container">
          <div className="nav-inner">
            {/* Minimal Brand Logo */}
            <a 
              href="#" 
              className="brand-logo" 
              onClick={(e) => handleNavClick(e, 'home')}
              aria-label="Quanverse Home"
            >
              <div className="logo-symbol">
                <span className="logo-q">Q</span>
                <span className="logo-dot"></span>
              </div>
              <div className="logo-text-group">
                <span className="logo-title">quanverse</span>
                <span className="logo-badge-divider" aria-hidden="true">•</span>
                <span className="logo-subtitle">{getSubtitle()}</span>
              </div>
            </a>

            {/* Clean Minimal Desktop Navigation - Exactly 3 to 4 Essential Options */}
            <nav className="desktop-nav-links" aria-label="Primary Navigation">
              {currentPage === 'home' && (
                <>
                  <a 
                    href="#how-it-works" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#how-it-works')}
                  >
                    How It Works
                  </a>
                  <a 
                    href="#features" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#features')}
                  >
                    Features
                  </a>
                  <a 
                    href="#mock-tests" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}
                  >
                    Mock Tests
                  </a>
                  <a 
                    href="#pricing" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#pricing')}
                  >
                    Pricing
                  </a>
                </>
              )}

              {currentPage === 'teachers' && (
                <>
                  <a 
                    href="#teachers" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'teachers', '#teachers')}
                  >
                    Why Teach
                  </a>
                  <a 
                    href="#royalty-calc" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'teachers', '#royalty-calc')}
                  >
                    Royalty Calculator
                  </a>
                  <a 
                    href="#teacher-faqs" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'teachers', '#teacher-faqs')}
                  >
                    FAQs
                  </a>
                  <button 
                    type="button" 
                    className="nav-link nav-portal-return-link"
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    <GraduationCap size={13} />
                    <span>Student Portal</span>
                  </button>
                </>
              )}

              {currentPage === 'careers' && (
                <>
                  <a 
                    href="#open-positions" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                  >
                    Open Roles
                  </a>
                  <a 
                    href="#company-culture" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'careers', '#company-culture')}
                  >
                    Culture &amp; Perks
                  </a>
                  <button 
                    type="button" 
                    className="nav-link nav-portal-return-link"
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    <GraduationCap size={13} />
                    <span>Student Portal</span>
                  </button>
                </>
              )}

              {currentPage === 'signin' && (
                <>
                  <button 
                    type="button" 
                    className="nav-link nav-portal-return-link"
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    <GraduationCap size={13} />
                    <span>Class 10 Portal</span>
                  </button>
                  <a 
                    href="#how-it-works" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#how-it-works')}
                  >
                    How It Works
                  </a>
                  <a 
                    href="#pricing" 
                    className="nav-link" 
                    onClick={(e) => handleNavClick(e, 'home', '#pricing')}
                  >
                    Board Passes
                  </a>
                </>
              )}
            </nav>

            {/* Desktop Actions & Theme Toggle */}
            <div className="nav-actions">
              {/* Theme Toggle Button */}
              <button 
                type="button" 
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun size={15} className="theme-toggle-icon sun" />
                ) : (
                  <Moon size={15} className="theme-toggle-icon moon" />
                )}
              </button>

              {/* If Authenticated: Show Student Profile Chip, Dropdown, AND Direct Sign Out Button */}
              {isAuthenticated && user ? (
                <div className="nav-authenticated-wrapper">
                  <div className="nav-user-dropdown-wrap">
                    <button 
                      type="button" 
                      className="nav-user-pill-btn"
                      onClick={() => setUserDropdownOpen(prev => !prev)}
                      aria-expanded={userDropdownOpen}
                      aria-label="Student account menu"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="nav-user-avatar-img" />
                      ) : (
                        <div className="nav-user-avatar-initials">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                      )}
                      <span className="nav-user-firstname">{user.name?.split(' ')[0] || 'Student'}</span>
                      <span className="nav-user-badge">{user.board || 'CBSE'} 10th</span>
                      <ChevronDown size={13} className={`nav-user-caret ${userDropdownOpen ? 'rotated' : ''}`} />
                    </button>

                    {userDropdownOpen && (
                      <div className="nav-user-dropdown-menu">
                        <div className="dropdown-user-info">
                          <div className="dropdown-user-name-row">
                            <span className="dropdown-user-name">{user.name}</span>
                            {user.provider === 'google' && (
                              <span className="dropdown-google-tag" title="Verified via Google Account">Google</span>
                            )}
                          </div>
                          <span className="dropdown-user-email">{user.email}</span>
                          <span className="dropdown-user-board-info">{user.board} Class 10 • 2027 Boards</span>
                        </div>

                        <div className="dropdown-menu-divider" />

                        <button 
                          type="button" 
                          className="dropdown-menu-action"
                          onClick={() => { setUserDropdownOpen(false); navigateTo('signin'); }}
                        >
                          <User size={14} className="text-teal" />
                          <span>Student Account &amp; Stats</span>
                        </button>

                        <button 
                          type="button" 
                          className="dropdown-menu-action"
                          onClick={() => { setUserDropdownOpen(false); openDemoExam(); }}
                        >
                          <Sparkles size={14} className="text-emerald" />
                          <span>Practice Board Mock</span>
                        </button>

                        <button 
                          type="button" 
                          className="dropdown-menu-action"
                          onClick={() => { setUserDropdownOpen(false); navigateTo('home', '#mock-tests'); }}
                        >
                          <GraduationCap size={14} className="text-teal" />
                          <span>Question Banks</span>
                        </button>

                        <div className="dropdown-menu-divider" />

                        <button 
                          type="button" 
                          className="dropdown-menu-action text-danger"
                          onClick={() => { setUserDropdownOpen(false); signOut(); }}
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PROMINENT, WORKABLE SIGN OUT BUTTON (DIRECT 1-CLICK ACCESS) */}
                  <button 
                    type="button" 
                    className="nav-signout-header-btn"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    aria-label="Sign out of student account"
                    title="Sign Out of student account"
                  >
                    <LogOut size={13} className="nav-signout-icon" />
                    <span className="nav-signout-text">Sign Out</span>
                  </button>
                </div>
              ) : (
                /* Unauthenticated State: Always visible Sign In button + Primary CTA */
                <div className="nav-unauthenticated-wrapper">
                  <button 
                    type="button" 
                    className={`nav-signin-header-btn ${currentPage === 'signin' ? 'active' : ''}`}
                    onClick={() => openSignIn('signin')}
                    aria-label="Student Sign In"
                    title="Sign In to Student Portal"
                  >
                    <LogIn size={13} className="nav-signin-icon" />
                    <span>Sign In</span>
                  </button>

                  {(currentPage === 'home' || currentPage === 'signin') && (
                    <button 
                      type="button" 
                      className="btn btn-primary nav-cta-btn"
                      onClick={openDemoExam}
                    >
                      <Sparkles size={13} />
                      <span>Try Demo</span>
                    </button>
                  )}

                  {currentPage === 'careers' && (
                    <a 
                      href="#open-positions" 
                      className="btn btn-primary nav-cta-btn"
                      onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                    >
                      <span>Explore Jobs</span>
                      <ArrowRight size={13} />
                    </a>
                  )}

                  {currentPage === 'teachers' && (
                    <button 
                      type="button" 
                      className="btn btn-primary nav-cta-btn"
                      onClick={openTeacherSignup}
                    >
                      <Users size={13} />
                      <span>Apply Now</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              )}

              {/* Mobile Hamburger Button */}
              <button 
                type="button" 
                className="mobile-hamburger" 
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Mobile Drawer Rendered via Portal */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="mobile-drawer-portal">
          <div 
            className="mobile-drawer-backdrop" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true" 
          />

          <div 
            className="mobile-menu-drawer" 
            role="dialog" 
            aria-modal="true" 
            aria-label="Mobile Navigation"
          >
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <div className="logo-symbol">
                  <span className="logo-q">Q</span>
                  <span className="logo-dot"></span>
                </div>
                <div className="logo-text-group">
                  <span className="logo-title">quanverse</span>
                  <span className="logo-badge-divider">•</span>
                  <span className="logo-subtitle">{getSubtitle()}</span>
                </div>
              </div>
              <div className="mobile-drawer-header-actions">
                <button 
                  type="button" 
                  className="theme-toggle-btn mobile-theme-btn"
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button 
                  type="button" 
                  className="mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-menu-inner">
              {/* Minimal Portal Switcher */}
              <div className="mobile-switch-card">
                <span className="mobile-switch-label">Portal</span>
                <div className="mobile-switch-row">
                  <button
                    type="button"
                    className={`mobile-switch-btn ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    <GraduationCap size={13} />
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-switch-btn ${currentPage === 'teachers' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, 'teachers')}
                  >
                    <Users size={13} />
                    <span>Teachers</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-switch-btn ${currentPage === 'careers' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, 'careers')}
                  >
                    <Briefcase size={13} />
                    <span>Careers</span>
                  </button>
                </div>
              </div>

              {/* Minimal Navigation Links List (Exactly 3 to 4 items) */}
              <div className="mobile-links-list">
                {currentPage === 'home' && (
                  <>
                    <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'home', '#how-it-works')}>
                      <span>How It Works</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#features" onClick={(e) => handleNavClick(e, 'home', '#features')}>
                      <span>Features</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#mock-tests" onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}>
                      <span>Mock Tests</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#pricing" onClick={(e) => handleNavClick(e, 'home', '#pricing')}>
                      <span>Pricing</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                  </>
                )}

                {currentPage === 'teachers' && (
                  <>
                    <a href="#teachers" onClick={(e) => handleNavClick(e, 'teachers', '#teachers')}>
                      <span>Why Teach With Us</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#royalty-calc" onClick={(e) => handleNavClick(e, 'teachers', '#royalty-calc')}>
                      <span>Royalty Calculator</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#teacher-faqs" onClick={(e) => handleNavClick(e, 'teachers', '#teacher-faqs')}>
                      <span>Educator FAQs</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                  </>
                )}

                {currentPage === 'careers' && (
                  <>
                    <a href="#open-positions" onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}>
                      <span>Open Roles</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                    <a href="#company-culture" onClick={(e) => handleNavClick(e, 'careers', '#company-culture')}>
                      <span>Culture &amp; Perks</span>
                      <ArrowRight size={14} className="mobile-arrow" />
                    </a>
                  </>
                )}
              </div>

              {/* Mobile Clean CTAs */}
              <div className="mobile-menu-actions">
                {/* Authenticated User in Mobile Menu */}
                {isAuthenticated && user ? (
                  <div className="mobile-user-card">
                    <div className="mobile-user-row">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="mobile-user-avatar" />
                      ) : (
                        <div className="mobile-user-initials">{user.name?.charAt(0) || 'S'}</div>
                      )}
                      <div className="mobile-user-meta">
                        <span className="mobile-user-name">{user.name}</span>
                        <span className="mobile-user-email">{user.email}</span>
                        <span className="mobile-user-board">{user.board} Class 10 • 2027 Boards</span>
                      </div>
                    </div>
                    <div className="mobile-user-actions">
                      <button 
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                      >
                        <Sparkles size={15} />
                        <span>Practice Free Demo Exam</span>
                      </button>
                      
                      {/* WORKABLE PROMINENT MOBILE SIGN OUT BUTTON */}
                      <button 
                        type="button" 
                        className="btn btn-secondary w-full mobile-signout-btn"
                        onClick={() => { setMobileMenuOpen(false); signOut(); }}
                        title="Sign Out of student account"
                      >
                        <LogOut size={15} />
                        <span>Sign Out of Account</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-unauth-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary w-full mobile-signin-btn"
                      onClick={() => { setMobileMenuOpen(false); openSignIn('signin'); }}
                    >
                      <LogIn size={15} />
                      <span>Student Sign In / Create Account</span>
                    </button>

                    {(currentPage === 'home' || currentPage === 'signin') && (
                      <button 
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                      >
                        <Sparkles size={15} />
                        <span>Try Free Demo Exam</span>
                      </button>
                    )}
                    {currentPage === 'careers' && (
                      <a 
                        href="#open-positions"
                        className="btn btn-primary w-full text-center"
                        onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                      >
                        <span>View All Open Positions</span>
                        <ArrowRight size={15} />
                      </a>
                    )}
                    {currentPage === 'teachers' && (
                      <button 
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={() => { setMobileMenuOpen(false); openTeacherSignup(); }}
                      >
                        <Users size={15} />
                        <span>Apply as an Educator</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        /* ============================================================
           MINIMAL REFINED NAVBAR
           ============================================================ */
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(235, 238, 232, 0.90);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .nav-scrolled {
          background: rgba(242, 245, 240, 0.96);
          border-bottom: 1.5px solid rgba(15, 23, 42, 0.10);
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06);
        }

        /* Dark Mode Translucent Navbar */
        [data-theme="dark"] .sticky-nav {
          background: rgba(13, 17, 23, 0.82);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        [data-theme="dark"] .nav-scrolled {
          background: rgba(13, 17, 23, 0.94);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.5);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 62px;
          gap: 1.5rem;
        }

        /* Brand Logo */
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
          user-select: none;
        }

        .logo-symbol {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, rgb(18, 65, 112) 0%, rgb(33, 91, 99) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 2px 8px rgba(18, 65, 112, 0.25);
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme="dark"] .logo-symbol {
          background: linear-gradient(135deg, rgb(33, 91, 99) 0%, rgb(18, 65, 112) 100%);
          border: 1px solid rgba(170, 255, 199, 0.4);
          box-shadow: 0 2px 10px rgba(170, 255, 199, 0.2);
        }

        .brand-logo:hover .logo-symbol {
          transform: scale(1.05);
        }

        .logo-q {
          color: #ffffff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          line-height: 1;
        }

        .logo-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: rgb(170, 255, 199);
          border-radius: 50%;
          bottom: 4px;
          right: 4px;
          box-shadow: 0 0 6px rgb(170, 255, 199);
        }

        .logo-text-group {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .logo-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.15rem;
          color: rgb(18, 65, 112);
          letter-spacing: -0.025em;
          line-height: 1;
        }

        [data-theme="dark"] .logo-title {
          color: rgb(170, 255, 199);
        }

        .logo-badge-divider {
          color: var(--text-light);
          opacity: 0.4;
          font-size: 0.75rem;
          line-height: 1;
        }

        .logo-subtitle {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: var(--bg-subtle);
          padding: 2px 7px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          line-height: 1.2;
        }

        [data-theme="dark"] .logo-subtitle {
          background: #21262d;
          color: #8b949e;
          border-color: #30363d;
        }

        /* Desktop Nav Links: Minimal floating pill container */
        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(15, 23, 42, 0.03);
          padding: 3px 5px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        [data-theme="dark"] .desktop-nav-links {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .nav-link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 0.42rem 0.9rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: color 0.16s ease, background 0.16s ease, transform 0.16s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .nav-link:hover {
          color: var(--text-main);
          background: rgba(15, 23, 42, 0.06);
        }

        [data-theme="dark"] .nav-link {
          color: #94a3b8;
        }

        [data-theme="dark"] .nav-link:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-portal-return-link {
          background: rgba(170, 255, 199, 0.4);
          color: rgb(18, 65, 112);
          font-weight: 600;
          border: 1px solid rgb(103, 192, 144);
        }

        [data-theme="dark"] .nav-portal-return-link {
          background: rgba(170, 255, 199, 0.15);
          color: rgb(170, 255, 199);
          border-color: rgba(170, 255, 199, 0.35);
        }

        /* Desktop Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
        }

        .theme-toggle-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          color: var(--text-main);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-subtle);
        }

        .theme-toggle-btn:hover {
          background: var(--bg-subtle);
          transform: translateY(-1px);
          border-color: var(--border-medium);
        }

        .theme-toggle-icon.sun {
          color: rgb(103, 192, 144);
        }

        .theme-toggle-icon.moon {
          color: rgb(18, 65, 112);
        }

        [data-theme="dark"] .theme-toggle-icon.moon {
          color: rgb(170, 255, 199);
        }

        .nav-authenticated-wrapper,
        .nav-unauthenticated-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-signin-header-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          color: var(--text-main);
          font-size: 0.8125rem;
          font-weight: 700;
          font-family: var(--font-sans);
          padding: 0.42rem 0.85rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .nav-signin-header-btn:hover,
        .nav-signin-header-btn.active {
          background: var(--c-navy);
          color: #ffffff;
          border-color: var(--c-navy);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px var(--c-navy-wash);
        }

        [data-theme="dark"] .nav-signin-header-btn {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          color: #f1f5f9;
        }

        [data-theme="dark"] .nav-signin-header-btn:hover,
        [data-theme="dark"] .nav-signin-header-btn.active {
          background: var(--c-mint);
          color: var(--c-navy);
          border-color: var(--c-mint);
          box-shadow: 0 2px 10px rgba(170, 255, 199, 0.25);
        }

        /* Workable, Direct 1-Click Sign Out Button */
        .nav-signout-header-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.4rem 0.75rem;
          background: rgba(220, 38, 38, 0.08);
          border: 1px solid rgba(220, 38, 38, 0.25);
          border-radius: var(--radius-full);
          color: #dc2626;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .nav-signout-header-btn:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.25);
        }

        [data-theme="dark"] .nav-signout-header-btn {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }

        [data-theme="dark"] .nav-signout-header-btn:hover {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
        }

        .nav-cta-btn {
          font-size: 0.8125rem;
          padding: 0.44rem 0.95rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .mobile-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.15s ease;
        }

        .mobile-hamburger:hover {
          background: var(--bg-subtle);
        }

        /* ============================================================
           MOBILE DRAWER
           ============================================================ */
        .mobile-drawer-portal {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(13, 17, 23, 0.5);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: backdropFadeIn 0.15s ease-out;
        }

        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-menu-drawer {
          position: relative;
          width: 100%;
          max-width: 340px;
          height: 100dvh;
          background: var(--bg-page);
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 100000;
          animation: drawerSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        [data-theme="dark"] .mobile-menu-drawer {
          background: #121820;
          border-left: 1px solid #28303b;
        }

        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-card);
        }

        .mobile-drawer-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .mobile-drawer-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--bg-subtle);
          border: 1px solid var(--border-light);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-menu-inner {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mobile-switch-card {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-light);
        }

        .mobile-switch-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }

        .mobile-switch-row {
          display: flex;
          gap: 5px;
        }

        .mobile-switch-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 7px 4px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s ease;
        }

        .mobile-switch-btn.active {
          background: rgb(18, 65, 112);
          color: #ffffff;
          border-color: rgb(33, 91, 99);
        }

        [data-theme="dark"] .mobile-switch-btn.active {
          background: rgb(18, 65, 112);
          border-color: rgb(170, 255, 199);
          color: rgb(170, 255, 199);
        }

        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.75rem;
        }

        .mobile-links-list a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 0.75rem 0.65rem;
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease, color 0.15s ease;
          border-bottom: 1px solid var(--border-light);
        }

        .mobile-links-list a:hover {
          background: var(--bg-subtle);
          color: var(--brand-emerald);
        }

        .mobile-arrow {
          color: var(--text-light);
          opacity: 0.6;
        }

        .mobile-menu-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding-top: 1rem;
        }

        .w-full {
          width: 100%;
        }

        /* User Dropdown Pill & Popover Menu */
        .nav-user-dropdown-wrap {
          position: relative;
        }

        .nav-user-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.28rem 0.65rem 0.28rem 0.32rem;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: var(--shadow-subtle);
        }
        .nav-user-pill-btn:hover {
          background: var(--bg-subtle);
          border-color: var(--c-teal);
        }

        .nav-user-avatar-img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          object-fit: cover;
        }

        .nav-user-avatar-initials {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--c-navy);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-user-firstname {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .nav-user-badge {
          background: var(--c-mint-wash);
          color: var(--c-navy);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .nav-user-caret {
          color: var(--text-light);
          transition: transform 0.2s ease;
        }
        .nav-user-caret.rotated {
          transform: rotate(180deg);
        }

        .nav-user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 0.5rem;
          box-shadow: var(--shadow-elevated);
          z-index: 1100;
          animation: dropFadeIn 0.15s ease-out;
        }

        @keyframes dropFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-user-info {
          padding: 0.5rem 0.65rem;
        }

        .dropdown-user-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }

        .dropdown-user-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dropdown-google-tag {
          font-size: 0.65rem;
          font-weight: 700;
          color: #1a73e8;
          background: #e8f0fe;
          padding: 1px 5px;
          border-radius: 4px;
        }

        .dropdown-user-email {
          font-size: 0.74rem;
          color: var(--text-muted);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        .dropdown-user-board-info {
          font-size: 0.7rem;
          color: var(--c-teal);
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }

        .dropdown-menu-divider {
          height: 1px;
          background: var(--border-light);
          margin: 0.35rem 0;
        }

        .dropdown-menu-action {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.65rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          text-align: left;
          transition: background 0.12s ease;
        }
        .dropdown-menu-action:hover {
          background: var(--bg-hover);
        }
        .dropdown-menu-action.text-danger {
          color: #dc2626;
        }
        .dropdown-menu-action.text-danger:hover {
          background: rgba(220, 38, 38, 0.08);
        }

        /* Mobile User Card */
        .mobile-user-card {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .mobile-user-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .mobile-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .mobile-user-initials {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--c-navy);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-user-meta {
          display: flex;
          flex-direction: column;
        }

        .mobile-user-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .mobile-user-email {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .mobile-user-board {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--c-teal);
        }

        .mobile-user-actions,
        .mobile-unauth-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-signout-btn {
          color: #dc2626 !important;
          border-color: rgba(220, 38, 38, 0.3) !important;
          background: rgba(220, 38, 38, 0.06) !important;
          font-weight: 700;
        }

        .mobile-signout-btn:hover {
          background: #dc2626 !important;
          color: #ffffff !important;
          border-color: #dc2626 !important;
        }

        .mobile-signin-btn {
          font-weight: 700;
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .desktop-nav-links {
            display: none;
          }
          .mobile-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .nav-authenticated-wrapper,
          .nav-unauthenticated-wrapper {
            gap: 0.35rem;
          }
        }

        @media (max-width: 580px) {
          .nav-signout-text {
            display: none;
          }
          .nav-signout-header-btn {
            padding: 0.42rem 0.55rem;
          }
        }

        @media (max-width: 480px) {
          .logo-subtitle,
          .logo-badge-divider {
            display: none;
          }
          .nav-cta-btn span {
            display: none;
          }
          .nav-cta-btn {
            padding: 0.44rem 0.6rem;
          }
          .nav-signin-header-btn span {
            display: none;
          }
          .nav-signin-header-btn {
            padding: 0.42rem 0.55rem;
          }
        }
      `}</style>
    </>
  );
}
