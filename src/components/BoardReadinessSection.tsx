import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  MoveHorizontal
} from 'lucide-react';

export interface BoardReadinessSectionProps {
  onOpenDemoExam?: () => void;
}

interface SubjectItem {
  key: 'maths' | 'science' | 'socialScience' | 'english';
  name: string;
  sub: string;
  initialAngle: number;
  speed: number;
  orbitRadius: number;
  color: string;
}

const SUBJECT_CONFIG: SubjectItem[] = [
  {
    key: 'maths',
    name: 'Mathematics',
    sub: 'Quadratics & Trig',
    initialAngle: 215, // Quadrant 3
    speed: 0.1,        // Synchronized orbital speed: maintains harmonic quadrant spacing
    orbitRadius: 75,
    color: '#D5F36A',
  },
  {
    key: 'science',
    name: 'Science',
    sub: 'Physics, Chem, Bio',
    initialAngle: 325, // Quadrant 4
    speed: 0.1,
    orbitRadius: 110,
    color: '#43C98B',
  },
  {
    key: 'socialScience',
    name: 'Social Science',
    sub: 'Hist, Civics, Geo',
    initialAngle: 35,  // Quadrant 1
    speed: 0.1,
    orbitRadius: 145,
    color: '#CBE85B',
  },
  {
    key: 'english',
    name: 'English Literature',
    sub: 'RTC & Analytical',
    initialAngle: 145, // Quadrant 2
    speed: 0.1,
    orbitRadius: 180,
    color: '#5AE0A2',
  },
];

const ORBIT_RINGS = [75, 110, 145, 180];
const RING_SCORES: Record<number, number> = {
  75: 72,
  110: 82,
  145: 90,
  180: 98,
};

/* ── CONFIGURATION FOR TOP METRIC COLUMNS ── */
const METRIC_COLUMNS = [
  {
    id: 'ocr',
    prefix: '',
    num: '99.4',
    unit: '%',
    label: 'OCR SYMBOL ACCURACY',
    defaultColor: '#43C98B',
  },
  {
    id: 'step',
    prefix: '< ',
    num: '60',
    unit: 'SEC',
    label: 'AI STEP EVALUATION',
    defaultColor: '#43C98B',
  },
];

export default function BoardReadinessSection({ onOpenDemoExam }: BoardReadinessSectionProps) {
  const [board, setBoard] = useState<'CBSE' | 'ICSE'>('CBSE');
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>({
    maths: 78,
    science: 84,
    socialScience: 88,
    english: 92
  });
  const [subjectRadii, setSubjectRadii] = useState<Record<string, number>>({
    maths: 75,
    science: 110,
    socialScience: 145,
    english: 180
  });
  const [draggingSubject, setDraggingSubject] = useState<string | null>(null);

  // Orbital angles tracked in state for smooth continuous revolution without render-ref access
  const [angles, setAngles] = useState<Record<string, number>>({
    maths: 215,
    science: 325,
    socialScience: 35,
    english: 145,
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Synchronous weighted average for instantaneous UI feedback
  const scoreValues = Object.values(subjectScores);
  const currentScore = scoreValues.length
    ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
    : 85;

  // Diagram geometry constants
  const cx = 310;
  const cy = 200;

  // ── GSAP SOLAR SYSTEM ORBITAL REVOLUTION ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frameCount = 0;

    // Orbital revolution ticker: all planets orbit continuously in collision-free lockstep
    const onTick = () => {
      frameCount++;
      // Throttle state update to every 2 frames for smooth 30-60fps orbit with zero jank
      if (frameCount % 2 === 0) {
        setAngles(prev => {
          const next: Record<string, number> = {};
          for (let i = 0; i < SUBJECT_CONFIG.length; i++) {
            const sub = SUBJECT_CONFIG[i];
            next[sub.key] = ((prev[sub.key] ?? sub.initialAngle) + sub.speed * 2) % 360;
          }
          return next;
        });
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  // ── STRICT RADIAL DRAGGING (INWARD/OUTWARD ONLY, SNAPS TO RING) ──
  const handlePointerDown = (subjectKey: string, e: React.PointerEvent<SVGCircleElement>) => {
    e.preventDefault();
    setDraggingSubject(subjectKey);
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingSubject || !svgRef.current) return;

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPoint = pt.matrixTransform(ctm.inverse());

    // Distance from the sun center to pointer (controls orbit radius)
    const dx = svgPoint.x - cx;
    const dy = svgPoint.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Clamped distance: minimum 62px (cannot enter sun or halo), maximum 188px
    const clampedDist = Math.max(62, Math.min(188, dist));

    setSubjectRadii(prev => ({
      ...prev,
      [draggingSubject]: clampedDist
    }));

    // Continuous confidence indicator update while dragging
    const norm = (clampedDist - 62) / (188 - 62);
    const newPct = Math.round(55 + norm * 43);

    setSubjectScores(prev => ({
      ...prev,
      [draggingSubject]: Math.max(50, Math.min(100, newPct))
    }));
  }, [draggingSubject, cx, cy]);

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (draggingSubject) {
      setSubjectRadii(prev => {
        const currentDist = prev[draggingSubject] ?? 75;
        // Snap to nearest available orbital ring
        const targetRing = ORBIT_RINGS.reduce((acc, curr) =>
          Math.abs(curr - currentDist) < Math.abs(acc - currentDist) ? curr : acc
        );

        // Check if another subject is currently on targetRing to prevent ring collision
        const occupyingSubject = Object.keys(prev).find(
          key => key !== draggingSubject && prev[key] === targetRing
        );

        const oldRing = prev[draggingSubject];
        const nextRadii = { ...prev, [draggingSubject]: targetRing };

        // Swap rings so each planet has a unique orbit
        if (occupyingSubject && oldRing !== undefined) {
          nextRadii[occupyingSubject] = oldRing;
        }

        setSubjectScores(scorePrev => {
          const scoreUpdate = {
            ...scorePrev,
            [draggingSubject]: RING_SCORES[targetRing] ?? scorePrev[draggingSubject]
          };
          if (occupyingSubject && oldRing !== undefined) {
            scoreUpdate[occupyingSubject] = RING_SCORES[oldRing] ?? scorePrev[occupyingSubject];
          }
          return scoreUpdate;
        });

        return nextRadii;
      });

      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch { }
      setDraggingSubject(null);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (subjectKey: string, e: React.KeyboardEvent) => {
    const curRadius = subjectRadii[subjectKey] || 75;
    const curIndex = ORBIT_RINGS.indexOf(curRadius) !== -1
      ? ORBIT_RINGS.indexOf(curRadius)
      : ORBIT_RINGS.reduce((bestIdx, r, idx, arr) =>
        Math.abs(r - curRadius) < Math.abs(arr[bestIdx] - curRadius) ? idx : bestIdx, 0);

    let nextIndex = curIndex;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'PageUp') {
      nextIndex = Math.min(ORBIT_RINGS.length - 1, curIndex + 1);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'PageDown') {
      nextIndex = Math.max(0, curIndex - 1);
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = ORBIT_RINGS.length - 1;
    }

    if (nextIndex !== curIndex) {
      e.preventDefault();
      const targetRing = ORBIT_RINGS[nextIndex];
      setSubjectRadii(prev => ({ ...prev, [subjectKey]: targetRing }));
      setSubjectScores(prev => ({ ...prev, [subjectKey]: RING_SCORES[targetRing] }));
    }
  };

  return (
    <section className="editorial-readiness-section relative py-12 sm:py-16 bg-transparent" id="readiness">
      <div className="app-container">

        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-[#748d78] mb-2">
            <span className="text-[#d5f36a] font-bold">DIAGNOSTIC ENGINE</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-2xl sm:text-3xl font-serif font-bold text-white">
              Calculate Your Board Readiness Index
            </h2>
          </div>
        </div>

      </div>

      {/* Dotted Horizontal Divider */}
      <div className="w-full h-0 border-t border-dotted border-[#bedcc8]/20 my-6 sm:my-8" aria-hidden="true" />

      <div className="app-container">

        {/* Master Editorial Grid Architecture */}
        <div className="border border-[#bedcc8]/20 bg-[#07110d]/50 backdrop-blur-md rounded-2xl overflow-hidden">

          {/* Top Architectural Metrics & Graphic Panels Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#bedcc8]/15" role="region" aria-label="Key Performance Indicators">
            {METRIC_COLUMNS.map((item) => (
              <div
                key={item.id}
                className="p-5 border-r border-[#bedcc8]/15 flex flex-col justify-center"
                tabIndex={0}
                role="region"
                aria-label={`${item.label}: ${item.prefix || ''}${item.num} ${item.unit}`}
              >
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#43c98b]">
                  {item.prefix && <span className="text-sm mr-1">{item.prefix}</span>}
                  <span>{item.num}</span>
                  <span className="text-sm ml-1">{item.unit}</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#748d78] mt-1">{item.label}</span>
              </div>
            ))}

            {/* Column 3: Halftone Image Panel */}
            <div className="hidden lg:flex items-center justify-center p-2 border-r border-[#bedcc8]/15 bg-[#0c1c15]/50 overflow-hidden" aria-hidden="true">
              <img
                src="/assets/readiness/metric-halftone-1.png?v=2"
                alt=""
                className="w-full h-full object-cover max-h-20 opacity-70"
                loading="lazy"
              />
            </div>

            {/* Column 4: Halftone Image Panel */}
            <div className="hidden lg:flex items-center justify-center p-2 bg-[#0c1c15]/50 overflow-hidden" aria-hidden="true">
              <img
                src="/assets/readiness/metric-halftone-2.png?v=2"
                alt=""
                className="w-full h-full object-cover max-h-20 opacity-70"
                loading="lazy"
              />
            </div>
          </div>

          {/* Interactive Simulator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">

            {/* Left Column: Interactive Solar System Diagram */}
            <div className="lg:col-span-8 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#bedcc8]/15 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-[#276447]/20 flex-wrap gap-2">
                <div>
                  <span className="text-[#748d78] text-[10px] uppercase tracking-wider">TARGET SYLLABUS</span>
                  <div className="text-sm font-medium text-white mt-0.5">Select Examination Board</div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs rounded-md font-mono border transition-all cursor-pointer ${
                      board === 'CBSE' 
                        ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' 
                        : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'
                    }`}
                    onClick={() => setBoard('CBSE')}
                  >
                    CBSE Class 10
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs rounded-md font-mono border transition-all cursor-pointer ${
                      board === 'ICSE' 
                        ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' 
                        : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'
                    }`}
                    onClick={() => setBoard('ICSE')}
                  >
                    ICSE Class 10
                  </button>
                </div>
              </div>

              {/* Solar System Map Container */}
              <div className="relative w-full py-4 flex flex-col items-center">
                <svg
                  ref={svgRef}
                  className="w-full max-w-[620px] h-auto select-none overflow-visible"
                  viewBox="0 0 620 400"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <defs>
                    <clipPath id="sunSphereClip">
                      <circle cx={cx} cy={cy} r="26" />
                    </clipPath>

                    <radialGradient id="sunSphere3D" cx="36%" cy="32%" r="68%" fx="30%" fy="26%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="12%" stopColor="#F4FFB0" stopOpacity="1" />
                      <stop offset="38%" stopColor="#D5F36A" stopOpacity="1" />
                      <stop offset="66%" stopColor="#91C936" stopOpacity="1" />
                      <stop offset="88%" stopColor="#245B37" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0B2317" stopOpacity="1" />
                    </radialGradient>

                    <radialGradient id="sunAtmosphereHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D5F36A" stopOpacity="0.32" />
                      <stop offset="40%" stopColor="#43C98B" stopOpacity="0.16" />
                      <stop offset="70%" stopColor="#144C32" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#07110D" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="sunSpecularGrad" cx="35%" cy="32%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                      <stop offset="35%" stopColor="#F4FFB0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D5F36A" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="sunDepthShadow" cx="74%" cy="74%" r="62%">
                      <stop offset="0%" stopColor="#081A10" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#16432B" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#16432B" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Concentric Solar Orbits */}
                  {ORBIT_RINGS.map((r, i) => (
                    <circle
                      key={`orbit-${i}`}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      stroke="rgba(67, 201, 139, 0.16)"
                      strokeWidth="1.2"
                      strokeDasharray="3 5"
                    />
                  ))}

                  {/* Connecting lines from Sun center to planets */}
                  <g style={{ pointerEvents: 'none' }}>
                    {SUBJECT_CONFIG.map((subject) => {
                      const curAngle = angles[subject.key] ?? subject.initialAngle;
                      const rad = (curAngle * Math.PI) / 180;
                      const ux = Math.cos(rad);
                      const uy = Math.sin(rad);
                      const rPlanet = subjectRadii[subject.key] ?? subject.orbitRadius;
                      const px = cx + rPlanet * ux;
                      const py = cy + rPlanet * uy;
                      const isDragging = draggingSubject === subject.key;

                      return (
                        <g key={`conn-${subject.key}`}>
                          <line
                            x1={cx}
                            y1={cy}
                            x2={px}
                            y2={py}
                            stroke={subject.color}
                            strokeWidth={isDragging ? 3.5 : 2}
                            strokeOpacity={isDragging ? 0.35 : 0.14}
                          />
                          <line
                            x1={cx}
                            y1={cy}
                            x2={px}
                            y2={py}
                            stroke={subject.color}
                            strokeWidth={isDragging ? 1.6 : 1.1}
                            strokeOpacity={isDragging ? 0.75 : 0.32}
                          />
                          <circle
                            cx={px}
                            cy={py}
                            r="3.5"
                            fill={subject.color}
                            fillOpacity={isDragging ? 0.9 : 0.65}
                          />
                        </g>
                      );
                    })}
                  </g>

                  {/* Realistic 3D Sun */}
                  <g style={{ pointerEvents: 'none' }}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="40"
                      fill="url(#sunAtmosphereHalo)"
                    />
                    <g clipPath="url(#sunSphereClip)">
                      <circle cx={cx} cy={cy} r="26" fill="url(#sunSphere3D)" />
                      <circle cx={cx} cy={cy} r="26" fill="url(#sunDepthShadow)" />
                      <ellipse
                        cx={cx - 8}
                        cy={cy - 8}
                        rx="13"
                        ry="8"
                        fill="url(#sunSpecularGrad)"
                        transform={`rotate(-35, ${cx - 8}, ${cy - 8})`}
                      />
                      <circle cx={cx - 10} cy={cy - 10} r="2.8" fill="#FFFFFF" opacity="0.8" />
                    </g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="26"
                      fill="none"
                      stroke="#F4FFB0"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                  </g>

                  {/* 4 Revolving Subject Planets */}
                  {SUBJECT_CONFIG.map((subject) => {
                    const score = subjectScores[subject.key] || 0;
                    const curAngle = angles[subject.key] ?? subject.initialAngle;
                    const rad = (curAngle * Math.PI) / 180;
                    const ux = Math.cos(rad);
                    const uy = Math.sin(rad);

                    const rNode = subjectRadii[subject.key] ?? subject.orbitRadius;
                    const xNode = cx + rNode * ux;
                    const yNode = cy + rNode * uy;

                    const isRight = ux >= 0;
                    const labelX = xNode + (isRight ? 18 : -18);
                    const labelY = yNode + (uy >= 0 ? 5 : -5);
                    const textAnchor = isRight ? 'start' : 'end';

                    const isDragging = draggingSubject === subject.key;

                    return (
                      <g key={subject.key}>
                        <g
                          tabIndex={0}
                          role="slider"
                          aria-valuenow={score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${subject.name} Mastery`}
                          onKeyDown={(e) => handleKeyDown(subject.key, e)}
                        >
                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="26"
                            fill="transparent"
                            style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                            onPointerDown={(e) => handlePointerDown(subject.key, e)}
                          />

                          <circle
                            cx={xNode}
                            cy={yNode}
                            r={isDragging ? 16 : 11}
                            fill={subject.color}
                            fillOpacity={isDragging ? 0.32 : 0.12}
                            stroke={subject.color}
                            strokeWidth="1"
                            strokeOpacity={isDragging ? 0.8 : 0.35}
                            style={{ pointerEvents: 'none' }}
                          />

                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="7.5"
                            fill="#07110D"
                            stroke={subject.color}
                            strokeWidth="2.2"
                            style={{ pointerEvents: 'none' }}
                          />

                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="2.8"
                            fill={subject.color}
                            style={{ pointerEvents: 'none' }}
                          />
                        </g>

                        <g style={{ pointerEvents: 'none' }}>
                          <text
                            x={labelX}
                            y={labelY - 5}
                            textAnchor={textAnchor}
                            className="text-xs font-sans font-medium"
                            fill="#F1F5F2"
                          >
                            {subject.name}
                          </text>

                          <text
                            x={labelX}
                            y={labelY + 9}
                            textAnchor={textAnchor}
                            className="text-[11px] font-mono font-bold"
                            fill={subject.color}
                          >
                            {score}% CONF
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#748d78] mt-2">
                  <MoveHorizontal size={13} className="text-[#d5f36a] shrink-0" />
                  <span>Drag planets along radial rays • Snaps to nearest orbital ring</span>
                </div>
              </div>
            </div>

            {/* Right Column: Diagnostic Output & Recommendation Pane */}
            <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between gap-5 bg-[#07110d]/40">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#d5f36a] font-semibold">PREDICTIVE ENGINE</span>
                <span className="text-[#748d78]">{board} 2027</span>
              </div>

              {/* Circular Readiness Gauge */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center my-2" role="img" aria-label={`Readiness gauge showing ${currentScore}%`}>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 104 104">
                  <circle
                    cx="52"
                    cy="52"
                    r="44"
                    fill="none"
                    stroke="#163a2a"
                    strokeWidth="7"
                  />
                  <circle
                    cx="52"
                    cy="52"
                    r="44"
                    fill="none"
                    stroke="#d5f36a"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - currentScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold font-mono text-white">{currentScore}%</span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#748d78]">READINESS</span>
                </div>
              </div>

              {/* Predicted Marks Range */}
              <div className="bg-[#07110d] border border-[#276447]/30 rounded-xl p-3 text-center">
                <div className="text-[10px] font-mono text-[#748d78] uppercase tracking-wider">PREDICTED RANGE</div>
                <div className="text-lg font-mono font-bold text-[#d5f36a] mt-0.5">
                  {Math.max(60, currentScore - 4)}% — {Math.min(99, currentScore + 3)}%
                </div>
              </div>

              {/* Focus Areas */}
              <div className="bg-[#07110d] border border-[#276447]/30 rounded-xl p-3 font-sans text-xs">
                <div className="font-mono text-[10px] text-[#748d78] uppercase tracking-wider mb-1.5 font-bold">FOCUS AREAS</div>
                <div className="text-[#b5c0b8] mb-1">Quadratic step loss in Math</div>
                <div className="text-[#b5c0b8]">Optics derivations in Science</div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-full py-3.5 px-6 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
                onClick={onOpenDemoExam}
              >
                <span className="button__flair" aria-hidden="true" />
                <span>Take Mock Exam</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
