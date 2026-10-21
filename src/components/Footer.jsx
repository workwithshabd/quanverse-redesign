import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useNavigation } from '../hooks/useNavigation';


export default function Footer({ onOpenDemoExam }) {
  const { navigateTo, openDemoExam } = useNavigation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleOpenExam = onOpenDemoExam || openDemoExam;



  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    await api.subscribeNewsletter(email);
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      
      {/* Top CTA Banner */}
      <div className="footer-cta-band">
        <div className="app-container">
          <div className="cta-band-card glass-panel-elevated">
            <div className="cta-band-content">
              <span className="pill-badge pill-sage mb-2">Class 10 Board Season 2027</span>
              <h2 className="cta-band-title">
                Ready to stop losing step marks on your board exam?
              </h2>
              <p className="cta-band-sub">
                Take your first 80-mark mock exam now and get instant AI step marking with complete rubric analysis.
              </p>
            </div>
            <div className="cta-band-btn-wrap">
              <button 
                type="button" 
                className="btn btn-primary btn-lg"
                onClick={handleOpenExam}
              >
                <Sparkles size={16} className="text-butter" />
                <span>Start Free First Mock</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          
          {/* Brand Info & Newsletter */}
          <div className="footer-col-brand">
            <a 
              href="#" 
              className="brand-logo mb-3" 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              aria-label="Quanverse"
            >
              <div className="logo-symbol">
                <span className="logo-q">Q</span>
                <span className="logo-dot"></span>
              </div>
              <div className="logo-text-group">
                <span className="logo-title">quanverse</span>
                <span className="logo-subtitle">Board Exam AI Engine</span>
              </div>
            </a>

            <p className="brand-pitch">
              Quanverse is India's dedicated assessment platform for Class 10 CBSE &amp; ICSE students, teachers, and institutions: rigorous question authoring, structured timed exams, and step-level AI evaluation.
            </p>

            <div className="newsletter-box">
              <span className="nl-label">Get CBSE &amp; ICSE Circular Alerts:</span>
              {!subscribed ? (
                <form className="nl-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter parent/student email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="nl-input"
                  />
                  <button type="submit" className="nl-btn" aria-label="Subscribe">
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <div className="nl-success">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Subscribed! You'll receive board notifications.</span>
                </div>
              )}
            </div>
          </div>

          {/* Links Col 1: For Students */}
          <div className="footer-col">
            <h4 className="footer-col-title">For Students</h4>
            <ul className="footer-links-list">
              <li><a href="#mock-tests" onClick={(e) => { e.preventDefault(); navigateTo('home', '#mock-tests'); }}>CBSE Class 10 Mock Tests</a></li>
              <li><a href="#mock-tests" onClick={(e) => { e.preventDefault(); navigateTo('home', '#mock-tests'); }}>ICSE Specimen Papers 2027</a></li>
              <li><a href="#readiness" onClick={(e) => { e.preventDefault(); navigateTo('home', '#readiness'); }}>Board Readiness Score</a></li>
              <li><a href="#ai-marking" onClick={(e) => { e.preventDefault(); navigateTo('home', '#ai-marking'); }}>Step-Marking Engine</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); navigateTo('home', '#faq'); }}>Student FAQ</a></li>
            </ul>
          </div>

          {/* Links Col 2: For Teachers */}
          <div className="footer-col">
            <h4 className="footer-col-title">For Teachers &amp; Schools</h4>
            <ul className="footer-links-list">
              <li><a href="#teachers" onClick={(e) => { e.preventDefault(); navigateTo('teachers', '#teacher-signup-section'); }}>Sign Up as Teacher</a></li>
              <li><a href="#teachers" onClick={(e) => { e.preventDefault(); navigateTo('teachers', '#royalty-calc'); }}>Royalty &amp; Payout Calculator</a></li>
              <li><a href="#teachers" onClick={(e) => { e.preventDefault(); navigateTo('teachers', '#teachers'); }}>Educator Network Benefits</a></li>
              <li><a href="#teachers" onClick={(e) => { e.preventDefault(); navigateTo('teachers', '#teacher-faqs'); }}>Educator FAQs</a></li>
              <li><a href="mailto:partners@quanverse.tech">School &amp; Institutional Inquiries</a></li>
            </ul>
          </div>

          {/* Links Col 3: Platform */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform &amp; Company</h4>
            <ul className="footer-links-list">
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); navigateTo('home', '#how-it-works'); }}>How AI Marking Works</a></li>
              <li><a href="#news" onClick={(e) => { e.preventDefault(); navigateTo('home', '#news'); }}>Board Circulars &amp; News</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); navigateTo('home', '#pricing'); }}>Pricing &amp; Board Passes</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); navigateTo('careers'); }}>Company Careers (All Roles)</a></li>
              <li><a href="mailto:support@quanverse.tech">24/7 Student Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-copy">
            <span>© 2027 Quanverse Technologies Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="bottom-trust">
            <ShieldCheck size={14} className="text-emerald" />
            <span>Encrypted &amp; Secure • CBSE &amp; CISCE Blueprint Aligned</span>
          </div>

          <div className="bottom-legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All student answer uploads and data are strictly encrypted and never sold.'); }}>Privacy Policy</a>
            <span>•</span>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Governs exam access and teacher author royalties.'); }}>Terms of Service</a>
          </div>
        </div>

      </div>

      <style>{`
        .site-footer {
          background: #f4f6f4;
          border-top: 1px solid var(--border-light);
          padding-top: 2rem;
          padding-bottom: 3rem;
          position: relative;
        }

        .footer-cta-band {
          margin-top: -6rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 10;
        }

        .cta-band-card {
          background: #ffffff;
          border-radius: var(--radius-xl);
          padding: clamp(2rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          border: 1px solid var(--pastel-sage-border);
          box-shadow: var(--shadow-elevated);
        }

        .cta-band-content {
          max-width: 620px;
        }

        .cta-band-title {
          font-size: clamp(1.4rem, 1.2rem + 1vw, 2.1rem);
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .cta-band-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 3.5rem;
        }

        .brand-pitch {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 340px;
        }

        .newsletter-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 340px;
        }

        .nl-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .nl-form {
          display: flex;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 3px;
        }

        .nl-input {
          border: none;
          background: transparent;
          padding: 0.5rem 0.85rem;
          font-size: 0.85rem;
          flex: 1;
        }

        .nl-btn {
          background: var(--brand-emerald);
          color: #ffffff;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .nl-btn:hover {
          background: var(--brand-emerald-dark);
        }

        .nl-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--brand-emerald);
          font-weight: 600;
          padding: 0.4rem 0;
        }

        .footer-col-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1.25rem;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-list a {
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .footer-links-list a:hover {
          color: var(--brand-emerald);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
          font-size: 0.8rem;
          color: var(--text-light);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bottom-trust {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .bottom-legal-links {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .bottom-legal-links a {
          color: var(--text-muted);
        }

        .bottom-legal-links a:hover {
          color: var(--brand-emerald);
        }

        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-cta-band {
            margin-top: 0;
          }
        }

        @media (max-width: 600px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
