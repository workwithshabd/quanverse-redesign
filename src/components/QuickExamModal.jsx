import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ArrowRight, 
  RotateCcw, 
  Award,
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
      <div className="exam-modal-container" onClick={e => e.stopPropagation()}>
        
        {/* Top Window Chrome */}
        <div className="modal-chrome-bar">
          <div className="chrome-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="chrome-title font-mono text-xs text-muted">
            quanverse-runtime / assessment-sprint.spec
          </div>
          <div className="chrome-right flex items-center gap-3">
            {!isSubmitted && (
              <div className={`timer-badge font-mono ${timeLeft < 60 ? 'timer-urgent' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close modal">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Header */}
        <div className="exam-modal-header">
          <div className="modal-title-group">
            <h3 className="exam-header-title text-lg font-light tracking-tight">{examData.title}</h3>
          </div>
        </div>

        {/* Body */}
        {!isSubmitted ? (
          <div className="exam-modal-body">
            
            {/* Question Navigation Palette */}
            <div className="question-palette-bar">
              <span className="palette-label font-mono">SECTIONS:</span>
              <div className="palette-buttons">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    className={`palette-num-btn font-mono ${currentIdx === idx ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`}
                    onClick={() => setCurrentIdx(idx)}
                  >
                    Q{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Question Box */}
            <div className="active-question-card">
              <div className="q-meta-line font-mono text-xs">
                <span className="q-label text-muted">QUESTION 0{currentIdx + 1} / 0{questions.length}</span>
                <span className="q-marks-tag font-mono">[ +{currentQ.marks} {currentQ.marks > 1 ? 'MARKS' : 'MARK'} ]</span>
              </div>

              <p className="q-prompt-text font-sans">{currentQ.question}</p>

              {/* MCQ / Assertion Options */}
              {currentQ.options ? (
                <div className="options-stack font-mono">
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
                      <span className="option-text font-sans">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="subjective-input-area font-mono">
                  <span className="sub-hint text-xs text-muted">Write your step-by-step response below for AI evaluation:</span>
                  <textarea
                    rows={4}
                    className="subjective-textarea font-mono text-xs"
                    placeholder={currentQ.sampleAnswerPlaceholder}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleTextAnswer(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="exam-modal-footer font-mono">
              <button
                type="button"
                className="modal-nav-btn"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
              >
                <ChevronLeft size={14} />
                <span>PREV</span>
              </button>

              <div className="footer-center-status font-mono text-xs text-muted">
                <span>[ {Object.keys(answers).length} / {questions.length} RECORDED ]</span>
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  className="modal-nav-btn active-next"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                >
                  <span>NEXT</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-submit-exam font-mono"
                  onClick={handleSubmit}
                >
                  <span>SUBMIT &amp; EVALUATE</span>
                  <kbd className="submit-kbd">↵</kbd>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Result Report Card */
          <div className="exam-result-view font-sans">
            <div className="result-hero-box">
              <div className="result-icon-celebrate">
                <Award size={28} className="text-lime" />
              </div>
              <h4 className="result-headline text-xl font-light">Exam Evaluated by <span className="text-lime">Quanverse AI</span></h4>
              <p className="result-sub font-mono text-xs text-muted">
                Official CBSE &amp; ICSE marking scheme applied with step-level mark distribution.
              </p>

              <div className="result-score-pill font-mono">
                <span className="score-big">{scoreResult?.earnedMarks}</span>
                <span className="score-small text-muted">/ {scoreResult?.totalMarks} MARKS</span>
                <span className="score-pct text-lime ml-2">[ {scoreResult?.percentage}% ]</span>
              </div>
            </div>

            {/* Question Breakdown List */}
            <div className="results-review-list font-mono">
              <div className="review-title text-xs text-muted uppercase tracking-wider mb-2">Step-by-step Verification</div>
              {questions.map((q, idx) => {
                const isCorrect = (q.type === 'mcq' || q.type === 'assertion') 
                  ? answers[q.id] === q.correctIndex 
                  : Boolean(answers[q.id]);

                return (
                  <div key={q.id} className={`result-q-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="res-q-header">
                      <span className="res-q-num">Q0{idx + 1}: {q.type.toUpperCase()}</span>
                      <span className="res-q-badge font-mono">{isCorrect ? '+FULL CREDIT' : 'PARTIAL / 0'}</span>
                    </div>
                    <p className="res-q-text font-sans">{q.question}</p>
                    {q.explanation && (
                      <div className="res-q-explanation font-sans text-xs">
                        <strong>Official Board Marking Note: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="result-footer-actions font-mono">
              <button
                type="button"
                className="modal-nav-btn"
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setTimeLeft(300);
                }}
              >
                <RotateCcw size={13} />
                <span>RETAKE SPRINT</span>
              </button>

              <button
                type="button"
                className="btn-submit-exam font-mono"
                onClick={onClose}
              >
                <span>CLOSE &amp; VIEW DASHBOARD</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .exam-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
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
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          width: 100%;
          max-width: 660px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          max-height: 90dvh;
          overflow: hidden;
          box-shadow: 0 25px 80px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .modal-chrome-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1.25rem;
          background: var(--bg-subtle);
          border-bottom: 1px solid var(--border-light);
        }

        .chrome-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }

        .exam-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-card);
        }

        .modal-title-group {
          display: flex;
          flex-direction: column;
        }

        .exam-header-title {
          color: var(--text-heading);
        }

        .timer-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-subtle);
          color: var(--color-lime);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        .timer-urgent {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 3px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .close-btn:hover {
          color: var(--text-main);
          background: var(--bg-hover);
        }

        .exam-modal-body {
          padding: 1.25rem 1.5rem;
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
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .palette-buttons {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .palette-num-btn {
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: var(--bg-surface);
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .palette-num-btn:hover:not(.current) {
          background-color: rgba(16, 71, 52, 0.4);
          background-image: radial-gradient(rgba(213, 243, 106, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
          border-color: rgba(67, 201, 139, 0.4);
          color: #F1F5F2;
        }

        .palette-num-btn.answered {
          color: var(--accent-lime);
          border-color: rgba(213, 243, 106, 0.4);
          background: rgba(16, 71, 52, 0.35);
        }

        .palette-num-btn.current {
          border-color: var(--accent-lime);
          background-color: rgba(16, 71, 52, 0.65);
          background-image: radial-gradient(rgba(67, 201, 139, 0.18) 1.2px, transparent 0);
          background-size: 4px 4px;
          color: #F1F5F2;
          box-shadow: inset 0 1px 0 rgba(213, 243, 106, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .palette-num-btn:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 1px;
        }

        /* Active Question Card */
        .active-question-card {
          background: transparent;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .q-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .q-marks-tag {
          color: var(--color-lime);
        }

        .q-prompt-text {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-heading);
          line-height: 1.5;
        }

        /* Options */
        .options-stack {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .option-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--border-light);
          background-color: var(--bg-surface);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.16s ease;
          position: relative;
        }

        .option-row:hover:not(.selected) {
          border-color: rgba(67, 201, 139, 0.45);
          background-color: rgba(16, 71, 52, 0.35);
          background-image: radial-gradient(rgba(213, 243, 106, 0.12) 1px, transparent 0);
          background-size: 4px 4px;
        }

        .option-row.selected {
          background-color: rgba(16, 71, 52, 0.65);
          background-image: radial-gradient(rgba(67, 201, 139, 0.18) 1.2px, transparent 0);
          background-size: 4px 4px;
          border-color: var(--accent-lime);
          box-shadow: inset 0 1px 0 rgba(213, 243, 106, 0.2), 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .option-radio {
          display: none;
        }

        .option-index-badge {
          width: 22px;
          height: 22px;
          border-radius: var(--radius-sm);
          background: var(--bg-subtle);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          color: var(--text-muted);
          flex-shrink: 0;
          transition: all 0.16s ease;
        }

        .option-row.selected .option-index-badge {
          background: var(--accent-lime);
          color: #07110D;
          border-color: var(--accent-lime);
          font-weight: 700;
        }

        .option-text {
          font-size: 0.88rem;
          color: var(--text-main);
        }

        .subjective-input-area {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .subjective-textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: var(--bg-surface);
          color: var(--text-main);
          outline: none;
          line-height: 1.5;
          resize: vertical;
        }

        .subjective-textarea:focus {
          border-color: var(--accent-emerald);
          box-shadow: 0 0 0 2px rgba(67, 201, 139, 0.25);
        }

        .exam-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .modal-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.85rem;
          font-size: 0.75rem;
          border: 1px solid var(--border-light);
          background: var(--bg-surface);
          color: var(--text-main);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .modal-nav-btn:hover:not(:disabled) {
          border-color: rgba(67, 201, 139, 0.4);
          background-color: rgba(16, 71, 52, 0.35);
          background-image: radial-gradient(rgba(213, 243, 106, 0.10) 1px, transparent 0);
          background-size: 4px 4px;
          color: #F1F5F2;
        }

        .modal-nav-btn:focus-visible {
          outline: 2px solid var(--accent-emerald);
          outline-offset: 2px;
        }

        .modal-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .modal-nav-btn.active-next {
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        .btn-submit-exam {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-mono);
          color: #07110D;
          background: #FFFFFF;
          background-color: #FFFFFF;
          background-image: none;
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-submit-exam:hover {
          background: #EBF3EE;
          background-color: #EBF3EE;
          border-color: #FFFFFF;
          box-shadow: 0 2px 12px rgba(255, 255, 255, 0.22);
        }

        .btn-submit-exam:active {
          background-color: #E2ECE5;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .btn-submit-exam:focus-visible {
          outline: 2px solid var(--accent-lime);
          outline-offset: 2px;
        }

        .submit-kbd {
          background: rgba(0, 0, 0, 0.15);
          color: #07110D;
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 0.68rem;
        }

        /* Result View */
        .exam-result-view {
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .result-hero-box {
          text-align: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .result-icon-celebrate {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.65rem;
        }

        .result-headline {
          color: var(--text-heading);
          margin-bottom: 0.2rem;
        }

        .result-score-pill {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35rem;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-sm);
          margin-top: 0.75rem;
        }

        .score-big {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-lime);
        }

        .score-small {
          font-size: 0.8rem;
        }

        .score-pct {
          font-size: 0.85rem;
        }

        .results-review-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .result-q-item {
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
        }

        .result-q-item.correct {
          border-color: rgba(137, 202, 33, 0.35);
        }

        .result-q-item.incorrect {
          border-color: rgba(239, 68, 68, 0.35);
        }

        .res-q-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }

        .res-q-badge {
          color: var(--color-lime);
        }

        .res-q-explanation {
          color: var(--text-muted);
          line-height: 1.5;
        }

        .result-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
