import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export default function MockExamSuite({ onOpenDemoExam }) {
  const [boardFilter, setBoardFilter] = useState('ALL');
  const [mockList, setMockList] = useState([]);

  useEffect(() => {
    api.getMockExams({ board: boardFilter }).then(data => {
      setMockList(data);
    });
  }, [boardFilter]);

  const filteredMocks = boardFilter === 'ALL' 
    ? mockList 
    : mockList.filter(m => m.board === boardFilter);

  return (
    <section className="editorial-mock-section" id="mock-tests">
      <div className="app-container">

        {/* Section Header & Board Tabs */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-emerald font-bold">EXAMINATION SUITE</span>
          </div>

          <div className="suite-header-flex">
            <div className="title-with-flourish">
              <h2 className="section-title text-main">
                Timed Full-Length Papers Written by Board Experts
              </h2>
            </div>

            {/* Board Filter Tabs */}
            <div className="board-filter-tabs font-mono text-xs">
              <button
                type="button"
                className={`filter-tab-btn ${boardFilter === 'ALL' ? 'active-tab' : ''}`}
                onClick={() => setBoardFilter('ALL')}
              >
                [ ALL BOARDS ]
              </button>
              <button
                type="button"
                className={`filter-tab-btn ${boardFilter === 'CBSE' ? 'active-tab' : ''}`}
                onClick={() => setBoardFilter('CBSE')}
              >
                [ CBSE CLASS 10 ]
              </button>
              <button
                type="button"
                className={`filter-tab-btn ${boardFilter === 'ICSE' ? 'active-tab' : ''}`}
                onClick={() => setBoardFilter('ICSE')}
              >
                [ ICSE CLASS 10 ]
              </button>
            </div>
          </div>

          <p className="section-subtitle">
            Full 80-mark, 3-hour exam environments with official section choices and step grading.
          </p>
        </div>

        {/* Master Editorial Grid Container */}
        <div className="editorial-mock-grid">

          {/* 1. Large Realistic Exam Interface Preview */}
          <div className="exam-interface-showcase">
            {/* Top Exam Header Status Bar */}
            <div className="exam-chrome-header font-mono text-xs">
              <div className="exam-meta-left">
                <span className="badge-board text-accent-emerald font-semibold">CBSE 2027 SPECIMEN</span>
                <span className="meta-sep text-muted">/</span>
                <span className="text-main font-semibold">MATHEMATICS STANDARD (041) — SET 1</span>
              </div>
              <div className="exam-meta-right">
                <span className="exam-timer text-accent-lime font-semibold flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>02:44:18 REMAINING</span>
                </span>
                <span className="meta-sep text-muted">/</span>
                <span className="text-muted">TOTAL: 80 MARKS</span>
              </div>
            </div>

            {/* Split Interface: Navigation Palette + Realistic Problem Statement + Rubric Pane */}
            <div className="exam-interface-body">
              {/* Left Navigator Pane */}
              <div className="exam-nav-pane font-mono text-xs">
                <div className="nav-sec-title text-muted mb-2">SECTIONS:</div>
                <div className="section-pills-list space-y-1 mb-4">
                  <div className="sec-pill sec-pill-active">
                    <span>Sec A (MCQ 1-20)</span>
                    <span className="text-lime">20/20</span>
                  </div>
                  <div className="sec-pill">
                    <span>Sec B (VSA 21-25)</span>
                    <span className="text-muted">5 Qs</span>
                  </div>
                  <div className="sec-pill">
                    <span>Sec C (SA 26-31)</span>
                    <span className="text-muted">6 Qs</span>
                  </div>
                  <div className="sec-pill">
                    <span>Sec D (LA 32-35)</span>
                    <span className="text-muted">4 Qs</span>
                  </div>
                  <div className="sec-pill">
                    <span>Sec E (Case 36-38)</span>
                    <span className="text-muted">3 Qs</span>
                  </div>
                </div>

                <div className="nav-palette-grid">
                  {[...Array(20)].map((_, i) => (
                    <span
                      key={i}
                      className={`palette-num ${i === 6 ? 'palette-current' : i < 6 ? 'palette-done' : ''}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center Realistic Question Statement & Response View */}
              <div className="exam-question-pane font-sans text-xs md:text-sm">
                <div className="question-header font-mono text-xs text-muted mb-2">
                  <span>QUESTION 07 / SECTION A</span>
                  <span className="badge-marks text-accent-lime font-semibold ml-2">[ 1 MARK · MCQ ]</span>
                </div>

                <div className="question-text text-main leading-relaxed mb-4">
                  <strong>Q.7:</strong> If the quadratic equation <code className="font-mono text-accent-lime bg-[rgba(213,243,106,0.12)] px-1.5 py-0.5 rounded border border-[rgba(213,243,106,0.25)]">x² - 2kx - 6 = 0</code> has <code className="font-mono text-accent-lime font-bold">x = 3</code> as one of its roots, then the value of <code className="font-mono text-accent-lime font-bold">k</code> is:
                </div>

                <div className="options-grid font-mono text-xs space-y-2 mb-4">
                  <div className="option-row">
                    <span className="option-letter">(A)</span>
                    <span>k = 1</span>
                  </div>
                  <div className="option-row option-selected border border-[rgba(213,243,106,0.35)] bg-[rgba(213,243,106,0.06)]">
                    <span className="option-letter text-accent-lime font-bold">(B)</span>
                    <span className="text-accent-lime font-bold">k = 1/2 (Correct: Substitute x = 3 ⇒ 9 - 6k - 6 = 0 ⇒ k = 1/2)</span>
                  </div>
                  <div className="option-row">
                    <span className="option-letter">(C)</span>
                    <span>k = 2</span>
                  </div>
                  <div className="option-row">
                    <span className="option-letter">(D)</span>
                    <span>k = -1/2</span>
                  </div>
                </div>

                <div className="question-footer-bar font-mono text-xs">
                  <span className="text-accent-emerald font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Step Award: +1.0 Mark (Root Substitution Criterion Verified)</span>
                  </span>
                  <span className="text-muted text-[11px]">Instant Neural Grading</span>
                </div>
              </div>

              {/* Right Examiner Rubric Pane */}
              <div className="exam-rubric-pane font-mono text-xs">
                <div className="rubric-header text-muted mb-2">OFFICIAL MARKING SCHEME:</div>
                <div className="rubric-step mb-3">
                  <div className="step-title text-main font-semibold">Step 1: Root Property</div>
                  <div className="step-desc text-muted">Since x = 3 is a root, it must satisfy the equation.</div>
                  <div className="step-score text-accent-emerald font-bold mt-1">+0.5 Mark</div>
                </div>
                <div className="rubric-step mb-4">
                  <div className="step-title text-main font-semibold">Step 2: Linear Isolation</div>
                  <div className="step-desc text-muted">3² - 2k(3) - 6 = 0 ⇒ 3 = 6k ⇒ k = 1/2.</div>
                  <div className="step-score text-accent-emerald font-bold mt-1">+0.5 Mark</div>
                </div>

                <button
                  type="button"
                  className="btn btn-emerald w-full justify-center mt-auto"
                  onClick={onOpenDemoExam}
                >
                  <span>Launch Live Full Exam</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Continuous 3-Column Question Banks Grid Underneath */}
          <div className="exam-papers-row">
            {filteredMocks.slice(0, 3).map((exam) => (
              <div key={exam.id} className="paper-grid-col">
                <div className="paper-top-meta font-mono text-xs mb-2">
                  <span className="text-lime font-semibold">[{exam.board} CLASS 10]</span>
                  <span className="text-muted">{exam.durationMinutes} MINS / {exam.totalMarks} MARKS</span>
                </div>

                <h3 className="paper-title text-main">
                  {exam.title}
                </h3>

                <p className="paper-desc text-muted">
                  Official {exam.board} 80-mark paper with step-marking breakdown.
                </p>

                <div className="paper-action-row font-mono text-xs mt-auto">
                  <button
                    type="button"
                    className="paper-launch-link text-lime flex items-center gap-1 hover:text-accent-lime-hover"
                    onClick={onOpenDemoExam}
                  >
                    <span>Attempt Full Paper</span>
                    <ArrowRight size={12} />
                  </button>
                  {exam.isFree && (
                    <span className="text-[11px] text-muted border border-[rgba(190,220,200,0.14)] px-1.5 py-0.5 rounded">
                      FREE DEMO
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .editorial-mock-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-mock-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        .suite-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .board-filter-tabs {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .filter-tab-btn {
          padding: 0.3rem 0.65rem;
          background: rgba(11, 36, 26, 0.4);
          border: 1px solid rgba(190, 220, 200, 0.14);
          color: #B5C0B8;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.72rem;
          transition: all 0.2s ease;
        }

        .filter-tab-btn:hover {
          border-color: rgba(67, 201, 139, 0.55);
          color: #F1F5F2;
          background-color: rgba(16, 71, 52, 0.45);
        }

        .filter-tab-btn.active-tab {
          background-color: rgba(16, 71, 52, 0.60);
          border-color: var(--color-lime);
          color: var(--color-lime);
        }

        /* Master Editorial Mock Grid */
        .editorial-mock-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* 1. Large Realistic Exam Showcase */
        .exam-interface-showcase {
          border-bottom: 1px solid rgba(190, 220, 200, 0.14);
        }

        .exam-chrome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 1rem;
          background: rgba(11, 36, 26, 0.6);
          border-bottom: 1px solid rgba(190, 220, 200, 0.12);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .exam-meta-left, .exam-meta-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .exam-interface-body {
          display: grid;
          grid-template-columns: 220px 1fr 260px;
        }

        /* Left Navigator */
        .exam-nav-pane {
          padding: 0.85rem 1rem;
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          background: rgba(7, 17, 13, 0.5);
        }

        .sec-pill {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          border: 1px solid transparent;
        }

        .sec-pill-active {
          background: rgba(16, 71, 52, 0.3);
          border-color: rgba(167, 243, 196, 0.25);
          color: #F1F5F2;
        }

        .nav-palette-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.25rem;
          margin-top: 0.65rem;
        }

        .palette-num {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          border: 1px solid rgba(190, 220, 200, 0.12);
          border-radius: 3px;
          color: #8F9D93;
          font-size: 0.68rem;
          transition: all 0.16s ease;
          cursor: pointer;
        }

        .palette-num:hover:not(.palette-current) {
          background-color: rgba(16, 71, 52, 0.35);
          background-image: radial-gradient(rgba(213, 243, 106, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
          border-color: rgba(67, 201, 139, 0.4);
          color: #F1F5F2;
        }

        .palette-done {
          background: rgba(16, 71, 52, 0.3);
          color: var(--accent-lime);
          border-color: rgba(167, 243, 196, 0.25);
        }

        .palette-current {
          background-color: var(--accent-lime);
          background-image: radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
          color: #07110D;
          font-weight: 700;
          border-color: var(--accent-lime);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        /* Center Question Pane */
        .exam-question-pane {
          padding: clamp(1.15rem, 2vw, 1.55rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .question-text {
          font-size: 0.95rem;
        }

        .option-row {
          padding: 0.45rem 0.75rem;
          border: 1px solid rgba(190, 220, 200, 0.12);
          border-radius: 4px;
          background: rgba(11, 36, 26, 0.2);
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .option-selected {
          border-color: rgba(167, 243, 196, 0.4);
          background: rgba(16, 71, 52, 0.25);
        }

        .question-footer-bar {
          margin-top: 0.75rem;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(190, 220, 200, 0.14);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        /* Right Rubric Pane */
        .exam-rubric-pane {
          padding: clamp(1rem, 1.8vw, 1.35rem);
          border-left: 1px solid rgba(190, 220, 200, 0.14);
          background: rgba(7, 17, 13, 0.5);
          display: flex;
          flex-direction: column;
        }

        .rubric-step {
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(190, 220, 200, 0.08);
        }

        /* 2. Three Aligned Papers Grid Underneath */
        .exam-papers-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .paper-grid-col {
          padding: clamp(1.4rem, 2.4vw, 1.95rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
          background: rgba(7, 17, 13, 0.4);
        }

        .paper-grid-col:last-child {
          border-right: none;
        }

        .paper-top-meta {
          min-height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .paper-title {
          min-height: auto;
          display: flex;
          align-items: flex-start;
          line-height: 1.3;
          margin-bottom: 0.35rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #F1F5F2;
        }

        .paper-desc {
          flex: 1;
          margin-bottom: 0.65rem;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #B5C0B8;
        }

        .paper-action-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(190, 220, 200, 0.1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .exam-interface-body {
            grid-template-columns: 1fr;
          }

          .exam-nav-pane {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .exam-rubric-pane {
            border-left: none;
            border-top: 1px solid rgba(190, 220, 200, 0.14);
          }

          .exam-papers-row {
            grid-template-columns: 1fr;
          }

          .paper-grid-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }

          .paper-grid-col:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
