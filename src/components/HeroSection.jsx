import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
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
      <div className="app-container">

        {/* ============================================================
            CENTERED HERO HEADER - ZUSE EDITORIAL TECH AESTHETIC
            ============================================================ */}
        <div className="zuse-hero-header gsap-reveal">

          {/* Master Headline (Light-weight display with expressive serif italic accent) */}
          <h1 className="zuse-hero-title">
            A calmer, fairer way to master <span className="font-editorial-italic text-accent-lime">Class 10 Boards.</span>
          </h1>

          {/* Restrained Editorial Prose with purposeful emphasis */}
          <p className="zuse-hero-lead">
            Timed mock exams by senior board examiners. Step-by-step AI marking pinpoints exactly <strong className="font-semibold text-main">where you lose half-marks</strong> before exam day.
          </p>

          {/* Action CTAs */}
          <div className="zuse-hero-ctas">
            <button
              type="button"
              className="zuse-cta-primary"
              onClick={onOpenDemoExam}
            >
              <span className="button__flair" aria-hidden="true" />
              <Sparkles size={16} />
              <span>Start Free First Mock Exam</span>
              <kbd className="zuse-kbd">↵</kbd>
            </button>

            <a href="#how-it-works" className="zuse-cta-secondary">
              <span className="button__flair" aria-hidden="true" />
              <span>See how marking works</span>
              <ArrowRight size={14} className="zuse-cta-arrow" />
            </a>
          </div>

          {/* Technical Trust Strip */}
          <div className="zuse-trust-strip">
            <div className="zuse-trust-cell">
              <span className="zuse-trust-val">45,000+</span>
              <span className="zuse-trust-sub">Steps Graded</span>
            </div>
            <div className="zuse-trust-sep" />
            <div className="zuse-trust-cell">
              <span className="zuse-trust-val">99.4%</span>
              <span className="zuse-trust-sub">Scheme Match</span>
            </div>
            <div className="zuse-trust-sep" />
            <div className="zuse-trust-cell">
              <span className="zuse-trust-val">₹0</span>
              <span className="zuse-trust-sub">First Exam Free</span>
            </div>
            <div className="zuse-trust-sep" />
            <div className="zuse-trust-cell">
              <span className="zuse-trust-val">&lt;45s</span>
              <span className="zuse-trust-sub">AI Turnaround</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            INTERACTIVE PRODUCT SHOWCASE WINDOW (ZUSE IDE/STUDIO CHROME)
            ============================================================ */}
        <div className="zuse-window-wrap gsap-reveal">
          <div className="zuse-window-frame">

            {/* Top Window Bar with macOS traffic lights */}
            <div className="zuse-window-topbar">
              <div className="zuse-topbar-left">
                <div className="zuse-window-dots" aria-hidden="true">
                  <span className="zuse-dot zuse-dot-close" />
                  <span className="zuse-dot zuse-dot-minimize" />
                  <span className="zuse-dot zuse-dot-maximize" />
                </div>
                <div className="zuse-window-title">
                  <span className="zuse-crumb-folder">quanverse-studio</span>
                  <span className="zuse-crumb-slash">/</span>
                  <span className="zuse-crumb-file">cbse-10-{selectedSubject.toLowerCase()}-rubric.json</span>
                </div>
              </div>

              {/* Subject Tabs in Topbar */}
              <div className="zuse-topbar-tabs">
                <button
                  type="button"
                  className={`zuse-tab-btn ${selectedSubject === 'Maths' ? 'active' : ''}`}
                  onClick={() => { setSelectedSubject('Maths'); setEvaluationResult(null); setStudentInput(''); }}
                >
                  <span>Maths (3M)</span>
                  <span className="zuse-tab-diff diff-pos">+3.0</span>
                </button>
                <button
                  type="button"
                  className={`zuse-tab-btn ${selectedSubject === 'Science' ? 'active' : ''}`}
                  onClick={() => { setSelectedSubject('Science'); setEvaluationResult(null); setStudentInput(''); }}
                >
                  <span>Science (4M)</span>
                  <span className="zuse-tab-diff diff-pos">+4.0</span>
                </button>
              </div>

              <div className="zuse-topbar-right">
                <span className="zuse-status-pill">
                  <span className="zuse-status-dot" />
                  <span>CBSE v2.7 Active</span>
                </span>
              </div>
            </div>

            {/* Split Window Body */}
            <div className="zuse-window-body">

              {/* Left Sidebar: Workspaces & Exam Items */}
              <aside className="zuse-window-sidebar">
                <div className="zuse-sidebar-head">
                  <span>EXAM WORKSPACES</span>
                  <span className="zuse-sidebar-count">2027</span>
                </div>

                <div className="zuse-sidebar-items">
                  <button
                    type="button"
                    className={`zuse-sidebar-item ${selectedSubject === 'Maths' ? 'active' : ''}`}
                    onClick={() => { setSelectedSubject('Maths'); setEvaluationResult(null); setStudentInput(''); }}
                  >
                    <div className="zuse-item-row">
                      <span className="zuse-item-name">Maths Mock #01</span>
                      <span className="zuse-item-diff">
                        <span className="diff-pos">+2.5</span> <span className="diff-neg">-0.5</span>
                      </span>
                    </div>
                    <span className="zuse-item-sub">Quadratic Eqns · 3 Marks</span>
                  </button>

                  <button
                    type="button"
                    className={`zuse-sidebar-item ${selectedSubject === 'Science' ? 'active' : ''}`}
                    onClick={() => { setSelectedSubject('Science'); setEvaluationResult(null); setStudentInput(''); }}
                  >
                    <div className="zuse-item-row">
                      <span className="zuse-item-name">Science Mock #02</span>
                      <span className="zuse-item-diff">
                        <span className="diff-pos">+4.0</span>
                      </span>
                    </div>
                    <span className="zuse-item-sub">Life Processes · 4 Marks</span>
                  </button>

                  <div className="zuse-sidebar-item disabled">
                    <div className="zuse-item-row">
                      <span className="zuse-item-name">Social Sciences #01</span>
                      <span className="zuse-item-tag">Upcoming</span>
                    </div>
                    <span className="zuse-item-sub">History &amp; Civics Blueprint</span>
                  </div>
                </div>

                {/* Sidebar Telemetry Badges */}
                <div className="zuse-sidebar-footer">
                  <div className="zuse-telemetry-badge">
                    <ShieldCheck size={12} className="text-lime" />
                    <span>Official NCERT / CISCE</span>
                  </div>
                  <div className="zuse-telemetry-badge">
                    <Award size={12} className="text-lime" />
                    <span>Examiner Rubric Match</span>
                  </div>
                </div>
              </aside>

              {/* Main Studio Pane: AI Marking Sandbox */}
              <div className="zuse-window-main">

                {/* Question Box */}
                <div className="zuse-question-box">
                  <div className="zuse-q-meta">
                    <span className="zuse-q-chip">CLASS 10 CBSE 2027</span>
                    <span className="zuse-q-subject">{selectedSubject}</span>
                    <span className="zuse-q-marks">{samples[selectedSubject].maxMarks} Marks</span>
                  </div>
                  <p className="zuse-q-text">{samples[selectedSubject].question}</p>
                </div>

                {/* Student Answer Sheet Box (OCR Preview) */}
                <div className="zuse-answer-box">
                  <div className="zuse-answer-header">
                    <span className="zuse-answer-title">STUDENT ANSWER SHEET (HANDWRITING OCR EXTRACT)</span>
                    <span className="zuse-ocr-badge">OCR Processed</span>
                  </div>
                  <div className="zuse-answer-code">
                    {studentInput || samples[selectedSubject].defaultAnswer}
                  </div>
                </div>

                {/* Execution Button */}
                <div className="zuse-action-row">
                  <button
                    type="button"
                    className={`zuse-eval-btn ${isEvaluating ? 'evaluating' : ''}`}
                    onClick={handleRunEvaluation}
                    disabled={isEvaluating}
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw size={15} className="animate-spin text-lime" />
                        <span>Cross-referencing Official Board Marking Scheme...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} className="text-lime" />
                        <span>{evaluationResult ? 'Re-Evaluate with AI Grader' : 'Evaluate with AI Grader'}</span>
                        <kbd className="zuse-kbd">↵</kbd>
                      </>
                    )}
                  </button>
                </div>

                {/* Live Evaluation Results Tray */}
                {evaluationResult && (
                  <div className="zuse-result-tray">
                    {/* Score Banner */}
                    <div className="zuse-score-card">
                      <div className="zuse-score-digits">
                        <span className="zuse-score-num">{evaluationResult.scoreAwarded}</span>
                        <span className="zuse-score-total">/{evaluationResult.maxMarks}</span>
                      </div>
                      <div className="zuse-score-detail">
                        <div className="zuse-score-status-row">
                          <span className="zuse-status-label">BOARD ASSESSMENT:</span>
                          <span className={evaluationResult.scoreAwarded === evaluationResult.maxMarks ? 'text-lime font-bold' : 'text-accent-lime font-bold'}>
                            {evaluationResult.scoreAwarded === evaluationResult.maxMarks ? 'FULL MARKS AWARDED' : 'HALF-MARK DEDUCTION DETECTED'}
                          </span>
                        </div>
                        <p className="zuse-critique-text">{evaluationResult.overallFeedback}</p>
                      </div>
                    </div>

                    {/* Step Breakdown Cards */}
                    <div className="zuse-steps-list">
                      <div className="zuse-steps-head">
                        <span>OFFICIAL STEP-MARKING SCHEME BREAKDOWN</span>
                        <span className="zuse-rubric-version">CBSE Rubric v2.7</span>
                      </div>

                      {evaluationResult.steps.map((st) => (
                        <div
                          key={st.stepNumber}
                          className={`zuse-step-item ${st.status === 'passed' ? 'passed' : 'partial'}`}
                        >
                          <div className="zuse-step-icon">
                            {st.status === 'passed' ? (
                              <CheckCircle2 size={15} className="text-lime" />
                            ) : (
                              <AlertCircle size={15} className="text-muted" />
                            )}
                          </div>
                          <div className="zuse-step-content">
                            <div className="zuse-step-row-top">
                              <span className="zuse-step-title">Step {st.stepNumber}: {st.criterion}</span>
                              <span className={`zuse-step-mark ${st.status === 'passed' ? 'diff-pos' : 'diff-neg'}`}>
                                +{st.marksAwarded} / {st.maxMarks}
                              </span>
                            </div>
                            <p className="zuse-step-comment">{st.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Senior Examiner Tip Callout */}
                    {evaluationResult.deductions?.length > 0 && (
                      <div className="zuse-examiner-callout">
                        <div className="zuse-callout-header">
                          <AlertCircle size={14} className="text-accent-lime" />
                          <span>Senior Board Examiner Guidance</span>
                        </div>
                        <p className="zuse-callout-text">{evaluationResult.deductions[0].tip}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Micro-note when idle */}
                {!evaluationResult && (
                  <div className="zuse-idle-footer">
                    <Clock size={13} className="text-muted" />
                    <span>Instant grading in 1.2s • Step marks awarded per official CBSE/ICSE directives</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* ============================================================
           ZUSE HERO SECTION ARCHITECTURE
           ============================================================ */
        .hero-section {
          position: relative;
          padding-top: clamp(3.5rem, 6.5vh, 5.25rem);
          padding-bottom: clamp(1.75rem, 3.5vh, 2.5rem);
          overflow: hidden;
        }

        .zuse-hero-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(1.75rem, 3.2vw, 2.5rem);
        }

        .zuse-hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 5.2vw, 4.8rem);
          font-weight: 300; /* Zuse light-weight display */
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #F1F5F2;
          max-width: 960px;
          margin-bottom: 1.25rem;
          text-wrap: balance;
        }

        .zuse-hero-title .highlight-text {
          font-weight: 600;
          color: #A7F3C4;
          display: block;
          text-shadow: 0 0 20px rgba(167, 243, 196, 0.25);
        }

        .zuse-hero-lead {
          font-size: clamp(0.95rem, 1.1vw, 1.125rem);
          line-height: 1.5;
          color: #B5C0B8;
          max-width: 52ch;
          margin-bottom: 1.5rem;
          text-wrap: pretty;
        }

        .zuse-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .zuse-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.65rem 1.35rem;
          border-radius: 6px;
          background-color: #FFFFFF;
          color: #07110D;
          font-family: var(--font-mono);
          font-size: 0.825rem;
          font-weight: 700;
          border: none;
          outline: none;
          cursor: pointer;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .zuse-cta-primary > *:not(.button__flair) {
          position: relative;
          z-index: 2;
          pointer-events: none;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary svg {
          position: relative;
          z-index: 2;
          pointer-events: none;
          color: inherit;
          stroke: currentColor;
          fill: none;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1), stroke 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary svg path {
          stroke: currentColor;
          transition: stroke 50ms cubic-bezier(0.645, 0.045, 0.355, 1), color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:hover {
          background-color: #FFFFFF;
          border: none;
          outline: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:hover > *:not(.button__flair) {
          color: #FFFFFF;
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:hover svg {
          color: #FFFFFF;
          stroke: currentColor;
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), stroke 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:hover svg path {
          stroke: currentColor;
          transition: stroke 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:active {
          background-color: #E2ECE5;
        }

        .zuse-cta-primary:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 2px;
        }

        .zuse-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.15rem;
          font-size: 0.825rem;
          font-weight: 600;
          font-family: var(--font-sans);
          color: var(--text-main);
          background-color: rgba(11, 36, 26, 0.85);
          background-image: radial-gradient(rgba(190, 220, 200, 0.05) 1px, transparent 0);
          background-size: 5px 5px;
          border: none;
          outline: none;
          border-radius: 6px;
          text-decoration: none;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .zuse-cta-secondary > *:not(.button__flair) {
          position: relative;
          z-index: 2;
          pointer-events: none;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary svg,
        .zuse-cta-secondary .zuse-cta-arrow {
          position: relative;
          z-index: 2;
          pointer-events: none;
          color: inherit;
          stroke: currentColor;
          fill: none;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1), stroke 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary svg path,
        .zuse-cta-secondary .zuse-cta-arrow path {
          stroke: currentColor;
          transition: stroke 50ms cubic-bezier(0.645, 0.045, 0.355, 1), color 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary:hover {
          background-color: rgba(11, 36, 26, 0.85);
          color: #07110D;
          border: none;
          outline: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary:hover > *:not(.button__flair) {
          color: #07110D;
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary:hover svg,
        .zuse-cta-secondary:hover .zuse-cta-arrow {
          color: #07110D;
          stroke: currentColor;
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), stroke 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary:hover svg path,
        .zuse-cta-secondary:hover .zuse-cta-arrow path {
          stroke: currentColor;
          transition: stroke 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-secondary:focus-visible {
          outline: 2px solid var(--accent-emerald);
          outline-offset: 2px;
        }

        .zuse-kbd {
          padding: 0.15rem 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.2);
          color: #07110D;
          transition: color 50ms cubic-bezier(0.645, 0.045, 0.355, 1), background 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-cta-primary:hover .zuse-kbd {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.3);
          transition: color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .zuse-hero-micro {
          font-size: 0.785rem;
          color: #8F9D93;
          margin-bottom: 2rem;
        }

        /* Technical Trust Strip - Integrated Naturally Without Opaque Boxes */
        .zuse-trust-strip {
          display: inline-flex;
          align-items: center;
          gap: 1.15rem;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          margin-top: 50px;
          background: rgba(11, 36, 26, 0.45);
          border: 1px solid rgba(190, 220, 200, 0.14);
          backdrop-filter: blur(8px);
          box-shadow: none;
        }

        .zuse-trust-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .zuse-trust-val {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 700;
          color: #F1F5F2;
          line-height: 1.1;
        }

        .zuse-trust-sub {
          font-size: 0.6875rem;
          color: #8F9D93;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .zuse-trust-sep {
          width: 1px;
          height: 20px;
          background: rgba(190, 220, 200, 0.15);
        }

        /* ============================================================
           ZUSE WINDOW DEMO SHOWCASE (STUDIO CHROME)
           ============================================================ */
        .zuse-window-wrap {
          max-width: 1040px;
          margin: 0 auto;
        }

        .zuse-window-frame {
          border-radius: 12px;
          border: 1px solid var(--border-light);
          margin-top : 80px;
        
          background: var(--bg-card);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        /* Topbar Chrome */
        .zuse-window-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: var(--bg-card-elevated);
          border-bottom: 1px solid var(--border-light);
          gap: 1rem;
        }

        .zuse-topbar-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .zuse-window-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .zuse-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.9;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .zuse-dot:nth-child(1),
        .zuse-dot-close {
          background: #FF5F56;
          box-shadow: 0 0 6px rgba(255, 95, 86, 0.45);
        }

        .zuse-dot:nth-child(2),
        .zuse-dot-minimize {
          background: #FFBD2E;
          box-shadow: 0 0 6px rgba(255, 189, 46, 0.45);
        }

        .zuse-dot:nth-child(3),
        .zuse-dot-maximize {
          background: #27C93F;
          box-shadow: 0 0 6px rgba(39, 201, 63, 0.45);
        }

        .zuse-window-dots:hover .zuse-dot {
          opacity: 1;
        }

        .zuse-window-title {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .zuse-crumb-folder { color: var(--text-muted); }
        .zuse-crumb-slash { color: var(--text-light); }
        .zuse-crumb-file { color: var(--text-heading); font-weight: 500; }

        .zuse-topbar-tabs {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          padding: 2px;
          border-radius: 6px;
        }

        .zuse-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.6rem;
          font-size: 0.72rem;
          font-family: var(--font-mono);
          font-weight: 600;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .zuse-tab-btn:hover:not(.active) {
          color: #F1F5F2;
          background-color: rgba(16, 71, 52, 0.4);
          background-image: radial-gradient(rgba(213, 243, 106, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
          border-color: rgba(67, 201, 139, 0.3);
        }

        .zuse-tab-btn.active {
          background-color: rgba(16, 71, 52, 0.7);
          background-image: radial-gradient(rgba(67, 201, 139, 0.15) 1px, transparent 0);
          background-size: 4px 4px;
          color: #F1F5F2;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(213, 243, 106, 0.2);
          border-color: rgba(67, 201, 139, 0.35);
        }

        .zuse-tab-btn:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 1px;
        }

        .zuse-tab-diff {
          font-size: 0.65rem;
        }

        .zuse-topbar-right {
          display: flex;
          align-items: center;
        }

        .zuse-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        .zuse-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-lime);
          box-shadow: 0 0 6px var(--color-lime);
        }

        /* Window Body Split Layout */
        .zuse-window-body {
          display: grid;
          padding: 20px;
          grid-template-columns: 240px 1fr;
          min-height: 500px;
        }

        /* Sidebar */
        .zuse-window-sidebar {
          background: var(--bg-surface);
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.9rem 0.75rem;
        }

        .zuse-sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-light);
          margin-bottom: 0.75rem;
          padding: 0 0.35rem;
        }

        .zuse-sidebar-count {
          opacity: 0.65;
        }

        .zuse-sidebar-items {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .zuse-sidebar-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.55rem 0.65rem;
          border-radius: 6px;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
          width: 100%;
        }

        .zuse-sidebar-item:hover:not(.disabled) {
          background-color: rgba(16, 71, 52, 0.35);
          background-image: radial-gradient(rgba(213, 243, 106, 0.10) 1px, transparent 0);
          background-size: 4px 4px;
          border-color: transparent !important;
          outline: none !important;
          box-shadow: inset 2px 0 0 var(--accent-emerald);
        }

        .zuse-sidebar-item.active {
          background-color: rgba(16, 71, 52, 0.5);
          background-image: radial-gradient(rgba(67, 201, 139, 0.14) 1px, transparent 0);
          background-size: 4px 4px;
          border-color: rgba(67, 201, 139, 0.45);
          box-shadow: inset 2px 0 0 var(--accent-lime);
        }

        .zuse-sidebar-item:focus-visible {
          outline: 2px solid var(--accent-emerald);
          outline-offset: 1px;
        }

        .zuse-sidebar-item.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .zuse-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-heading);
        }

        .zuse-item-sub {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        .zuse-item-tag {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 1px 4px;
          border-radius: 3px;
          background: var(--bg-subtle);
          color: var(--text-light);
        }

        .zuse-sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-light);
        }

        .zuse-telemetry-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        /* Main Studio Pane */
        .zuse-window-main {
          padding: 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: var(--bg-card);
        }

        /* Question Box */
        .zuse-question-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
        }

        .zuse-q-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .zuse-q-chip {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--color-lime);
          background: rgba(137, 202, 33, 0.1);
          border: 1px solid rgba(137, 202, 33, 0.25);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .zuse-q-subject {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .zuse-q-marks {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-light);
          margin-left: auto;
        }

        .zuse-q-text {
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-heading);
          line-height: 1.4;
        }

        /* Answer Sheet */
        .zuse-answer-box {
          background: var(--bg-surface);
          border: 1px dashed var(--border-medium);
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
        }

        .zuse-answer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        .zuse-answer-title {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-light);
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .zuse-ocr-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-lime);
          background: rgba(137, 202, 33, 0.12);
          border: 1px solid rgba(137, 202, 33, 0.25);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .zuse-answer-code {
          font-family: var(--font-mono);
          font-size: 0.775rem;
          color: var(--text-main);
          line-height: 1.5;
          white-space: pre-line;
          min-height: 135px;
          max-height: 175px;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.15);
          padding: 0.65rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--border-light);
        }

        /* Action Toolbar */
        .zuse-action-row {
          display: flex;
        }

        .zuse-eval-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          background-color: var(--accent-emerald);
          background-image: radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
          border: none !important;
          outline: none !important;
          color: #07110D;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .zuse-eval-btn:hover {
          background-color: var(--accent-emerald-hover);
          background-image: radial-gradient(rgba(0, 0, 0, 0.20) 1.2px, transparent 0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25) !important;
          border: none !important;
          border-color: transparent !important;
          outline: none !important;
        }

        .zuse-eval-btn:active {
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.35);
        }

        .zuse-eval-btn:focus-visible {
          outline: none !important;
        }

        .zuse-eval-btn.evaluating {
          opacity: 0.85;
          cursor: wait;
        }

        /* Results Tray */
        .zuse-result-tray {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          animation: zuseFadeIn 0.25s ease-out;
        }

        @keyframes zuseFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .zuse-score-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
        }

        .zuse-score-digits {
          display: flex;
          align-items: baseline;
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          background: var(--bg-card-elevated);
          border: 1px solid var(--border-light);
          font-family: var(--font-mono);
        }

        .zuse-score-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-lime);
        }

        .zuse-score-total {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .zuse-score-detail {
          flex: 1;
        }

        .zuse-score-status-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          margin-bottom: 0.2rem;
        }

        .zuse-status-label {
          color: var(--text-light);
        }

        .zuse-critique-text {
          font-size: 0.785rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Steps Breakdown */
        .zuse-steps-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .zuse-steps-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-light);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .zuse-rubric-version {
          opacity: 0.7;
        }

        .zuse-step-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
        }

        .zuse-step-item.passed {
          border-color: rgba(137, 202, 33, 0.25);
        }

        .zuse-step-item.partial {
          border-color: rgba(244, 63, 94, 0.25);
        }

        .zuse-step-icon {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .zuse-step-content {
          flex: 1;
        }

        .zuse-step-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.2rem;
        }

        .zuse-step-name {
          font-size: 0.785rem;
          font-weight: 600;
          color: var(--text-heading);
        }

        .zuse-step-mark {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .zuse-step-comment {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        /* Examiner Callout */
        .zuse-examiner-callout {
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          background: rgba(16, 71, 52, 0.22);
          border: 1px solid rgba(67, 201, 139, 0.25);
        }

        .zuse-callout-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          font-family: var(--font-mono);
          color: var(--accent-lime);
          margin-bottom: 0.25rem;
        }

        .zuse-callout-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .zuse-idle-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: var(--text-light);
          padding-top: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 820px) {
          .zuse-window-body {
            grid-template-columns: 1fr;
          }
          .zuse-window-sidebar {
            display: none;
          }
          .zuse-trust-strip {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .zuse-hero-title {
            font-size: clamp(2rem, 7.5vw, 2.75rem);
            line-height: 1.12;
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </section>
  );
}
