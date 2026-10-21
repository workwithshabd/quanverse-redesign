import React from 'react';
import { 
  ScanLine, 
  Clock4, 
  Sparkles, 
  BarChart, 
  Award
} from 'lucide-react';

export default function FeaturesBento({ onOpenDemoExam: _onOpenDemoExam }) {
  return (
    <section className="bento-section section-spacing" id="features">
      <div className="app-container">
        
        {/* Section Header */}
        <div className="section-head text-center gsap-reveal">
          <div className="pill-badge pill-butter mb-3 gsap-float">
            <Sparkles size={14} />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="highlight-text">Zero Mark Loss</span>
          </h2>
          <p className="section-subtitle">
            Every feature on Quanverse is calibrated to turn raw board effort into verified 95%+ marks.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid gsap-stagger-group">
          
          {/* Card 1: Large Span (Handwriting OCR & Step Scheme) */}
          <div className="bento-card bento-span-2 card-pastel-sage gsap-stagger-item">
            <div className="bento-content">
              <div className="pill-badge pill-sage mb-3">
                <ScanLine size={13} />
                <span>Multimodal Handwriting OCR</span>
              </div>
              <h3 className="bento-title">Write On Real Paper. Upload In 5 Seconds.</h3>
              <p className="bento-desc">
                Board exams are written on paper, not screens. Snap a photo of your notebook sheet — our optical recognition engine extracts your handwriting, parses mathematical symbols, chemical equations, and geometrical steps with 99.4% accuracy.
              </p>
              
              <div className="bento-visual-paper">
                <div className="paper-sample">
                  <div className="paper-line">Step 1: In △ABC and △PQR, ∠B = ∠Q = 90°</div>
                  <div className="paper-line">By Pythagoras Theorem: AC² = AB² + BC²</div>
                  <div className="paper-ai-tag">
                    <span className="dot dot-green"></span>
                    <span>AI Step Award: +1.5 Marks (Criterion Satisfied)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Timer & Exam Hall Simulation */}
          <div className="bento-card card-pastel-lavender gsap-stagger-item">
            <div className="bento-content">
              <div className="pill-badge pill-lavender mb-3">
                <Clock4 size={13} />
                <span>Board Hall Pressure</span>
              </div>
              <h3 className="bento-title">Pacing Analytics</h3>
              <p className="bento-desc">
                Learn how many minutes to spend on 1-mark MCQs vs 5-mark long answers. Never leave Section E half-done.
              </p>
              <div className="pacing-bars">
                <div className="pacing-row">
                  <span>Sec A (MCQ): 22 min</span>
                  <span className="badge-ideal">Ideal Pace</span>
                </div>
                <div className="pacing-row">
                  <span>Sec D (5 Marks): 45 min</span>
                  <span className="badge-ideal">Optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Official Topper Answer Comparison */}
          <div className="bento-card card-pastel-peach gsap-stagger-item">
            <div className="bento-content">
              <div className="pill-badge pill-peach mb-3">
                <Award size={13} />
                <span>Official Topper Benchmark</span>
              </div>
              <h3 className="bento-title">Compare With 100/100 Model Answers</h3>
              <p className="bento-desc">
                See side-by-side how CBSE &amp; ICSE state toppers presented the exact same answer, including diagram labeling and step margins.
              </p>
              <div className="earning-snapshot">
                <span className="earn-title">Topper Presentation Bonus:</span>
                <span className="earn-amount text-peach">+6 to +12 Marks Saved</span>
              </div>
            </div>
          </div>


          {/* Card 4: Large Span (Weakness Radar) */}
          <div className="bento-card bento-span-2 card-pastel-butter gsap-stagger-item">
            <div className="bento-content">
              <div className="pill-badge pill-butter mb-3">
                <BarChart size={13} />
                <span>Chapter-Wise Diagnostic Radar</span>
              </div>
              <h3 className="bento-title">Find Exactly Where Marks Are Leaking</h3>
              <p className="bento-desc">
                Don't waste 20 hours re-reading an entire 150-page textbook. Quanverse isolates the exact 3-mark derivation or ray diagram subtopic causing mark drops and assigns 5-minute micro-drills to fix it permanently.
              </p>

              <div className="radar-grid-visual">
                <div className="radar-badge-card">
                  <span className="radar-sub">Trigonometry Identities</span>
                  <span className="radar-score text-emerald">94% Mastery</span>
                </div>
                <div className="radar-badge-card">
                  <span className="radar-sub">Carbon &amp; Its Compounds</span>
                  <span className="radar-score text-peach">58% (Step Loss in Isomers)</span>
                </div>
                <div className="radar-badge-card">
                  <span className="radar-sub">Electricity &amp; Circuits</span>
                  <span className="radar-score text-emerald">88% (Mastered)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .bento-card {
          border-radius: var(--radius-xl);
          padding: clamp(1.5rem, 3vw, 2.25rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1.5px solid var(--border-light);
          transition: all var(--transition-smooth);
          position: relative;
          overflow: hidden;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .bento-span-2 {
          grid-column: span 2;
        }

        /* Bento Card Backgrounds - Directly Mapped to the 4 Colors */
        .card-pastel-sage {
          /* Color 1: Mint */
          background: linear-gradient(145deg, #f2fcf7 0%, rgba(170, 255, 199, 0.45) 100%);
          border-color: rgb(103, 192, 144);
          box-shadow: 0 12px 32px -8px rgba(103, 192, 144, 0.2);
        }

        .card-pastel-lavender {
          /* Color 3: Pine Teal */
          background: linear-gradient(145deg, #f2f7f7 0%, rgba(33, 91, 99, 0.12) 100%);
          border-color: rgba(33, 91, 99, 0.35);
          box-shadow: 0 12px 32px -8px rgba(33, 91, 99, 0.18);
        }

        .card-pastel-peach {
          /* Color 4: Oceanic Navy */
          background: linear-gradient(145deg, #f2f6fa 0%, rgba(18, 65, 112, 0.10) 100%);
          border-color: rgba(18, 65, 112, 0.32);
          box-shadow: 0 12px 32px -8px rgba(18, 65, 112, 0.18);
        }

        .card-pastel-butter {
          /* Color 2: Jade Green */
          background: linear-gradient(145deg, #f0faf4 0%, rgba(103, 192, 144, 0.26) 100%);
          border-color: rgb(103, 192, 144);
          box-shadow: 0 12px 32px -8px rgba(103, 192, 144, 0.2);
        }

        .bento-title {
          font-size: 1.4rem;
          margin-bottom: 0.65rem;
          color: var(--text-main);
        }

        .bento-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        /* Paper Visual */
        .bento-visual-paper {
          background: #f4fbf7;
          border: 1.5px dashed rgb(103, 192, 144);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: rgb(18, 65, 112);
        }

        .paper-sample {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .paper-ai-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
          padding: 0.3rem 0.65rem;
          background: rgba(170, 255, 199, 0.5);
          color: rgb(18, 65, 112);
          border: 1px solid rgb(103, 192, 144);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          width: fit-content;
        }

        /* Pacing */
        .pacing-bars {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          background: #f3f7f8;
          border: 1px solid rgba(33, 91, 99, 0.25);
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
        }

        .pacing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .badge-ideal {
          font-size: 0.7rem;
          font-weight: 700;
          color: rgb(18, 65, 112);
          background: rgba(170, 255, 199, 0.5);
          padding: 2px 7px;
          border-radius: var(--radius-full);
          border: 1px solid rgb(103, 192, 144);
        }

        /* Earning */
        .earning-snapshot {
          background: #f2f6fa;
          border: 1px solid rgba(18, 65, 112, 0.25);
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .earn-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .earn-amount {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          color: rgb(18, 65, 112);
        }

        /* Radar Grid */
        .radar-grid-visual {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .radar-badge-card {
          background: #f3faf5;
          border: 1px solid rgba(103, 192, 144, 0.35);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .radar-sub {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .radar-score {
          font-size: 0.75rem;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-span-2 {
            grid-column: span 1;
          }
          .radar-grid-visual {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
