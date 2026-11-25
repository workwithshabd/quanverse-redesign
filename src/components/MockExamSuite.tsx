import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { api, type MockExamItem } from '../services/api';

interface MockExamSuiteProps {
  onOpenDemoExam?: () => void;
}

export default function MockExamSuite({ onOpenDemoExam }: MockExamSuiteProps) {
  const [boardFilter, setBoardFilter] = useState<'ALL' | 'CBSE' | 'ICSE'>('ALL');
  const [mockList, setMockList] = useState<MockExamItem[]>([]);

  useEffect(() => {
    api.getMockExams({ board: boardFilter }).then(data => {
      setMockList(data);
    });
  }, [boardFilter]);

  const filteredMocks = boardFilter === 'ALL' 
    ? mockList 
    : mockList.filter(m => m.board === boardFilter);

  return (
    <section className="relative py-12 md:py-16 bg-transparent" id="mock-tests">
      <div className="app-container">

        {/* Section Header & Board Tabs */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-xs text-muted mb-2">
            <span className="text-[#43C98B] font-bold">EXAMINATION SUITE</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="title-with-flourish">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EEE9]">
                Timed Full-Length Papers Written by Board Experts
              </h2>
            </div>

            {/* Board Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {(['ALL', 'CBSE', 'ICSE'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`px-2.5 py-1 text-xs rounded transition-all cursor-pointer ${
                    boardFilter === tab
                      ? 'bg-[#104734]/60 border border-[#D5F36A] text-[#D5F36A]'
                      : 'bg-[#0B241A]/40 border border-[#bedcc8]/15 text-[#B5C0B8] hover:bg-[#104734]/45 hover:text-[#F1F5F2]'
                  }`}
                  onClick={() => setBoardFilter(tab)}
                >
                  [ {tab === 'ALL' ? 'ALL BOARDS' : `${tab} CLASS 10`} ]
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#8F9D93] max-w-[640px] leading-relaxed mt-2">
            Full 80-mark, 3-hour exam environments with official section choices and step grading.
          </p>
        </div>

        {/* Master Editorial Grid Container */}
        <div className="relative border border-[#bedcc8]/15 bg-[#07110D]/45 backdrop-blur-md">

          {/* 1. Large Realistic Exam Interface Preview */}
          <div className="border-b border-[#bedcc8]/15">
            {/* Top Exam Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0B241A]/60 border-b border-[#bedcc8]/12 font-mono text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#43C98B] font-semibold">CBSE 2027 SPECIMEN</span>
                <span className="text-[#8F9D93]">/</span>
                <span className="text-[#F1F5F2] font-semibold">MATHEMATICS STANDARD (041) — SET 1</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#D5F36A] font-semibold flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>02:44:18 REMAINING</span>
                </span>
                <span className="text-[#8F9D93]">/</span>
                <span className="text-[#8F9D93]">TOTAL: 80 MARKS</span>
              </div>
            </div>

            {/* Split Interface: Navigation Palette + Realistic Problem Statement + Rubric Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px]">
              {/* Left Navigator Pane */}
              <div className="p-3.5 sm:p-4 border-b lg:border-b-0 lg:border-r border-[#bedcc8]/15 bg-[#07110D]/50 font-mono text-xs">
                <div className="text-[#8F9D93] mb-2 font-semibold">SECTIONS:</div>
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between px-2 py-1 rounded bg-[#104734]/30 border border-[#a7f3c4]/25 text-[#F1F5F2]">
                    <span>Sec A (MCQ 1-20)</span>
                    <span className="text-[#D5F36A]">20/20</span>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded text-[#8F9D93]">
                    <span>Sec B (VSA 21-25)</span>
                    <span>5 Qs</span>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded text-[#8F9D93]">
                    <span>Sec C (SA 26-31)</span>
                    <span>6 Qs</span>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded text-[#8F9D93]">
                    <span>Sec D (LA 32-35)</span>
                    <span>4 Qs</span>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded text-[#8F9D93]">
                    <span>Sec E (Case 36-38)</span>
                    <span>3 Qs</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1 mt-2.5">
                  {[...Array(20)].map((_, i) => (
                    <span
                      key={i}
                      className={`flex items-center justify-center h-6 rounded text-[11px] font-mono cursor-pointer transition-all ${
                        i === 6
                          ? 'bg-[#D5F36A] text-[#07110D] font-bold border border-[#D5F36A] shadow-[0_1px_4px_rgba(0,0,0,0.3)]'
                          : i < 6
                          ? 'bg-[#104734]/30 text-[#D5F36A] border border-[#a7f3c4]/25'
                          : 'border border-[#bedcc8]/15 text-[#8F9D93] hover:bg-[#104734]/35 hover:text-[#F1F5F2]'
                      }`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center Realistic Question Statement & Response View */}
              <div className="p-4 sm:p-6 flex flex-col justify-center text-xs sm:text-sm">
                <div className="font-mono text-xs text-[#8F9D93] mb-2">
                  <span>QUESTION 07 / SECTION A</span>
                  <span className="text-[#D5F36A] font-semibold ml-2">[ 1 MARK · MCQ ]</span>
                </div>

                <div className="text-[#F1F5F2] leading-relaxed mb-4">
                  <strong>Q.7:</strong> If the quadratic equation{' '}
                  <code className="font-mono text-[#D5F36A] bg-[#D5F36A]/12 px-1.5 py-0.5 rounded border border-[#D5F36A]/25">
                    x² - 2kx - 6 = 0
                  </code>{' '}
                  has <code className="font-mono text-[#D5F36A] font-bold">x = 3</code> as one of its roots, then the value of{' '}
                  <code className="font-mono text-[#D5F36A] font-bold">k</code> is:
                </div>

                <div className="space-y-2 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2.5 p-2 bg-[#0B241A]/20 border border-[#bedcc8]/12 rounded text-[#F1F5F2]">
                    <span className="text-[#8F9D93]">(A)</span>
                    <span>k = 1</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-[#D5F36A]/10 border border-[#D5F36A]/40 rounded text-[#D5F36A] font-bold">
                    <span>(B)</span>
                    <span>k = 1/2 (Correct: Substitute x = 3 ⇒ 9 - 6k - 6 = 0 ⇒ k = 1/2)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-[#0B241A]/20 border border-[#bedcc8]/12 rounded text-[#F1F5F2]">
                    <span className="text-[#8F9D93]">(C)</span>
                    <span>k = 2</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-[#0B241A]/20 border border-[#bedcc8]/12 rounded text-[#F1F5F2]">
                    <span className="text-[#8F9D93]">(D)</span>
                    <span>k = -1/2</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-dashed border-[#bedcc8]/15 flex flex-wrap items-center justify-between gap-1.5 font-mono text-xs">
                  <span className="text-[#43C98B] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Step Award: +1.0 Mark (Root Substitution Criterion Verified)</span>
                  </span>
                  <span className="text-[#8F9D93] text-[11px]">Instant Neural Grading</span>
                </div>
              </div>

              {/* Right Examiner Rubric Pane */}
              <div className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-[#bedcc8]/15 bg-[#07110D]/50 flex flex-col font-mono text-xs">
                <div className="text-[#8F9D93] mb-2 font-semibold">OFFICIAL MARKING SCHEME:</div>
                <div className="pb-2.5 mb-2.5 border-b border-[#bedcc8]/10">
                  <div className="text-[#F1F5F2] font-semibold">Step 1: Root Property</div>
                  <div className="text-[#8F9D93] text-[11px] mt-0.5">Since x = 3 is a root, it must satisfy the equation.</div>
                  <div className="text-[#43C98B] font-bold mt-1">+0.5 Mark</div>
                </div>
                <div className="pb-2.5 mb-4 border-b border-[#bedcc8]/10">
                  <div className="text-[#F1F5F2] font-semibold">Step 2: Linear Isolation</div>
                  <div className="text-[#8F9D93] text-[11px] mt-0.5">3² - 2k(3) - 6 = 0 ⇒ 3 = 6k ⇒ k = 1/2.</div>
                  <div className="text-[#43C98B] font-bold mt-1">+0.5 Mark</div>
                </div>

                <button
                  type="button"
                  className="btn btn-emerald w-full justify-center mt-auto flex items-center gap-2 text-xs uppercase font-semibold tracking-wider py-3.5 px-6"
                  onClick={onOpenDemoExam}
                >
                  <span className="button__flair" aria-hidden="true" />
                  <span>Launch Live Full Exam</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Continuous 3-Column Question Banks Grid Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {filteredMocks.slice(0, 3).map((exam) => (
              <div key={exam.id} className="p-5 sm:p-7 border-b md:border-b-0 border-r-0 md:border-r border-[#bedcc8]/15 last:border-r-0 last:border-b-0 bg-[#07110D]/40 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center font-mono text-xs mb-2">
                    <span className="text-[#D5F36A] font-semibold">[{exam.board} CLASS 10]</span>
                    <span className="text-[#8F9D93]">{exam.durationMinutes} MINS / {exam.totalMarks} MARKS</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#F1F5F2] leading-snug mb-1.5">
                    {exam.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B5C0B8] leading-relaxed mb-4">
                    Official {exam.board} 80-mark paper with step-marking breakdown.
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-[#bedcc8]/10 flex items-center justify-between font-mono text-xs mt-auto">
                  <button
                    type="button"
                    className="text-[#D5F36A] hover:text-[#e4f88b] flex items-center gap-1 transition-colors cursor-pointer"
                    onClick={onOpenDemoExam}
                  >
                    <span>Attempt Full Paper</span>
                    <ArrowRight size={12} />
                  </button>
                  {exam.isFree && (
                    <span className="text-[10px] text-[#8F9D93] border border-[#bedcc8]/15 px-1.5 py-0.5 rounded">
                      FREE DEMO
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
