import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  MoveHorizontal
} from 'lucide-react';

const SUBJECT_CONFIG = [
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
const RING_SCORES = {
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

export default function BoardReadinessSection({ onOpenDemoExam }) {
  const [board, setBoard] = useState('CBSE');
  const [subjectScores, setSubjectScores] = useState({
    maths: 78,
    science: 84,
    socialScience: 88,
    english: 92
  });
  const [subjectRadii, setSubjectRadii] = useState({
    maths: 75,
    science: 110,
    socialScience: 145,
    english: 180
  });
  const [draggingSubject, setDraggingSubject] = useState(null);

  // Orbital angles tracked in ref for smooth continuous GSAP ticker updates
  const anglesRef = useRef({
    maths: 215,
    science: 325,
    socialScience: 35,
    english: 145,
  });

  // State trigger to re-render SVG positions during animation
  const [, setFrameTick] = useState(0);

  const svgRef = useRef(null);

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
      SUBJECT_CONFIG.forEach(sub => {
        anglesRef.current[sub.key] = (anglesRef.current[sub.key] + sub.speed) % 360;
      });
      setFrameTick(frameCount);
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  // ── STRICT RADIAL DRAGGING (INWARD/OUTWARD ONLY, SNAPS TO RING) ──
  const handlePointerDown = (subjectKey, e) => {
    e.preventDefault();
    setDraggingSubject(subjectKey);
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = useCallback((e) => {
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

  const handlePointerUp = (e) => {
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

        // Swap rings so each planet has a unique orbit: no two planets ever share a ring!
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
        e.target.releasePointerCapture(e.pointerId);
      } catch { }
      setDraggingSubject(null);
    }
  };

  // Keyboard accessibility (Arrow keys step through the 4 orbital rings)
  const handleKeyDown = (subjectKey, e) => {
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
    <section className="editorial-readiness-section" id="readiness">
      <div className="app-container">

        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-lime font-bold">DIAGNOSTIC ENGINE</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-main">
              Calculate Your Board Readiness Index
            </h2>
          </div>
        </div>

      </div>

      {/* Dotted Horizontal Divider connecting directly to the vertical border lines */}
      <div className="editorial-dotted-divider" aria-hidden="true" />

      <div className="app-container">

        {/* Master Editorial Grid Architecture */}
        <div className="editorial-readiness-grid">

          {/* Top Architectural Metrics & Graphic Panels Ribbon */}
          <div className="metrics-ribbon-row" role="region" aria-label="Key Performance Indicators">
            {METRIC_COLUMNS.map((item) => (
              <div
                key={item.id}
                className={`metric-ribbon-cell metric-cell-${item.id}`}
                tabIndex={0}
                role="region"
                aria-label={`${item.label}: ${item.prefix || ''}${item.num} ${item.unit}`}
              >
                <div className="metric-cell-content">
                  <div
                    className="metric-val"
                    style={{ color: item.defaultColor }}
                  >
                    {item.prefix && <span className="metric-val-sym">{item.prefix}</span>}
                    <span className="metric-val-num">{item.num}</span>
                    <span className="metric-val-unit">{item.unit}</span>
                  </div>
                  <span className="metric-lbl">{item.label}</span>
                </div>
              </div>
            ))}

            {/* Column 3: Halftone Image Panel (no text, no hover effect) */}
            <div className="metric-ribbon-cell metric-ribbon-cell-image" aria-hidden="true">
              <img
                src="/assets/readiness/metric-halftone-1.png?v=2"
                alt=""
                className="metric-image-media"
                loading="lazy"
              />
            </div>

            {/* Column 4: Halftone Image Panel (no text, no hover effect) */}
            <div className="metric-ribbon-cell metric-ribbon-cell-image" aria-hidden="true">
              <img
                src="/assets/readiness/metric-halftone-2.png?v=2"
                alt=""
                className="metric-image-media"
                loading="lazy"
              />
            </div>
          </div>

          {/* Interactive Simulator Grid (Left: Solar System, Right: Diagnostics) */}
          <div className="simulator-grid-row">

            {/* Left Column: Interactive Solar System Diagram */}
            <div className="sim-col-inputs">
              <div className="inputs-top-bar font-mono text-xs">
                <div>
                  <span className="text-muted uppercase tracking-wider">TARGET SYLLABUS</span>
                  <div className="text-sm font-medium text-main mt-0.5">Select Examination Board</div>
                </div>

                <div className="board-toggle-group">
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

              {/* Solar System Map Container */}
              <div className="radial-map-wrapper">
                <svg
                  ref={svgRef}
                  className="radial-diagram-svg"
                  viewBox="0 0 620 400"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <defs>
                    {/* Clip Path for the 3D Sphere body */}
                    <clipPath id="sunSphereClip">
                      <circle cx={cx} cy={cy} r="26" />
                    </clipPath>

                    {/* 3D Curved Surface Radial Gradient */}
                    {/* Light source positioned at upper-left (cx="36%", cy="32%") */}
                    <radialGradient id="sunSphere3D" cx="36%" cy="32%" r="68%" fx="30%" fy="26%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="12%" stopColor="#F4FFB0" stopOpacity="1" />
                      <stop offset="38%" stopColor="#D5F36A" stopOpacity="1" />
                      <stop offset="66%" stopColor="#91C936" stopOpacity="1" />
                      <stop offset="88%" stopColor="#245B37" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0B2317" stopOpacity="1" />
                    </radialGradient>

                    {/* Soft Atmospheric Translucent Emerald Outer Glow (Crisp, Smooth Radial Gradient, No Blur Filter) */}
                    <radialGradient id="sunAtmosphereHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D5F36A" stopOpacity="0.32" />
                      <stop offset="40%" stopColor="#43C98B" stopOpacity="0.16" />
                      <stop offset="70%" stopColor="#144C32" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#07110D" stopOpacity="0" />
                    </radialGradient>

                    {/* Upper-Left Specular Light Source Sheen */}
                    <radialGradient id="sunSpecularGrad" cx="35%" cy="32%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                      <stop offset="35%" stopColor="#F4FFB0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D5F36A" stopOpacity="0" />
                    </radialGradient>

                    {/* Lower-Right Deep Emerald Shadow Crescent */}
                    <radialGradient id="sunDepthShadow" cx="74%" cy="74%" r="62%">
                      <stop offset="0%" stopColor="#081A10" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#16432B" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#16432B" stopOpacity="0" />
                    </radialGradient>

                    {/* Solar Plasma Mottling Pattern Gradient */}
                    <radialGradient id="sunPlasmaMottle" cx="44%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#F4FFB0" stopOpacity="0.3" />
                      <stop offset="45%" stopColor="#D5F36A" stopOpacity="0.18" />
                      <stop offset="78%" stopColor="#245B37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0B2317" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ── CONCENTRIC DOTTED SOLAR ORBITS ── */}
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

                  {/* ── 1. CONNECTING LINES FROM SUN CENTER TO EVERY PLANET (BEHIND SUN & PLANETS) ── */}
                  <g className="solar-connecting-lines" style={{ pointerEvents: 'none' }}>
                    {SUBJECT_CONFIG.map((subject) => {
                      const curAngle = anglesRef.current[subject.key] ?? subject.initialAngle;
                      const rad = (curAngle * Math.PI) / 180;
                      const ux = Math.cos(rad);
                      const uy = Math.sin(rad);
                      const rPlanet = subjectRadii[subject.key] ?? subject.orbitRadius;
                      const px = cx + rPlanet * ux;
                      const py = cy + rPlanet * uy;
                      const isDragging = draggingSubject === subject.key;

                      return (
                        <g key={`conn-${subject.key}`}>
                          {/* Faint subtle glow along the radial beam */}
                          <line
                            x1={cx}
                            y1={cy}
                            x2={px}
                            y2={py}
                            stroke={subject.color}
                            strokeWidth={isDragging ? 3.5 : 2}
                            strokeOpacity={isDragging ? 0.35 : 0.14}
                          />
                          {/* Direct thin radial connection line */}
                          <line
                            x1={cx}
                            y1={cy}
                            x2={px}
                            y2={py}
                            stroke={subject.color}
                            strokeWidth={isDragging ? 1.6 : 1.1}
                            strokeOpacity={isDragging ? 0.75 : 0.32}
                          />
                          {/* Small circular connection point where line meets the planet */}
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

                  {/* ── 2. REALISTIC 3D SPHERICAL SUN (ON TOP OF CONNECTING LINES, CRISP & CLEAN) ── */}
                  <g className="solar-sun-node" style={{ pointerEvents: 'none' }}>
                    {/* 1. Subtle, Soft Atmospheric Halo (Clean Gradient, No Hazy Blur Filter) */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="40"
                      fill="url(#sunAtmosphereHalo)"
                    />

                    {/* 2. 3D Spherical Celestial Body (Stationary Position, Solid & Luminous) */}
                    <g clipPath="url(#sunSphereClip)">
                      {/* Realistic 3D Sphere Base with Curved Radial Light Falloff */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="26"
                        fill="url(#sunSphere3D)"
                      />

                      {/* FIXED Lower-Right Deep Emerald Shading for Curved Depth */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="26"
                        fill="url(#sunDepthShadow)"
                      />

                      {/* FIXED Upper-Left Bright Lime Specular Highlight Sheen */}
                      <ellipse
                        cx={cx - 8}
                        cy={cy - 8}
                        rx="13"
                        ry="8"
                        fill="url(#sunSpecularGrad)"
                        transform={`rotate(-35, ${cx - 8}, ${cy - 8})`}
                      />

                      {/* FIXED Primary Light Source Specular Glint */}
                      <circle
                        cx={cx - 10}
                        cy={cy - 10}
                        r="2.8"
                        fill="#FFFFFF"
                        opacity="0.8"
                      />
                    </g>

                    {/* 3. Extremely Subtle Celestial Limb Highlight */}
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

                  {/* ── 3. 4 REVOLVING SUBJECT PLANETS (ON TOP OF CONNECTING LINES & SUN) ── */}
                  {SUBJECT_CONFIG.map((subject) => {
                    const score = subjectScores[subject.key] || 0;
                    const curAngle = anglesRef.current[subject.key] ?? subject.initialAngle;
                    const rad = (curAngle * Math.PI) / 180;
                    const ux = Math.cos(rad);
                    const uy = Math.sin(rad);

                    // Radius strictly tied to subjectRadii (snaps to orbital rings or live drag distance)
                    const rNode = subjectRadii[subject.key] ?? subject.orbitRadius;
                    const xNode = cx + rNode * ux;
                    const yNode = cy + rNode * uy;

                    // Dynamic label positioning that stays outside the planet
                    const isRight = ux >= 0;
                    const labelX = xNode + (isRight ? 18 : -18);
                    const labelY = yNode + (uy >= 0 ? 5 : -5);
                    const textAnchor = isRight ? 'start' : 'end';

                    const isDragging = draggingSubject === subject.key;

                    return (
                      <g key={subject.key} className="solar-planet-group">

                        {/* Interactive Draggable Planet Node */}
                        <g
                          className="solar-node-interactive"
                          tabIndex={0}
                          role="slider"
                          aria-valuenow={score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${subject.name} Mastery`}
                          onKeyDown={(e) => handleKeyDown(subject.key, e)}
                        >
                          {/* Generous touch/cursor hit-circle */}
                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="26"
                            fill="transparent"
                            style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                            onPointerDown={(e) => handlePointerDown(subject.key, e)}
                          />

                          {/* Outer Planetary Atmosphere Glow */}
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

                          {/* Main Planet Orb */}
                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="7.5"
                            fill="#07110D"
                            stroke={subject.color}
                            strokeWidth="2.2"
                            style={{ pointerEvents: 'none' }}
                          />

                          {/* Luminous Core Bead */}
                          <circle
                            cx={xNode}
                            cy={yNode}
                            r="2.8"
                            fill={subject.color}
                            style={{ pointerEvents: 'none' }}
                          />
                        </g>

                        {/* Orbiting Subject Label & Confidence */}
                        <g className="solar-label-group" style={{ pointerEvents: 'none' }}>
                          <text
                            x={labelX}
                            y={labelY - 5}
                            textAnchor={textAnchor}
                            className="solar-text-name font-medium"
                            fill="#F1F5F2"
                          >
                            {subject.name}
                          </text>

                          <text
                            x={labelX}
                            y={labelY + 9}
                            textAnchor={textAnchor}
                            className="solar-text-pct font-mono font-bold"
                            fill={subject.color}
                          >
                            {score}% CONF
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Sub-Diagram User Drag Hint */}
                <div className="radial-diagram-hint font-mono text-[11px] text-muted">
                  <MoveHorizontal size={13} className="text-accent-lime shrink-0" />
                  <span>Drag planets along radial rays • Snaps to nearest orbital ring</span>
                </div>
              </div>

            </div>

            {/* Right Column: Diagnostic Output & Recommendation Pane */}
            <div className="sim-col-output font-mono text-xs">
              <div className="output-status-bar">
                <span className="text-accent-lime font-semibold">PREDICTIVE ENGINE</span>
                <span className="text-muted">{board} 2027</span>
              </div>

              {/* Circular Readiness Gauge */}
              <div className="readiness-gauge" role="img" aria-label={`Readiness gauge showing ${currentScore}%`}>
                <svg className="readiness-gauge__svg" viewBox="0 0 104 104">
                  <circle
                    className="readiness-gauge__bg"
                    cx="52"
                    cy="52"
                    r="44"
                    strokeWidth="7"
                  />
                  <circle
                    className="readiness-gauge__fill"
                    cx="52"
                    cy="52"
                    r="44"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - currentScore / 100)}
                  />
                </svg>

                {/* Centered Content Layer */}
                <div className="readiness-gauge__content">
                  <span className="readiness-gauge__percentage">{currentScore}%</span>
                  <span className="readiness-gauge__label">READINESS</span>
                </div>
              </div>

              {/* Predicted Marks Range */}
              <div className="predicted-box">
                <div className="predicted-title text-muted text-[11px] uppercase tracking-wider">PREDICTED RANGE</div>
                <div className="predicted-range text-xl text-accent-lime font-bold mt-0.5">
                  {Math.max(60, currentScore - 4)}% — {Math.min(99, currentScore + 3)}%
                </div>
              </div>

              {/* Focus Areas (Minimal text, No tick symbols) */}
              <div className="action-plan-box font-sans">
                <div className="plan-heading font-mono text-xs text-muted mb-2 uppercase tracking-wider">FOCUS AREAS</div>
                <div className="plan-item text-xs mb-1.5">
                  Quadratic step loss in Math
                </div>
                <div className="plan-item text-xs">
                  Optics derivations in Science
                </div>
              </div>

              <button
                type="button"
                className="btn btn-emerald w-full justify-center mt-auto"
                onClick={onOpenDemoExam}
              >
                <span>Take Mock Exam</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .editorial-readiness-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-readiness-section .editorial-section-header {
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

        /* Master Editorial Grid */
        .editorial-readiness-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Metrics Ribbon Row Architecture */
        .metrics-ribbon-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          background: rgba(11, 36, 26, 0.35);
          position: relative;
        }

        .metric-ribbon-cell {
          position: relative;
          padding: clamp(0.95rem, 1.4vw, 1.25rem) 1.25rem;
          min-height: 80px;
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.25rem;
          overflow: hidden;
          cursor: default;
          user-select: none;
          background: rgba(7, 17, 13, 0.45);
          transition: border-color 0.25s ease, background-color 0.25s ease;
          outline: none;
        }

        .metric-ribbon-cell:last-child {
          border-right: none;
        }

        .metric-ribbon-cell:not(.metric-ribbon-cell-image):hover,
        .metric-ribbon-cell:not(.metric-ribbon-cell-image):focus-visible {
          border-color: rgba(213, 243, 106, 0.35);
          background: rgba(11, 36, 26, 0.5);
        }

        .metric-ribbon-cell:not(.metric-ribbon-cell-image):hover .metric-val {
          color: #D5F36A !important;
        }

        /* Pure Halftone Graphic Panels: No text, no hover effect */
        .metric-ribbon-cell-image {
          padding: 0 !important;
          background: #040907 !important;
          min-height: 84px;
          cursor: default !important;
          pointer-events: none;
          position: relative;
          overflow: hidden;
        }

        .metric-ribbon-cell-image:hover,
        .metric-ribbon-cell-image:focus-visible {
          border-color: rgba(190, 220, 200, 0.14) !important;
          background: #040907 !important;
        }

        .metric-ribbon-cell-image .metric-image-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: 1;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Editorial Content Container */
        .metric-cell-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        /* Display Serif Typography for Numerical Values */
        .metric-val {
          font-family: var(--font-serif-display, 'Instrument Serif', Georgia, serif);
          font-size: clamp(1.35rem, 1.7vw, 1.62rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.01em;
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 10px rgba(0, 0, 0, 0.85);
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .metric-ribbon-cell.is-active .metric-val {
          color: #D5F36A !important;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95), 0 0 12px rgba(213, 243, 106, 0.35);
        }

        .metric-val-num {
          font-variant-numeric: proportional-nums lining-nums;
        }

        .metric-val-unit {
          font-family: var(--font-serif-display, 'Instrument Serif', Georgia, serif);
          font-size: 0.82em;
          letter-spacing: 0.02em;
        }

        .metric-val-sym {
          font-family: var(--font-mono, monospace);
          font-size: 0.85em;
          opacity: 0.85;
          margin-right: 0.1rem;
        }

        /* Clean Understated Sans-Serif Typography for Label */
        .metric-lbl {
          font-family: var(--font-sans-editorial, 'DM Sans', -apple-system, sans-serif);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          line-height: 1.25;
          text-transform: uppercase;
          color: rgba(181, 192, 184, 0.72);
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.85);
          transition: color 0.3s ease;
        }

        .metric-ribbon-cell.is-active .metric-lbl {
          color: rgba(241, 245, 242, 0.95);
        }

        /* Simulator Grid Split */
        .simulator-grid-row {
          display: grid;
          grid-template-columns: 1fr 340px;
        }

        .sim-col-inputs {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
        }

        .inputs-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(190, 220, 200, 0.12);
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .board-toggle-group {
          display: flex;
          gap: 0.4rem;
        }

        .board-btn {
          padding: 0.25rem 0.65rem;
          background: rgba(11, 36, 26, 0.5);
          border: 1px solid rgba(190, 220, 200, 0.14);
          border-radius: 4px;
          color: #B5C0B8;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .board-btn:hover {
          color: #F1F5F2;
          border-color: transparent !important;
          outline: none !important;
          background-color: rgba(16, 71, 52, 0.45);
        }

        .board-btn.active-board {
          background-color: rgba(16, 71, 52, 0.60);
          border-color: var(--accent-lime, #D5F36A);
          color: var(--accent-lime, #D5F36A);
        }

        /* ── SOLAR SYSTEM MAP STYLING ── */
        .radial-map-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto 0;
        }

        .radial-diagram-svg {
          width: 100%;
          max-width: 620px;
          height: auto;
          overflow: visible;
          user-select: none;
          touch-action: none;
        }

        .solar-node-interactive {
          outline: none;
          cursor: grab;
        }

        .solar-node-interactive:focus-visible circle:nth-child(2) {
          stroke: var(--accent-lime, #D5F36A);
          stroke-width: 2.5px;
          fill-opacity: 0.4;
        }

        .solar-text-name {
          font-family: var(--font-sans, sans-serif);
          font-size: 12.5px;
          letter-spacing: -0.01em;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
        }

        .solar-text-pct {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.04em;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
        }

        .radial-diagram-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          background: rgba(11, 36, 26, 0.4);
          border: 1px solid rgba(190, 220, 200, 0.1);
        }

        /* ── OUTPUT COLUMN & FIXED READINESS GAUGE ── */
        .sim-col-output {
          padding: clamp(1.15rem, 2vw, 1.5rem);
          background: rgba(7, 17, 13, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .output-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(190, 220, 200, 0.1);
        }

        /* CIRCULAR READINESS GAUGE */
        .readiness-gauge {
          position: relative;
          width: 104px;
          height: 104px;
          flex-shrink: 0;
          margin: 0.25rem auto 0.5rem;
        }

        .readiness-gauge__svg {
          transform: rotate(-90deg);
          width: 100%;
          height: 100%;
          display: block;
        }

        .readiness-gauge__bg {
          fill: none;
          stroke: rgba(190, 220, 200, 0.12);
        }

        .readiness-gauge__fill {
          fill: none;
          stroke: var(--accent-lime, #D5F36A);
          stroke-linecap: round;
          transition: stroke-dashoffset 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .readiness-gauge__content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 2px;
          padding: 12px;
          box-sizing: border-box;
          pointer-events: none;
        }

        .readiness-gauge__percentage {
          font-family: var(--font-mono, monospace);
          font-size: 19px;
          line-height: 1.1;
          font-weight: 700;
          color: #F1F5F2;
          white-space: nowrap;
        }

        .readiness-gauge__label {
          font-family: var(--font-mono, monospace);
          font-size: 8.5px;
          line-height: 1.2;
          font-weight: 600;
          color: #8F9D93;
          letter-spacing: 0.08em;
          max-width: 100%;
          overflow-wrap: normal;
          text-transform: uppercase;
        }

        .predicted-box {
          padding: 0.6rem 0.85rem;
          border: 1px solid rgba(190, 220, 200, 0.12);
          background: rgba(11, 36, 26, 0.35);
          border-radius: 4px;
        }

        .action-plan-box {
          padding: 0.6rem 0.85rem;
          border: 1px solid rgba(190, 220, 200, 0.1);
          background: rgba(11, 36, 26, 0.2);
          border-radius: 4px;
        }

        .action-plan-box .plan-item {
          color: #B2C4B8;
          line-height: 1.4;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .metrics-ribbon-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric-ribbon-cell:nth-child(2) {
            border-right: none;
          }

          .metric-ribbon-cell:nth-child(1),
          .metric-ribbon-cell:nth-child(2) {
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .simulator-grid-row {
            grid-template-columns: 1fr;
          }

          .sim-col-inputs {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .radial-diagram-svg {
            max-width: 540px;
          }
        }

        @media (max-width: 640px) {
          .metrics-ribbon-row {
            grid-template-columns: 1fr;
          }

          .metric-ribbon-cell {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .solar-text-name {
            font-size: 11px;
          }

          .solar-text-pct {
            font-size: 9px;
          }

          .radial-diagram-hint {
            font-size: 9.5px;
          }
        }
      `}</style>
    </section>
  );
}
