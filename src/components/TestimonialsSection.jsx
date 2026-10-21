import React, { useState } from 'react';
import { Star } from 'lucide-react';


export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState('students');

  const studentReviews = [
    {
      name: 'Aarav Sharma',
      school: 'Delhi Public School, R.K. Puram',
      board: 'CBSE Class 10',
      score: '97.4%',
      avatarText: 'AS',
      avatarBg: 'var(--pastel-sage)',
      quote: 'The AI step marking pointed out that I was repeatedly skipping the condition before using the Quadratic formula. That single correction saved me at least 4 marks in the actual board paper.'
    },
    {
      name: 'Ananya Deshmukh',
      school: 'The Cathedral & John Connon, Mumbai',
      board: 'ICSE Class 10',
      score: '98.2%',
      avatarText: 'AD',
      avatarBg: 'var(--pastel-lavender)',
      quote: 'Writing on real paper, snapping a photo, and getting an official rubric breakdown in 45 seconds is unbelievable. The Topper Model comparisons completely transformed my science presentation.'
    },
    {
      name: 'Kabir Varma',
      school: 'National Public School, Bengaluru',
      board: 'CBSE Class 10',
      score: '96.0%',
      avatarText: 'KV',
      avatarBg: 'var(--pastel-peach)',
      quote: 'I jumped from 76% in my school first pre-board to 96% in final boards. The chapter-level weakness radar prevented me from wasting weeks re-reading stuff I already knew.'
    }
  ];

  const teacherReviews = [
    {
      name: 'Mrs. Sunita Mehra',
      title: 'Senior HOD Mathematics (22 yrs exp)',
      school: 'Springdales School, New Delhi',
      avatarText: 'SM',
      avatarBg: 'var(--pastel-butter)',
      quote: 'Evaluating 160 board mock papers by hand usually takes our math department three grueling weekends. With Quanverse AI assisting our rubrics, papers were graded in 90 minutes with zero human fatigue.'
    },
    {
      name: 'Dr. Rajesh Sen',
      title: 'ICSE Science Master & Author',
      school: 'St. Xavier’s Collegiate, Kolkata',
      avatarText: 'RS',
      avatarBg: 'var(--pastel-sage)',
      quote: 'The authoring studio makes it effortless to create rigorous, competency-aligned questions. Seeing thousands of students attempt my papers while generating monthly royalties is immensely fulfilling.'
    }
  ];

  const currentList = activeTab === 'students' ? studentReviews : teacherReviews;

  return (
    <section className="testimonials-section section-spacing" id="testimonials">
      <div className="app-container">
        
        {/* Header */}
        <div className="section-head text-center">
          <div className="pill-badge pill-sage mb-3">
            <Star size={13} className="fill-current text-butter" />
            <span>Proven Board Outcomes</span>
          </div>
          <h2 className="section-title">
            Trusted by Class 10 <span className="highlight-text">Toppers &amp; Examiners</span>
          </h2>
          <p className="section-subtitle">
            See how step-level feedback transforms student performance across India.
          </p>

          {/* Toggle */}
          <div className="testimonial-tabs-row">
            <button
              type="button"
              className={`test-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              Student Stories
            </button>
            <button
              type="button"
              className={`test-tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              Teacher &amp; HOD Endorsements
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {currentList.map((rev, i) => (
            <div key={i} className="review-card glass-panel">
              <div className="review-card-top">
                <div className="stars-row">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="fill-current text-butter" />
                  ))}
                </div>
                {rev.score && (
                  <span className="pill-badge pill-sage score-pill-bold">
                    Scored {rev.score}
                  </span>
                )}
              </div>

              <p className="review-quote">"{rev.quote}"</p>

              <div className="reviewer-author-row">
                <div className="reviewer-avatar" style={{ background: rev.avatarBg }}>
                  <span>{rev.avatarText}</span>
                </div>
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{rev.name}</h4>
                  <span className="reviewer-meta">{rev.board || rev.title} • {rev.school}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .testimonials-section {
          background: #ffffff;
        }

        .testimonial-tabs-row {
          display: inline-flex;
          background: var(--bg-subtle);
          padding: 3px;
          border-radius: var(--radius-full);
          margin-top: 1.5rem;
        }

        .test-tab-btn {
          padding: 0.45rem 1.2rem;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .test-tab-btn.active {
          background: #ffffff;
          color: var(--brand-emerald);
          box-shadow: 0 2px 8px rgba(30, 63, 49, 0.08);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .review-card {
          padding: 2rem;
          border-radius: var(--radius-xl);
          background: #fafbfa;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-light);
          transition: all var(--transition-smooth);
        }

        .review-card:hover {
          transform: translateY(-4px);
          background: #ffffff;
          box-shadow: var(--shadow-card);
          border-color: var(--pastel-sage-border);
        }

        .review-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .stars-row {
          display: flex;
          gap: 3px;
        }

        .score-pill-bold {
          font-weight: 700;
        }

        .review-quote {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          margin-bottom: 1.75rem;
          font-style: italic;
        }

        .reviewer-author-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .reviewer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--brand-emerald);
          flex-shrink: 0;
        }

        .reviewer-info {
          display: flex;
          flex-direction: column;
        }

        .reviewer-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .reviewer-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
