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
      badge: '97.4% BOARD RESULT',
      avatarText: 'AS',
      quote: 'The AI step marking caught that I was skipping formula conditions in Algebra. That single fix saved me 4 marks on the actual board exam.'
    },
    {
      name: 'Ananya Deshmukh',
      school: 'The Cathedral & John Connon, Mumbai',
      board: 'ICSE Class 10',
      score: '98.2%',
      badge: '98.2% BOARD RESULT',
      avatarText: 'AD',
      quote: 'Uploading real notebook sheets and getting official rubric feedback in 45 seconds is game-changing. The Topper comparisons transformed my presentation.'
    },
    {
      name: 'Kabir Varma',
      school: 'National Public School, Bengaluru',
      board: 'CBSE Class 10',
      score: '96.0%',
      badge: '96.0% BOARD RESULT',
      avatarText: 'KV',
      quote: 'I jumped from 76% in pre-boards to 96% in final boards. The weakness radar stopped me from wasting time re-reading material I already knew.'
    }
  ];

  const teacherReviews = [
    {
      name: 'Mrs. Sunita Mehra',
      title: 'Senior HOD Mathematics (22 yrs exp)',
      school: 'Springdales School, New Delhi',
      avatarText: 'SM',
      badge: '22 YRS BOARD EXP',
      quote: 'Grading 160 board papers by hand used to take entire weekends. With Quanverse rubrics, papers were evaluated in 90 minutes with zero fatigue.'
    },
    {
      name: 'Dr. Rajesh Sen',
      title: 'ICSE Science Master & Author',
      school: 'St. Xavier’s Collegiate, Kolkata',
      avatarText: 'RS',
      badge: 'VERIFIED EXAMINER',
      quote: 'The authoring studio makes it seamless to publish competency-aligned mock papers and guide thousands of students toward board mastery.'
    },
    {
      name: 'Mr. Anand K. Nair',
      title: 'Senior Physics Lead (18 yrs exp)',
      school: 'Bhavan’s Vidya Mandir, Kochi',
      avatarText: 'AN',
      badge: 'CBSE EVALUATOR',
      quote: 'The step marking mirrors official board keys with precision. It trains students to articulate every intermediate step examiners look for.'
    }
  ];

  const currentList = activeTab === 'students' ? studentReviews : teacherReviews;

  return (
    <section className="editorial-testimonials-section" id="testimonials">
      <div className="app-container">
        
        {/* Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-emerald font-bold">COMMUNITY VERIFICATION</span>
          </div>

          <div className="test-header-flex">
            <div className="title-with-flourish">
              <h2 className="section-title text-main">
                Real student turnarounds from 76% to 96%
              </h2>
            </div>

            {/* Role Toggle Tabs */}
            <div className="test-toggle-tabs font-mono text-xs">
              <button
                type="button"
                className={`test-tab-btn ${activeTab === 'students' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                [ STUDENT STORIES ]
              </button>
              <button
                type="button"
                className={`test-tab-btn ${activeTab === 'teachers' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('teachers')}
              >
                [ EDUCATOR PERSPECTIVES ]
              </button>
            </div>
          </div>

          <p className="section-subtitle">
            Verified feedback from students and educators.
          </p>
        </div>

        {/* Master Editorial Testimonials Grid */}
        <div className="editorial-testimonials-grid">

          <div className="testimonials-columns">
            {currentList.map((item, idx) => (
              <div key={idx} className="testimonial-col">
                {/* Top Meta */}
                <div className="test-col-header font-mono text-xs mb-3">
                  <div className="flex items-center gap-1 text-accent-lime">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  {item.badge && (
                    <span className="score-badge text-accent-lime font-bold">[{item.badge}]</span>
                  )}
                </div>

                <blockquote className="test-quote text-main">
                  "{item.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="test-author-box font-mono text-xs mt-auto pt-2.5 border-t border-[rgba(190,220,200,0.1)]">
                  <div className="author-name text-main font-semibold text-sm">
                    {item.name}
                  </div>
                  <div className="author-sub text-muted mt-0.5">
                    {item.school}
                  </div>
                  {item.board && (
                    <div className="author-board text-lime text-[11px] mt-0.5">
                      {item.board}
                    </div>
                  )}
                  {item.title && (
                    <div className="author-title text-lime text-[11px] mt-0.5">
                      {item.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .editorial-testimonials-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-testimonials-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        .test-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .test-toggle-tabs {
          display: flex;
          gap: 0.35rem;
        }

        .test-tab-btn {
          padding: 0.35rem 0.75rem;
          background: rgba(11, 36, 26, 0.4);
          border: 1px solid rgba(190, 220, 200, 0.14);
          color: #B5C0B8;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.72rem;
          transition: all 0.2s ease;
        }

        .test-tab-btn:hover {
          color: #F1F5F2;
          border-color: rgba(67, 201, 139, 0.55);
          background-color: rgba(16, 71, 52, 0.45);
        }

        .test-tab-btn.active-tab {
          background-color: rgba(16, 71, 52, 0.60);
          border-color: var(--color-lime);
          color: var(--color-lime);
        }

        /* Master Editorial Testimonials Grid */
        .editorial-testimonials-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .testimonials-columns {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
        }

        .testimonial-col {
          padding: clamp(1.4rem, 2.4vw, 1.95rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
          background: rgba(7, 17, 13, 0.4);
          min-height: 14.5rem;
        }

        .testimonial-col:last-child {
          border-right: none;
        }

        .test-col-header {
          min-height: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .test-quote {
          flex: 1;
          min-height: 4.5rem;
          display: flex;
          align-items: flex-start;
          line-height: 1.55;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #F1F5F2;
        }

        .test-author-box {
          margin-top: auto;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(190, 220, 200, 0.1);
          min-height: 3.85rem;
        }

        @media (max-width: 900px) {
          .testimonials-columns {
            grid-template-columns: 1fr;
          }

          .testimonial-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .testimonial-col:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
