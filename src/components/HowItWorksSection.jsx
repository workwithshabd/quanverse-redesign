import React, { useState } from 'react';
import {
  FileEdit,
  Timer,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import HalftoneMosaic from './common/HalftoneMosaic';

const STEP_HALFTONES = ['architecture', 'compass', 'optics', 'geometry'];

export default function HowItWorksSection({ onOpenDemoExam }) {
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    {
      num: '01',
      tag: 'EDUCATOR AUTHORING',
      title: 'Educator-Authored Papers',
      desc: 'Structured questions mapped directly to official CBSE & CISCE blueprints.',
      bullets: [
        'Embedded with official step-marking criteria by senior board examiners'
      ],
      icon: FileEdit,
      visualBadge: 'NCERT 2027 BLUEPRINT',
      miniDetail: 'Official Blueprints'
    },
    {
      num: '02',
      tag: 'SIMULATION',
      title: 'Timed Exam Simulation',
      desc: 'Full 80-mark, 3-hour mock tests under authentic exam hall conditions.',
      bullets: [
        'Real-time countdown enforcing pacing across Sections A through E'
      ],
      icon: Timer,
      visualBadge: '3-HOUR HALL CLOCK',
      miniDetail: '180-Min Timer'
    },
    {
      num: '03',
      tag: 'STEP EVALUATION',
      title: 'Step-by-Step AI Evaluation',
      desc: 'Our OCR engine scans handwritten answers and cross-references board rubrics in 60s.',
      bullets: [
        'Detects formula omissions, wrong notation, and skipped intermediate steps'
      ],
      icon: BrainCircuit,
      visualBadge: 'NEURAL STEP SCHEME',
      miniDetail: 'Sub-60s Turnaround'
    },
    {
      num: '04',
      tag: 'DIAGNOSTIC RADAR',
      title: 'Diagnostic Scorecard',
      desc: 'Surgical breakdown isolating specific subtopics leaking half-marks.',
      bullets: [
        'Side-by-side comparison against 100/100 Topper Model Answers'
      ],
      icon: BarChart3,
      visualBadge: 'TARGETED REPAIR',
      miniDetail: 'Targeted Drills'
    }
  ];

  return (
    <section className="editorial-how-section" id="how-it-works">
      <div className="app-container">

        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-emerald font-bold">EXAM METHODOLOGY</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-main">
              How Senior Examiners Grade — Rebuilt in Code
            </h2>
          </div>

          <p className="section-subtitle">
            Senior board examiner rubrics united with step-level machine precision.
          </p>
        </div>

        {/* Continuous Four-Column Structured Editorial Grid */}
        <div className="editorial-steps-grid">

          {/* 4 Aligned Columns */}
          <div className="steps-columns-container">
            {steps.map((st, idx) => {
              const IconComp = st.icon;
              const isActive = activeStep === idx;
              
              // Restrained dual-accent assignment (Emerald & Acid Lime only)
              const accent = {
                color: isActive ? 'text-accent-lime' : 'text-accent-emerald',
                dotClass: isActive ? 'text-accent-lime' : 'text-accent-emerald'
              };

              return (
                <div
                  key={st.num}
                  className={`step-grid-col ${isActive ? 'active-col' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveStep(idx); }}
                  aria-label={`View step ${st.num}: ${st.title}`}
                >
                  <div className="col-top-meta font-mono text-[10px] flex items-center justify-between">
                    <span className="col-tag text-muted uppercase tracking-wider">{st.tag}</span>
                  </div>

                  <div className="col-icon-wrap my-1.5 flex items-center gap-2">
                    <IconComp size={16} className={isActive ? accent.color : 'text-muted'} />
                    <span className="font-mono text-[10px] text-muted">{st.miniDetail}</span>
                  </div>

                  <h3 className="col-title text-main mb-1">
                    {st.title}
                  </h3>

                  <p className="col-desc text-muted mb-2">
                    {st.desc}
                  </p>

                  <div className="col-active-indicator mt-auto pt-1.5">
                    <span className={`font-mono text-[10px] ${isActive ? accent.color + ' font-semibold' : 'text-muted'}`}>
                      {isActive ? '● ACTIVE STAGE' : 'CLICK TO SELECT'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Deep-Dive Showcase Row (Directly in Grid, No Floating Card) */}
          <div className="step-deep-dive-pane">
            <div className="deep-dive-header font-mono text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="deep-dive-title text-main font-semibold">
                  STAGE {steps[activeStep].num}: {steps[activeStep].title.toUpperCase()}
                </span>
                <span className="text-muted opacity-40">/</span>
                <span className="text-accent-emerald font-semibold">
                  {steps[activeStep].visualBadge}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider hidden sm:inline">
                {steps[activeStep].tag}
              </span>
            </div>

            <div className="deep-dive-body">
              {/* Left Column: Evaluation heading, concise supporting content, bullet points, and CTA */}
              <div className="deep-dive-content-col">
                <p className="deep-dive-desc font-sans text-xs md:text-sm text-muted leading-relaxed mb-3">
                  {steps[activeStep].desc}
                </p>

                <div className="deep-dive-bullets">
                  <div className="bullets-heading font-mono text-[10.5px] text-muted mb-2 uppercase tracking-wider">
                    VERIFIED EVALUATION PROTOCOLS:
                  </div>
                  <ul className="space-y-2.5 font-sans text-xs text-muted">
                    {steps[activeStep].bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-accent-emerald shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="deep-dive-action mt-3.5">
                  <button
                    type="button"
                    className="btn btn-emerald btn-sm"
                    onClick={onOpenDemoExam}
                  >
                    <span>Experience Stage {steps[activeStep].num} Live</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Right Column: Proportional, Compact Halftone Mosaic Illustration */}
              <div className="deep-dive-illustration-col">
                <HalftoneMosaic
                  subject={STEP_HALFTONES[activeStep]}
                  variant="plate"
                  compact={true}
                  aspectRatio="16/10"
                  className="deep-dive-halftone-plate"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .editorial-how-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-how-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        .editorial-steps-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* 4 Columns Container */
        .steps-columns-container {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid rgba(190, 220, 200, 0.14);
        }

        .step-grid-col {
          padding: clamp(1.35rem, 2vw, 1.85rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          transition: background-color 0.2s ease;
          position: relative;
          min-height: 160px;
          box-sizing: border-box;
        }

        .step-grid-col:last-child {
          border-right: none;
        }

        .col-top-meta {
          height: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          letter-spacing: 0.05em;
        }

        .col-icon-wrap {
          height: 20px;
          margin: 0.35rem 0 0.25rem;
          display: flex;
          align-items: center;
        }

        .col-title {
          min-height: 2.35rem;
          display: flex;
          align-items: flex-start;
          line-height: 1.3;
          margin-bottom: 0.25rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #F1F5F2;
        }

        .col-desc {
          flex: 1;
          min-height: 2.5rem;
          margin-bottom: 0.35rem;
          line-height: 1.5;
          font-size: 0.84rem;
          color: #B5C0B8;
        }

        .col-mini-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.15rem 0.45rem;
          border-radius: 3px;
          background: rgba(190, 220, 200, 0.08);
          color: #B5C0B8;
          align-self: flex-start;
          margin-top: auto;
          font-size: 10px;
        }

        .badge-dot {
          color: var(--color-lime);
        }

        .col-active-indicator {
          margin-top: auto;
          padding-top: 0.25rem;
          border-top: 1px dashed rgba(190, 220, 200, 0.1);
          opacity: 0.85;
          font-size: 10px;
          height: 18px;
          line-height: 18px;
          white-space: nowrap;
        }

        /* Deep Dive Pane */
        .step-deep-dive-pane {
          padding: 0.95rem 1.35rem;
          background: rgba(11, 36, 26, 0.3);
          min-height: 255px;
          box-sizing: border-box;
        }

        .deep-dive-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(190, 220, 200, 0.12);
          margin-bottom: 0.75rem;
          min-height: 28px;
          gap: 0.5rem;
          flex-wrap: nowrap;
        }

        .deep-dive-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .deep-dive-body {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 1.75rem;
          align-items: center;
          min-height: 195px;
        }

        .deep-dive-content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 195px;
        }

        .deep-dive-desc {
          color: #B5C0B8;
          font-size: 0.84rem;
          line-height: 1.55;
          max-width: 640px;
          min-height: 2.45rem;
          margin-bottom: 0.65rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .deep-dive-bullets {
          max-width: 100%;
          min-height: 4.45rem;
        }

        .deep-dive-action {
          margin-top: 0.85rem;
        }

        .deep-dive-illustration-col {
          width: 220px;
          min-width: 220px;
          max-width: 220px;
          height: 180px;
          justify-self: end;
          align-self: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .deep-dive-halftone-plate {
          border-radius: 4px;
          width: 220px;
          max-width: 220px;
          height: 180px;
          max-height: 180px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .steps-columns-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .step-grid-col:nth-child(2) {
            border-right: none;
          }

          .step-grid-col:nth-child(1),
          .step-grid-col:nth-child(2) {
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .step-deep-dive-pane {
            min-height: auto;
          }

          .deep-dive-header {
            flex-wrap: wrap;
            min-height: auto;
          }

          .deep-dive-body {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            min-height: auto;
          }

          .deep-dive-content-col {
            min-height: auto;
          }

          .deep-dive-desc {
            min-height: auto;
          }

          .deep-dive-bullets {
            min-height: auto;
          }

          .deep-dive-illustration-col {
            width: 220px;
            max-width: 220px;
            height: 180px;
            justify-self: start;
          }
        }

        @media (max-width: 640px) {
          .steps-columns-container {
            grid-template-columns: 1fr;
          }

          .step-grid-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }
        }
      `}</style>
    </section>
  );
}
