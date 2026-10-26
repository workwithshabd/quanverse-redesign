import React from 'react';

/**
 * ArtisticGraffitiBackground
 * Dedicated full-website decorative background layer extending across the entire document
 * behind all content, headers, grids, and cards.
 *
 * Restrained Dual-Accent Direction:
 * - Dark emerald canvas foundation (#07110D)
 * - Scattered graffiti-calligraphy patterns with multi-depth Gaussian blurs
 * - Strictly 2 accent colors:
 *   * Emerald: #43C98B (spray marks, brand accents, flourishes)
 *   * Acid lime: #D5F36A (faded ink, editorial brushstrokes, annotations)
 * - Academic sketches, quadratic notes, ray diagrams, and examiner stamps in muted sage (#B5C0B8)
 * - Variable density, non-distracting opacities (4% - 10%), kept strictly behind content
 */
export default function ArtisticGraffitiBackground() {
  return (
    <div className="artistic-graffiti-canvas" aria-hidden="true">
      {/* ============================================================
          SVG FILTER & ASSET DEFINITIONS
          ============================================================ */}
      <svg className="graffiti-defs-svg" width="0" height="0" aria-hidden="true">
        <defs>
          {/* Heavy Atmospheric Ink Wash (Background Depth) */}
          <filter id="ink-blur-heavy" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* Medium Printed-Ink Blur (Fluid Letterforms & Flourishes) */}
          <filter id="ink-blur-mid" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>

          {/* Crisp Detail Blur (Faint Pen Strokes & Micro Doodles) */}
          <filter id="ink-blur-fine" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Printed Ink Stipple & Speckle Texture Pattern */}
          <pattern id="ink-stipple-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="18" r="0.8" fill="#43C98B" fillOpacity="0.10" />
            <circle cx="34" cy="45" r="1.1" fill="#D5F36A" fillOpacity="0.08" />
            <circle cx="68" cy="22" r="0.7" fill="#43C98B" fillOpacity="0.08" />
            <circle cx="86" cy="78" r="0.6" fill="#D5F36A" fillOpacity="0.06" />
            <circle cx="52" cy="71" r="1.2" fill="#43C98B" fillOpacity="0.07" />
            <circle cx="22" cy="62" r="0.6" fill="#F1F5F2" fillOpacity="0.05" />
            <circle cx="75" cy="58" r="0.9" fill="#43C98B" fillOpacity="0.09" />
          </pattern>

          {/* Radial Gradient Masks (Softens artwork near central text zones) */}
          <radialGradient id="hero-clearance-mask" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </radialGradient>

          <mask id="hero-center-mask">
            <rect width="100%" height="100%" fill="url(#hero-clearance-mask)" />
          </mask>
        </defs>
      </svg>

      {/* ============================================================
          SECTION 1: HERO & TOP GUTTERS (0% - 15% Document Height)
          Oversized signature flourish, quadratic math notes, cursive loops,
          emerald spray marks, and subtle lime ink strokes.
          ============================================================ */}
      <div className="graffiti-cluster cluster-hero">
        <svg
          viewBox="0 0 1600 950"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR WASH: Massive sweeping brush gestures (#163A2A and #43C98B) */}
          <g filter="url(#ink-blur-heavy)" opacity="0.11">
            <path
              d="M-80 220C120 160 260 80 420 140C620 220 540 440 380 410C240 380 260 220 440 180C680 130 920 320 1140 260C1320 210 1480 90 1680 180"
              stroke="#163A2A"
              strokeWidth="56"
              strokeLinecap="round"
            />
            {/* Emerald spray-paint wash mark */}
            <path
              d="M1180 60C1360 130 1520 270 1440 430C1360 560 1140 520 1080 380C1040 260 1180 160 1340 190"
              stroke="#43C98B"
              strokeWidth="42"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* MID BLUR: Flowing Calligraphy & Signature Flourishes */}
          <g filter="url(#ink-blur-mid)" opacity="0.095">
            {/* Expressive looping signature flourish */}
            <path
              d="M40 360C140 320 220 200 310 110C360 50 410 40 430 90C450 170 340 380 280 480C230 550 190 530 220 440C270 300 420 170 590 140C760 110 840 220 780 320C730 410 570 420 480 350C410 300 450 200 550 180C670 150 910 240 1050 190C1160 150 1240 70 1310 110C1370 150 1290 270 1180 280C1020 290 760 330 540 380C360 410 160 460 60 480"
              stroke="#276447"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Faded Lime ink gesture across upper margin */}
            <path
              d="M890 80C940 30 1010 40 1030 110C1060 210 930 360 880 440C850 490 820 470 850 410C890 320 1020 230 1160 210C1280 190 1370 260 1320 350"
              stroke="#D5F36A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Delicate cursive flourish in muted emerald */}
            <path
              d="M1380 120C1420 80 1480 90 1500 150C1520 230 1410 320 1350 370C1300 410 1260 380 1280 330"
              stroke="#43C98B"
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Oversized calligraphic letterform "Q" loop */}
            <path
              d="M180 620C120 540 130 410 220 340C320 260 460 290 520 390C580 490 520 620 410 680C310 740 180 700 130 590C100 520 110 440 160 380"
              stroke="#43C98B"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
          </g>

          {/* CRISP INK DETAIL: Academic Doodles, Accents & Fine Pen Strokes */}
          <g filter="url(#ink-blur-fine)" opacity="0.085">
            {/* Quadratic Formula & Derivation Notes in Acid Lime */}
            <text
              x="24"
              y="180"
              fontFamily="var(--font-mono)"
              fontSize="36"
              fontWeight="600"
              fill="#D5F36A"
              letterSpacing="1"
            >
              2x² - 5x + 3 = 0
            </text>
            <text
              x="28"
              y="222"
              fontFamily="var(--font-mono)"
              fontSize="17"
              fill="#B5C0B8"
              opacity="0.9"
            >
              Δ = b² - 4ac = 25 - 24 = 1 &gt; 0
            </text>
            <text
              x="28"
              y="256"
              fontFamily="var(--font-mono)"
              fontSize="17"
              fill="#43C98B"
            >
              x = [-(-5) ± √1] / 4  ⇒  x = 3/2, 1
            </text>

            {/* Parabola doodle & tangent */}
            <path d="M60 480Q160 320 260 480" stroke="#43C98B" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M30 420H290" stroke="#B5C0B8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <path d="M160 300V510" stroke="#B5C0B8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="160" cy="400" r="2.8" fill="#43C98B" />
            <text x="172" y="398" fontFamily="var(--font-mono)" fontSize="13" fill="#B5C0B8">Vertex (h, k)</text>

            {/* Right gutter: Calculus Integral & Handwritten examiner tip */}
            <path
              d="M1360 80C1355 55 1370 35 1390 35C1405 35 1412 45 1408 60L1375 220C1370 238 1378 248 1392 248C1410 248 1422 225 1418 205"
              stroke="#D5F36A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="1415" y="145" fontFamily="var(--font-mono)" fontSize="26" fill="#D5F36A">
              ∫ f(x) dx
            </text>

            {/* Subtle Emerald & Lime Paint Speckles along the margin rail */}
            <circle cx="480" cy="120" r="2.2" fill="#43C98B" />
            <circle cx="494" cy="112" r="1.2" fill="#D5F36A" />
            <circle cx="508" cy="126" r="1.8" fill="#D5F36A" />
            <circle cx="522" cy="116" r="1.0" fill="#43C98B" />
            <circle cx="1120" cy="240" r="2.0" fill="#D5F36A" />
            <circle cx="1136" cy="254" r="1.3" fill="#43C98B" />
            <circle cx="1150" cy="232" r="1.6" fill="#43C98B" />


            <text
              x="1260"
              y="360"
              fontFamily="var(--font-display)"
              fontSize="16"
              fontStyle="italic"
              fill="#B5C0B8"
              letterSpacing="0.5"
            >
              Step-Award Rubric: State known values
            </text>
          </g>
        </svg>
      </div>

      {/* ============================================================
          SECTION 2: BOARD READINESS & HOW IT WORKS (15% - 35%)
          Flowing cursive "Rubric", ray optics, Ohm's law, emerald speckles,
          and lime ink strokes.
          ============================================================ */}
      <div className="graffiti-cluster cluster-middle-grid">
        <svg
          viewBox="0 0 1600 1100"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR LAYER */}
          <g filter="url(#ink-blur-heavy)" opacity="0.10">
            <path
              d="M-50 480C180 420 340 560 520 480C720 390 960 520 1180 450C1380 390 1520 540 1680 480"
              stroke="#163A2A"
              strokeWidth="64"
              strokeLinecap="round"
            />
            <path
              d="M740 180C860 80 1020 140 1140 280C1260 420 1120 580 980 540C840 500 810 320 940 240"
              stroke="#43C98B"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* MID BLUR: Expressive Cursive Text & Florid Stroke Groups */}
          <g filter="url(#ink-blur-mid)" opacity="0.09">
            {/* Flowing handwritten cursive word "Rubric" in lime ink */}
            <path
              d="M1020 180C1020 140 1050 120 1090 120C1130 120 1150 150 1140 190C1130 240 1070 340 1030 420M1070 240C1120 220 1180 210 1230 250C1270 280 1260 340 1220 370C1180 400 1120 380 1100 320M1240 280C1280 260 1330 270 1350 310C1370 350 1340 400 1290 410C1250 420 1220 380 1240 330M1360 280C1400 240 1440 230 1470 260C1490 280 1480 320 1450 340C1420 360 1380 350 1370 310M1480 260L1450 380C1440 410 1460 430 1490 420C1520 410 1550 370 1570 330"
              stroke="#D5F36A"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Signature flourish running diagonally in emerald */}
            <path
              d="M160 520C280 460 420 490 540 580C660 670 790 620 910 540C1040 450 1180 480 1310 560C1440 640 1520 600 1620 520"
              stroke="#43C98B"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Broad calligraphic pen strokes (Left outer rail) in emerald */}
            <path
              d="M-40 240C60 280 140 220 190 140C230 70 290 80 310 150C330 230 260 340 180 390C100 440 20 410 60 310C100 220 220 160 340 180"
              stroke="#43C98B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* CRISP ACADEMIC DOODLES & ANNOTATIONS */}
          <g filter="url(#ink-blur-fine)" opacity="0.08">
            {/* Physics Concave Mirror Ray Diagram (Right edge bleed) */}
            <path d="M1200 420H1560" stroke="#B5C0B8" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.6" />
            <path d="M1480 290C1460 360 1460 480 1480 550" stroke="#43C98B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M1240 350H1468L1320 420L1240 450" stroke="#D5F36A" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="1320" cy="420" r="2.8" fill="#43C98B" />
            <text x="1312" y="445" fontFamily="var(--font-mono)" fontSize="12" fill="#B5C0B8">F (Focus)</text>
            <circle cx="1240" cy="420" r="2.8" fill="#43C98B" />
            <text x="1232" y="445" fontFamily="var(--font-mono)" fontSize="12" fill="#43C98B">C (2F)</text>

            {/* Circuit Ohm's Law Doodle in Acid Lime */}
            <text x="110" y="740" fontFamily="var(--font-mono)" fontSize="24" fill="#D5F36A">
              V = I · R  |  P = V²/R
            </text>
            <text x="110" y="775" fontFamily="var(--font-mono)" fontSize="14" fill="#B5C0B8">
              1/R_p = 1/R₁ + 1/R₂  (Parallel Derivation)
            </text>
            <path d="M105 790C210 786 320 794 430 788" stroke="#D5F36A" strokeWidth="1.75" strokeLinecap="round" />

            {/* Subtle Lime & Emerald speckles */}
            <circle cx="1450" cy="620" r="2.0" fill="#43C98B" />
            <circle cx="1465" cy="635" r="1.3" fill="#D5F36A" />
            <circle cx="1440" cy="645" r="1.6" fill="#D5F36A" />

            {/* Hand-sketched checkmark badge in Lime */}
            <path d="M520 320L540 340L580 295" stroke="#D5F36A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="595" y="325" fontFamily="var(--font-mono)" fontSize="13" fill="#D5F36A">
              Step 1: Formula (+1.0m)
            </text>
          </g>
        </svg>
      </div>

      {/* ============================================================
          SECTION 3: FEATURES BENTO & CORE ENGINE (35% - 55%)
          Large looping calligraphic letterforms ("10th"), circle geometry,
          spray stippling, and calculus limits.
          ============================================================ */}
      <div className="graffiti-cluster cluster-features-bento">
        <svg
          viewBox="0 0 1600 1150"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR WASH */}
          <g filter="url(#ink-blur-heavy)" opacity="0.10">
            <path
              d="M180 220C420 140 680 280 940 180C1180 80 1420 240 1640 160"
              stroke="#163A2A"
              strokeWidth="58"
              strokeLinecap="round"
            />
            <path
              d="M-80 620C140 520 380 680 620 580C860 480 1120 640 1380 540"
              stroke="#43C98B"
              strokeWidth="38"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>

          {/* MID BLUR: Flowing Calligraphy & Oversized Letters */}
          <g filter="url(#ink-blur-mid)" opacity="0.09">
            {/* Massive Calligraphic "10th" across the bento backdrop */}
            <text
              x="80"
              y="440"
              fontFamily="var(--font-display)"
              fontSize="240"
              fontWeight="900"
              fill="none"
              stroke="#276447"
              strokeWidth="3.5"
              letterSpacing="-8"
            >
              10th
            </text>

            {/* Elegant horizontal swash in Acid Lime */}
            <path
              d="M60 470C240 450 480 490 720 460C960 430 1200 480 1440 450C1520 440 1580 410 1620 430"
              stroke="#D5F36A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Overlapping cursive loops in subtle emerald */}
            <path
              d="M980 120C1060 60 1160 80 1200 160C1240 240 1180 340 1080 380C980 420 880 340 920 240C960 140 1100 80 1240 110C1380 140 1480 260 1440 380"
              stroke="#43C98B"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* CRISP ACADEMIC DETAILS */}
          <g filter="url(#ink-blur-fine)" opacity="0.08">
            {/* Circle Theorem: Tangent Perpendicular to Radius (Thm 10.1) */}
            <circle cx="1380" cy="740" r="95" stroke="#B5C0B8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <path d="M1250 835H1510" stroke="#43C98B" strokeWidth="1.8" />
            <path d="M1380 740V835" stroke="#43C98B" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="1368" y="823" width="12" height="12" stroke="#43C98B" strokeWidth="0.8" />
            <text x="1395" y="820" fontFamily="var(--font-mono)" fontSize="12" fill="#B5C0B8">
              Radius ⊥ Tangent (Thm 10.1)
            </text>

            {/* Mathematical Summation and Limits doodle in Lime */}
            <text x="820" y="820" fontFamily="var(--font-mono)" fontSize="30" fill="#D5F36A">
              lim (x→0) [sin(x)/x] = 1
            </text>
            <text x="820" y="855" fontFamily="var(--font-mono)" fontSize="15" fill="#B5C0B8">
              Standard Trigonometric Evaluation Rubric
            </text>

            {/* Stipple & Speckle cluster in Emerald & Lime */}
            <circle cx="720" cy="410" r="1.8" fill="#43C98B" />
            <circle cx="735" cy="425" r="1.2" fill="#D5F36A" />
            <circle cx="750" cy="405" r="2.0" fill="#D5F36A" />
            <circle cx="765" cy="420" r="1.0" fill="#43C98B" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          SECTION 4: MOCK EXAM PREVIEW & SUITE (55% - 73%)
          Examiner verification stamp in Emerald, "95%+", specimen notes,
          and distribution curve behind the mock exam papers.
          ============================================================ */}
      <div className="graffiti-cluster cluster-mock-exam">
        <svg
          viewBox="0 0 1600 1100"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR WASH */}
          <g filter="url(#ink-blur-heavy)" opacity="0.10">
            <path
              d="M-40 380C220 310 460 480 720 390C980 300 1240 450 1480 380C1580 350 1640 380 1680 410"
              stroke="#163A2A"
              strokeWidth="60"
              strokeLinecap="round"
            />
          </g>

          {/* MID BLUR: Examiner Verification & Signature Marks */}
          <g filter="url(#ink-blur-mid)" opacity="0.085">
            {/* Oversized "95%+" board target */}
            <text
              x="60"
              y="320"
              fontFamily="var(--font-display)"
              fontSize="190"
              fontWeight="900"
              fill="none"
              stroke="#276447"
              strokeWidth="3"
            >
              95%+
            </text>

            {/* Broad cursive loop running behind exam cards in emerald */}
            <path
              d="M420 320C540 260 680 280 780 360C880 440 960 410 1060 330C1160 250 1280 280 1380 380C1480 480 1560 450 1640 390"
              stroke="#43C98B"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Examiner Stamp outline in Emerald with dashed border */}
            <rect
              x="1220"
              y="140"
              width="260"
              height="110"
              rx="12"
              stroke="#43C98B"
              strokeWidth="2.2"
              strokeDasharray="8 6"
            />
          </g>

          {/* CRISP EXAM DOODLES */}
          <g filter="url(#ink-blur-fine)" opacity="0.08">
            <text
              x="1250"
              y="190"
              fontFamily="var(--font-mono)"
              fontSize="18"
              fontWeight="700"
              fill="#43C98B"
              letterSpacing="2"
            >
              VERIFIED RUBRIC
            </text>
            <text
              x="1255"
              y="222"
              fontFamily="var(--font-mono)"
              fontSize="13"
              fill="#D5F36A"
            >
              CBSE &amp; ICSE SPECIMEN 2027
            </text>

            {/* Normal distribution topper score curve in Lime & Emerald */}
            <path
              d="M720 540C800 540 840 410 920 410C1000 410 1040 540 1120 540"
              stroke="#D5F36A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M660 540H1180" stroke="#43C98B" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
            <text x="880" y="395" fontFamily="var(--font-mono)" fontSize="13" fill="#D5F36A">
              μ = 80 Marks (Mean Standard)
            </text>

            {/* Paint speckles */}
            <circle cx="1200" cy="270" r="2.0" fill="#43C98B" />
            <circle cx="1215" cy="282" r="1.3" fill="#D5F36A" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          SECTION 5: NEWS, PRICING & REVIEWS (73% - 88%)
          Currency calligraphy swashes, "100%", step-marking ticks,
          and lime checkmarks.
          ============================================================ */}
      <div className="graffiti-cluster cluster-pricing-reviews">
        <svg
          viewBox="0 0 1600 1050"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR WASH */}
          <g filter="url(#ink-blur-heavy)" opacity="0.10">
            <path
              d="M140 240C380 180 620 320 860 220C1100 120 1340 280 1580 200"
              stroke="#163A2A"
              strokeWidth="54"
              strokeLinecap="round"
            />
            <path
              d="M-60 580C160 510 380 640 600 560C820 480 1060 620 1280 540"
              stroke="#43C98B"
              strokeWidth="36"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>

          {/* MID BLUR: Calligraphic Swashes & Text Highlights */}
          <g filter="url(#ink-blur-mid)" opacity="0.085">
            {/* Expressive currency flourish & "100%" */}
            <text
              x="1220"
              y="420"
              fontFamily="var(--font-display)"
              fontSize="160"
              fontWeight="900"
              fill="none"
              stroke="#276447"
              strokeWidth="2.75"
            >
              100%
            </text>

            <path
              d="M80 340C220 280 380 360 520 300C660 240 820 320 960 260C1120 200 1320 280 1480 220"
              stroke="#43C98B"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>

          {/* CRISP INK ACCENTS */}
          <g filter="url(#ink-blur-fine)" opacity="0.08">
            <text x="140" y="460" fontFamily="var(--font-mono)" fontSize="18" fill="#D5F36A">
              ✓ No Token Markup · 100% Deterministic Marking
            </text>
            <text x="140" y="495" fontFamily="var(--font-mono)" fontSize="13" fill="#B5C0B8">
              Step scores awarded per official marking scheme keys
            </text>

            {/* Subtle speckles in Emerald & Lime */}
            <circle cx="1180" cy="440" r="2.2" fill="#43C98B" />
            <circle cx="1195" cy="452" r="1.4" fill="#D5F36A" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          SECTION 6: FAQS & FOOTER (88% - 100%)
          Calligraphic terminal flourish, subtle emerald arcs,
          dissolving softly into the bottom edge blur effect.
          ============================================================ */}
      <div className="graffiti-cluster cluster-faq-footer">
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMin slice"
          className="cluster-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEEP BLUR LAYER */}
          <g filter="url(#ink-blur-heavy)" opacity="0.09">
            <path
              d="M-50 280C210 220 440 360 680 290C920 220 1160 340 1420 280C1540 250 1620 290 1680 320"
              stroke="#163A2A"
              strokeWidth="52"
              strokeLinecap="round"
            />
          </g>

          {/* MID BLUR: Terminal Calligraphic Flourish */}
          <g filter="url(#ink-blur-mid)" opacity="0.08">
            <path
              d="M120 380C280 320 440 420 620 350C800 280 980 380 1160 310C1340 240 1520 340 1640 290"
              stroke="#43C98B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Abstract cursive concluding flourish in Emerald */}
            <path
              d="M740 180C820 120 920 140 960 220C1000 300 940 400 840 440C740 480 640 400 680 300C720 200 860 140 1000 170"
              stroke="#43C98B"
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* CRISP INK MARKS */}
          <g filter="url(#ink-blur-fine)" opacity="0.08">
            <text
              x="220"
              y="260"
              fontFamily="var(--font-mono)"
              fontSize="16"
              fill="#D5F36A"
              letterSpacing="1"
            >
              Σ (Marks) = Topper Benchmark (80/80)
            </text>
            <circle cx="200" cy="255" r="2.8" fill="#43C98B" />
          </g>
        </svg>
      </div>
    </div>
  );
}
