import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Play, 
  Cpu, 
  RefreshCw, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { api } from '../services/api';

export default function HeroSection({ onOpenDemoExam }) {
  // AI Evaluator state
  const [selectedSubject, setSelectedSubject] = useState('Maths');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [studentInput, setStudentInput] = useState('');

  // Sample default answers
  const samples = {
    Maths: {
      question: 'Solve the quadratic equation 2x² - 5x + 3 = 0 using the quadratic formula. (3 Marks)',
      defaultAnswer: `Given equation: 2x² - 5x + 3 = 0
Here, a = 2, b = -5, c = 3
Quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)
b² - 4ac = (-5)² - 4(2)(3) = 25 - 24 = 1
x = [-(-5) ± √1] / (2 × 2) = (5 ± 1) / 4
x = (5 + 1)/4 = 6/4 = 3/2
x = (5 - 1)/4 = 4/4 = 1`,
      maxMarks: 3.0
    },
    Science: {
      question: 'Explain the mechanism of double circulation in the human heart and why it is necessary for humans. (4 Marks)',
      defaultAnswer: `Double circulation means blood travels twice through the heart during one complete cycle.
1. Pulmonary Circulation: Deoxygenated blood from right ventricle goes to lungs via pulmonary artery for oxygenation. Oxygenated blood returns to left atrium via pulmonary veins.
2. Systemic Circulation: Oxygenated blood from left ventricle pumped into aorta to supply body tissues. Deoxygenated blood returns to right atrium via vena cava.
This keeps oxygen-rich and oxygen-poor blood completely separated for efficient oxygen supply.`,
      maxMarks: 4.0
    }
  };

  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    setEvaluationResult(null);
    try {
      const activeSample = samples[selectedSubject];
      const answerToEvaluate = studentInput.trim() || activeSample.defaultAnswer;
      const res = await api.evaluateAnswer({
        questionId: selectedSubject.toLowerCase(),
        subject: selectedSubject,
        maxMarks: activeSample.maxMarks,
        studentAnswer: answerToEvaluate
      });
      setEvaluationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <section className="hero-section" id="ai-marking">
      {/* Background Soft Pastel Ambient Orbs */}
      <div className="pastel-glow-orb orb-sage"></div>
      <div className="pastel-glow-orb orb-lavender"></div>
      <div className="pastel-glow-orb orb-peach"></div>

      <div className="app-container">
        <div className="hero-grid">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="hero-content">
            <div className="pill-badge pill-sage mb-4">
              <span className="live-dot"></span>
              <span>CBSE &amp; ICSE Class 10 • 2027 Syllabus Updated</span>
            </div>

            <h1 className="hero-heading">
              A calmer, fairer way to master your <span className="highlight-text">Class 10 Boards</span>
            </h1>
            <p className="hero-subtext">
              Take timed board-style exams written by experienced senior examiners. 
              Our step-by-step AI marking reveals <strong className="font-semibold text-main">exactly where you lost half-marks</strong> before the actual board exams begin.
            </p>


            {/* CTAs */}
            <div className="hero-cta-group">
              <button 
                type="button" 
                className="btn btn-primary btn-lg shadow-hover"
                onClick={onOpenDemoExam}
              >
                <span>Start Free First Mock Exam</span>
                <ArrowRight size={17} />
              </button>

              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                <Play size={15} className="fill-current text-emerald" />
                <span>See How Marking Works</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="trust-ribbon">
              <div className="trust-item">
                <div className="trust-number">45,000+</div>
                <div className="trust-label">Answer Steps Marked</div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-number">99.4%</div>
                <div className="trust-label">Marking Scheme Match</div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-number">₹0</div>
                <div className="trust-label">First Exam Always Free</div>
              </div>
            </div>

            {/* Security & Verification Badges */}
            <div className="curriculum-badges">
              <div className="curr-pill">
                <ShieldCheck size={14} className="text-emerald" />
                <span>Official NCERT / CISCE Scheme</span>
              </div>
              <div className="curr-pill">
                <Award size={14} className="text-emerald" />
                <span>Step-Marking Deductions Explained</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live AI Marking Widget */}
          <div className="hero-widget-wrap">
            <div className="interactive-ai-card glass-panel-elevated">
              {/* Card Header */}
              <div className="ai-card-header">
                <div className="ai-card-title-group">
                  <div className="ai-indicator-icon">
                    <Cpu size={18} className="text-brand" />
                  </div>
                  <div>
                    <h2 className="ai-card-title">Live AI Step-Marking Engine</h2>
                    <span className="ai-card-subtitle">Official Rubric Grading Simulation</span>
                  </div>
                </div>

                {/* Subject Tabs */}
                <div className="subject-selector-tabs">
                  <button 
                    type="button"
                    className={`subject-tab ${selectedSubject === 'Maths' ? 'active' : ''}`}
                    onClick={() => { setSelectedSubject('Maths'); setEvaluationResult(null); setStudentInput(''); }}
                  >
                    Maths (3M)
                  </button>
                  <button 
                    type="button"
                    className={`subject-tab ${selectedSubject === 'Science' ? 'active' : ''}`}
                    onClick={() => { setSelectedSubject('Science'); setEvaluationResult(null); setStudentInput(''); }}
                  >
                    Science (4M)
                  </button>
                </div>
              </div>

              {/* Question Banner */}
              <div className="eval-question-box">
                <div className="question-meta-pill">
                  <FileText size={12} />
                  <span>Class 10 CBSE 2027 Sample Problem</span>
                </div>
                <p className="eval-question-text">{samples[selectedSubject].question}</p>
              </div>

              {/* Student Submission Display or Input */}
              <div className="student-submission-box">
                <div className="submission-header">
                  <span className="submission-tag">Sample Student Answer Sheet</span>
                  <span className="submission-status">Handwriting OCR Processed</span>
                </div>
                <div className="submission-content-pre">
                  {studentInput || samples[selectedSubject].defaultAnswer}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="eval-action-bar">
                <button
                  type="button"
                  className={`btn ${isEvaluating ? 'btn-secondary' : 'btn-primary'} w-full eval-btn`}
                  onClick={handleRunEvaluation}
                  disabled={isEvaluating}
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw size={17} className="animate-spin" />
                      <span>Comparing with Board Marking Scheme...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} className="text-butter" />
                      <span>{evaluationResult ? 'Re-Evaluate Answer' : 'Evaluate with AI Grader'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Live Evaluation Feedback Display */}
              {evaluationResult && (
                <div className="evaluation-result-tray">
                  {/* Score Summary */}
                  <div className="score-summary-banner">
                    <div className="score-badge-circle">
                      <span className="earned-score">{evaluationResult.scoreAwarded}</span>
                      <span className="total-score">/{evaluationResult.maxMarks}</span>
                    </div>
                    <div className="score-text-detail">
                      <div className="score-headline">
                        <span>Board Assessment: </span>
                        <strong className="text-emerald">
                          {evaluationResult.scoreAwarded === evaluationResult.maxMarks ? 'Full Marks' : 'Deduction Detected'}
                        </strong>
                      </div>
                      <p className="score-critique">{evaluationResult.overallFeedback}</p>
                    </div>
                  </div>

                  {/* Step Breakdown Cards */}
                  <div className="step-breakdown-list">
                    <div className="breakdown-header">
                      <span>Official Step-Marking Scheme Breakdown</span>
                      <span className="rubric-version">CBSE Rubric v2.7</span>
                    </div>

                    {evaluationResult.steps.map((st) => (
                      <div 
                        key={st.stepNumber} 
                        className={`step-card ${st.status === 'passed' ? 'step-passed' : 'step-partial'}`}
                      >
                        <div className="step-icon-col">
                          {st.status === 'passed' ? (
                            <CheckCircle2 size={16} className="text-emerald" />
                          ) : (
                            <AlertCircle size={16} className="text-peach" />
                          )}
                        </div>
                        <div className="step-content-col">
                          <div className="step-row-top">
                            <span className="step-title">Step {st.stepNumber}: {st.criterion}</span>
                            <span className={`step-mark-tag ${st.status === 'passed' ? 'tag-green' : 'tag-orange'}`}>
                              +{st.marksAwarded} / {st.maxMarks}
                            </span>
                          </div>
                          <p className="step-comment">{st.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Examiner Tip */}
                  <div className="examiner-tip-box">
                    <AlertCircle size={15} className="text-emerald shrink-0 mt-0.5" />
                    <span>{evaluationResult.boardTip}</span>
                  </div>
                </div>
              )}

              {/* Footer reassurance */}
              {!evaluationResult && (
                <div className="card-micro-footer">
                  <Clock size={13} className="text-muted" />
                  <span>Instant grading in 1.2s • Step marks awarded per CBSE/ICSE directives</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: clamp(3rem, 6vw, 5.5rem);
          padding-bottom: clamp(4rem, 8vw, 6.5rem);
          overflow: hidden;
        }

        /* Ambient Pastel Glow Orbs */
        .pastel-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .orb-sage {
          width: 480px;
          height: 480px;
          background: #d4ebd9;
          top: -100px;
          left: -80px;
        }

        .orb-lavender {
          width: 540px;
          height: 540px;
          background: #e7e2fd;
          top: 15%;
          right: -100px;
        }

        .orb-peach {
          width: 400px;
          height: 400px;
          background: #ffe3d2;
          bottom: -50px;
          left: 30%;
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          background: var(--brand-emerald);
          border-radius: 50%;
          animation: pulseSlow 2s infinite;
        }

        .hero-heading {
          margin-bottom: 1.25rem;
          color: var(--text-main);
        }

        .highlight-text {
          background: linear-gradient(120deg, #1e3f31 0%, #377d5d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline;
        }

        .hero-subtext {
          font-size: clamp(1.05rem, 0.95rem + 0.35vw, 1.2rem);
          line-height: 1.65;
          margin-bottom: 2rem;
          color: var(--text-muted);
          max-width: 540px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .btn-lg {
          padding: 0.95rem 1.9rem;
          font-size: 1.02rem;
        }

        .shadow-hover {
          box-shadow: 0 8px 24px rgba(30, 63, 49, 0.22);
        }

        .text-emerald {
          color: var(--brand-emerald);
        }

        .text-brand {
          color: var(--brand-emerald);
        }

        .text-butter {
          color: #f7d070;
        }

        .text-peach {
          color: #d9532f;
        }

        /* Trust Ribbon */
        .trust-ribbon {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem 1.6rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          margin-bottom: 1.75rem;
          width: fit-content;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
        }

        .trust-number {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--brand-emerald);
          line-height: 1.1;
        }

        .trust-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .trust-divider {
          width: 1px;
          height: 32px;
          background: var(--border-light);
        }

        /* Curriculum Badges */
        .curriculum-badges {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .curr-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Interactive AI Widget Card */
        .interactive-ai-card {
          padding: 1.6rem;
          position: relative;
          background: #ffffff;
          box-shadow: 0 20px 45px -10px rgba(30, 63, 49, 0.12), 0 2px 10px rgba(30, 63, 49, 0.04);
        }

        .ai-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 1rem;
          gap: 0.75rem;
        }

        .ai-card-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ai-indicator-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--pastel-sage);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .ai-card-subtitle {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .subject-selector-tabs {
          display: flex;
          background: var(--bg-subtle);
          padding: 3px;
          border-radius: var(--radius-full);
          gap: 2px;
        }

        .subject-tab {
          padding: 0.35rem 0.75rem;
          font-size: 0.78rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .subject-tab.active {
          background: #ffffff;
          color: var(--brand-emerald);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        /* Question Banner */
        .eval-question-box {
          background: var(--pastel-sage);
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          margin-bottom: 0.85rem;
        }

        .question-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-emerald);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.35rem;
        }

        .eval-question-text {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.4;
        }

        /* Student Submission Box */
        .student-submission-box {
          background: #fafaf9;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .submission-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-light);
          margin-bottom: 0.5rem;
        }

        .submission-tag {
          font-weight: 600;
          color: var(--text-muted);
        }

        .submission-content-pre {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #273b30;
          line-height: 1.5;
          white-space: pre-line;
          max-height: 130px;
          overflow-y: auto;
          background: #ffffff;
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .eval-btn {
          padding: 0.85rem;
          font-size: 0.95rem;
        }

        /* Evaluation Results */
        .evaluation-result-tray {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .score-summary-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f7faf8;
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          margin-bottom: 1rem;
        }

        .score-badge-circle {
          width: 52px;
          height: 52px;
          background: var(--brand-emerald);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-family: var(--font-display);
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(30, 63, 49, 0.2);
        }

        .earned-score {
          font-size: 1.25rem;
        }

        .total-score {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .score-headline {
          font-size: 0.85rem;
          margin-bottom: 0.2rem;
        }

        .score-critique {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        /* Step Breakdown */
        .step-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .breakdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }

        .rubric-version {
          font-size: 0.7rem;
          color: var(--text-light);
          font-family: var(--font-mono);
        }

        .step-card {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.65rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
        }

        .step-passed {
          background: rgba(226, 241, 231, 0.5);
          border: 1px solid rgba(184, 224, 199, 0.6);
        }

        .step-partial {
          background: rgba(255, 237, 226, 0.6);
          border: 1px solid rgba(254, 210, 186, 0.8);
        }

        .step-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
          margin-bottom: 0.2rem;
        }

        .step-title {
          font-weight: 600;
          color: var(--text-main);
          font-size: 0.78rem;
        }

        .step-mark-tag {
          font-weight: 700;
          font-size: 0.72rem;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .tag-green {
          background: #c8e9d3;
          color: var(--brand-emerald);
        }

        .tag-orange {
          background: #fdd5c0;
          color: #a8421b;
        }

        .step-comment {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .step-content-col {
          flex: 1;
        }

        .examiner-tip-box {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          background: var(--pastel-lavender);
          border: 1px solid var(--pastel-lavender-border);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.8rem;
          font-size: 0.75rem;
          color: var(--pastel-lavender-text);
          line-height: 1.4;
          font-weight: 500;
        }

        .card-micro-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-light);
          margin-top: 1rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-content {
            text-align: center;
            align-items: center;
          }
          .hero-subtext {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .trust-ribbon {
            margin-left: auto;
            margin-right: auto;
          }
          .curriculum-badges {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
