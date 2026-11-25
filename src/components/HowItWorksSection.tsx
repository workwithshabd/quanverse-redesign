import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import HalftoneMosaic from './common/HalftoneMosaic';

export interface HowItWorksSectionProps {
  onOpenDemoExam?: () => void;
}

interface StageItem {
  num: string;
  title: string;
  keyword: string;
  subheading: string;
  halftone: 'architecture' | 'compass' | 'optics' | 'geometry';
}

const STAGES: StageItem[] = [
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

export default function HowItWorksSection({ onOpenDemoExam: _onOpenDemoExam }: HowItWorksSectionProps) {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [keywordText, setKeywordText] = useState<string>(STAGES[0].keyword);

  const containerRef = useRef<HTMLElement | null>(null);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const keywordRef = useRef<HTMLHeadingElement | null>(null);
  const currentStageRef = useRef<number>(0);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const headingTlRef = useRef<gsap.core.Timeline | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  // Synchronize ref with activeStage for callbacks
  useEffect(() => {
    currentStageRef.current = activeStage;
  }, [activeStage]);

  const goToStageRef = useRef<(idx: number) => void>(() => {});

  // Master stage transition sequence animating keyword and card progress
  const goToStage = useCallback((nextIdx: number) => {
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
            goToStageRef.current(following);
          },
        },
      );
      progressTweenRef.current = pTween;
    }
  }, []);

  useEffect(() => {
    goToStageRef.current = goToStage;
  }, [goToStage]);

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

  const handleCardClick = (idx: number) => {
    goToStage(idx);
  };

  const handleCardKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToStage(idx);
    }
  };

  return (
    <section
      className="editorial-how-section relative py-12 sm:py-16 bg-transparent"
      id="how-it-works"
      ref={containerRef}
    >
      <div className="app-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-[#748d78] mb-2">
            <span className="text-[#43c98b] font-bold tracking-wider">
              EXAM METHODOLOGY
            </span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-2xl sm:text-3xl font-serif font-bold text-white">
              How Senior Examiners Grade — Rebuilt in Code
            </h2>
          </div>
        </div>
      </div>

      {/* Architectural Dotted Divider */}
      <div className="w-full h-0 border-t border-dotted border-[#bedcc8]/20 my-6 sm:my-8" aria-hidden="true" />

      <div className="app-container">
        {/* Continuous Four-Column Structured Editorial Grid */}
        <div className="relative border border-[#bedcc8]/20 bg-[#07110d]/50 backdrop-blur-md rounded-xl overflow-hidden">
          {/* Row 1: Four Equal Columns */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#bedcc8]/15"
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
                  className={`relative p-5 cursor-pointer flex flex-col justify-center min-h-[112px] transition-all border-r last:border-r-0 border-[#bedcc8]/15 outline-none select-none ${
                    isActive ? 'bg-[#0e261c]/80' : 'bg-[#07110d]/40 hover:bg-[#07110d]/70'
                  }`}
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
                  <div className="relative z-10 flex flex-col justify-center w-full">
                    <h3 className={`text-sm sm:text-base font-bold mb-1 transition-colors ${isActive ? 'text-[#d5f36a]' : 'text-[#b5c0b8]'}`}>
                      {st.title}
                    </h3>
                    <p className={`text-xs transition-colors ${isActive ? 'text-[#a3b5a8]' : 'text-[#7e8d82]'}`}>
                      {st.subheading}
                    </p>
                  </div>

                  {/* Coordinated Bottom Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#bedcc8]/10 overflow-hidden" aria-hidden="true">
                    <div
                      ref={(el) => {
                        progressBarRefs.current[idx] = el;
                      }}
                      className="w-full h-full bg-[#d5f36a] shadow-[0_0_10px_rgba(213,243,106,0.7)] origin-left scale-x-0"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Editorial Detail Panel */}
          <div
            className="grid grid-cols-1 lg:grid-cols-4 bg-[#0b241a]/30 min-h-[220px]"
            role="region"
            aria-label="Active Stage Detail"
          >
            {/* Prominent Bold Keyword Spanning First 3 Columns */}
            <div className="lg:col-span-3 flex items-center p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#bedcc8]/15">
              <h2
                ref={keywordRef}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#07110d] bg-[#43c98b] px-4 sm:px-6 py-2 rounded-lg inline-block tracking-tight"
              >
                {keywordText}
              </h2>
            </div>

            {/* Stationary Technical Illustration in Column 4 */}
            <div className="lg:col-span-1 flex items-center justify-center p-6">
              <HalftoneMosaic
                subject={STAGES[activeStage].halftone}
                variant="plate"
                compact={true}
                aspectRatio="16/10"
                className="w-full max-w-[220px] h-[180px] rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* 4 Stage Dots Below Row 2 */}
        <div
          className="flex justify-center items-center gap-2.5 mt-8"
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
                className="h-[9px] rounded-full border cursor-pointer p-0 outline-none transition-all duration-300"
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
    </section>
  );
}
