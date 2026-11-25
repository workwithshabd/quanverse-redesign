import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Menu,
  X,
  Briefcase,
  ChevronDown,
  LogOut,
  LogIn,
  User
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const {
    currentPage,
    navigateTo,
    openDemoExam,
    openTeacherSignup,
    openSignIn
  } = useNavigation();

  const { user, isAuthenticated, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('.nav-user-dropdown-wrap')) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [userDropdownOpen]);

  // Smooth, progressive scroll-linked transition from navbar into hero section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Progressively interpolate blur, background, and borders across the initial 64px
          const progress = Math.min(1, Math.max(0, scrollY / 64));
          if (headerRef.current) {
            headerRef.current.style.setProperty('--scroll-progress', progress.toFixed(3));
          }
          setIsScrolled(scrollY > 28);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const handleNavClick = (e: React.MouseEvent, page: 'home' | 'teachers' | 'careers' | 'signin', hash = '') => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(page, hash);
  };

  const getSubtitle = (): string => {
    if (currentPage === 'careers') return 'Careers';
    if (currentPage === 'teachers') return 'Educators';
    if (currentPage === 'signin') return 'Sign In';
    return 'Class 10';
  };

  return (
    <>
      <header ref={headerRef} className={`sticky-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
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

            {/* Clean Minimal Desktop Navigation */}
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

            {/* Desktop Actions */}
            <div className="nav-actions">
              {isAuthenticated && user ? (
                <div className="nav-authenticated-wrapper">
                  <div className="nav-user-dropdown-wrap">
                    <button
                      type="button"
                      className="nav-user-btn"
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

                  {/* PROMINENT SIGN OUT BUTTON */}
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
                /* Unauthenticated State: Sign In button + Primary CTA */
                <div className="nav-unauthenticated-wrapper">
                  <button
                    type="button"
                    className={`nav-signin-header-btn ${currentPage === 'signin' ? 'active' : ''}`}
                    data-flair-stable
                    onClick={() => openSignIn('signin')}
                    aria-label="Student Sign In"
                    title="Sign In to Student Portal"
                  >
                    <span className="button__flair" aria-hidden="true" />
                    <LogIn size={13} className="nav-signin-icon" />
                    <span>Sign In</span>
                  </button>

                  {(currentPage === 'home' || currentPage === 'signin') && (
                    <button
                      type="button"
                      className="btn btn-primary zuse-cta-primary nav-cta-btn"
                      onClick={openDemoExam}
                    >
                      <span className="button__flair" aria-hidden="true" />
                      <Sparkles size={12} />
                      <span>Start Free</span>
                      <kbd className="zuse-kbd">↵</kbd>
                    </button>
                  )}

                  {currentPage === 'careers' && (
                    <a
                      href="#open-positions"
                      className="btn btn-primary zuse-cta-primary nav-cta-btn"
                      onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                    >
                      <span className="button__flair" aria-hidden="true" />
                      <span>Explore Jobs</span>
                      <ArrowRight size={12} />
                    </a>
                  )}

                  {currentPage === 'teachers' && (
                    <button
                      type="button"
                      className="btn btn-primary zuse-cta-primary nav-cta-btn"
                      onClick={openTeacherSignup}
                    >
                      <span className="button__flair" aria-hidden="true" />
                      <Users size={12} />
                      <span>Apply Now</span>
                      <ArrowRight size={12} />
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

      {/* Mobile Drawer Rendered via Portal */}
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
                  className="mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-menu-inner">
              {/* Portal Switcher */}
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

              {/* Mobile Navigation Links List */}
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

              {/* Mobile Actions */}
              <div className="mobile-menu-actions">
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
                        className="btn btn-primary w-full py-3 px-5"
                        onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                      >
                        <span className="button__flair" aria-hidden="true" />
                        <Sparkles size={15} />
                        <span>Practice Free Demo Exam</span>
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary w-full mobile-signout-btn py-3 px-5"
                        onClick={() => { setMobileMenuOpen(false); signOut(); }}
                        title="Sign Out of student account"
                      >
                        <span className="button__flair" aria-hidden="true" />
                        <LogOut size={15} />
                        <span>Sign Out of Account</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-unauth-actions">
                    <button
                      type="button"
                      className="btn btn-secondary w-full mobile-signin-btn py-3 px-5"
                      onClick={() => { setMobileMenuOpen(false); openSignIn('signin'); }}
                    >
                      <span className="button__flair" aria-hidden="true" />
                      <LogIn size={15} />
                      <span>Student Sign In / Create Account</span>
                    </button>

                    {(currentPage === 'home' || currentPage === 'signin') && (
                      <button
                        type="button"
                        className="btn btn-primary w-full py-3 px-5"
                        onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                      >
                        <span className="button__flair" aria-hidden="true" />
                        <Sparkles size={15} />
                        <span>Try Free Demo Exam</span>
                      </button>
                    )}
                    {currentPage === 'careers' && (
                      <a
                        href="#open-positions"
                        className="btn btn-primary w-full text-center py-3 px-5"
                        onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                      >
                        <span className="button__flair" aria-hidden="true" />
                        <span>View All Open Positions</span>
                        <ArrowRight size={15} />
                      </a>
                    )}
                    {currentPage === 'teachers' && (
                      <button
                        type="button"
                        className="btn btn-primary w-full py-3 px-5"
                        onClick={() => { setMobileMenuOpen(false); openTeacherSignup(); }}
                      >
                        <span className="button__flair" aria-hidden="true" />
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
    </>
  );
}
