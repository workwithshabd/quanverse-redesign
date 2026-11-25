import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  ShieldCheck,
  Award
} from 'lucide-react';
import { api } from '../services/api';

export interface HeroSectionProps {
  onOpenDemoExam?: () => void;
}

interface StepDetail {
  stepNumber: number;
  criterion: string;
  marksAwarded: number;
  maxMarks: number;
  status: 'passed' | 'partial' | string;
  comment: string;
}

interface EvaluationResult {
  scoreAwarded: number;
  maxMarks: number;
  overallFeedback: string;
  steps: StepDetail[];
  deductions?: Array<{ tip: string }>;
}

export default function HeroSection({ onOpenDemoExam }: HeroSectionProps) {
  // AI Evaluator state
  const [selectedSubject, setSelectedSubject] = useState<'Maths' | 'Science'>('Maths');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [studentInput, setStudentInput] = useState<string>('');

  // Sample default answers
  const samples = {
    Maths: {
      question: 'Solve the quadratic equation 2x² - 5x + 3 = 0 using the quadratic formula. (3 Marks)',
      defaultAnswer: `Given equation: 2x² - 5x + 3 = 0
Here, a = 2, b = -5, c = 3
Quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)
b² - 4ac = (-5)² - 4(2)(3) = 25 - 24 = 1
x = [-(-5) ± √1] / (2 × 2) = (5 ± 1) / 4
x = (5 + 1)/4 = 6/4 = 3/2
x = (5 - 1)/4 = 4/4 = 1`,
      maxMarks: 3.0
    },
    Science: {
      question: 'Explain the mechanism of double circulation in the human heart and why it is necessary for humans. (4 Marks)',
      defaultAnswer: `Double circulation means blood travels twice through the heart during one complete cycle.
1. Pulmonary Circulation: Deoxygenated blood from right ventricle goes to lungs via pulmonary artery for oxygenation. Oxygenated blood returns to left atrium via pulmonary veins.
2. Systemic Circulation: Oxygenated blood from left ventricle pumped into aorta to supply body tissues. Deoxygenated blood returns to right atrium via vena cava.
This keeps oxygen-rich and oxygen-poor blood completely separated for efficient oxygen supply.`,
      maxMarks: 4.0
    }
  };

  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    setEvaluationResult(null);
    try {
      const activeSample = samples[selectedSubject];
      const answerToEvaluate = studentInput.trim() || activeSample.defaultAnswer;
      const res: any = await api.evaluateAnswer({
        questionId: selectedSubject.toLowerCase(),
        subject: selectedSubject,
        maxMarks: activeSample.maxMarks,
        studentAnswer: answerToEvaluate
      });
      setEvaluationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <section className="hero-section relative pt-12 pb-20 overflow-hidden" id="ai-marking">
      <div className="app-container">

        {/* ============================================================
            CENTERED HERO HEADER - ZUSE EDITORIAL TECH AESTHETIC
            ============================================================ */}
        <div className="zuse-hero-header gsap-reveal text-center max-w-4xl mx-auto mb-14 px-4">

          {/* Master Headline */}
          <h1 className="zuse-hero-title font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.15] mb-6">
            A calmer, fairer way to master <span className="font-editorial-italic text-[#d5f36a]">Class 10 Boards.</span>
          </h1>

          {/* Restrained Editorial Prose with purposeful emphasis */}
          <p className="zuse-hero-lead text-base sm:text-lg text-[#b5c0b8] max-w-2xl mx-auto leading-relaxed mb-8">
            Timed mock exams by senior board examiners. Step-by-step AI marking pinpoints exactly <strong className="font-semibold text-white">where you lose half-marks</strong> before exam day.
          </p>

          {/* Action CTAs */}
          <div className="zuse-hero-ctas flex items-center justify-center gap-4 flex-wrap mb-12">
            <button
              type="button"
              className="btn btn-primary zuse-cta-primary py-3.5 px-6"
              onClick={onOpenDemoExam}
            >
              <span className="button__flair" aria-hidden="true" />
              <Sparkles size={16} />
              <span>Start Free First Mock Exam</span>
              <kbd className="zuse-kbd">↵</kbd>
            </button>

            <a href="#how-it-works" className="btn btn-secondary zuse-cta-secondary py-3.5 px-6">
              <span className="button__flair" aria-hidden="true" />
              <span>See how marking works</span>
              <ArrowRight size={14} className="zuse-cta-arrow" />
            </a>
          </div>

          {/* Technical Trust Strip */}
          <div className="zuse-trust-strip flex items-center justify-center gap-6 sm:gap-10 text-center flex-wrap pt-4 border-t border-[#276447]/20">
            <div className="zuse-trust-cell flex flex-col">
              <span className="zuse-trust-val font-mono text-xl sm:text-2xl font-bold text-white">45,000+</span>
              <span className="zuse-trust-sub text-xs text-[#748d78] uppercase tracking-wider mt-0.5">Steps Graded</span>
            </div>
            <div className="zuse-trust-sep hidden sm:block w-px h-8 bg-[#276447]/30" />
            <div className="zuse-trust-cell flex flex-col">
              <span className="zuse-trust-val font-mono text-xl sm:text-2xl font-bold text-white">99.4%</span>
              <span className="zuse-trust-sub text-xs text-[#748d78] uppercase tracking-wider mt-0.5">Scheme Match</span>
            </div>
            <div className="zuse-trust-sep hidden sm:block w-px h-8 bg-[#276447]/30" />
            <div className="zuse-trust-cell flex flex-col">
              <span className="zuse-trust-val font-mono text-xl sm:text-2xl font-bold text-white">₹0</span>
              <span className="zuse-trust-sub text-xs text-[#748d78] uppercase tracking-wider mt-0.5">First Exam Free</span>
            </div>
            <div className="zuse-trust-sep hidden sm:block w-px h-8 bg-[#276447]/30" />
            <div className="zuse-trust-cell flex flex-col">
              <span className="zuse-trust-val font-mono text-xl sm:text-2xl font-bold text-white">&lt;45s</span>
              <span className="zuse-trust-sub text-xs text-[#748d78] uppercase tracking-wider mt-0.5">AI Turnaround</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            INTERACTIVE PRODUCT SHOWCASE WINDOW (ZUSE IDE/STUDIO CHROME)
            ============================================================ */}
        <div className="zuse-window-wrap gsap-reveal max-w-5xl mx-auto px-2 sm:px-4">
          <div className="zuse-window-frame bg-[#0c1c15] border border-[#276447]/50 rounded-2xl shadow-2xl overflow-hidden">

            {/* Top Window Bar with macOS traffic lights */}
            <div className="zuse-window-topbar flex items-center justify-between px-4 py-3 bg-[#07110d] border-b border-[#276447]/30 flex-wrap gap-2">
              <div className="zuse-topbar-left flex items-center gap-3">
                <div className="zuse-window-dots flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="zuse-window-title font-mono text-xs text-[#748d78]">
                  <span>quanverse-studio</span>
                  <span className="mx-1 text-[#276447]">/</span>
                  <span className="text-[#b5c0b8]">cbse-10-{selectedSubject.toLowerCase()}-rubric.json</span>
                </div>
              </div>

              {/* Subject Tabs in Topbar */}
              <div className="zuse-topbar-tabs flex items-center gap-1.5">
                <button
                  type="button"
                  className={`px-3 py-1 text-xs rounded-md font-mono border transition-all cursor-pointer ${
                    selectedSubject === 'Maths' 
                      ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' 
                      : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'
                  }`}
                  onClick={() => { setSelectedSubject('Maths'); setEvaluationResult(null); setStudentInput(''); }}
                >
                  <span>Maths (3M)</span>
                  <span className="ml-1 text-[#d5f36a] text-[10px]">+3.0</span>
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-xs rounded-md font-mono border transition-all cursor-pointer ${
                    selectedSubject === 'Science' 
                      ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' 
                      : 'bg-[#07110d] border-[#276447]/40 text-[#748d78] hover:text-white'
                  }`}
                  onClick={() => { setSelectedSubject('Science'); setEvaluationResult(null); setStudentInput(''); }}
                >
                  <span>Science (4M)</span>
                  <span className="ml-1 text-[#d5f36a] text-[10px]">+4.0</span>
                </button>
              </div>

              <div className="zuse-topbar-right hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#43c98b] bg-[#163a2a] px-2.5 py-0.5 rounded-full border border-[#276447]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43c98b] animate-pulse" />
                <span>CBSE v2.7 Active</span>
              </div>
            </div>

            {/* Split Window Body */}
            <div className="zuse-window-body grid grid-cols-1 md:grid-cols-12 min-h-[480px]">

              {/* Left Sidebar: Workspaces & Exam Items */}
              <aside className="zuse-window-sidebar md:col-span-4 p-4 border-r border-[#276447]/30 bg-[#07110d]/50 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#748d78] uppercase tracking-wider font-bold">
                    <span>EXAM WORKSPACES</span>
                    <span className="text-[#d5f36a]">2027</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedSubject === 'Maths' 
                          ? 'bg-[#104734]/70 border-[#d5f36a] shadow-sm' 
                          : 'bg-[#07110d] border-[#276447]/30 hover:border-[#43c98b]/50'
                      }`}
                      onClick={() => { setSelectedSubject('Maths'); setEvaluationResult(null); setStudentInput(''); }}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white">Maths Mock #01</span>
                        <span className="font-mono text-[10px]">
                          <span className="text-[#d5f36a]">+2.5</span> <span className="text-red-400">-0.5</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#748d78]">Quadratic Eqns · 3 Marks</span>
                    </button>

                    <button
                      type="button"
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedSubject === 'Science' 
                          ? 'bg-[#104734]/70 border-[#d5f36a] shadow-sm' 
                          : 'bg-[#07110d] border-[#276447]/30 hover:border-[#43c98b]/50'
                      }`}
                      onClick={() => { setSelectedSubject('Science'); setEvaluationResult(null); setStudentInput(''); }}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white">Science Mock #02</span>
                        <span className="font-mono text-[10px] text-[#d5f36a]">+4.0</span>
                      </div>
                      <span className="text-[11px] text-[#748d78]">Life Processes · 4 Marks</span>
                    </button>

                    <div className="p-3 rounded-xl border border-[#276447]/20 bg-[#07110d]/30 opacity-60">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-[#748d78]">Social Sciences #01</span>
                        <span className="text-[9px] font-mono text-[#d5f36a] bg-[#163a2a] px-1.5 py-0.5 rounded">Upcoming</span>
                      </div>
                      <span className="text-[11px] text-[#748d78]">History &amp; Civics Blueprint</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Telemetry Badges */}
                <div className="flex flex-col gap-2 pt-3 border-t border-[#276447]/20">
                  <div className="flex items-center gap-1.5 text-xs text-[#b5c0b8]">
                    <ShieldCheck size={13} className="text-[#d5f36a]" />
                    <span>Official NCERT / CISCE</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#b5c0b8]">
                    <Award size={13} className="text-[#d5f36a]" />
                    <span>Examiner Rubric Match</span>
                  </div>
                </div>
              </aside>

              {/* Main Studio Pane: AI Marking Sandbox */}
              <div className="zuse-window-main md:col-span-8 p-5 flex flex-col gap-4 bg-[#0c1c15]">

                {/* Question Box */}
                <div className="bg-[#07110d] border border-[#276447]/40 rounded-xl p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="bg-[#163a2a] text-[#d5f36a] px-1.5 py-0.5 rounded font-bold">CLASS 10 CBSE 2027</span>
                    <span className="text-[#748d78]">{selectedSubject}</span>
                    <span className="ml-auto text-[#d5f36a] font-bold">{samples[selectedSubject].maxMarks} Marks</span>
                  </div>
                  <p className="text-sm font-serif text-white leading-relaxed">{samples[selectedSubject].question}</p>
                </div>

                {/* Student Answer Sheet Box (OCR Preview) */}
                <div className="bg-[#07110d] border border-[#276447]/40 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#748d78]">STUDENT ANSWER SHEET (HANDWRITING OCR EXTRACT)</span>
                    <span className="bg-[#104734] text-[#43c98b] px-1.5 py-0.5 rounded">OCR Processed</span>
                  </div>
                  <div className="font-mono text-xs text-[#b5c0b8] whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                    {studentInput || samples[selectedSubject].defaultAnswer}
                  </div>
                </div>

                {/* Execution Button */}
                <div>
                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-xl bg-[#d5f36a] text-[#07110d] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#bce347] transition-all cursor-pointer shadow-md disabled:opacity-70"
                    onClick={handleRunEvaluation}
                    disabled={isEvaluating}
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw size={15} className="animate-spin text-[#07110d]" />
                        <span>Cross-referencing Official Board Marking Scheme...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} className="text-[#07110d]" />
                        <span>{evaluationResult ? 'Re-Evaluate with AI Grader' : 'Evaluate with AI Grader'}</span>
                        <kbd className="bg-black/15 text-[#07110d] border border-black/20 px-1 py-0.5 rounded text-[10px]">↵</kbd>
                      </>
                    )}
                  </button>
                </div>

                {/* Live Evaluation Results Tray */}
                {evaluationResult && (
                  <div className="flex flex-col gap-3 pt-2">
                    {/* Score Banner */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#07110d] border border-[#276447]/40">
                      <div className="flex items-baseline font-mono">
                        <span className="text-3xl font-bold text-[#d5f36a]">{evaluationResult.scoreAwarded}</span>
                        <span className="text-sm text-[#748d78]">/{evaluationResult.maxMarks}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#748d78] font-mono text-[10px]">BOARD ASSESSMENT:</span>
                          <span className={evaluationResult.scoreAwarded === evaluationResult.maxMarks ? 'text-[#43c98b] font-bold' : 'text-[#d5f36a] font-bold'}>
                            {evaluationResult.scoreAwarded === evaluationResult.maxMarks ? 'FULL MARKS AWARDED' : 'HALF-MARK DEDUCTION DETECTED'}
                          </span>
                        </div>
                        <p className="text-xs text-[#b5c0b8] mt-0.5">{evaluationResult.overallFeedback}</p>
                      </div>
                    </div>

                    {/* Step Breakdown Cards */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#748d78] uppercase tracking-wider">
                        <span>OFFICIAL STEP-MARKING SCHEME BREAKDOWN</span>
                        <span className="text-[#d5f36a]">CBSE Rubric v2.7</span>
                      </div>

                      {evaluationResult.steps.map((st: StepDetail) => (
                        <div
                          key={st.stepNumber}
                          className={`p-3 rounded-xl border flex items-start gap-3 text-xs bg-[#07110d]/60 ${st.status === 'passed' ? 'border-[#89ca21]/40' : 'border-amber-500/40'}`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {st.status === 'passed' ? (
                              <CheckCircle2 size={15} className="text-[#43c98b]" />
                            ) : (
                              <AlertCircle size={15} className="text-amber-400" />
                            )}
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-semibold text-white">Step {st.stepNumber}: {st.criterion}</span>
                              <span className={`font-mono text-xs ${st.status === 'passed' ? 'text-[#d5f36a]' : 'text-amber-400'}`}>
                                +{st.marksAwarded} / {st.maxMarks}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#748d78]">{st.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Senior Examiner Tip Callout */}
                    {evaluationResult.deductions && evaluationResult.deductions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#163a2a] border border-[#276447]/50 flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[#d5f36a]">
                          <AlertCircle size={14} />
                          <span>Senior Board Examiner Guidance</span>
                        </div>
                        <p className="text-[#b5c0b8] leading-relaxed">{evaluationResult.deductions[0].tip}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Micro-note when idle */}
                {!evaluationResult && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#748d78] py-2">
                    <Clock size={13} />
                    <span>Instant grading in 1.2s • Step marks awarded per official CBSE/ICSE directives</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
