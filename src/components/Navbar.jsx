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
              <span className="logo-subtitle">
                {currentPage === 'careers' ? 'Educator Network' : 'Class 10 AI Boards'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            {currentPage === 'home' ? (
              <>
                <a href="#ai-marking" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#ai-marking')}>AI Marking</a>
                <a href="#readiness" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#readiness')}>Board Readiness</a>
                <a href="#mock-tests" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}>Mock Tests</a>
                <a href="#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#how-it-works')}>How It Works</a>
                <a href="#pricing" className="nav-link" onClick={(e) => handleNavClick(e, 'home', '#pricing')}>Pricing</a>
                <button
                  type="button"
                  className="nav-link nav-careers-pill-btn"
                  onClick={(e) => handleNavClick(e, 'careers')}
                >
                  <Briefcase size={14} className="text-lavender-icon" />
                  <span>Careers / For Teachers</span>
                  <span className="hiring-dot"></span>
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  className="nav-link nav-back-student-btn"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  <GraduationCap size={14} />
                  <span>Student Portal</span>
                </button>
                <a href="#careers" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#careers')}>Why Teach With Us</a>
                <a href="#royalty-calc" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#royalty-calc')}>Royalty Calculator</a>
                <a href="#teacher-signup-section" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#teacher-signup-section')}>Sign Up as Teacher</a>
                <a href="#open-roles" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#open-roles')}>Open Roles</a>
                <a href="#teacher-faqs" className="nav-link" onClick={(e) => handleNavClick(e, 'careers', '#teacher-faqs')}>FAQs</a>
              </>
            )}
          </nav>

          {/* CTA Actions */}
          <div className="nav-actions">
            {currentPage === 'home' ? (
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
                  onClick={() => {
                    alert('Student Sign In: Direct access to CBSE/ICSE mock test dashboard.');
                  }}
                >
                  <span>Student Sign In</span>
                  <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  className="btn btn-pastel-lavender nav-demo-btn"
                  onClick={(e) => handleNavClick(e, 'careers', '#royalty-calc')}
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
                  <GraduationCap size={15} />
                  <span>Student Portal</span>
                </button>
                <button
                  type="button"
                  className={`mobile-switch-btn ${currentPage === 'careers' ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'careers')}
                >
                  <Users size={15} />
                  <span>Careers / Teachers</span>
                </button>
              </div>
            </div>

            <div className="mobile-links-list">
              {currentPage === 'home' ? (
                <>
                  <a href="#ai-marking" onClick={(e) => handleNavClick(e, 'home', '#ai-marking')}>AI Step Marking</a>
                  <a href="#readiness" onClick={(e) => handleNavClick(e, 'home', '#readiness')}>Board Readiness Predictor</a>
                  <a href="#mock-tests" onClick={(e) => handleNavClick(e, 'home', '#mock-tests')}>Timed Mock Tests</a>
                  <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'home', '#how-it-works')}>How It Works</a>
                  <a href="#pricing" onClick={(e) => handleNavClick(e, 'home', '#pricing')}>Pricing &amp; Board Passes</a>
                  <a href="#careers" onClick={(e) => handleNavClick(e, 'careers')} className="text-lavender-accent font-semibold">
                    Careers &amp; Teacher Network →
                  </a>
                </>
              ) : (
                <>
                  <a href="#careers" onClick={(e) => handleNavClick(e, 'careers', '#careers')}>Why Teach With Us</a>
                  <a href="#royalty-calc" onClick={(e) => handleNavClick(e, 'careers', '#royalty-calc')}>Royalty &amp; Payout Calculator</a>
                  <a href="#teacher-signup-section" onClick={(e) => handleNavClick(e, 'careers', '#teacher-signup-section')}>Sign Up as Teacher</a>
                  <a href="#open-roles" onClick={(e) => handleNavClick(e, 'careers', '#open-roles')}>Open Positions</a>
                  <a href="#teacher-faqs" onClick={(e) => handleNavClick(e, 'careers', '#teacher-faqs')}>Teacher FAQ</a>
                  <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-emerald-accent font-semibold">
                    ← Return to Student Portal
                  </a>
                </>
              )}
            </div>

            <div className="mobile-menu-actions">
              {currentPage === 'home' ? (
                <button 
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => { setMobileMenuOpen(false); openDemoExam(); }}
                >
                  <Sparkles size={16} />
                  <span>Start Free First Mock</span>
                </button>
              ) : (
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
          background: rgba(251, 251, 250, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-light);
          transition: all var(--transition-smooth);
        }

        .nav-scrolled {
          background: rgba(255, 255, 255, 0.95);
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
          gap: 1.5rem;
        }

        .nav-link {
          font-size: 0.92rem;
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
          padding: 6px 12px;
          background: var(--pastel-lavender);
          border: 1px solid var(--pastel-lavender-border);
          border-radius: var(--radius-full);
          color: var(--pastel-lavender-text);
          font-weight: 600;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }
        .nav-careers-pill-btn:hover {
          background: #e4ddfc;
          color: #3b2fa0;
          transform: translateY(-1px);
        }
        .text-lavender-icon {
          color: var(--pastel-lavender-text);
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
          padding: 6px 12px;
          background: var(--pastel-sage);
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-full);
          color: var(--pastel-sage-text);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .nav-back-student-btn:hover {
          background: #d4ebd9;
          color: #153c29;
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
          gap: 6px;
          padding: 8px 10px;
          border: 1px solid var(--border-light);
          background: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
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
