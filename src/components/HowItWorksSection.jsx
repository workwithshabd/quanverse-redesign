import React, { useState } from 'react';
import { 
  Timer, 
  BrainCircuit, 
  ArrowRight, 
  Check, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function HowItWorksSection({ onOpenDemoExam }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Teacher-Authored Question Bank',
      badge: 'Verified Educators',
      pillClass: 'pill-sage',
      desc: 'Senior CBSE & ICSE examiners create structured questions mapped to the latest NCERT and CISCE blueprints, including competency, assertion-reasoning, and case-study items.',
      bullets: [
        'Curated by active board examiners with 15+ years experience',
        'Includes official marking criteria for every step',
        'Updated continuously for 2027 curriculum directives'
      ],
      previewGraphic: 'authoring'
    },
    {
      num: '02',
      title: 'Timed Exam Simulation',
      badge: 'Board Hall Mode',
      pillClass: 'pill-lavender',
      desc: 'Students take 80-mark, 3-hour mock tests under real exam conditions with strict timer enforcement, section navigation, and digital or paper-upload answer sheets.',
      bullets: [
        'Authentic section structure: Sections A, B, C, D & E',
        'Internal choice options simulated accurately',
        'Trains pacing to eliminate end-of-exam panic'
      ],
      previewGraphic: 'simulation'
    },
    {
      num: '03',
      title: 'Step-by-Step AI Evaluation',
      badge: 'Official Marking Rubric',
      pillClass: 'pill-peach',
      desc: 'Our neural marking engine scans handwriting or typed responses, cross-referencing against official board marking schemes to award partial marks for every formula, step, and unit.',
      bullets: [
        'Understands formulas, diagrams, and mathematical working',
        'Identifies missing units, incomplete conclusions, and syntax slip-ups',
        'Evaluated and marked in under 60 seconds per sheet'
      ],
      previewGraphic: 'evaluation'
    },
    {
      num: '04',
      title: 'Actionable Diagnostic Scorecard',
      badge: 'Targeted Remediation',
      pillClass: 'pill-butter',
      desc: 'Instead of just a final percentage, students receive a surgical breakdown of chapter-level health, mark leakage points, and targeted 5-minute revision drills.',
      bullets: [
        'Pinpoints high-yield topics where half-marks are slipping',
        'Compares student working against official Topper Model Answers',
        'Monitors Board Readiness progression towards 95%+'
      ],
      previewGraphic: 'diagnostics'
    }
  ];

  return (
    <section className="how-it-works-section section-spacing" id="how-it-works">
      <div className="app-container">
        
        {/* Header */}
        <div className="section-head text-center gsap-reveal">
          <div className="pill-badge pill-sage mb-3 gsap-float">
            <Sparkles size={14} />
            <span>The Exam Engine</span>
          </div>
          <h2 className="section-title">
            How Teacher-Made Papers Meet <span className="highlight-text">AI Marking</span>
          </h2>
          <p className="section-subtitle">
            A seamless bridge between senior educator expertise and step-level automated evaluation.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="how-grid">
          
          {/* Step Selector List */}
          <div className="steps-selector-list gsap-stagger-group">
            {steps.map((st, i) => (
              <div
                key={i}
                className={`step-nav-card gsap-stagger-item ${activeStep === i ? 'active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="step-num-circle">{st.num}</div>
                <div className="step-nav-content">
                  <div className="step-nav-meta">
                    <span className={`pill-badge ${st.pillClass} step-badge-mini`}>{st.badge}</span>
                  </div>
                  <h4 className="step-nav-title">{st.title}</h4>
                  <p className="step-nav-excerpt">{st.desc}</p>
                </div>
                <ChevronRight size={18} className="step-arrow" />
              </div>
            ))}
          </div>

          {/* Step Detail Display Card */}
          <div className="step-display-col">
            <div className="step-detail-card glass-panel-elevated">
              <div className="card-top-tag">
                <span className="step-giant-number">{steps[activeStep].num}</span>
                <span className={`pill-badge ${steps[activeStep].pillClass}`}>
                  {steps[activeStep].badge}
                </span>
              </div>

              <h3 className="detail-card-heading">{steps[activeStep].title}</h3>
              <p className="detail-card-desc">{steps[activeStep].desc}</p>

              <div className="detail-bullet-list">
                {steps[activeStep].bullets.map((b, idx) => (
                  <div key={idx} className="bullet-row">
                    <div className="check-bubble">
                      <Check size={14} className="text-emerald" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Visual Graphic for active step */}
              <div className="interactive-step-visual">
                {activeStep === 0 && (
                  <div className="visual-authoring">
                    <div className="author-card-mock">
                      <div className="mock-header">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                        <span className="mock-title">CBSE Blueprint Authoring Studio</span>
                      </div>
                      <div className="mock-code-box">
                        <div className="mock-line"><span className="kw">SECTION C:</span> 3-Mark Analytical Questions</div>
                        <div className="mock-line pl-2"><span className="step-var">Rubric:</span> Step 1: Definition (1M) | Step 2: Derivation (1.5M) | Step 3: SI Unit (0.5M)</div>
                        <div className="mock-badge-line">
                          <span className="badge-pill-micro">Competency Aligned</span>
                          <span className="badge-pill-micro">Verified by Dr. R. Sharma (Ex-CBSE Evaluator)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="visual-sim">
                    <div className="sim-timer-mock">
                      <Timer size={18} className="text-emerald" />
                      <span className="font-mono">Time Remaining: 02:44:18</span>
                    </div>
                    <div className="sim-sections-mock">
                      <span className="sec-tag active">Section A (MCQ)</span>
                      <span className="sec-tag">Section B (2M)</span>
                      <span className="sec-tag">Section C (3M)</span>
                      <span className="sec-tag">Section D (5M)</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="visual-ai-scan">
                    <div className="scan-line-animation"></div>
                    <div className="scan-content">
                      <BrainCircuit size={20} className="text-emerald" />
                      <span>Matching Handwriting OCR to Official CBSE Step 3 Criteria...</span>
                    </div>
                    <div className="scan-result-micro">
                      <span className="tag-green">+1.5 / 2.0 Marks Awarded</span>
                      <span className="tag-amber">-0.5 Deducted for missing formula substitution</span>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="visual-diagnostic">
                    <div className="radar-metric-mock">
                      <div className="radar-col">
                        <span className="radar-label">Science Life Processes</span>
                        <div className="progress-track"><div className="progress-bar w-85"></div></div>
                        <span className="radar-val">88% (Mastered)</span>
                      </div>
                      <div className="radar-col">
                        <span className="radar-label">Light &amp; Reflection</span>
                        <div className="progress-track"><div className="progress-bar w-60 bar-peach"></div></div>
                        <span className="radar-val text-peach">62% (Step loss in ray diagrams)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer CTA */}
              <div className="detail-card-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOpenDemoExam}
                >
                  <span>Experience Step {steps[activeStep].num} Live</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        .how-it-works-section {
          background: #ffffff;
        }

        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(1.5rem, 3.5vw, 3rem);
          align-items: stretch;
        }

        .steps-selector-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .step-nav-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1.4rem;
          background: #fbfbfb;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-smooth);
        }

        .step-nav-card:hover {
          background: #ffffff;
          border-color: var(--border-medium);
          transform: translateX(4px);
          box-shadow: var(--shadow-card);
        }

        .step-nav-card.active {
          background: #ffffff;
          border-color: var(--pastel-sage-border);
          box-shadow: 0 10px 25px -4px rgba(30, 63, 49, 0.08);
          border-left: 4px solid var(--brand-emerald);
        }

        .step-num-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-light);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .step-nav-card.active .step-num-circle {
          background: var(--pastel-sage);
          color: var(--brand-emerald);
        }

        .step-nav-content {
          flex: 1;
        }

        .step-nav-meta {
          margin-bottom: 0.25rem;
        }

        .step-badge-mini {
          font-size: 0.7rem;
          padding: 1px 7px;
        }

        .step-nav-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .step-nav-excerpt {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .step-arrow {
          color: var(--text-light);
          transition: transform var(--transition-fast);
        }

        .step-nav-card.active .step-arrow {
          color: var(--brand-emerald);
          transform: translateX(3px);
        }

        /* Step Detail Display */
        .step-detail-card {
          padding: clamp(1.75rem, 3.5vw, 2.5rem);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          background: #fafbfa;
        }

        .card-top-tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .step-giant-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 900;
          color: rgba(30, 63, 49, 0.12);
          line-height: 1;
        }

        .detail-card-heading {
          font-size: 1.55rem;
          margin-bottom: 0.75rem;
        }

        .detail-card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .detail-bullet-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .bullet-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-main);
        }

        .check-bubble {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--pastel-sage);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Interactive Visual Graphic */
        .interactive-step-visual {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          box-shadow: var(--shadow-subtle);
        }

        .author-card-mock {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .mock-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .mock-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          margin-left: 6px;
        }

        .mock-code-box {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #2b3e34;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .kw {
          color: var(--brand-emerald);
          font-weight: 700;
        }

        .step-var {
          color: #6366f1;
        }

        .mock-badge-line {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .badge-pill-micro {
          font-size: 0.68rem;
          background: var(--pastel-sage);
          color: var(--brand-emerald);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .sim-timer-mock {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--brand-emerald);
          margin-bottom: 0.85rem;
        }

        .sim-sections-mock {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sec-tag {
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
        }

        .sec-tag.active {
          background: var(--brand-emerald);
          color: #ffffff;
        }

        .visual-ai-scan {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .scan-content {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.825rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .scan-result-micro {
          display: flex;
          gap: 0.6rem;
          font-size: 0.75rem;
        }

        .tag-green {
          background: var(--pastel-sage);
          color: var(--brand-emerald);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .tag-amber {
          background: var(--pastel-peach);
          color: #a8421b;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .radar-metric-mock {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radar-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .radar-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .progress-track {
          height: 6px;
          background: #e6ede8;
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: var(--brand-emerald);
          border-radius: 9999px;
        }

        .w-85 { width: 88%; }
        .w-60 { width: 62%; }
        .bar-peach { background: #e07a5f; }

        .radar-val {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .detail-card-footer {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .how-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
