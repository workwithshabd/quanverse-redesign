import React, { useState } from 'react';
import { 
  Users, 
  Coins, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';


export default function TeacherPartnershipSection() {
  const [questionsCount, setQuestionsCount] = useState(25);
  const [papersCurated, setPapersCurated] = useState(4);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Approximate royalty formula: ₹250 per approved question + ₹1500 per paper curation + student attempt dividend
  const estimatedRoyalty = (questionsCount * 300) + (papersCurated * 1800);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teacherEmail) return;
    setSubmitted(true);
  };

  return (
    <section className="teacher-section section-spacing" id="for-teachers">
      <div className="app-container">
        
        {/* Banner Card */}
        <div className="teacher-feature-card glass-panel-elevated">
          <div className="teacher-grid">
            
            {/* Left Content */}
            <div className="teacher-info-col">
              <div className="pill-badge pill-lavender mb-3">
                <Users size={14} />
                <span>Educator Creator Network</span>
              </div>
              <h2 className="teacher-heading">
                Are You a Senior Class 10 Teacher? <span className="highlight-text">Earn While You Author</span>.
              </h2>
              <p className="teacher-sub">
                Quanverse connects experienced school teachers with thousands of board candidates. 
                Submit original board-standard questions, build school pre-board papers, and receive automated monthly royalties straight into your bank account.
              </p>

              <div className="teacher-perks-list">
                <div className="perk-row">
                  <div className="perk-check"><CheckCircle size={15} className="text-emerald" /></div>
                  <span><strong>Author Once, Earn Indefinitely:</strong> Royalties paid every time a student attempts your paper.</span>
                </div>
                <div className="perk-row">
                  <div className="perk-check"><CheckCircle size={15} className="text-emerald" /></div>
                  <span><strong>Instant AI Paper Generator:</strong> Build a custom 80-mark pre-board test for your school in 60 seconds.</span>
                </div>
                <div className="perk-row">
                  <div className="perk-check"><CheckCircle size={15} className="text-emerald" /></div>
                  <span><strong>Full Copyright &amp; Attribution:</strong> Your teacher profile and school affiliation displayed proudly.</span>
                </div>
              </div>

              {/* Form */}
              {!submitted ? (
                <form className="teacher-apply-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your school / personal email..."
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="teacher-input"
                  />
                  <button type="submit" className="btn btn-primary">
                    <span>Apply as Educator</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : (
                <div className="apply-success-box">
                  <CheckCircle size={18} className="text-emerald" />
                  <span>Application received! Our Academic Coordinator will reach out within 24 hours.</span>
                </div>
              )}
            </div>

            {/* Right: Interactive Royalty Estimator */}
            <div className="royalty-calc-col">
              <div className="calc-card">
                <div className="calc-header">
                  <Coins size={20} className="text-butter" />
                  <div>
                    <h3 className="calc-title">Monthly Royalty Calculator</h3>
                    <span className="calc-sub">Estimate your monthly creator earnings</span>
                  </div>
                </div>

                <div className="calc-sliders">
                  
                  {/* Slider 1: Questions */}
                  <div className="calc-slider-item">
                    <div className="slider-meta">
                      <span className="meta-name">Approved Questions Authored</span>
                      <span className="meta-val font-display">{questionsCount} Questions</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={questionsCount}
                      onChange={(e) => setQuestionsCount(Number(e.target.value))}
                      className="custom-range range-sage"
                    />
                  </div>

                  {/* Slider 2: Papers */}
                  <div className="calc-slider-item">
                    <div className="slider-meta">
                      <span className="meta-name">Full 80-Mark Papers Curated</span>
                      <span className="meta-val font-display">{papersCurated} Papers</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={papersCurated}
                      onChange={(e) => setPapersCurated(Number(e.target.value))}
                      className="custom-range range-lavender"
                    />
                  </div>

                </div>

                {/* Earnings Display */}
                <div className="calc-result-box">
                  <span className="est-label">Estimated Monthly Earnings</span>
                  <div className="est-number-row">
                    <span className="est-figure font-display">₹{estimatedRoyalty.toLocaleString('en-IN')}</span>
                    <span className="est-cadence">/ month</span>
                  </div>
                  <span className="est-note">Direct deposit on the 1st of every month • Transparent dashboard</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .teacher-section {
          background: #ffffff;
        }

        .teacher-feature-card {
          padding: clamp(2rem, 4vw, 3.5rem);
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, #ffffff 0%, #f6f5fe 100%);
          border: 1px solid var(--pastel-lavender-border);
        }

        .teacher-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          align-items: center;
        }

        .teacher-heading {
          font-size: clamp(1.6rem, 1.3rem + 1vw, 2.3rem);
          margin-bottom: 1rem;
        }

        .teacher-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .teacher-perks-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }

        .perk-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-main);
          line-height: 1.45;
        }

        .perk-check {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .teacher-apply-form {
          display: flex;
          gap: 0.6rem;
          max-width: 480px;
          flex-wrap: wrap;
        }

        .teacher-input {
          flex: 1;
          min-width: 220px;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          background: #ffffff;
          font-size: 0.9rem;
        }

        .teacher-input:focus {
          border-color: #6366f1;
        }

        .apply-success-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: var(--pastel-sage);
          color: var(--brand-emerald);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Calculator Card */
        .calc-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .calc-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .calc-title {
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .calc-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .calc-sliders {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .calc-slider-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .slider-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.825rem;
        }

        .meta-name {
          color: var(--text-muted);
          font-weight: 600;
        }

        .meta-val {
          color: var(--brand-emerald);
          font-weight: 700;
        }

        .calc-result-box {
          background: #fafbfa;
          border: 1px solid var(--pastel-butter-border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .est-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          font-weight: 600;
        }

        .est-number-row {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          margin: 0.35rem 0;
        }

        .est-figure {
          font-size: 2.25rem;
          font-weight: 800;
          color: #a14c24;
          line-height: 1;
        }

        .est-cadence {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .est-note {
          font-size: 0.72rem;
          color: var(--text-light);
        }

        @media (max-width: 900px) {
          .teacher-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
