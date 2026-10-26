import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useNavigation } from '../hooks/useNavigation';
import './FooterCicadaTree.css';

export default function Footer({ onOpenDemoExam }) {
  const { navigateTo, openDemoExam, openSignIn } = useNavigation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef(null);

  const handleOpenExam = onOpenDemoExam || openDemoExam;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    await api.subscribeNewsletter(email);
    setSubscribed(true);
  };

  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;

    // Check if #faqs is present on this page
    const faqExists = !!document.getElementById('faqs');

    // If #faqs is NOT present (e.g. Careers or Teachers page), ensure all footer elements are immediately visible
    if (!faqExists) {
      const wordmark = root.querySelector('.oversized-wordmark');
      const navGrid = root.querySelector('.footer-nav-grid');
      const midRow = root.querySelector('.footer-middle-row');
      const bottomBar = root.querySelector('.footer-bottom-bar');

      if (wordmark) gsap.set(wordmark, { opacity: 1, y: 0, scale: 1 });
      if (navGrid) gsap.set(navGrid, { opacity: 1, y: 0 });
      if (midRow) gsap.set(midRow, { opacity: 1, y: 0 });
      if (bottomBar) gsap.set(bottomBar, { opacity: 1 });
    }
  }, []);

  return (
    <footer className="site-footer" id="site-footer" ref={footerRef} aria-label="Quanverse Global Footer">
      <div className="app-container">

        {/* ── OVERSIZED QUANVERSE BRANDING WORDMARK ── */}
        <div className="footer-oversized-branding" aria-hidden="true">
          <span className="oversized-wordmark">QUANVERSE</span>
          <div className="oversized-glow" />
        </div>

        {/* ── 4-COLUMN FOOTER NAVIGATION ── */}
        <nav className="footer-nav-grid" aria-label="Footer Navigation">

          {/* Column 1: Students */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Students</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigateTo('home', '#mock-tests')}>
                  Mock Tests
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('home', '#how-it-works')}>
                  Step Marking Engine
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('home', '#readiness')}>
                  Board Readiness Scorecard
                </button>
              </li>
              <li>
                <button type="button" onClick={handleOpenExam}>
                  Attempt Free Demo Exam
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Teachers */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Teachers</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigateTo('teachers')}>
                  Teacher Creator Portal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('teachers', '#author')}>
                  Author Board Rubrics
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('teachers', '#analytics')}>
                  Cohort Performance Analytics
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('teachers', '#royalties')}>
                  Creator Royalty Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigateTo('home', '#pricing')}>
                  Pricing &amp; Access Passes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('home', '#faqs')}>
                  Examination FAQs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSignIn('signin')}>
                  Student &amp; Parent Sign In
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSignIn('signup')}>
                  Create Free Account
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Company</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigateTo('careers')}>
                  Careers &amp; Open Roles
                </button>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Notice: Student handwritten answer sheets and personal data are strictly encrypted and never shared or sold.');
                  }}
                >
                  Student Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Terms of Service: Governs exam session access, AI evaluation reports, and creator royalties.');
                  }}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Support: Reach out to support@quanverse.ai for student or school assistance.');
                  }}
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </nav>

        {/* ── FOOTER MIDDLE ROW: BRAND + NEWSLETTER + STATUS ── */}
        <div className="footer-middle-row">

          {/* Brand Identity */}
          <a
            href="#"
            className="footer-brand"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            aria-label="Quanverse Homepage"
          >
            <span className="footer-brand-q">Q</span>
            <span className="footer-brand-name">quanverse</span>
          </a>

          {/* Newsletter / Exam Alerts */}
          <div className="footer-newsletter-wrap">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="footer-nl-form">
                <input
                  type="email"
                  required
                  placeholder="Board exam alerts email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-nl-input"
                  aria-label="Newsletter email address"
                />
                <button type="submit" className="footer-nl-btn" aria-label="Subscribe to exam alerts">
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div className="footer-nl-success">
                <CheckCircle2 size={15} />
                <span>Subscribed for board alerts</span>
              </div>
            )}
          </div>

          {/* Live System Operational Status */}
          <div className="footer-status-badge">
            <span className="footer-status-dot" aria-hidden="true" />
            <span>Evaluation Engines Operational</span>
            <span className="footer-sep">•</span>
            <span className="footer-version">v2.4.0-cbse</span>
          </div>

        </div>

        {/* ── FOOTER COPYRIGHT & LEGAL BAR ── */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            <span>© 2027 Quanverse Technologies Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="footer-legal-links">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('Privacy Notice: Student handwritten answer sheets and personal data are strictly encrypted and never shared or sold.');
              }}
            >
              Privacy
            </a>
            <span>•</span>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert('Terms of Service: Governs exam session access, AI evaluation reports, and creator royalties.');
              }}
            >
              Terms
            </a>
            <span>•</span>
            <a
              href="#security"
              onClick={(e) => {
                e.preventDefault();
                alert('Security: 256-bit SSL encryption on all exam evaluations.');
              }}
            >
              Security
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
