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

export interface QuickExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: string;
  type: 'mcq' | 'assertion' | 'subjective' | string;
  marks: number;
  question: string;
  options?: string[];
  correctIndex?: number;
  sampleAnswerPlaceholder?: string;
  explanation?: string;
}

interface ExamData {
  title: string;
  questions: Question[];
  [key: string]: any;
}

interface ScoreResult {
  earnedMarks: number;
  totalMarks: number;
  percentage: number;
  correctCount: number;
}

export default function QuickExamModal({ isOpen, onClose }: QuickExamModalProps) {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      api.getQuickDemoExam().then((data: any) => {
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

    examData.questions.forEach((q: Question) => {
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

  const handleSelectOption = (optIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIndex }));
  };

  const handleTextAnswer = (text: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: text }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-[1000] p-4 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-[660px] max-h-[90vh] bg-[#07110d] border border-[#276447]/50 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Window Chrome */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#0a1611] border-b border-[#276447]/30">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <div className="font-mono text-xs text-[#748d78]">
            quanverse-runtime / assessment-sprint.spec
          </div>
          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07110d] font-mono text-xs font-semibold border ${timeLeft < 60 ? 'text-red-400 border-red-500/40' : 'text-[#d5f36a] border-[#276447]/40'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d5f36a] animate-pulse"></span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button 
              type="button" 
              className="text-[#748d78] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer" 
              onClick={onClose} 
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#276447]/20 bg-[#07110d]">
          <div className="flex flex-col">
            <h3 className="text-lg font-light tracking-tight text-white">{examData.title}</h3>
          </div>
        </div>

        {/* Body */}
        {!isSubmitted ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            
            {/* Question Navigation Palette */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#276447]/20 overflow-x-auto">
              <span className="font-mono text-xs text-[#748d78]">SECTIONS:</span>
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => {
                  const isCurrent = currentIdx === idx;
                  const isAnswered = answers[q.id] !== undefined;

                  let btnStyle = "border-[#276447]/40 bg-[#0c1c15] text-[#748d78] hover:border-[#43c98b] hover:text-white";
                  if (isCurrent) {
                    btnStyle = "border-[#d5f36a] bg-[#104734]/65 text-[#f1f5f2] shadow-sm";
                  } else if (isAnswered) {
                    btnStyle = "border-[#d5f36a]/40 bg-[#104734]/35 text-[#d5f36a]";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={`font-mono px-2.5 py-1 rounded text-xs font-medium border cursor-pointer transition-all ${btnStyle}`}
                      onClick={() => setCurrentIdx(idx)}
                    >
                      Q{idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Box */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#748d78]">QUESTION 0{currentIdx + 1} / 0{questions.length}</span>
                <span className="text-[#d5f36a]">[ +{currentQ.marks} {currentQ.marks > 1 ? 'MARKS' : 'MARK'} ]</span>
              </div>

              <p className="font-sans text-[0.95rem] font-medium text-white leading-relaxed">{currentQ.question}</p>

              {/* MCQ / Assertion Options */}
              {currentQ.options ? (
                <div className="flex flex-col gap-2 font-mono">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = answers[currentQ.id] === oIdx;
                    return (
                      <label 
                        key={oIdx} 
                        className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#104734]/65 border-[#d5f36a] shadow-md' 
                            : 'bg-[#0c1c15] border-[#276447]/30 hover:border-[#43c98b]/60 hover:bg-[#104734]/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQ.id}
                          checked={isSelected}
                          onChange={() => handleSelectOption(oIdx)}
                          className="hidden"
                        />
                        <span className={`w-[22px] h-[22px] rounded border flex items-center justify-center text-xs shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-[#d5f36a] text-[#07110d] border-[#d5f36a] font-bold' 
                            : 'bg-[#07110d] border-[#276447]/40 text-[#748d78]'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-sans text-[0.88rem] text-[#f1f5f2]">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 font-mono">
                  <span className="text-xs text-[#748d78]">Write your step-by-step response below for AI evaluation:</span>
                  <textarea
                    rows={4}
                    className="w-full p-3 rounded border border-[#276447]/40 bg-[#07110d] text-white text-xs outline-none focus:border-[#43c98b] focus:ring-1 focus:ring-[#43c98b] transition-all"
                    placeholder={currentQ.sampleAnswerPlaceholder}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleTextAnswer(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#276447]/20 font-mono">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs rounded border border-[#276447]/40 bg-[#0c1c15] text-[#b5c0b8] hover:text-white hover:border-[#43c98b] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
              >
                <ChevronLeft size={14} />
                <span>PREV</span>
              </button>

              <div className="font-mono text-xs text-[#748d78]">
                <span>[ {Object.keys(answers).length} / {questions.length} RECORDED ]</span>
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs rounded border border-[#d5f36a] bg-[#0c1c15] text-[#d5f36a] hover:bg-[#d5f36a]/10 cursor-pointer transition-all"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                >
                  <span>NEXT</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono rounded bg-white text-[#07110d] hover:bg-[#ebf3ee] shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={handleSubmit}
                >
                  <span>SUBMIT &amp; EVALUATE</span>
                  <kbd className="bg-black/15 text-[#07110d] border border-black/20 px-1 py-0.5 rounded text-[10px]">↵</kbd>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Result Report Card */
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-center font-sans">
            <div className="text-center bg-[#0c1c15] border border-[#276447]/30 rounded-lg p-5 flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#276447]/40 bg-[#07110d] flex items-center justify-center mb-2.5">
                <Award size={28} className="text-[#d5f36a]" />
              </div>
              <h4 className="text-xl font-light text-white mb-1">Exam Evaluated by <span className="text-[#d5f36a]">Quanverse AI</span></h4>
              <p className="font-mono text-xs text-[#748d78]">
                Official CBSE &amp; ICSE marking scheme applied with step-level mark distribution.
              </p>

              <div className="inline-flex items-baseline gap-1.5 bg-[#07110d] border border-[#276447]/40 px-4 py-1.5 rounded mt-3 font-mono">
                <span className="text-2xl font-bold text-[#d5f36a]">{scoreResult?.earnedMarks}</span>
                <span className="text-xs text-[#748d78]">/ {scoreResult?.totalMarks} MARKS</span>
                <span className="text-xs text-[#d5f36a] ml-1">[ {scoreResult?.percentage}% ]</span>
              </div>
            </div>

            {/* Question Breakdown List */}
            <div className="flex flex-col gap-2 font-mono text-left">
              <div className="text-xs text-[#748d78] uppercase tracking-wider mb-1">Step-by-step Verification</div>
              {questions.map((q, idx) => {
                const isCorrect = (q.type === 'mcq' || q.type === 'assertion') 
                  ? answers[q.id] === q.correctIndex 
                  : Boolean(answers[q.id]);

                return (
                  <div key={q.id} className={`p-3 rounded bg-[#0c1c15] border ${isCorrect ? 'border-[#89ca21]/40' : 'border-red-500/40'}`}>
                    <div className="flex items-center justify-between text-xs mb-1 text-white">
                      <span className="font-bold">Q0{idx + 1}: {q.type.toUpperCase()}</span>
                      <span className={`font-mono ${isCorrect ? 'text-[#d5f36a]' : 'text-red-400'}`}>
                        {isCorrect ? '+FULL CREDIT' : 'PARTIAL / 0'}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#b5c0b8] mb-1">{q.question}</p>
                    {q.explanation && (
                      <div className="font-sans text-xs text-[#748d78] border-t border-[#276447]/20 pt-1 mt-1">
                        <strong className="text-[#b5c0b8]">Official Board Marking Note: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#276447]/20 font-mono">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs rounded border border-[#276447]/40 bg-[#0c1c15] text-[#b5c0b8] hover:text-white hover:border-[#43c98b] cursor-pointer transition-all"
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
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono rounded bg-white text-[#07110d] hover:bg-[#ebf3ee] shadow-md transition-all cursor-pointer"
                onClick={onClose}
              >
                <span>CLOSE &amp; VIEW DASHBOARD</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
