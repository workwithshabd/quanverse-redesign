import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import './FooterCicadaTree.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqRef = useRef(null);

  const faqs = [
    {
      q: 'Does the AI recognize messy student handwriting and complex math formulas?',
      a: 'Yes. Our optical recognition is trained on over 40,000 real Indian board exam sheets. It accurately parses handwritten math derivations, geometry labels, and chemical equations with instant ambiguity flagging.'
    },
    {
      q: 'How closely does the AI marking match real CBSE and ICSE board evaluators?',
      a: 'Quanverse achieves a 99.4% correlation with official CBSE and ICSE marking schemes, awarding step credit for formulas, intermediate working, and units exactly like human board examiners.'
    },
    {
      q: 'Is the first mock exam completely free?',
      a: 'Yes, 100% free. Take a complete 80-mark, 3-hour mock exam, upload your handwritten or typed sheet, and receive a full diagnostic report without entering payment details.'
    },
    {
      q: 'How can teachers author questions and receive royalties?',
      a: 'Senior educators with verified board credentials can author questions and rubrics on our Creator Portal, earning automated monthly royalties as students attempt their papers.'
    },
    {
      q: 'Are the questions updated for the 2027 CBSE and ICSE pattern changes?',
      a: 'Yes. All mock papers adhere to the latest 50% competency-based guidelines issued by CBSE and CISCE, including case studies and assertion-reasoning questions.'
    },
    {
      q: 'Can schools use Quanverse for their internal pre-board examinations?',
      a: 'Yes. Schools partner with Quanverse for pre-board papers and batch OCR scanning to evaluate 200+ students in under an hour, complete with parent-ready scorecards.'
    }
  ];

  // Accordion toggle with ScrollTrigger recalculation
  const handleToggle = (i) => {
    setOpenIndex(prev => (prev === i ? -1 : i));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  useEffect(() => {
    const root = faqRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Window resize handler to recalculate ScrollTrigger positions
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      // 1. Target Elements
      const leftWing = root.querySelector('.bf-wing-left');
      const rightWing = root.querySelector('.bf-wing-right');
      const butterflyBody = root.querySelector('.bf-butterfly-svg');

      // Trunk & Branch Paths
      const topTrunk = root.querySelector('.bf-top-trunk-path');
      const junctionNodes = root.querySelectorAll('.bf-junction-node');
      const trunkPaths = root.querySelectorAll('.bf-path-trunk');
      const branchPaths = root.querySelectorAll('.bf-path-branch');
      const footerTrunk = root.querySelector('.bf-footer-anchor-path');
      const footerAnchorNode = root.querySelector('.bf-anchor-node');

      // Question Cards
      const cards = root.querySelectorAll('.bf-faq-card');

      // Footer Elements
      const footer = document.querySelector('.site-footer');
      const oversizedWordmark = footer ? footer.querySelector('.oversized-wordmark') : null;
      const footerNav = footer ? footer.querySelector('.footer-nav-grid') : null;
      const footerMid = footer ? footer.querySelector('.footer-middle-row') : null;
      const footerBottom = footer ? footer.querySelector('.footer-bottom-bar') : null;

      // 2. Initialize SVG Stroke Dash Offsets for All Paths
      const allPaths = [topTrunk, ...Array.from(trunkPaths), ...Array.from(branchPaths), footerTrunk].filter(Boolean);
      allPaths.forEach((path) => {
        try {
          const len = path.getTotalLength ? path.getTotalLength() : 200;
          gsap.set(path, {
            strokeDasharray: len + 1,
            strokeDashoffset: len + 1,
          });
        } catch {
          // fallback
          gsap.set(path, { strokeDasharray: 200, strokeDashoffset: 200 });
        }
      });

      // Initial States for Junction Nodes & Cards
      gsap.set(junctionNodes, { scale: 0, transformOrigin: 'center center', opacity: 0 });
      if (footerAnchorNode) {
        gsap.set(footerAnchorNode, { scale: 0, transformOrigin: 'center center', opacity: 0 });
      }

      // Initial States for Cards (Left from -30px, Right from +30px)
      cards.forEach((card, idx) => {
        const isLeft = idx % 2 === 0;
        gsap.set(card, {
          opacity: 0,
          x: isLeft ? -32 : 32,
          scale: 0.96,
        });
      });

      // Footer Initial States (if present)
      if (oversizedWordmark) {
        gsap.set(oversizedWordmark, { opacity: 0, y: 55, scale: 0.95 });
      }
      if (footerNav) {
        gsap.set(footerNav, { opacity: 0, y: 35 });
      }
      if (footerMid) {
        gsap.set(footerMid, { opacity: 0, y: 25 });
      }
      if (footerBottom) {
        gsap.set(footerBottom, { opacity: 0 });
      }

      // 3. MASTER COORDINATED SCRUBBED TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          endTrigger: footer || root,
          start: 'top 75%',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ── STAGE 1: BUTTERFLY AWAKENS & TOP TRUNK EXTENDS (0.00 - 0.15) ──
      tl.to(butterflyBody, { y: -8, duration: 0.15, ease: 'power1.out' }, 0);

      // Flap 1: Down
      tl.to(leftWing, { rotateY: -65, rotateZ: -10, scaleX: 0.72, duration: 0.14, ease: 'power1.inOut' }, 0)
        .to(rightWing, { rotateY: 65, rotateZ: 10, scaleX: 0.72, duration: 0.14, ease: 'power1.inOut' }, 0);

      // Top trunk draws down to Row 1
      if (topTrunk) {
        tl.to(topTrunk, { strokeDashoffset: 0, duration: 0.15, ease: 'none' }, 0.02);
      }

      // ── STAGE 2: ROW 1 JUNCTION, Q1 & Q2 (0.15 - 0.42) ──
      const node1 = root.querySelector('.bf-node-row-0');
      if (node1) {
        tl.to(node1, { scale: 1, opacity: 1, duration: 0.06, ease: 'back.out(2)' }, 0.14);
      }

      // Wing Flap 1: Up
      tl.to(leftWing, { rotateY: 22, rotateZ: 4, scaleX: 1.03, duration: 0.14, ease: 'power1.inOut' }, 0.16)
        .to(rightWing, { rotateY: -22, rotateZ: -4, scaleX: 1.03, duration: 0.14, ease: 'power1.inOut' }, 0.16);

      // Branch 1 (Left) draws to Q1
      const branch1 = root.querySelector('.bf-branch-0');
      if (branch1) {
        tl.to(branch1, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.18);
      }
      if (cards[0]) {
        tl.to(cards[0], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.22);
      }

      // Wing Flap 2: Down
      tl.to(leftWing, { rotateY: -62, rotateZ: -9, scaleX: 0.74, duration: 0.14, ease: 'power1.inOut' }, 0.30)
        .to(rightWing, { rotateY: 62, rotateZ: 9, scaleX: 0.74, duration: 0.14, ease: 'power1.inOut' }, 0.30);

      // Branch 2 (Right) draws to Q2
      const branch2 = root.querySelector('.bf-branch-1');
      if (branch2) {
        tl.to(branch2, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.32);
      }
      if (cards[1]) {
        tl.to(cards[1], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.36);
      }

      // ── STAGE 3: ROW 2 JUNCTION, Q3 & Q4 (0.42 - 0.72) ──
      // Trunk 1 -> 2
      const trunk1to2 = root.querySelector('.bf-trunk-0-to-1');
      if (trunk1to2) {
        tl.to(trunk1to2, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.42);
      }

      const node2 = root.querySelector('.bf-node-row-1');
      if (node2) {
        tl.to(node2, { scale: 1, opacity: 1, duration: 0.06, ease: 'back.out(2)' }, 0.48);
      }

      // Wing Flap 2: Up
      tl.to(leftWing, { rotateY: 20, rotateZ: 3, scaleX: 1.02, duration: 0.14, ease: 'power1.inOut' }, 0.46)
        .to(rightWing, { rotateY: -20, rotateZ: -3, scaleX: 1.02, duration: 0.14, ease: 'power1.inOut' }, 0.46);

      // Branch 3 (Left) draws to Q3
      const branch3 = root.querySelector('.bf-branch-2');
      if (branch3) {
        tl.to(branch3, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.50);
      }
      if (cards[2]) {
        tl.to(cards[2], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.54);
      }

      // Wing Flap 3: Down
      tl.to(leftWing, { rotateY: -58, rotateZ: -8, scaleX: 0.76, duration: 0.14, ease: 'power1.inOut' }, 0.60)
        .to(rightWing, { rotateY: 58, rotateZ: 8, scaleX: 0.76, duration: 0.14, ease: 'power1.inOut' }, 0.60);

      // Branch 4 (Right) draws to Q4
      const branch4 = root.querySelector('.bf-branch-3');
      if (branch4) {
        tl.to(branch4, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.62);
      }
      if (cards[3]) {
        tl.to(cards[3], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.66);
      }

      // ── STAGE 4: ROW 3 JUNCTION, Q5 & Q6 (0.72 - 1.00) ──
      // Trunk 2 -> 3
      const trunk2to3 = root.querySelector('.bf-trunk-1-to-2');
      if (trunk2to3) {
        tl.to(trunk2to3, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.72);
      }

      const node3 = root.querySelector('.bf-node-row-2');
      if (node3) {
        tl.to(node3, { scale: 1, opacity: 1, duration: 0.06, ease: 'back.out(2)' }, 0.78);
      }

      // Wing Flap 3: Up
      tl.to(leftWing, { rotateY: 18, rotateZ: 2, scaleX: 1.01, duration: 0.14, ease: 'power1.inOut' }, 0.76)
        .to(rightWing, { rotateY: -18, rotateZ: -2, scaleX: 1.01, duration: 0.14, ease: 'power1.inOut' }, 0.76);

      // Branch 5 (Left) draws to Q5
      const branch5 = root.querySelector('.bf-branch-4');
      if (branch5) {
        tl.to(branch5, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.80);
      }
      if (cards[4]) {
        tl.to(cards[4], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.84);
      }

      // Wing Flap 4: Down
      tl.to(leftWing, { rotateY: -54, rotateZ: -6, scaleX: 0.78, duration: 0.14, ease: 'power1.inOut' }, 0.88)
        .to(rightWing, { rotateY: 54, rotateZ: 6, scaleX: 0.78, duration: 0.14, ease: 'power1.inOut' }, 0.88);

      // Branch 6 (Right) draws to Q6
      const branch6 = root.querySelector('.bf-branch-5');
      if (branch6) {
        tl.to(branch6, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0.90);
      }
      if (cards[5]) {
        tl.to(cards[5], { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.94);
      }

      // ── STAGE 5: FOOTER TRANSITION & BUTTERFLY SETTLES CALMLY (1.00 - 1.30) ──
      // Bottom trunk extends down to footer anchor
      if (footerTrunk) {
        tl.to(footerTrunk, { strokeDashoffset: 0, duration: 0.16, ease: 'none' }, 1.00);
      }
      if (footerAnchorNode) {
        tl.to(footerAnchorNode, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(2)' }, 1.08);
      }

      // Butterfly settles into a calmer, resting pose (Requirement 5)
      tl.to(leftWing, { rotateY: 0, rotateZ: 0, scaleX: 1, duration: 0.25, ease: 'power2.out' }, 1.02)
        .to(rightWing, { rotateY: 0, rotateZ: 0, scaleX: 1, duration: 0.25, ease: 'power2.out' }, 1.02)
        .to(butterflyBody, { y: 0, duration: 0.25, ease: 'power2.out' }, 1.02);

      // Oversized QUANVERSE wordmark reveals (Requirement 6)
      if (oversizedWordmark) {
        tl.to(oversizedWordmark, { opacity: 1, y: 0, scale: 1, duration: 0.24, ease: 'power2.out' }, 1.06);
      }

      // Footer Navigation Grid reveals
      if (footerNav) {
        tl.to(footerNav, { opacity: 1, y: 0, duration: 0.20, ease: 'power2.out' }, 1.14);
      }

      // Footer Middle & Bottom rows reveal
      if (footerMid) {
        tl.to(footerMid, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 1.20);
      }
      if (footerBottom) {
        tl.to(footerBottom, { opacity: 1, duration: 0.16, ease: 'power2.out' }, 1.24);
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className="bf-faq-section" id="faqs" ref={faqRef} aria-label="Examination System Clarifications">
      <div className="app-container">

        {/* Section Header */}
        <div className="bf-section-header">
          <div className="bf-header-badge">
            <span className="bf-badge-dot" />
            <span>COMMON INQUIRIES • DIAGNOSTIC KNOWLEDGE BASE</span>
          </div>

          <h2 className="bf-section-title">
            Examination System <span>Clarifications</span>
          </h2>

          <p className="bf-section-subtitle">
            Answers on AI step marking, board patterns, and evaluation.
          </p>
        </div>

        {/* ── BUTTERFLY HERO STAGE ── */}
        <div className="bf-butterfly-stage" aria-hidden="true">
          <svg
            className="bf-butterfly-svg"
            viewBox="0 0 360 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Interactive AI Butterfly"
          >
            <defs>
              {/* Emerald & Lime Bioluminescent Gradients */}
              <linearGradient id="bfWingGradLeft" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D5F36A" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#43C98B" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#0B241A" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#07110D" stopOpacity="0.98" />
              </linearGradient>

              <linearGradient id="bfWingGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D5F36A" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#43C98B" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#0B241A" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#07110D" stopOpacity="0.98" />
              </linearGradient>

              <radialGradient id="bfWingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D5F36A" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#43C98B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#43C98B" stopOpacity="0" />
              </radialGradient>

              <filter id="bfVeinGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ambient Background Glow */}
            <ellipse cx="180" cy="130" rx="145" ry="95" fill="url(#bfWingGlow)" />

            {/* ── LEFT WING GROUP (Independent Attachment at 180, 130) ── */}
            <g className="bf-wing bf-wing-left">
              {/* Left Forewing */}
              <path
                d="M 180 120 C 160 80, 110 30, 40 45 C 10 52, 15 110, 65 150 C 110 185, 160 155, 180 135 Z"
                fill="url(#bfWingGradLeft)"
                stroke="#D5F36A"
                strokeWidth="1.6"
                strokeOpacity="0.85"
                filter="url(#bfVeinGlow)"
              />
              {/* Left Forewing Veins */}
              <path
                d="M 180 125 C 140 100, 90 70, 48 55 M 130 95 C 100 120, 65 145, 45 130 M 150 115 C 120 145, 90 160, 75 145"
                stroke="#A7F3C4"
                strokeWidth="1.1"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              {/* Left Hindwing */}
              <path
                d="M 180 135 C 165 160, 130 220, 80 230 C 50 235, 60 190, 95 170 C 135 150, 165 145, 180 140 Z"
                fill="url(#bfWingGradLeft)"
                stroke="#43C98B"
                strokeWidth="1.3"
                strokeOpacity="0.75"
              />
              {/* Left Hindwing Veins */}
              <path
                d="M 180 140 C 145 175, 110 205, 85 220 M 150 160 C 125 190, 100 185, 90 175"
                stroke="#A7F3C4"
                strokeWidth="0.9"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
              {/* Bioluminescent Dots */}
              <circle cx="45" cy="50" r="2.5" fill="#D5F36A" opacity="0.85" />
              <circle cx="35" cy="75" r="2" fill="#43C98B" opacity="0.85" />
              <circle cx="45" cy="105" r="2" fill="#D5F36A" opacity="0.85" />
              <circle cx="82" cy="225" r="2.2" fill="#D5F36A" opacity="0.85" />
            </g>

            {/* ── RIGHT WING GROUP (Independent Attachment at 180, 130) ── */}
            <g className="bf-wing bf-wing-right">
              {/* Right Forewing */}
              <path
                d="M 180 120 C 200 80, 250 30, 320 45 C 350 52, 345 110, 295 150 C 250 185, 200 155, 180 135 Z"
                fill="url(#bfWingGradRight)"
                stroke="#D5F36A"
                strokeWidth="1.6"
                strokeOpacity="0.85"
                filter="url(#bfVeinGlow)"
              />
              {/* Right Forewing Veins */}
              <path
                d="M 180 125 C 220 100, 270 70, 312 55 M 230 95 C 260 120, 295 145, 315 130 M 210 115 C 240 145, 270 160, 285 145"
                stroke="#A7F3C4"
                strokeWidth="1.1"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              {/* Right Hindwing */}
              <path
                d="M 180 135 C 195 160, 230 220, 280 230 C 310 235, 300 190, 265 170 C 225 150, 195 145, 180 140 Z"
                fill="url(#bfWingGradRight)"
                stroke="#43C98B"
                strokeWidth="1.3"
                strokeOpacity="0.75"
              />
              {/* Right Hindwing Veins */}
              <path
                d="M 180 140 C 215 175, 250 205, 275 220 M 210 160 C 235 190, 260 185, 270 175"
                stroke="#A7F3C4"
                strokeWidth="0.9"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
              {/* Bioluminescent Dots */}
              <circle cx="315" cy="50" r="2.5" fill="#D5F36A" opacity="0.85" />
              <circle cx="325" cy="75" r="2" fill="#43C98B" opacity="0.85" />
              <circle cx="315" cy="105" r="2" fill="#D5F36A" opacity="0.85" />
              <circle cx="278" cy="225" r="2.2" fill="#D5F36A" opacity="0.85" />
            </g>

            {/* ── BUTTERFLY BODY ── */}
            <g className="bf-body">
              {/* Antennae */}
              <path
                d="M 178 88 C 172 65, 155 45, 140 40 M 182 88 C 188 65, 205 45, 220 40"
                stroke="#D5F36A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="140" cy="40" r="2.5" fill="#D5F36A" filter="url(#bfVeinGlow)" />
              <circle cx="220" cy="40" r="2.5" fill="#D5F36A" filter="url(#bfVeinGlow)" />

              {/* Head */}
              <circle cx="180" cy="94" r="6" fill="#0B241A" stroke="#43C98B" strokeWidth="1.6" />
              <circle cx="178" cy="93" r="1.5" fill="#D5F36A" />
              <circle cx="182" cy="93" r="1.5" fill="#D5F36A" />

              {/* Thorax */}
              <ellipse cx="180" cy="122" rx="7.5" ry="20" fill="#0B241A" stroke="#43C98B" strokeWidth="1.8" />
              {/* Luminous Thorax Core */}
              <ellipse cx="180" cy="120" rx="3.5" ry="10" fill="#D5F36A" opacity="0.9" filter="url(#bfVeinGlow)" />

              {/* Abdomen */}
              <path
                d="M 175 142 C 174 165, 177 195, 180 205 C 183 195, 186 165, 185 142 Z"
                fill="#0B241A"
                stroke="#43C98B"
                strokeWidth="1.5"
              />
              {/* Segment lines */}
              <line x1="176" y1="155" x2="184" y2="155" stroke="#43C98B" strokeWidth="1" opacity="0.6" />
              <line x1="177" y1="168" x2="183" y2="168" stroke="#43C98B" strokeWidth="1" opacity="0.6" />
              <line x1="178" y1="181" x2="182" y2="181" stroke="#43C98B" strokeWidth="1" opacity="0.6" />
              {/* Abdomen tip */}
              <circle cx="180" cy="204" r="2.2" fill="#D5F36A" filter="url(#bfVeinGlow)" />
            </g>
          </svg>
        </div>

        {/* Initial Trunk extending down from Butterfly abdomen to Row 1 */}
        <div className="bf-top-trunk-wrap" aria-hidden="true">
          <svg className="bf-top-trunk-svg" viewBox="0 0 40 60" fill="none">
            <path
              className="bf-top-trunk-path"
              d="M 20 0 L 20 60"
              stroke="rgba(67, 201, 139, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ── FAQ TREE STAGE & BRANCHING GRID ── */}
        <div className="bf-tree-stage">

          {/* Row 0: Q1 (left) & Q2 (right) */}
          <div className="bf-faq-row">
            {/* Left Card: Q1 */}
            <div
              className={`bf-faq-card bf-faq-left ${openIndex === 0 ? 'card-open' : ''}`}
              onClick={() => handleToggle(0)}
              role="region"
              aria-labelledby="faq-q-0"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.01]</span>
                  <h3 id="faq-q-0" className="bf-q-text">{faqs[0].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 0}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 0 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 0 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[0].a}</p>
                </div>
              )}
            </div>

            {/* Center Junction Row 0 */}
            <div className="bf-branch-center" aria-hidden="true">
              <svg className="bf-junction-svg" viewBox="0 0 100 120" fill="none">
                {/* Incoming Trunk from Top */}
                <path
                  className="bf-path-trunk"
                  d="M 50 0 L 50 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Left Branch to Q1 */}
                <path
                  className="bf-path-branch bf-branch-0"
                  d="M 50 45 C 30 45, 10 45, 0 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Right Branch to Q2 */}
                <path
                  className="bf-path-branch bf-branch-1"
                  d="M 50 45 C 70 45, 90 45, 100 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Central Junction Node */}
                <circle className="bf-junction-node bf-node-row-0" cx="50" cy="45" r="5" />
                {/* Outgoing Trunk to Row 1 */}
                <path
                  className="bf-path-trunk bf-trunk-0-to-1"
                  d="M 50 45 L 50 120"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right Card: Q2 */}
            <div
              className={`bf-faq-card bf-faq-right ${openIndex === 1 ? 'card-open' : ''}`}
              onClick={() => handleToggle(1)}
              role="region"
              aria-labelledby="faq-q-1"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.02]</span>
                  <h3 id="faq-q-1" className="bf-q-text">{faqs[1].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 1}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 1 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 1 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[1].a}</p>
                </div>
              )}
            </div>
          </div>

          {/* Row 1: Q3 (left) & Q4 (right) */}
          <div className="bf-faq-row">
            {/* Left Card: Q3 */}
            <div
              className={`bf-faq-card bf-faq-left ${openIndex === 2 ? 'card-open' : ''}`}
              onClick={() => handleToggle(2)}
              role="region"
              aria-labelledby="faq-q-2"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.03]</span>
                  <h3 id="faq-q-2" className="bf-q-text">{faqs[2].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 2}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 2 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 2 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[2].a}</p>
                </div>
              )}
            </div>

            {/* Center Junction Row 1 */}
            <div className="bf-branch-center" aria-hidden="true">
              <svg className="bf-junction-svg" viewBox="0 0 100 120" fill="none">
                {/* Left Branch to Q3 */}
                <path
                  className="bf-path-branch bf-branch-2"
                  d="M 50 45 C 30 45, 10 45, 0 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Right Branch to Q4 */}
                <path
                  className="bf-path-branch bf-branch-3"
                  d="M 50 45 C 70 45, 90 45, 100 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Central Junction Node */}
                <circle className="bf-junction-node bf-node-row-1" cx="50" cy="45" r="5" />
                {/* Outgoing Trunk to Row 2 */}
                <path
                  className="bf-path-trunk bf-trunk-1-to-2"
                  d="M 50 45 L 50 120"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right Card: Q4 */}
            <div
              className={`bf-faq-card bf-faq-right ${openIndex === 3 ? 'card-open' : ''}`}
              onClick={() => handleToggle(3)}
              role="region"
              aria-labelledby="faq-q-3"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.04]</span>
                  <h3 id="faq-q-3" className="bf-q-text">{faqs[3].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 3}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 3 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 3 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[3].a}</p>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Q5 (left) & Q6 (right) */}
          <div className="bf-faq-row">
            {/* Left Card: Q5 */}
            <div
              className={`bf-faq-card bf-faq-left ${openIndex === 4 ? 'card-open' : ''}`}
              onClick={() => handleToggle(4)}
              role="region"
              aria-labelledby="faq-q-4"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.05]</span>
                  <h3 id="faq-q-4" className="bf-q-text">{faqs[4].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 4}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 4 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 4 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[4].a}</p>
                </div>
              )}
            </div>

            {/* Center Junction Row 2 */}
            <div className="bf-branch-center" aria-hidden="true">
              <svg className="bf-junction-svg" viewBox="0 0 100 120" fill="none">
                {/* Left Branch to Q5 */}
                <path
                  className="bf-path-branch bf-branch-4"
                  d="M 50 45 C 30 45, 10 45, 0 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Right Branch to Q6 */}
                <path
                  className="bf-path-branch bf-branch-5"
                  d="M 50 45 C 70 45, 90 45, 100 45"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Central Junction Node */}
                <circle className="bf-junction-node bf-node-row-2" cx="50" cy="45" r="5" />
                {/* Outgoing Trunk to Footer Anchor */}
                <path
                  className="bf-path-trunk"
                  d="M 50 45 L 50 120"
                  stroke="rgba(67, 201, 139, 0.75)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right Card: Q6 */}
            <div
              className={`bf-faq-card bf-faq-right ${openIndex === 5 ? 'card-open' : ''}`}
              onClick={() => handleToggle(5)}
              role="region"
              aria-labelledby="faq-q-5"
            >
              <div className="bf-card-connector-dot" aria-hidden="true" />
              <div className="bf-question-bar">
                <div className="bf-q-left">
                  <span className="bf-q-index">[Q.06]</span>
                  <h3 id="faq-q-5" className="bf-q-text">{faqs[5].q}</h3>
                </div>
                <button
                  type="button"
                  className="bf-toggle-btn"
                  aria-label="Toggle answer"
                  aria-expanded={openIndex === 5}
                >
                  <ChevronDown size={15} className={`bf-chevron ${openIndex === 5 ? 'rotate' : 'text-muted'}`} />
                </button>
              </div>
              {openIndex === 5 && (
                <div className="bf-answer-pane">
                  <p className="bf-answer-text">{faqs[5].a}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── FOOTER TRANSITION EXTENSION ANCHOR ── */}
        <div className="bf-footer-transition-wrap" aria-hidden="true">
          <svg className="bf-footer-anchor-svg" viewBox="0 0 60 80" fill="none">
            <path
              className="bf-footer-anchor-path"
              d="M 30 0 L 30 55"
              stroke="rgba(67, 201, 139, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle className="bf-anchor-node" cx="30" cy="55" r="6" />
          </svg>
        </div>

      </div>
    </section>
  );
}
