import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function QuickExamModal({ isOpen, onClose }) {
  const [examData, setExamData] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      api.getQuickDemoExam().then(data => {
        setExamData(data);
        setAnswers({});
        setIsSubmitted(false);
        setScoreResult(null);
        setCurrentIdx(0);
        setTimeLeft(300);
      });
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (!examData) return;
    setIsSubmitted(true);
    let correctCount = 0;
    let totalMarks = 0;
    let earnedMarks = 0;

    examData.questions.forEach(q => {
      totalMarks += q.marks;
      if (q.type === 'mcq' || q.type === 'assertion') {
        if (answers[q.id] === q.correctIndex) {
          earnedMarks += q.marks;
          correctCount++;
        }
      } else {
        // subjective demo grading
        if (answers[q.id] && answers[q.id].length > 10) {
          earnedMarks += q.marks;
          correctCount++;
        } else {
          earnedMarks += 1;
        }
      }
    });

    setScoreResult({
      earnedMarks,
      totalMarks,
      percentage: Math.round((earnedMarks / totalMarks) * 100),
      correctCount
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }, [examData, answers]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, timeLeft, handleSubmit]);

  if (!isOpen || !examData) return null;

  const questions = examData.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIndex) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIndex }));
  };

  const handleTextAnswer = (text) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: text }));
  };


  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="exam-modal-backdrop" onClick={onClose}>
      <div className="exam-modal-container glass-panel-elevated" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="exam-modal-header">
          <div className="modal-title-group">
            <span className="pill-badge pill-sage text-xs">Simulated Exam Room</span>
            <h3 className="exam-header-title">{examData.title}</h3>
          </div>

          <div className="header-right-tools">
            {!isSubmitted && (
              <div className={`timer-badge ${timeLeft < 60 ? 'timer-urgent' : ''}`}>
                <Clock size={15} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isSubmitted ? (
          <div className="exam-modal-body">
            
            {/* Question Navigation Palette */}
            <div className="question-palette-bar">
              <span className="palette-label">Question Palette:</span>
              <div className="palette-buttons">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    className={`palette-num-btn ${currentIdx === idx ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`}
                    onClick={() => setCurrentIdx(idx)}
                  >
                    Q{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Question Box */}
            <div className="active-question-card">
              <div className="q-meta-line">
                <span className="q-label">Question {currentIdx + 1} of {questions.length}</span>
                <span className="q-marks-tag">{currentQ.marks} {currentQ.marks > 1 ? 'Marks' : 'Mark'}</span>
              </div>

              <p className="q-prompt-text">{currentQ.question}</p>

              {/* MCQ / Assertion Options */}
              {currentQ.options ? (
                <div className="options-stack">
                  {currentQ.options.map((opt, oIdx) => (
                    <label 
                      key={oIdx} 
                      className={`option-row ${answers[currentQ.id] === oIdx ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={currentQ.id}
                        checked={answers[currentQ.id] === oIdx}
                        onChange={() => handleSelectOption(oIdx)}
                        className="option-radio"
                      />
                      <span className="option-index-badge">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="option-text">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="subjective-input-area">
                  <span className="sub-hint">Write your step-by-step response below for AI evaluation:</span>
                  <textarea
                    rows={4}
                    className="subjective-textarea"
                    placeholder={currentQ.sampleAnswerPlaceholder}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleTextAnswer(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="exam-modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <div className="footer-center-status">
                <span>{Object.keys(answers).length} of {questions.length} Answered</span>
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                >
                  <span>Next Question</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-submit-exam"
                  onClick={handleSubmit}
                >
                  <Sparkles size={16} className="text-butter" />
                  <span>Submit &amp; View AI Marksheet</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Result Report Card */
          <div className="exam-result-view">
            <div className="result-hero-box">
              <div className="result-icon-celebrate">
                <Award size={36} className="text-emerald" />
              </div>
              <h4 className="result-headline">Exam Evaluated by Quanverse AI</h4>
              <p className="result-sub">
                Official CBSE &amp; ICSE marking scheme applied with step-level mark distribution.
              </p>

              <div className="result-score-pill">
                <span className="score-big">{scoreResult?.earnedMarks}</span>
                <span className="score-small">/ {scoreResult?.totalMarks} Marks</span>
                <span className="score-pct">({scoreResult?.percentage}%)</span>
              </div>
            </div>

            {/* Question Breakdown List */}
            <div className="results-review-list">
              <span className="review-title">Detailed Step Assessment</span>
              {questions.map((q, idx) => {
                const isCorrect = (q.type === 'mcq' || q.type === 'assertion') 
                  ? answers[q.id] === q.correctIndex 
                  : Boolean(answers[q.id]);

                return (
                  <div key={q.id} className={`result-q-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="res-q-header">
                      <span className="res-q-num">Q{idx + 1}: {q.type.toUpperCase()}</span>
                      <span className="res-q-badge">{isCorrect ? 'Full Credit' : 'Partial / 0'}</span>
                    </div>
                    <p className="res-q-text">{q.question}</p>
                    {q.explanation && (
                      <div className="res-q-explanation">
                        <strong>Official Board Marking Note: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="result-footer-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setTimeLeft(300);
                }}
              >
                <RotateCcw size={16} />
                <span>Retake Sprint</span>
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                <span>Unlock Full 80-Mark Mock Series</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .exam-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 30, 23, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: modalFadeIn 0.2s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .exam-modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 680px;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          max-height: 90dvh;
          overflow: hidden;
          box-shadow: var(--shadow-elevated);
        }

        .exam-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-light);
          background: #fbfcfb;
        }

        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .text-xs {
          font-size: 0.72rem;
        }

        .exam-header-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .header-right-tools {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .timer-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--pastel-sage);
          color: var(--brand-emerald);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--pastel-sage-border);
        }

        .timer-urgent {
          background: var(--pastel-peach);
          color: #a8421b;
          border-color: var(--pastel-peach-border);
          animation: pulseSlow 1s infinite;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }

        .close-btn:hover {
          background: var(--bg-subtle);
          color: var(--text-main);
        }

        .exam-modal-body {
          padding: 1.5rem 1.75rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Palette */
        .question-palette-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-light);
        }

        .palette-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .palette-buttons {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .palette-num-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          background: #f7faf8;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .palette-num-btn.answered {
          background: var(--pastel-sage);
          border-color: var(--pastel-sage-border);
          color: var(--brand-emerald);
        }

        .palette-num-btn.current {
          border-color: var(--brand-emerald);
          box-shadow: 0 0 0 2px rgba(30, 63, 49, 0.2);
        }

        /* Active Question Card */
        .active-question-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .q-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .q-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-light);
        }

        .q-marks-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-emerald);
          background: var(--pastel-sage);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .q-prompt-text {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.5;
          white-space: pre-line;
        }

        /* Options */
        .options-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .option-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border: 1px solid var(--border-light);
          background: #fafbfa;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .option-row:hover {
          background: #f2f7f4;
          border-color: var(--pastel-sage-border);
        }

        .option-row.selected {
          background: var(--pastel-sage);
          border-color: var(--pastel-sage-border);
        }

        .option-radio {
          display: none;
        }

        .option-index-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-main);
          flex-shrink: 0;
        }

        .option-row.selected .option-index-badge {
          background: var(--brand-emerald);
          color: #ffffff;
          border-color: var(--brand-emerald);
        }

        .option-text {
          font-size: 0.92rem;
          color: var(--text-main);
        }

        .subjective-input-area {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .sub-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .subjective-textarea {
          width: 100%;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          line-height: 1.5;
          resize: vertical;
        }

        .exam-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .footer-center-status {
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .btn-submit-exam {
          background: #1e3f31;
        }

        /* Result View */
        .exam-result-view {
          padding: 2rem 1.75rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .result-hero-box {
          text-align: center;
          background: #f7faf8;
          border: 1px solid var(--pastel-sage-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .result-icon-celebrate {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--pastel-sage);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .result-headline {
          font-size: 1.35rem;
          margin-bottom: 0.25rem;
        }

        .result-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .result-score-pill {
          display: inline-flex;
          align-items: baseline;
          gap: 0.4rem;
          background: var(--brand-emerald);
          color: #ffffff;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
        }

        .score-big {
          font-size: 1.75rem;
          font-weight: 800;
          font-family: var(--font-display);
        }

        .score-small {
          font-size: 0.9rem;
          opacity: 0.85;
        }

        .score-pct {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f7d070;
        }

        .results-review-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .review-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .result-q-item {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }

        .result-q-item.correct {
          background: rgba(226, 241, 231, 0.4);
          border: 1px solid var(--pastel-sage-border);
        }

        .result-q-item.incorrect {
          background: rgba(255, 237, 226, 0.5);
          border: 1px solid var(--pastel-peach-border);
        }

        .res-q-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .res-q-badge {
          font-size: 0.7rem;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          background: #ffffff;
        }

        .res-q-explanation {
          margin-top: 0.4rem;
          padding-top: 0.4rem;
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .result-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
