import React, { useState, useEffect } from 'react';
import { 
  Target, 
  CheckCircle, 
  ArrowUpRight, 
  BookMarked,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { api } from '../services/api';

export default function BoardReadinessSection({ onOpenDemoExam }) {
  const [board, setBoard] = useState('CBSE');
  const [subjectScores, setSubjectScores] = useState({
    maths: 78,
    science: 84,
    socialScience: 88,
    english: 92
  });
  const [readinessData, setReadinessData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.calculateReadiness({ board, subjectScores }).then((data) => {
      if (isMounted) setReadinessData(data);
    });
    return () => { isMounted = false; };
  }, [board, subjectScores]);

  const handleSliderChange = (sub, val) => {
    setSubjectScores(prev => ({ ...prev, [sub]: Number(val) }));
    setIsSaved(false);
  };

  const currentScore = readinessData?.readinessScore || 85;

  return (
    <section className="readiness-section section-spacing" id="readiness">
      <div className="app-container">
        
        {/* Section Header */}
        <div className="section-head text-center gsap-reveal">
          <div className="pill-badge pill-lavender mb-3 gsap-float">
            <Target size={14} />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="section-title">
            Calculate Your <span className="highlight-text">Board Readiness Score</span>
          </h2>
          <p className="section-subtitle">
            Input your current comfort level across subjects. Our predictive algorithm computes your expected 
            Class 10 Board range and reveals the exact chapter mocks to cross 95%.
          </p>
        </div>

        {/* Interactive Simulator Card */}
        <div className="simulator-card glass-panel-elevated gsap-reveal">
          <div className="sim-grid">
            
            {/* Left: Input Controls */}
            <div className="sim-controls-col">
              <div className="sim-control-header">
                <span className="control-title">Select Your Examination Board</span>
                <div className="board-toggle">
                  <button
                    type="button"
                    className={`board-btn ${board === 'CBSE' ? 'active-board' : ''}`}
                    onClick={() => setBoard('CBSE')}
                  >
                    CBSE Class 10
                  </button>
                  <button
                    type="button"
                    className={`board-btn ${board === 'ICSE' ? 'active-board' : ''}`}
                    onClick={() => setBoard('ICSE')}
                  >
                    ICSE Class 10
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="sliders-list">
                
                {/* Maths */}
                <div className="slider-item">
                  <div className="slider-label-row">
                    <span className="subject-name">Mathematics (Standard / Basic)</span>
                    <span className="subject-score pill-badge pill-sage">{subjectScores.maths}% Confidence</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={subjectScores.maths}
                    onChange={(e) => handleSliderChange('maths', e.target.value)}
                    className="custom-range range-sage"
                    aria-label="Mathematics confidence"
                  />
                  <div className="slider-subtext">Key topics: Quadratic Eqns, Triangles, Trigonometry</div>
                </div>

                {/* Science */}
                <div className="slider-item">
                  <div className="slider-label-row">
                    <span className="subject-name">Science (Physics, Chem, Biology)</span>
                    <span className="subject-score pill-badge pill-lavender">{subjectScores.science}% Confidence</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={subjectScores.science}
                    onChange={(e) => handleSliderChange('science', e.target.value)}
                    className="custom-range range-lavender"
                    aria-label="Science confidence"
                  />
                  <div className="slider-subtext">Key topics: Light Reflection, Chemical Reactions, Life Processes</div>
                </div>

                {/* Social Science */}
                <div className="slider-item">
                  <div className="slider-label-row">
                    <span className="subject-name">Social Science (Hist, Geo, Civics, Eco)</span>
                    <span className="subject-score pill-badge pill-peach">{subjectScores.socialScience}% Confidence</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={subjectScores.socialScience}
                    onChange={(e) => handleSliderChange('socialScience', e.target.value)}
                    className="custom-range range-peach"
                    aria-label="Social Science confidence"
                  />
                  <div className="slider-subtext">Key topics: Nationalism in India, Map Work, Federalism</div>
                </div>

                {/* English */}
                <div className="slider-item">
                  <div className="slider-label-row">
                    <span className="subject-name">English Language &amp; Literature</span>
                    <span className="subject-score pill-badge pill-sky">{subjectScores.english}% Confidence</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={subjectScores.english}
                    onChange={(e) => handleSliderChange('english', e.target.value)}
                    className="custom-range range-sky"
                    aria-label="English confidence"
                  />
                  <div className="slider-subtext">Key topics: Analytical Paragraph, Discursive Passage, Grammar</div>
                </div>

              </div>
            </div>

            {/* Right: Real-time Output & Diagnostic Plan */}
            <div className="sim-output-col">
              <div className="output-card-inner">
                
                {/* Radial Gauge & Predicted Range */}
                <div className="readiness-meter-block">
                  <div className="radial-circle-container">
                    <svg className="radial-svg" viewBox="0 0 120 120">
                      <circle
                        className="radial-bg"
                        cx="60"
                        cy="60"
                        r="52"
                        strokeWidth="10"
                      />
                      <circle
                        className="radial-fill"
                        cx="60"
                        cy="60"
                        r="52"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={2 * Math.PI * 52 * (1 - currentScore / 100)}
                      />
                    </svg>
                    <div className="radial-center-text">
                      <span className="radial-number">{currentScore}%</span>
                      <span className="radial-label">Readiness</span>
                    </div>
                  </div>

                  <div className="prediction-text-group">
                    <span className="pred-subtitle">Predicted Board Projection</span>
                    <h3 className="pred-range">{readinessData?.predictedRange || '91% - 95%'}</h3>
                    <div className="pred-grade-pill">
                      <span>Target Grade: </span>
                      <strong>{readinessData?.predictedGrade || 'A1'}</strong>
                    </div>
                  </div>
                </div>

                {/* High-Yield Focus Topics */}
                <div className="focus-topics-box">
                  <div className="focus-header">
                    <BarChart3 size={15} className="text-emerald" />
                    <span>Priority Revision Targets (Based on your input)</span>
                  </div>

                  <div className="topics-list">
                    {(readinessData?.highYieldFocusTopics || []).map((t, i) => (
                      <div key={i} className="topic-card">
                        <div className="topic-name-wrap">
                          <span className="topic-dot"></span>
                          <span className="topic-name">{t.topic}</span>
                        </div>
                        <div className="topic-meta">
                          <span className="weightage-badge">{t.weightage}</span>
                          <span className="urgency-tag">{t.urgency} Priority</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation CTA */}
                <div className="recommendation-cta-box">
                  <div className="rec-text">
                    <Sparkles size={16} className="text-emerald shrink-0" />
                    <span>
                      Completing <strong>{readinessData?.recommendedMocksToGoal || 3} full-length timed mocks</strong> will close your step-loss margin.
                    </span>
                  </div>

                  <div className="sim-buttons-row">
                    <button
                      type="button"
                      className="btn btn-primary w-full"
                      onClick={onOpenDemoExam}
                    >
                      <span>Take 5-Min Sprint to Test This</span>
                      <ArrowUpRight size={16} />
                    </button>

                    <button
                      type="button"
                      className={`btn ${isSaved ? 'btn-pastel-sage' : 'btn-secondary'} w-full`}
                      onClick={() => setIsSaved(true)}
                    >
                      {isSaved ? <CheckCircle size={15} /> : <BookMarked size={15} />}
                      <span>{isSaved ? 'Plan Saved to Dashboard' : 'Save To Study Roadmap'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .section-head {
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        .text-center {
          text-align: center;
        }

        .section-title {
          margin-bottom: 0.85rem;
        }

        .section-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .simulator-card {
          padding: clamp(1.5rem, 3vw, 2.75rem);
          background: #f7fbfe;
          border: 1.5px solid #b6defa;
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 48px -12px rgba(14, 165, 233, 0.18);
        }

        .sim-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
        }

        .sim-control-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #cce5f8;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .control-title {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-main);
        }

        .board-toggle {
          display: flex;
          background: #e1f0fa;
          border: 1px solid #bee0f8;
          padding: 3px;
          border-radius: var(--radius-full);
          gap: 3px;
        }

        .board-btn {
          padding: 0.4rem 0.9rem;
          font-size: 0.825rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .board-btn.active-board {
          background: #f2f5f0;
          color: rgb(18, 65, 112);
          box-shadow: 0 2px 8px rgba(18, 65, 112, 0.18);
        }

        .sliders-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .slider-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .subject-name {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .subject-score {
          font-size: 0.78rem;
          padding: 0.2rem 0.65rem;
        }

        /* Custom Modern Sliders */
        .custom-range {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 9999px;
          background: #dce3db;
          outline: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #f2f5f0;
          border: 3px solid rgb(18, 65, 112);
          box-shadow: 0 2px 8px rgba(18, 65, 112, 0.25);
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .range-lavender::-webkit-slider-thumb {
          border-color: rgb(33, 91, 99);
        }

        .range-peach::-webkit-slider-thumb {
          border-color: rgb(18, 65, 112);
        }

        .range-sky::-webkit-slider-thumb {
          border-color: rgb(103, 192, 144);
        }

        .slider-subtext {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        /* Output Column */
        .output-card-inner {
          background: #f2f5f0;
          border: 1.5px solid rgba(103, 192, 144, 0.35);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .readiness-meter-block {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }

        .radial-circle-container {
          position: relative;
          width: 110px;
          height: 110px;
          flex-shrink: 0;
        }

        .radial-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .radial-bg {
          fill: none;
          stroke: #e2ede6;
        }

        .radial-fill {
          fill: none;
          stroke: var(--brand-emerald);
          stroke-linecap: round;
          transition: stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .radial-center-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .radial-number {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--brand-emerald);
          line-height: 1;
        }

        .radial-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        .prediction-text-group {
          display: flex;
          flex-direction: column;
        }

        .pred-subtitle {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .pred-range {
          font-size: clamp(1.6rem, 1.4rem + 0.8vw, 2.2rem);
          color: var(--brand-emerald);
          line-height: 1.15;
          margin: 0.2rem 0;
        }

        .pred-grade-pill {
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .pred-grade-pill strong {
          color: var(--brand-emerald);
        }

        /* Focus Topics */
        .focus-topics-box {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .focus-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .topic-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          background: #f8fcfe;
          border: 1px solid #c2e3f9;
          border-radius: var(--radius-sm);
        }

        .topic-name-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .topic-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e07a5f;
        }

        .topic-name {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .topic-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .weightage-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-emerald);
          background: var(--pastel-sage);
          padding: 2px 7px;
          border-radius: var(--radius-full);
        }

        .urgency-tag {
          font-size: 0.7rem;
          font-weight: 600;
          color: #a8421b;
        }

        /* Recommendation CTA Box */
        .recommendation-cta-box {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .rec-text {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .sim-buttons-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (max-width: 900px) {
          .sim-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
