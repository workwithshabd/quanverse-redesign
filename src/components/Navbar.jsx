import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Menu, 
  X, 
  Briefcase,
  Coins
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function Navbar() {
  const { 
    currentPage, 
    navigateTo, 
    openDemoExam, 
    openTeacherSignup 
  } = useNavigation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, page, hash = '') => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(page, hash);
  };

  const getSubtitle = () => {
    if (currentPage === 'careers') return 'Careers & Culture';
    if (currentPage === 'teachers') return 'Educator Network';
    return 'Class 10 AI Boards';
  };

  return (
    <header className={`sticky-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="app-container">
        <div className="nav-inner">
          {/* Brand Logo */}
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
              <span className="logo-subtitle">{getSubtitle()}</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            {currentPage === 'home' && (
              <>
                <a href="#ai-marking" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#ai-marking')}>AI Marking</a>
                <a href="#readiness" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#readiness')}>Board Readiness</a>
                <a href="#mock-tests" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}>Mock Tests</a>
                <a href="#pricing" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#pricing')}>Pricing</a>
                
                {/* Careers Link */}
                <button
                  type="button"
                  className="nav-link nav-careers-pill-btn"
                  onClick={(e) => handleNavClick(e, 'careers')}
                >
                  <Briefcase size={13} className="text-lavender-icon" />
                  <span>Careers</span>
                  <span className="hiring-dot"></span>
                </button>

                {/* For Teachers Link */}
                <button
                  type="button"
                  className="nav-link nav-teacher-pill-btn"
                  onClick={(e) => handleNavClick(e, 'teachers')}
                >
                  <Users size={13} />
                  <span>For Teachers</span>
                </button>
              </>
            )}

            {currentPage === 'careers' && (
              <>
                <button 
                  type="button" 
                  className="nav-link nav-back-student-btn"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  <GraduationCap size={14} />
                  <span>Student Portal</span>
                </button>
                <a href="#open-positions" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}>Open Roles</a>
                <a href="#company-culture" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#company-culture')}>Culture &amp; Perks</a>
                
                {/* Dedicated route to Teachers page */}
                <button
                  type="button"
                  className="nav-link nav-teacher-pill-btn"
                  onClick={(e) => handleNavClick(e, 'teachers')}
                >
                  <Users size={13} />
                  <span>Teach With Us (Royalties) →</span>
                </button>
              </>
            )}

            {currentPage === 'teachers' && (
              <>
                <button 
                  type="button" 
                  className="nav-link nav-back-student-btn"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  <GraduationCap size={14} />
                  <span>Student Portal</span>
                </button>
                <a href="#teachers" className="nav-link" onClick={(e) => handleNavClick(e, 'teachers', '#teachers')}>Why Teach With Us</a>
                <a href="#royalty-calc" className="nav-link" onClick={(e) => handleNavClick(e, 'teachers', '#royalty-calc')}>Royalty Calculator</a>
                <a href="#teacher-signup-section" className="nav-link" onClick={(e) => handleNavClick(e, 'teachers', '#teacher-signup-section')}>Sign Up as Teacher</a>
                <a href="#teacher-faqs" className="nav-link" onClick={(e) => handleNavClick(e, 'teachers', '#teacher-faqs')}>FAQs</a>
                <button
                  type="button"
                  className="nav-link nav-careers-pill-btn"
                  onClick={(e) => handleNavClick(e, 'careers')}
                >
                  <Briefcase size={13} />
                  <span>All Company Careers</span>
                </button>
              </>
            )}
          </nav>

          {/* CTA Actions */}
          <div className="nav-actions">
            {currentPage === 'home' && (
              <>
                <button 
                  type="button" 
                  className="btn btn-pastel-sage nav-demo-btn"
                  onClick={openDemoExam}
                >
                  <Sparkles size={16} />
                  <span>Try Demo Exam</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-primary nav-signin-btn"
                  onClick={() => alert('Student Sign In: Direct access to CBSE/ICSE mock test dashboard.')}
                >
                  <span>Student Sign In</span>
                  <ArrowRight size={15} />
                </button>
              </>
            )}

            {currentPage === 'careers' && (
              <a 
                href="#open-positions" 
                className="btn btn-primary nav-signin-btn"
                onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
              >
                <span>View All Jobs</span>
                <ArrowRight size={15} />
              </a>
            )}

            {currentPage === 'teachers' && (
              <>
                <button 
                  type="button" 
                  className="btn btn-pastel-lavender nav-demo-btn"
                  onClick={(e) => handleNavClick(e, 'teachers', '#royalty-calc')}
                >
                  <Coins size={15} />
                  <span>Royalty Calc</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-primary nav-signin-btn"
                  onClick={openTeacherSignup}
                >
                  <Users size={15} />
                  <span>Apply as Teacher</span>
                  <ArrowRight size={15} />
                </button>
              </>
            )}

            {/* Mobile Hamburger */}
            <button 
              type="button" 
              className="mobile-hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-inner">
            
            {/* View Switcher inside Mobile Drawer */}
            <div className="mobile-switch-card">
              <span className="mobile-switch-label">Switch View:</span>
              <div className="mobile-switch-row">
                <button
                  type="button"
                  className={`mobile-switch-btn ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  <GraduationCap size={14} />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  className={`mobile-switch-btn ${currentPage === 'careers' ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'careers')}
                >
                  <Briefcase size={14} />
                  <span>Careers</span>
                </button>
                <button
                  type="button"
                  className={`mobile-switch-btn ${currentPage === 'teachers' ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'teachers')}
                >
                  <Users size={14} />
                  <span>Teachers</span>
                </button>
              </div>
            </div>

            <div className="mobile-links-list">
              {currentPage === 'home' && (
                <>
                  <a href="#ai-marking" onClick={(e) => handleNavClick(e, 'home', '#ai-marking')}>AI Step Marking</a>
                  <a href="#readiness" onClick={(e) => handleNavClick(e, 'home', '#readiness')}>Board Readiness Predictor</a>
                  <a href="#mock-tests" onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}>Timed Mock Tests</a>
                  <a href="#pricing" onClick={(e) => handleNavClick(e, 'home', '#pricing')}>Pricing &amp; Board Passes</a>
                  <a href="#careers" onClick={(e) => handleNavClick(e, 'careers')} className="text-lavender-accent font-semibold">
                    Company Careers (All Roles) →
                  </a>
                  <a href="#teachers" onClick={(e) => handleNavClick(e, 'teachers')} className="text-emerald-accent font-semibold">
                    For Teachers &amp; Educators →
                  </a>
                </>
              )}

              {currentPage === 'careers' && (
                <>
                  <a href="#open-positions" onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}>Open Positions</a>
                  <a href="#company-culture" onClick={(e) => handleNavClick(e, 'careers', '#company-culture')}>Culture &amp; Perks</a>
                  <a href="#teachers" onClick={(e) => handleNavClick(e, 'teachers')} className="text-lavender-accent font-semibold">
                    Apply as a Teacher (Royalties) →
                  </a>
                  <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                    ← Return to Student Portal
                  </a>
                </>
              )}

              {currentPage === 'teachers' && (
                <>
                  <a href="#teachers" onClick={(e) => handleNavClick(e, 'teachers', '#teachers')}>Why Teach With Us</a>
                  <a href="#royalty-calc" onClick={(e) => handleNavClick(e, 'teachers', '#royalty-calc')}>Royalty Calculator</a>
                  <a href="#teacher-signup-section" onClick={(e) => handleNavClick(e, 'teachers', '#teacher-signup-section')}>Sign Up as Teacher</a>
                  <a href="#teacher-faqs" onClick={(e) => handleNavClick(e, 'teachers', '#teacher-faqs')}>Teacher FAQs</a>
                  <a href="#careers" onClick={(e) => handleNavClick(e, 'careers')}>
                    Company Careers (All Roles) →
                  </a>
                  <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                    ← Return to Student Portal
                  </a>
                </>
              )}
            </div>

            <div className="mobile-menu-actions">
              {currentPage === 'home' && (
                <button 
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                >
                  <Sparkles size={16} />
                  <span>Start Free First Mock</span>
                </button>
              )}
              {currentPage === 'careers' && (
                <a 
                  href="#open-positions"
                  className="btn btn-primary w-full text-center"
                  onClick={(e) => handleNavClick(e, 'careers', '#open-positions')}
                >
                  <Briefcase size={16} />
                  <span>Explore Open Roles</span>
                </a>
              )}
              {currentPage === 'teachers' && (
                <button 
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => { setMobileMenuOpen(false); openTeacherSignup(); }}
                >
                  <Users size={16} />
                  <span>Sign Up as a Teacher</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(251, 251, 250, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-light);
          transition: all var(--transition-smooth);
        }

        .nav-scrolled {
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 4px 20px rgba(30, 63, 49, 0.05);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
          gap: 1.25rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-symbol {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1e3f31 0%, #2e5f4b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 12px rgba(30, 63, 49, 0.18);
        }

        .logo-q {
          color: #ffffff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          line-height: 1;
        }

        .logo-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #f7d070;
          border-radius: 50%;
          bottom: 7px;
          right: 7px;
          box-shadow: 0 0 6px #f7d070;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.35rem;
          color: var(--brand-emerald);
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .logo-subtitle {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Nav Links */
        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color var(--transition-fast);
          position: relative;
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          padding: 4px 0;
        }

        .nav-link:hover {
          color: var(--brand-emerald);
        }

        .nav-careers-pill-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--pastel-lavender);
          border: 1px solid var(--pastel-lavender-border);
          border-radius: var(--radius-full);
          color: var(--pastel-lavender-text);
          font-weight: 600;
          font-size: 0.82rem;
          transition: all var(--transition-fast);
        }
        .nav-careers-pill-btn:hover {
          background: #e4ddfc;
          transform: translateY(-1px);
        }

        .nav-teacher-pill-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--pastel-sage);
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-full);
          color: var(--pastel-sage-text);
          font-weight: 600;
          font-size: 0.82rem;
          transition: all var(--transition-fast);
        }
        .nav-teacher-pill-btn:hover {
          background: #d0ebd8;
          transform: translateY(-1px);
        }

        .hiring-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c72ed;
          animation: pulse 2s infinite;
        }

        .nav-back-student-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.82rem;
        }
        .nav-back-student-btn:hover {
          background: #e5ece6;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-demo-btn {
          font-size: 0.875rem;
          padding: 0.55rem 1.15rem;
        }

        .nav-signin-btn {
          font-size: 0.875rem;
          padding: 0.55rem 1.25rem;
        }

        .btn-pastel-lavender {
          background: var(--pastel-lavender);
          color: var(--pastel-lavender-text);
          border: 1px solid var(--pastel-lavender-border);
        }
        .btn-pastel-lavender:hover {
          background: #e4ddfc;
        }

        .mobile-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 6px;
        }

        /* Mobile Drawer */
        .mobile-menu-drawer {
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          background: #ffffff;
          border-bottom: 1px solid var(--border-medium);
          padding: 1.5rem;
          box-shadow: var(--shadow-elevated);
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-switch-card {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          margin-bottom: 1.25rem;
        }
        .mobile-switch-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-light);
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }
        .mobile-switch-row {
          display: flex;
          gap: 6px;
        }
        .mobile-switch-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 8px;
          border: 1px solid var(--border-light);
          background: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-muted);
        }
        .mobile-switch-btn.active {
          background: var(--brand-emerald);
          color: #ffffff;
          border-color: var(--brand-emerald);
        }

        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .mobile-links-list a {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 0.4rem 0;
          text-decoration: none;
          border-bottom: 1px solid var(--bg-subtle);
        }

        .text-lavender-accent {
          color: var(--pastel-lavender-text) !important;
        }
        .text-emerald-accent {
          color: var(--brand-emerald) !important;
        }

        .mobile-menu-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .w-full {
          width: 100%;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        @media (max-width: 980px) {
          .desktop-nav-links {
            display: none;
          }
          .mobile-hamburger {
            display: block;
          }
          .nav-demo-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
