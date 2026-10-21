import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Download 
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
    <section className="mock-suite-section section-spacing" id="mock-tests">
      <div className="app-container">
        
        {/* Header with Board Filter */}
        <div className="suite-header-row">
          <div>
            <div className="pill-badge pill-sky mb-2">
              <FileText size={13} />
              <span>Full-Length 80-Mark Tests</span>
            </div>
            <h2 className="section-title">
              Board-Standard <span className="highlight-text">Mock Exam Library</span>
            </h2>
            <p className="section-subtitle">
              Authentic 3-hour exam simulations. Take them online or upload handwriting for instant step grading.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-btn ${boardFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setBoardFilter('ALL')}
            >
              All Boards
            </button>
            <button
              type="button"
              className={`filter-btn ${boardFilter === 'CBSE' ? 'active' : ''}`}
              onClick={() => setBoardFilter('CBSE')}
            >
              CBSE Class 10
            </button>
            <button
              type="button"
              className={`filter-btn ${boardFilter === 'ICSE' ? 'active' : ''}`}
              onClick={() => setBoardFilter('ICSE')}
            >
              ICSE Class 10
            </button>
          </div>
        </div>

        {/* Mock Exam Cards Grid */}
        <div className="mocks-grid">
          {filteredMocks.map((exam) => (
            <div key={exam.id} className="mock-exam-card glass-panel">
              
              <div className="mock-card-top">
                <div className="mock-board-tag">
                  <span className={`pill-badge ${exam.board === 'CBSE' ? 'pill-sage' : 'pill-lavender'}`}>
                    {exam.board} Class 10
                  </span>
                  {exam.isFree && (
                    <span className="pill-badge pill-butter">Free First Attempt</span>
                  )}
                </div>

                <div className="mock-marks-badge">
                  <span className="marks-num">{exam.totalMarks}</span>
                  <span className="marks-lbl">Marks</span>
                </div>
              </div>

              <h3 className="mock-title">{exam.title}</h3>

              <div className="mock-specs-row">
                <div className="spec-item">
                  <Clock size={14} className="text-muted" />
                  <span>{exam.durationMinutes} Minutes</span>
                </div>
                <div className="spec-dot">•</div>
                <div className="spec-item">
                  <FileText size={14} className="text-muted" />
                  <span>{exam.questionsCount} Questions</span>
                </div>
                <div className="spec-dot">•</div>
                <div className="spec-item text-emerald font-semibold">
                  <span>{exam.difficulty}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mock-tags-list">
                {exam.tags.map((tg, i) => (
                  <span key={i} className="exam-tag-pill">{tg}</span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="mock-card-actions">
                <button
                  type="button"
                  className={`btn ${exam.isFree ? 'btn-primary' : 'btn-secondary'} w-full mock-launch-btn`}
                  onClick={onOpenDemoExam}
                >
                  {exam.isFree ? (
                    <>
                      <Sparkles size={16} className="text-butter" />
                      <span>Start Free Board Exam</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <Lock size={15} className="text-muted" />
                      <span>Unlock with Pass</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Banner: Blueprints Download */}
        <div className="blueprint-download-strip glass-panel">
          <div className="strip-content">
            <Download size={22} className="text-emerald" />
            <div>
              <h4 className="strip-title">Download CBSE &amp; ICSE 2027 Official Marking Blueprints</h4>
              <p className="strip-desc">Contains chapter-wise question weightage, internal choice patterns, and step mark distributions.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-pastel-sage"
            onClick={() => alert('Downloaded Official Class 10 Board Marking Scheme Blueprint (PDF)')}
          >
            <span>Download Free PDF Blueprint</span>
          </button>
        </div>

      </div>

      <style>{`
        .mock-suite-section {
          background: #ffffff;
        }

        .suite-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.75rem;
          flex-wrap: wrap;
        }

        .filter-pill-group {
          display: flex;
          background: var(--bg-subtle);
          padding: 4px;
          border-radius: var(--radius-full);
          gap: 3px;
        }

        .filter-btn {
          padding: 0.45rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn.active {
          background: #ffffff;
          color: var(--brand-emerald);
          box-shadow: 0 2px 8px rgba(30, 63, 49, 0.08);
        }

        .mocks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .mock-exam-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          background: #fafbfa;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          transition: all var(--transition-smooth);
        }

        .mock-exam-card:hover {
          transform: translateY(-4px);
          background: #ffffff;
          border-color: var(--pastel-sage-border);
          box-shadow: var(--shadow-card);
        }

        .mock-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .mock-board-tag {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mock-marks-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .marks-num {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--brand-emerald);
          line-height: 1;
        }

        .marks-lbl {
          font-size: 0.65rem;
          color: var(--text-light);
          text-transform: uppercase;
        }

        .mock-title {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .mock-specs-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .spec-dot {
          color: var(--text-light);
        }

        .mock-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .exam-tag-pill {
          font-size: 0.72rem;
          background: #f0f4f1;
          color: var(--text-muted);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-weight: 500;
        }

        .mock-card-actions {
          margin-top: auto;
        }

        .mock-launch-btn {
          font-size: 0.88rem;
        }

        /* Blueprint strip */
        .blueprint-download-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          gap: 1.5rem;
          flex-wrap: wrap;
          background: linear-gradient(135deg, #f7faf8 0%, #edf7f0 100%);
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-lg);
        }

        .strip-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .strip-title {
          font-size: 1.05rem;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }

        .strip-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
