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
        <div className="section-head text-center">
          <div className="pill-badge pill-butter mb-3">
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
        <div className="bento-grid">
          
          {/* Card 1: Large Span (Handwriting OCR & Step Scheme) */}
          <div className="bento-card bento-span-2 card-pastel-sage">
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
          <div className="bento-card card-pastel-lavender">
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
          <div className="bento-card card-pastel-peach">
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
          <div className="bento-card bento-span-2 card-pastel-butter">
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
        .bento-section {
          background: #fbfbf9;
        }

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
          border: 1px solid var(--border-light);
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

        /* Pastel Card Backgrounds */
        .card-pastel-sage {
          background: linear-gradient(135deg, #ffffff 0%, #f1f8f3 100%);
          border-color: var(--pastel-sage-border);
        }

        .card-pastel-lavender {
          background: linear-gradient(135deg, #ffffff 0%, #f4f2fe 100%);
          border-color: var(--pastel-lavender-border);
        }

        .card-pastel-peach {
          background: linear-gradient(135deg, #ffffff 0%, #fff2eb 100%);
          border-color: var(--pastel-peach-border);
        }

        .card-pastel-butter {
          background: linear-gradient(135deg, #ffffff 0%, #fef9e8 100%);
          border-color: var(--pastel-butter-border);
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
          background: #ffffff;
          border: 1px dashed var(--pastel-sage-border);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #243b2f;
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
          background: var(--pastel-sage);
          color: var(--brand-emerald);
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
          background: #ffffff;
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
          color: #4c3fb5;
          background: var(--pastel-lavender);
          padding: 2px 6px;
          border-radius: var(--radius-full);
        }

        /* Earning */
        .earning-snapshot {
          background: #ffffff;
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
          color: #a14c24;
        }

        /* Radar Grid */
        .radar-grid-visual {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .radar-badge-card {
          background: #ffffff;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          border: 1px solid rgba(0, 0, 0, 0.04);
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
