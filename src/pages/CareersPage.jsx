import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Users, 
  GraduationCap, 
  Cpu, 
  Heart, 
  Laptop, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { useNavigation } from '../hooks/useNavigation';
import { useGsapScroll } from '../hooks/useGsapScroll';

export default function CareersPage() {
  const { navigateTo, openJobApplication } = useNavigation();
  const pageRef = useRef(null);
  useGsapScroll(pageRef);

  const [positions, setPositions] = useState([]);
  const [activeDept, setActiveDept] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const jobs = await api.getOpenPositions();
        setPositions(jobs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const departments = [
    'All',
    'Engineering & AI',
    'Product & Design',
    'Growth & Partnerships',
    'Academics & Editorial',
    'Operations & Support'
  ];

  const filteredPositions = activeDept === 'All'
    ? positions
    : positions.filter(p => p.department === activeDept);

  const perks = [
    {
      icon: <Laptop size={22} className="text-emerald" />,
      title: 'Remote-First Freedom',
      desc: 'Work from anywhere across India. We optimize for high-trust, asynchronous execution and outcomes, not seat time.'
    },
    {
      icon: <TrendingUp size={22} className="text-emerald" />,
      title: 'Meaningful Equity (ESOPs)',
      desc: 'Be a genuine co-owner of Quanverse. We distribute substantial equity packages across all full-time team members.'
    },
    {
      icon: <Heart size={22} className="text-emerald" />,
      title: 'Comprehensive Health Cover',
      desc: 'Comprehensive medical and health insurance for you and your dependents, with zero co-pay and OPD allowances.'
    },
    {
      icon: <Sparkles size={22} className="text-emerald" />,
      title: '₹40,000 Learning Stipend',
      desc: 'Annual personal development budget for engineering books, LLM developer subscriptions, workshops, and courses.'
    },
    {
      icon: <Cpu size={22} className="text-emerald" />,
      title: 'Modern AI & Web Tooling',
      desc: 'Latest M-series MacBooks, premium Gemini & Claude API credits, and state-of-the-art developer tooling.'
    },
    {
      icon: <GraduationCap size={22} className="text-emerald" />,
      title: 'Deep Student Impact',
      desc: 'Directly eliminate board exam panic for over 4 million Class 10 candidates across CBSE & ICSE every year.'
    }
  ];

  return (
    <div className="company-careers-page" ref={pageRef}>
      
      {/* 1. Hero Section */}
      <section className="careers-hero-section">
        <div className="pastel-glow-orb orb-sage"></div>
        <div className="pastel-glow-orb orb-lavender"></div>
        <div className="pastel-glow-orb orb-peach"></div>

        <div className="app-container">
          <div className="careers-hero-center text-center">
            
            <div className="pill-badge pill-sage mb-3 mx-auto">
              <Sparkles size={14} />
              <span>We're Hiring • Engineering, AI, Product &amp; Growth</span>
            </div>

            <h1 className="careers-hero-title">
              Build the Intelligence Layer for <br />
              <span className="highlight-text">National Board Exams</span>.
            </h1>

            <p className="careers-hero-subtitle">
              We are transforming how 4 million Class 10 CBSE &amp; ICSE students prepare for life-defining examinations. 
              Join an ambitious, mission-driven team solving real-world computer vision, handwriting multimodal recognition, and fair step-marking.
            </p>

            <div className="hero-cta-buttons">
              <a href="#open-positions" className="btn btn-primary btn-lg shadow-hover">
                <Briefcase size={17} />
                <span>Explore Open Roles ({positions.length})</span>
                <ArrowRight size={16} />
              </a>

              <a href="#company-culture" className="btn btn-secondary btn-lg">
                <Heart size={16} className="text-rose" />
                <span>Culture &amp; Perks</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="careers-stats-ribbon">
              <div className="stat-node">
                <div className="stat-fig">45,000+</div>
                <div className="stat-sub">Student Papers Evaluated</div>
              </div>
              <div className="stat-line"></div>
              <div className="stat-node">
                <div className="stat-fig">99.4%</div>
                <div className="stat-sub">Board Rubric Accuracy</div>
              </div>
              <div className="stat-line"></div>
              <div className="stat-node">
                <div className="stat-fig">140+</div>
                <div className="stat-sub">Partner School Networks</div>
              </div>
              <div className="stat-line"></div>
              <div className="stat-node">
                <div className="stat-fig">Remote</div>
                <div className="stat-sub">India-Wide Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT EDUCATOR CALLOUT: Option to Apply as a Teacher */}
      <section className="teacher-pathway-banner-section">
        <div className="app-container">
          <div className="teacher-banner-card glass-panel-elevated">
            <div className="teacher-banner-grid">
              
              <div className="teacher-banner-text">
                <div className="pill-badge pill-lavender mb-3">
                  <Users size={14} />
                  <span>Educator &amp; School Faculty Hub</span>
                </div>
                <h2 className="teacher-banner-title">
                  Are You a Senior Class 10 Teacher or Board Examiner?
                </h2>
                <p className="teacher-banner-sub">
                  Looking to author board-standard question papers, validate step-marking schemes, curate pre-boards for your school, or earn monthly creator royalties? 
                  We built a dedicated platform exclusively for educators.
                </p>

                <div className="teacher-perk-chips">
                  <span className="perk-chip">
                    <CheckCircle2 size={14} className="text-emerald" />
                    Perpetual Royalties (₹350/item + attempt dividends)
                  </span>
                  <span className="perk-chip">
                    <CheckCircle2 size={14} className="text-emerald" />
                    AI Authoring Studio &amp; School Pre-Board Suite
                  </span>
                  <span className="perk-chip">
                    <CheckCircle2 size={14} className="text-emerald" />
                    Official Senior Evaluator Recognition
                  </span>
                </div>
              </div>

              <div className="teacher-banner-cta-col">
                <div className="teacher-cta-card">
                  <span className="cta-card-heading">Join Educator Network</span>
                  <p className="cta-card-note">
                    Author questions, calculate monthly royalties, or register as an accredited evaluator.
                  </p>
                  
                  <button
                    type="button"
                    className="btn btn-primary w-full teacher-route-btn shadow-hover"
                    onClick={() => navigateTo('teachers')}
                  >
                    <Users size={16} />
                    <span>Apply as a Teacher</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm w-full mt-2"
                    onClick={() => navigateTo('teachers', '#royalty-calc')}
                  >
                    <span>View Royalty Calculator →</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Culture, Benefits & Perks */}
      <section className="section-spacing company-culture-section" id="company-culture">
        <div className="app-container">
          <div className="section-head text-center mb-5">
            <span className="pill-badge pill-butter mb-2">Life at Quanverse</span>
            <h2 className="section-title">Why You’ll Do Your Best Work Here</h2>
            <p className="section-sub max-w-700 mx-auto">
              We treat our team like professional athletes: world-class compensation, high trust, exceptional craft standards, and deep respect for your craft.
            </p>
          </div>

          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className="perk-card glass-panel-elevated">
                <div className="perk-icon-circle">{perk.icon}</div>
                <h3 className="perk-title">{perk.title}</h3>
                <p className="perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Positions Directory */}
      <section className="section-spacing bg-subtle-section" id="open-positions">
        <div className="app-container">
          <div className="section-head text-center mb-4">
            <span className="pill-badge pill-peach mb-2">Career Opportunities</span>
            <h2 className="section-title">Open Positions Across All Teams</h2>
            <p className="section-sub max-w-650 mx-auto">
              Explore opportunities in Engineering, AI, Product, Design, Growth, and Academics.
            </p>
          </div>

          {/* Department Filter Bar */}
          <div className="department-filter-wrap">
            <div className="filter-label-group">
              <Filter size={14} className="text-light" />
              <span>Department:</span>
            </div>
            <div className="filter-pill-list">
              {departments.map(dept => (
                <button
                  key={dept}
                  type="button"
                  className={`dept-filter-btn ${activeDept === dept ? 'active' : ''}`}
                  onClick={() => setActiveDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Listing */}
          {isLoading ? (
            <div className="jobs-loading-box">
              <div className="loading-spinner"></div>
              <span>Fetching live roles...</span>
            </div>
          ) : (
            <div className="job-listings-grid">
              {filteredPositions.map(job => (
                <div key={job.id} className="job-card glass-panel-elevated">
                  <div className="job-card-header">
                    <span className="job-card-badge">{job.badge}</span>
                    <span className="job-card-dept">{job.department}</span>
                  </div>

                  <h3 className="job-card-title">{job.title}</h3>
                  <p className="job-card-desc">{job.description}</p>

                  {/* Skills / Tags */}
                  {job.tags && (
                    <div className="job-tags-row">
                      {job.tags.map(tag => (
                        <span key={tag} className="job-tag-item">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Meta Specs */}
                  <div className="job-specs-list">
                    <div className="spec-row">
                      <MapPin size={13} className="text-emerald" />
                      <span>{job.location}</span>
                    </div>
                    <div className="spec-row">
                      <Clock size={13} className="text-emerald" />
                      <span>{job.type}</span>
                    </div>
                    <div className="spec-row">
                      <Briefcase size={13} className="text-emerald" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div className="job-compensation-bar">
                    <span className="comp-title">Salary &amp; Package:</span>
                    <strong className="comp-value">{job.compensation}</strong>
                  </div>

                  <div className="job-card-footer">
                    <button
                      type="button"
                      className="btn btn-primary w-full"
                      onClick={() => openJobApplication(job)}
                    >
                      <span>Apply for this Role</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Inquiries Box */}
          <div className="open-pitch-card text-center max-w-700 mx-auto mt-5 glass-panel">
            <h4 className="font-semibold text-lg mb-2">Don't see your exact role listed?</h4>
            <p className="text-muted text-sm mb-3">
              We are constantly seeking brilliant compilers, educators, distributed systems engineers, and learning theorists. Send a link to your GitHub, portfolio, or past work to:
            </p>
            <div className="open-email-pill">
              <span>careers@quanverse.tech</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .company-careers-page {
          min-height: 100vh;
          background: var(--bg-page);
        }

        .careers-hero-section {
          position: relative;
          padding: 5.5rem 0 4rem;
          overflow: hidden;
        }

        .careers-hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.15;
          margin-bottom: 1.25rem;
          letter-spacing: -0.8px;
        }

        .careers-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-muted);
          max-width: 780px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .hero-cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .careers-stats-ribbon {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.25rem;
          background: #f2f5f0;
          padding: 1.25rem 2.5rem;
          border-radius: var(--radius-xl);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 10px 28px -6px rgba(18, 65, 112, 0.08);
          max-width: 900px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .stat-node {
          text-align: center;
        }

        .stat-fig {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--brand-emerald);
          letter-spacing: -0.5px;
        }

        .stat-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-line {
          width: 1px;
          height: 36px;
          background: var(--border-medium);
        }

        /* Teacher Pathway Banner */
        .teacher-pathway-banner-section {
          padding: 2.5rem 0;
        }

        .teacher-banner-card {
          background: linear-gradient(135deg, rgba(238, 234, 253, 0.75) 0%, rgba(226, 241, 231, 0.75) 100%);
          border: 1px solid var(--pastel-lavender-border);
          border-radius: var(--radius-xl);
          padding: 2.75rem;
          position: relative;
          overflow: hidden;
        }

        .teacher-banner-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .teacher-banner-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .teacher-banner-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .teacher-banner-sub {
          font-size: 0.96rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .teacher-perk-chips {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .perk-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .teacher-cta-card {
          background: #f2f5f0;
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 10px 28px -6px rgba(18, 65, 112, 0.08);
          text-align: center;
        }

        .cta-card-heading {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          margin-bottom: 0.4rem;
        }

        .cta-card-note {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .teacher-route-btn {
          font-size: 1rem;
          padding: 12px 20px;
        }

        /* Perks Grid */
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem;
        }

        .perk-card {
          background: #f2f5f0;
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1.5px solid rgba(103, 192, 144, 0.35);
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
        }
        .perk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(33, 91, 99, 0.15);
          border-color: rgb(103, 192, 144);
        }

        .perk-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(170, 255, 199, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .perk-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .perk-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        /* Department Filter */
        .department-filter-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .filter-label-group {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-light);
          font-weight: 600;
        }

        .filter-pill-list {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f2f5f0;
          padding: 5px;
          border-radius: var(--radius-full);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: var(--shadow-subtle);
          flex-wrap: wrap;
        }

        .dept-filter-btn {
          border: none;
          background: transparent;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dept-filter-btn:hover {
          color: var(--text-main);
        }
        .dept-filter-btn.active {
          background: rgb(18, 65, 112);
          color: #ffffff;
        }

        /* Job Listings */
        .job-listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          gap: 1.75rem;
        }

        .job-card {
          background: #f2f5f0;
          border-radius: var(--radius-lg);
          padding: 1.85rem;
          border: 1.5px solid rgba(103, 192, 144, 0.35);
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(33, 91, 99, 0.15);
          border-color: rgb(103, 192, 144);
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .job-card-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--pastel-lavender-text);
          background: var(--pastel-lavender);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .job-card-dept {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .job-card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 0.65rem;
          line-height: 1.3;
        }

        .job-card-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .job-tags-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .job-tag-item {
          font-size: 0.72rem;
          background: var(--bg-subtle);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-weight: 600;
        }

        .job-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .spec-row {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .job-compensation-bar {
          background: var(--bg-subtle);
          padding: 9px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .comp-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-light);
          font-weight: 600;
        }
        .comp-value {
          font-size: 0.88rem;
          color: var(--pastel-sage-text);
        }

        .open-pitch-card {
          padding: 2rem;
          background: #f2f5f0;
          border-radius: var(--radius-lg);
          border: 1.5px solid rgba(103, 192, 144, 0.35);
        }
        .open-email-pill {
          display: inline-block;
          font-family: var(--font-mono);
          font-weight: 600;
          color: rgb(18, 65, 112);
          background: rgba(170, 255, 199, 0.35);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          border: 1px solid rgba(103, 192, 144, 0.5);
        }

        .jobs-loading-box {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-medium);
          border-top-color: var(--brand-emerald);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .bg-subtle-section {
          background: var(--bg-subtle);
        }

        .max-w-650 { max-width: 650px; }
        .max-w-700 { max-width: 700px; }
        .max-w-780 { max-width: 780px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
