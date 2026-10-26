import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import HalftoneMosaic from './common/HalftoneMosaic';

const STAGES = [
  {
    num: '01',
    title: 'Educator Blueprint',
    keyword: 'Blueprint',
    subheading: 'Built for board standards',
    halftone: 'architecture',
  },
  {
    num: '02',
    title: 'Timed Simulation',
    keyword: 'Simulation',
    subheading: 'Practice under exam conditions',
    halftone: 'compass',
  },
  {
    num: '03',
    title: 'Step Evaluation',
    keyword: 'Precision',
    subheading: 'Step-by-step evaluation',
    halftone: 'optics',
  },
  {
    num: '04',
    title: 'Diagnostic Radar',
    keyword: 'Diagnosis',
    subheading: 'Targeted revision drills',
    halftone: 'geometry',
  },
];

const STAGE_RED_SHADES = [
  {
    label: 'Stage 01',
    activeBg: '#FF7B7B',
    border: '#FFA39E',
    activeGlow: '0 0 10px rgba(255, 123, 123, 0.75)',
    inactiveBg: 'rgba(255, 123, 123, 0.22)',
    inactiveBorder: 'rgba(255, 123, 123, 0.38)',
  },
  {
    label: 'Stage 02',
    activeBg: '#F5222D',
    border: '#FF4D4F',
    activeGlow: '0 0 10px rgba(245, 34, 45, 0.75)',
    inactiveBg: 'rgba(245, 34, 45, 0.22)',
    inactiveBorder: 'rgba(245, 34, 45, 0.38)',
  },
  {
    label: 'Stage 03',
    activeBg: '#BA121A',
    border: '#CF1322',
    activeGlow: '0 0 10px rgba(186, 18, 26, 0.8)',
    inactiveBg: 'rgba(186, 18, 26, 0.25)',
    inactiveBorder: 'rgba(186, 18, 26, 0.42)',
  },
  {
    label: 'Stage 04',
    activeBg: '#6B000B',
    border: '#8B0A14',
    activeGlow: '0 0 12px rgba(139, 10, 20, 0.85)',
    inactiveBg: 'rgba(107, 0, 11, 0.3)',
    inactiveBorder: 'rgba(139, 10, 20, 0.48)',
  },
];

export default function HowItWorksSection({ onOpenDemoExam }) {
  const [activeStage, setActiveStage] = useState(0);
  const [keywordText, setKeywordText] = useState(STAGES[0].keyword);

  const containerRef = useRef(null);
  const progressBarRefs = useRef([]);
  const keywordRef = useRef(null);
  const currentStageRef = useRef(0);
  const progressTweenRef = useRef(null);
  const headingTlRef = useRef(null);
  const isInteractingRef = useRef(false);

  // Synchronize ref with activeStage for callbacks
  useEffect(() => {
    currentStageRef.current = activeStage;
  }, [activeStage]);

  // Master stage transition sequence animating keyword and card progress
  const goToStage = useCallback((nextIdx) => {
    const prevIdx = currentStageRef.current;
    if (nextIdx === prevIdx && progressTweenRef.current?.isActive()) {
      return;
    }

    // Terminate existing progress and text animation immediately
    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
      progressTweenRef.current = null;
    }
    if (headingTlRef.current) {
      headingTlRef.current.kill();
      headingTlRef.current = null;
    }

    // Reset progress indicators on other cards
    progressBarRefs.current.forEach((bar, idx) => {
      if (bar && idx !== nextIdx) {
        gsap.set(bar, { scaleX: 0 });
      }
    });

    // Update active stage and keyword immediately without crossfade
    setActiveStage(nextIdx);
    setKeywordText(STAGES[nextIdx].keyword);
    if (keywordRef.current) {
      keywordRef.current.textContent = STAGES[nextIdx].keyword;
      gsap.set(keywordRef.current, { opacity: 1, y: 0 });
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const activeBar = progressBarRefs.current[nextIdx];
      if (activeBar) gsap.set(activeBar, { scaleX: 1 });
      return;
    }

    // Animate active card's progress indicator over the 4-second interval
    const activeBar = progressBarRefs.current[nextIdx];
    if (activeBar) {
      const pTween = gsap.fromTo(
        activeBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 4,
          ease: 'none',
          paused: isInteractingRef.current,
          onComplete: () => {
            const following = (nextIdx + 1) % STAGES.length;
            goToStage(following);
          },
        },
      );
      progressTweenRef.current = pTween;
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (keywordRef.current) {
      keywordRef.current.textContent = STAGES[0].keyword;
      gsap.set(keywordRef.current, { opacity: 1, y: 0 });
    }

    if (prefersReducedMotion) {
      setActiveStage(0);
      setKeywordText(STAGES[0].keyword);
      return;
    }

    const ctx = gsap.context(() => {
      goToStage(0);
    }, containerRef);

    return () => {
      if (progressTweenRef.current) progressTweenRef.current.kill();
      if (headingTlRef.current) headingTlRef.current.kill();
      ctx.revert();
    };
  }, [goToStage]);

  // Pause automatic loop while interacting with a card
  const handleCardMouseEnter = () => {
    isInteractingRef.current = true;
    if (progressTweenRef.current && !progressTweenRef.current.paused()) {
      progressTweenRef.current.pause();
    }
  };

  const handleCardMouseLeave = () => {
    isInteractingRef.current = false;
    if (progressTweenRef.current && progressTweenRef.current.paused()) {
      progressTweenRef.current.resume();
    }
  };

  const handleCardClick = (idx) => {
    goToStage(idx);
  };

  const handleCardKeyDown = (idx, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToStage(idx);
    }
  };

  return (
    <section
      className="editorial-how-section"
      id="how-it-works"
      ref={containerRef}
    >
      <div className="app-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-emerald font-bold tracking-wider">
              EXAM METHODOLOGY
            </span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-main">
              How Senior Examiners Grade — Rebuilt in Code
            </h2>
          </div>
        </div>
      </div>

      {/* Architectural Dotted Divider connecting directly to the vertical border lines */}
      <div className="editorial-dotted-divider" aria-hidden="true" />

      <div className="app-container">
        {/* Continuous Four-Column Structured Editorial Grid */}
        <div className="editorial-steps-grid">
          {/* Row 1: Four Equal Columns (Stage Heading + Muted Subheading) */}
          <div
            className="steps-columns-container"
            role="tablist"
            aria-label="Exam Methodology Stages"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            {STAGES.map((st, idx) => {
              const isActive = activeStage === idx;

              return (
                <div
                  key={st.num}
                  id={`stage-tab-${idx}`}
                  className={`step-grid-col ${isActive ? 'active-col' : ''}`}
                  onClick={() => handleCardClick(idx)}
                  onFocus={handleCardMouseEnter}
                  onBlur={handleCardMouseLeave}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${idx}`}
                  onKeyDown={(e) => handleCardKeyDown(idx, e)}
                  aria-label={`Stage ${st.num}: ${st.title} — ${st.subheading}`}
                >
                  {/* Subtle Dotted Halftone Texture Reveal */}
                  <div className="card-halftone-texture" aria-hidden="true" />

                  {/* Vertically Centered Stage Heading & Smaller Subheading */}
                  <div className="col-card-content">
                    <h3 className="col-title">{st.title}</h3>
                    <p className="col-subheading">{st.subheading}</p>
                  </div>

                  {/* Coordinated Lime-Green Bottom Border Progress Indicator */}
                  <div className="card-progress-track" aria-hidden="true">
                    <div
                      ref={(el) => {
                        progressBarRefs.current[idx] = el;
                      }}
                      className="card-progress-bar"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Editorial Detail Panel (Expanded Main Keyword Across 3 Columns) */}
          <div
            className="step-deep-dive-pane"
            role="region"
            aria-label="Active Stage Detail"
          >
            <div className="deep-dive-single-panel">
              {/* Prominent Bold Keyword Spanning First 3 Columns */}
              <div className="deep-dive-panel-content">
                <div className="editorial-heading-container">
                  <h2 ref={keywordRef} className="editorial-stage-keyword">
                    {keywordText}
                  </h2>
                </div>
              </div>

              {/* Stationary Technical Illustration (Fixed in position, size, and container) */}
              <div className="deep-dive-illustration-col">
                <HalftoneMosaic
                  subject={STAGES[activeStage].halftone}
                  variant="plate"
                  compact={true}
                  aspectRatio="16/10"
                  className="deep-dive-halftone-plate"
                />
              </div>
            </div>
          </div>


        </div>
        {/* 4 Stage Dots Below Row 2 (Progressively Darker Red Tones) */}
        <div
          className="stage-dots-bar"
          role="tablist"
          aria-label="Exam Methodology Stage Progression"
        >
          {STAGE_RED_SHADES.map((shade, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCardClick(idx)}
                className={`stage-dot-btn ${isActive ? 'active-dot' : ''}`}
                title={`${shade.label}: ${STAGES[idx].title}`}
                aria-label={`${shade.label}: ${STAGES[idx].title}`}
                aria-selected={isActive}
                style={{
                  backgroundColor: isActive
                    ? shade.activeBg
                    : shade.inactiveBg,
                  borderColor: isActive ? shade.border : shade.inactiveBorder,
                  boxShadow: isActive ? shade.activeGlow : 'none',
                  width: isActive ? '24px' : '9px',
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .editorial-how-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-how-section .editorial-section-header {
          margin-bottom: 0;
        }

        /* Architectural Dotted Divider connecting directly to outer frame vertical borders */
        .editorial-dotted-divider {
          width: 100%;
          height: 0;
          border-top: 1px dotted rgba(190, 220, 200, 0.2);
          margin-top: clamp(1.15rem, 1.8vw, 1.5rem);
          margin-bottom: clamp(1.75rem, 2.5vw, 2.25rem);
        }

        @media (max-width: 640px) {
          .editorial-dotted-divider {
            border-top-color: rgba(190, 220, 200, 0.14);
            margin-top: 1rem;
            margin-bottom: 1.5rem;
          }
        }

        .editorial-steps-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Row 1: 4 Equal-Sized Columns (Headings & Muted Subheadings) */
        .steps-columns-container {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid rgba(190, 220, 200, 0.14);
        }

        .step-grid-col {
          position: relative;
          overflow: hidden;
          padding: clamp(1.15rem, 1.8vw, 1.55rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-height: 112px;
          height: 112px;
          background: rgba(7, 17, 13, 0.45);
          transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          box-sizing: border-box;
          user-select: none;
        }

        .step-grid-col:last-child {
          border-right: none;
        }

        .step-grid-col.active-col {
          background: rgba(14, 38, 28, 0.7);
        }

        /* Halftone Texture Overlay on Active Card */
        .card-halftone-texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(190, 220, 200, 0.12) 1px, transparent 1px);
          background-size: 7px 7px;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 0;
        }

        .step-grid-col.active-col .card-halftone-texture {
          opacity: 1;
          background-image: radial-gradient(rgba(213, 243, 106, 0.16) 1px, transparent 1px);
        }

        /* Vertically Centered Card Content Layer */
        .col-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }

        .col-title {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(0.925rem, 1.1vw, 1.05rem);
          font-weight: 800;
          color: #B5C0B8;
          line-height: 1.3;
          margin: 0 0 0.35rem 0;
          transition: color 0.3s ease;
        }

        .step-grid-col.active-col .col-title {
          color: #31d813ff !important;
          font-weight: 800;
        }

        .col-subheading {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(0.725rem, 0.85vw, 0.82rem);
          font-weight: 400;
          color: #7E8D82;
          line-height: 1.35;
          margin: 0;
          transition: color 0.3s ease;
        }

        .step-grid-col.active-col .col-subheading {
          color: #A3B5A8;
        }

        /* Coordinated Lime Progress Bar at Card Bottom */
        .card-progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2.5px;
          background: rgba(190, 220, 200, 0.08);
          overflow: hidden;
          z-index: 2;
        }

        .card-progress-bar {
          width: 100%;
          height: 100%;
          background: var(--accent-lime, #D5F36A);
          box-shadow: 0 0 10px rgba(213, 243, 106, 0.7);
          transform-origin: left center;
          transform: scaleX(0);
        }

        .step-grid-col:focus-visible {
          outline: 2px solid var(--accent-lime, #D5F36A);
          outline-offset: -2px;
        }

        /* Row 2: Editorial Detail Panel (Spacious, Fixed Dimensions & Stationary) */
        .step-deep-dive-pane {
          padding: 0;
          background: rgba(11, 36, 26, 0.3);
          box-sizing: border-box;
          position: relative;
          min-height: 220px;
        }

        .deep-dive-single-panel {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
          width: 100%;
          min-height: 220px;
        }

        /* Keyword container occupies the full space spanning the first 3 columns */
        .deep-dive-panel-content {
          grid-column: 1 / 4;
          display: flex;
          align-items: center;
          min-width: 0;
          width: 100%;
          padding: clamp(1.8rem, 3vw, 2.5rem) clamp(1.15rem, 1.8vw, 1.55rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          box-sizing: border-box;
        }

        /* Container for keyword spanning across the first 3 columns */
        .editorial-heading-container {
          display: flex;
          align-items: center;
          width: 100%;
          overflow: visible;
        }

        /* Bold Keyword in Green Rectangle (High specificity to override [data-theme="dark"] h2 !important) */
        h2.editorial-stage-keyword,
        [data-theme="dark"] h2.editorial-stage-keyword,
        .editorial-how-section [data-theme="dark"] h2.editorial-stage-keyword {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(3.2rem, 6.2vw, 5.25rem);
          font-weight: 800;
          font-style: normal;
          line-height: 1;
          letter-spacing: -0.025em;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          background: #3aae78 !important;
          padding: clamp(0.35rem, 0.7vw, 0.6rem) clamp(0.9rem, 1.6vw, 1.5rem);
          border-radius: 4px;
          display: inline-block;
          box-sizing: border-box;
          margin: 0;
          white-space: nowrap;
        }

        /* Stationary Mosaic Image Container in Column 4 */
        .deep-dive-illustration-col {
          grid-column: 4 / 5;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.25rem, 2vw, 1.75rem);
          box-sizing: border-box;
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

        /* 4 Stage Dots Below Row 2 */
        .stage-dots-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.5rem 1.05rem;

  background: transparent;
   transform: translateY(40px);
}

        .stage-dot-btn {
          height: 9px;
          border-radius: 999px;
          border-width: 1px;
          border-style: solid;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stage-dot-btn:focus-visible {
          outline: 2px solid #FF7875;
          outline-offset: 2px;
        }

        /* Responsive Layout */
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

          .deep-dive-single-panel {
            grid-template-columns: 1fr;
            gap: 0;
            min-height: auto;
          }

          .deep-dive-panel-content {
            grid-column: 1 / -1;
            border-right: none;
            border-bottom: 1px dotted rgba(190, 220, 200, 0.28);
            padding: clamp(1.5rem, 3vw, 2rem) 1.25rem;
          }

          .editorial-heading-container {
            min-height: auto;
            height: auto;
            margin-bottom: 0;
          }

          .editorial-stage-keyword {
            font-size: clamp(2.2rem, 5.5vw, 3.25rem);
            white-space: normal;
          }

          .deep-dive-illustration-col {
            grid-column: 1 / -1;
            width: 100%;
            padding: 1.5rem 1.25rem 2rem;
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .steps-columns-container {
            grid-template-columns: 1fr;
          }

          .step-grid-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
            min-height: 84px;
            height: auto;
            padding: 1.15rem 1.15rem;
          }

          .editorial-stage-keyword {
            font-size: 2.25rem;
          }
        }

        /* Prefers-reduced-motion: disable transitions and auto-loop */
        @media (prefers-reduced-motion: reduce) {
          .step-grid-col,
          .card-halftone-texture,
          .editorial-stage-keyword {
            transition: none !important;
            animation: none !important;
          }

          .card-progress-bar {
            transform: scaleX(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
