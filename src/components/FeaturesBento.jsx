import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeaturesBento({ onOpenDemoExam }) {
  return (
    <section className="editorial-features-section" id="features">
      <div className="app-container">
        
        {/* Section Header: Pure Soft White Heading (#E8EEE9) with Restrained Lime Indicator */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-lime font-bold tracking-wider">CORE CAPABILITIES</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title">
              Engineered for Zero Mark Loss
            </h2>
          </div>

          <p className="section-subtitle">
            Every feature on Quanverse is calibrated to turn raw board effort into verified 95%+ marks.
          </p>
        </div>

        {/* Master Architectural Grid Frame: Strict 2x2 Grid with Equal-Sized Cards */}
        <div className="editorial-features-grid">
          
          <div className="capabilities-columns-grid">
            
            {/* Cell 1: Top-Left (Optical OCR) - Default: Text, Hover: Halftone Artwork */}
            <div className="capability-cell bento-card-default">
              {/* Halftone Artwork Image (Revealed on Hover) */}
              <div className="capability-image-layer" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-ocr.png" 
                  alt="Optical OCR Artwork" 
                  className="capability-cell-img"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="capability-cell-content">
                <div className="cell-text-block">
                  <div className="cell-top-meta font-mono text-xs">
                    <span className="text-accent-lime font-semibold uppercase tracking-wider">
                      [01 / OPTICAL OCR]
                    </span>
                  </div>

                  <h3 className="cell-title">
                    Real Paper OCR Recognition
                  </h3>

                  <p className="cell-desc">
                    Snap your handwritten sheets for instant symbol, equation, and step-mark parsing.
                  </p>
                </div>

                <div className="preview-widget-paper font-mono text-xs">
                  <div className="paper-workings">
                    <div className="paper-line">Given: In △ABC, ∠B = 90°</div>
                    <div className="paper-line mt-1">AC² = (12)² + (5)² = 169 ⇒ AC = 13 cm</div>
                  </div>
                  <div className="paper-ai-tag">
                    <span className="dot-lime"></span>
                    <span>Step Award: +1.5 Marks Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 2: Top-Right (Pacing Analytics) - Diagonal Inverted: Artwork by default, Text on hover */}
            <div className="capability-cell bento-card-inverted">
              {/* Halftone Artwork Image (Shown by Default) */}
              <div className="capability-image-layer" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-step.png" 
                  alt="Pacing Analytics Artwork" 
                  className="capability-cell-img"
                  loading="lazy"
                />
              </div>

              {/* Text Content (Revealed on Hover, Crisp & Unobstructed) */}
              <div className="capability-cell-content">
                <div className="cell-text-block">
                  <div className="cell-top-meta font-mono text-xs">
                    <span className="text-accent-lime font-semibold uppercase tracking-wider">
                      [02 / PACING ANALYTICS]
                    </span>
                  </div>

                  <h3 className="cell-title">
                    Board Hall Pacing Analytics
                  </h3>

                  <p className="cell-desc">
                    Track section minute targets in real time to prevent rushed or incomplete long answers.
                  </p>
                </div>

                <div className="preview-widget-pacing font-mono text-xs">
                  <div className="pacing-item">
                    <div className="pacing-row">
                      <span className="pacing-sec-name">Section A (MCQs)</span>
                      <span className="badge-ideal">22 / 25 min</span>
                    </div>
                    <div className="pacing-track">
                      <div className="pacing-fill" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div className="pacing-item">
                    <div className="pacing-row">
                      <span className="pacing-sec-name">Section D (Long Ans)</span>
                      <span className="badge-ideal">45 / 45 min</span>
                    </div>
                    <div className="pacing-track">
                      <div className="pacing-fill" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 3: Bottom-Left (Topper Benchmark) - Diagonal Inverted: Artwork by default, Text on hover */}
            <div className="capability-cell bento-card-inverted">
              {/* Halftone Artwork Image (Shown by Default) */}
              <div className="capability-image-layer" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-schemes.png" 
                  alt="Topper Benchmark Artwork" 
                  className="capability-cell-img"
                  loading="lazy"
                />
              </div>

              {/* Text Content (Revealed on Hover, Crisp & Unobstructed) */}
              <div className="capability-cell-content">
                <div className="cell-text-block">
                  <div className="cell-top-meta font-mono text-xs">
                    <span className="text-accent-lime font-semibold uppercase tracking-wider">
                      [03 / TOPPER BENCHMARK]
                    </span>
                  </div>

                  <h3 className="cell-title">
                    100/100 Model Answer Benchmark
                  </h3>

                  <p className="cell-desc">
                    Compare your working side by side with state topper scripts to master official notation.
                  </p>
                </div>

                <div className="preview-widget-topper font-mono text-xs">
                  <div className="topper-row">
                    <span className="topper-label">Your Working</span>
                    <span className="topper-marks text-muted">2.0 / 3.0 (-1m skipped step)</span>
                  </div>
                  <div className="topper-divider"></div>
                  <div className="topper-row">
                    <span className="topper-label text-accent-lime font-semibold">Topper Exemplar</span>
                    <span className="topper-marks text-accent-lime font-bold">3.0 / 3.0 Full Marks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 4: Bottom-Right (Diagnostic Radar) - Default: Text, Hover: Halftone Artwork */}
            <div className="capability-cell bento-card-default">
              {/* Halftone Artwork Image (Revealed on Hover) */}
              <div className="capability-image-layer" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-blueprints.png" 
                  alt="Diagnostic Radar Artwork" 
                  className="capability-cell-img"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="capability-cell-content">
                <div className="cell-text-block">
                  <div className="cell-top-meta font-mono text-xs">
                    <span className="text-accent-lime font-semibold uppercase tracking-wider">
                      [04 / DIAGNOSTIC RADAR]
                    </span>
                  </div>

                  <h3 className="cell-title">
                    Chapter Weakness Radar
                  </h3>

                  <p className="cell-desc">
                    Isolate subtopics leaking half-marks and assign five-minute targeted recovery drills.
                  </p>
                </div>

                <div className="preview-widget-radar font-mono text-xs">
                  <div className="radar-item">
                    <div className="radar-header">
                      <span className="radar-name">Trigonometry Identities</span>
                      <span className="radar-badge-verified">94% Mastery</span>
                    </div>
                    <div className="radar-track">
                      <div className="radar-fill" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="radar-item">
                    <div className="radar-header">
                      <span className="radar-name">Carbon Compounds</span>
                      <span className="radar-badge-leak">58% Leak</span>
                    </div>
                    <div className="radar-track">
                      <div className="radar-fill radar-fill-leak" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Master Grid Footer Action Row */}
          <div className="features-grid-footer">
            <div className="footer-lead font-mono text-xs text-muted">
              Test your Class 10 working against official examiner rubrics.
            </div>
            <button
              type="button"
              className="btn btn-emerald"
              onClick={onOpenDemoExam}
            >
              <span>Attempt Interactive Mock Exam</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>

      <style>{`
        .editorial-features-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-features-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        /* ── Monochromatic Pure Soft White Headings (#E8EEE9) ── */
        .editorial-features-section .section-title {
          font-size: clamp(1.85rem, 3vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #E8EEE9 !important;
          margin-bottom: 0.65rem;
          background: none !important;
          -webkit-text-fill-color: initial !important;
        }

        .editorial-features-section .section-subtitle {
          font-size: clamp(0.92rem, 1.15vw, 1.02rem);
          color: #8F9D93;
          max-width: 600px;
          line-height: 1.55;
        }

        /* ── Master Architectural Editorial Grid Frame (Continuous borders, 0px radius) ── */
        .editorial-features-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16) !important;
          border-radius: 0px !important;
          background: rgba(7, 17, 13, 0.45) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* ── 2x2 Grid with Equal-Sized Cards (Zero Gaps, Connected Cell Walls) ── */
        .capabilities-columns-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          background: transparent;
        }

        .capability-cell {
          position: relative;
          padding: clamp(1.85rem, 3vw, 2.65rem);
          min-height: 340px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          background: transparent;
          overflow: hidden;
          transition: background-color 220ms ease;
        }

        /* Interior dividing borders */
        .capability-cell:nth-child(2n) {
          border-right: none;
        }

        .capability-cell:nth-child(3),
        .capability-cell:nth-child(4) {
          border-bottom: none;
        }

        /* Tactile bottom 2px lime indicator line on hover (Zuse Reference) */
        .capability-cell::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: var(--color-lime, #D5F36A);
          opacity: 0;
          z-index: 10;
          pointer-events: none;
          transition: opacity 0.22s ease;
        }

        .capability-cell:hover::after {
          opacity: 1;
        }

        /* Content Layer with Generous Vertical Rhythm */
        .capability-cell-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          position: relative;
          z-index: 2;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cell-text-block {
          display: flex;
          flex-direction: column;
        }

        .cell-top-meta {
          margin-bottom: 0.85rem;
          height: 16px;
          display: flex;
          align-items: center;
        }

        /* Pure Soft White Heading (#E8EEE9) */
        .cell-title {
          font-size: clamp(1.18rem, 1.45vw, 1.32rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          color: #E8EEE9 !important;
          line-height: 1.35;
          margin: 0 0 0.85rem 0;
          background: none !important;
          -webkit-text-fill-color: initial !important;
        }

        .cell-desc {
          font-size: 0.88rem;
          color: #8F9D93;
          line-height: 1.55;
          margin: 0 0 1.75rem 0;
          max-width: 95%;
        }

        /* Halftone Artwork Layer Confined to Card */
        .capability-image-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background: #040d0a;
          overflow: hidden;
          pointer-events: none;
          transition: opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .capability-cell-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }

        /* ─── DIAGONAL INVERTED HOVER BEHAVIOR ─── */
        
        /* Diagonal Pair 1: Cell 1 (Top-Left) & Cell 4 (Bottom-Right) */
        /* DEFAULT: Text visible. HOVER: Artwork image visible. */
        .bento-card-default .capability-cell-content {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }

        .bento-card-default .capability-image-layer {
          opacity: 0;
          pointer-events: none;
        }

        .bento-card-default .capability-cell-img {
          transform: scale(1.06);
        }

        .bento-card-default:hover .capability-cell-content {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: scale(0.97);
        }

        .bento-card-default:hover .capability-image-layer {
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        .bento-card-default:hover .capability-cell-img {
          transform: scale(1);
        }

        /* Diagonal Pair 2: Cell 2 (Top-Right) & Cell 3 (Bottom-Left) */
        /* DEFAULT: Artwork image visible. HOVER: Text visible (Crisp & Unobstructed). */
        .bento-card-inverted .capability-image-layer {
          opacity: 1;
          pointer-events: auto;
        }

        .bento-card-inverted .capability-cell-img {
          transform: scale(1);
        }

        .bento-card-inverted .capability-cell-content {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.97);
          /* Dedicated backdrop when revealed to guarantee crisp contrast */
          background: rgba(7, 17, 13, 0.94);
          position: absolute;
          inset: 0;
          padding: inherit;
          box-sizing: border-box;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .bento-card-inverted:hover .capability-image-layer {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .bento-card-inverted:hover .capability-cell-img {
          transform: scale(1.06);
        }

        .bento-card-inverted:hover .capability-cell-content {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: scale(1);
        }

        /* ── Minimal Breathable Preview Widgets: All 4 Rectangles Identically Sized ── */
        .preview-widget-paper,
        .preview-widget-pacing,
        .preview-widget-topper,
        .preview-widget-radar {
          background: rgba(11, 36, 26, 0.55);
          border: 1px solid rgba(190, 220, 200, 0.12);
          border-radius: 6px;
          padding: 1.15rem 1.25rem;
          min-height: 124px;
          box-sizing: border-box;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Widget 1: Paper OCR Details */
        .paper-workings {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .paper-line {
          color: #E8EEE9;
          font-size: 0.76rem;
          line-height: 1.4;
        }

        .paper-ai-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.25rem 0.65rem;
          background: rgba(16, 71, 52, 0.6);
          border: 1px solid rgba(167, 243, 196, 0.3);
          border-radius: 4px;
          color: #D5F36A;
          font-size: 0.72rem;
          font-weight: 600;
          width: fit-content;
        }

        .dot-lime {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D5F36A;
          box-shadow: 0 0 6px rgba(213, 243, 106, 0.6);
        }

        /* Widget 2: Pacing Details */
        .pacing-item {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .pacing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #E8EEE9;
          font-size: 0.78rem;
          line-height: 1.2;
        }

        .pacing-sec-name {
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .pacing-track {
          width: 100%;
          height: 5px;
          background: rgba(190, 220, 200, 0.12);
          border-radius: 3px;
          overflow: hidden;
          margin: 0;
        }

        .pacing-fill {
          height: 100%;
          background: var(--accent-lime, #D5F36A);
          border-radius: 3px;
          box-shadow: 0 0 8px rgba(213, 243, 106, 0.35);
        }

        .badge-ideal {
          font-size: 0.72rem;
          font-weight: 600;
          color: #D5F36A;
          background: rgba(16, 71, 52, 0.6);
          padding: 2.5px 8px;
          border-radius: 4px;
          border: 1px solid rgba(213, 243, 106, 0.35);
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        /* Widget 3: Topper Benchmark Details */
        .topper-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #E8EEE9;
          font-size: 0.78rem;
          line-height: 1.2;
        }

        .topper-label {
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .topper-marks {
          font-size: 0.72rem;
        }

        .topper-divider {
          width: 100%;
          height: 1px;
          background: rgba(190, 220, 200, 0.12);
          margin: 0.25rem 0;
        }

        /* Widget 4: Diagnostic Radar Details */
        .radar-item {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .radar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #E8EEE9;
          font-size: 0.78rem;
          line-height: 1.2;
        }

        .radar-name {
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .radar-badge-verified {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-emerald, #43C98B);
          background: rgba(16, 71, 52, 0.6);
          padding: 2.5px 8px;
          border-radius: 4px;
          border: 1px solid rgba(67, 201, 139, 0.35);
          white-space: nowrap;
        }

        .radar-badge-leak {
          font-size: 0.72rem;
          font-weight: 600;
          color: #D5F36A;
          background: rgba(16, 71, 52, 0.6);
          padding: 2.5px 8px;
          border-radius: 4px;
          border: 1px solid rgba(213, 243, 106, 0.35);
          white-space: nowrap;
        }

        .radar-track {
          width: 100%;
          height: 5px;
          background: rgba(190, 220, 200, 0.12);
          border-radius: 3px;
          overflow: hidden;
          margin: 0;
        }

        .radar-fill {
          height: 100%;
          background: var(--accent-emerald, #43C98B);
          border-radius: 3px;
          box-shadow: 0 0 8px rgba(67, 201, 139, 0.35);
        }

        .radar-fill-leak {
          background: var(--accent-lime, #D5F36A);
          box-shadow: 0 0 8px rgba(213, 243, 106, 0.35);
        }

        /* ── Grid Footer Action Row ── */
        .features-grid-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.95rem clamp(1.2rem, 2vw, 1.85rem);
          background: rgba(11, 36, 26, 0.45);
          border-top: 1px solid rgba(190, 220, 200, 0.14);
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        /* ── Responsive Breakpoints ── */
        @media (max-width: 900px) {
          .editorial-features-section {
            padding: clamp(2rem, 4vw, 2.75rem) 0;
          }

          .capabilities-columns-grid {
            grid-template-columns: 1fr;
          }

          .capability-cell {
            border-right: none !important;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14) !important;
            min-height: 290px;
          }

          .capability-cell:last-child {
            border-bottom: none !important;
          }

          .preview-widget-radar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
