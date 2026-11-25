import { useState } from 'react';
import { Coins, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

export interface RoyaltyCalculatorProps {
  onApplyClick?: () => void;
}

export default function RoyaltyCalculator({ onApplyClick }: RoyaltyCalculatorProps) {
  const [questionsCount, setQuestionsCount] = useState<number>(30);
  const [papersCurated, setPapersCurated] = useState<number>(4);
  const [averageAttempts, setAverageAttempts] = useState<number>(1200);

  // Calculation logic
  const questionBaseEarnings = questionsCount * 350; // ₹350 per approved question
  const paperCurationEarnings = papersCurated * 2000; // ₹2,000 per full 80-mark blueprint curated
  const studentAttemptDividend = Math.round((questionsCount * (averageAttempts / 1000) * 150)); // attempt dividend
  const totalEstimatedMonthly = questionBaseEarnings + paperCurationEarnings + studentAttemptDividend;

  return (
    <div className="bg-[#0c1c15] border border-[#276447]/50 rounded-2xl p-6 sm:p-9 shadow-xl">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#276447]/30 flex-wrap gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#163a2a] border border-[#276447]/50 flex items-center justify-center text-[#d5f36a]">
            <Coins size={22} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Educator Monthly Royalty Calculator</h3>
            <p className="text-xs text-[#748d78] mt-0.5">Simulate your potential earnings as a Quanverse Board Author</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#43c98b] bg-[#163a2a] px-3 py-1.5 rounded-full border border-[#276447]/40">
          <TrendingUp size={14} />
          <span>Direct Bank Payouts on 5th of Every Month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Slider 1: Questions Authored */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Original Board Questions Authored</span>
              <span className="font-mono font-bold text-[#d5f36a] bg-[#07110d] px-2.5 py-1 rounded border border-[#276447]/40">
                {questionsCount} Questions
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={questionsCount}
              onChange={(e) => setQuestionsCount(Number(e.target.value))}
              className="w-full accent-[#43c98b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#748d78]">
              <span>5</span>
              <span>50</span>
              <span>100 items/mo</span>
            </div>
          </div>

          {/* Slider 2: Full Pre-Board Blueprints */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Full 80-Mark Pre-Board Papers Curated</span>
              <span className="font-mono font-bold text-[#d5f36a] bg-[#07110d] px-2.5 py-1 rounded border border-[#276447]/40">
                {papersCurated} Papers
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={papersCurated}
              onChange={(e) => setPapersCurated(Number(e.target.value))}
              className="w-full accent-[#43c98b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#748d78]">
              <span>0</span>
              <span>6</span>
              <span>12 papers/mo</span>
            </div>
          </div>

          {/* Slider 3: Student Attempts */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Est. Student Attempts per Question</span>
              <span className="font-mono font-bold text-[#d5f36a] bg-[#07110d] px-2.5 py-1 rounded border border-[#276447]/40">
                {averageAttempts.toLocaleString('en-IN')} Attempts
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="200"
              value={averageAttempts}
              onChange={(e) => setAverageAttempts(Number(e.target.value))}
              className="w-full accent-[#43c98b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#748d78]">
              <span>200</span>
              <span>2,500</span>
              <span>5,000+</span>
            </div>
          </div>
        </div>

        {/* Payout Breakdown Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#07110d] border border-[#276447]/50 rounded-xl p-6 flex flex-col gap-4 text-center">
            <span className="text-xs uppercase tracking-wider text-[#748d78] font-bold">Projected Monthly Earnings</span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-bold text-[#43c98b]">₹</span>
              <span className="text-4xl font-bold text-[#d5f36a] font-mono">{totalEstimatedMonthly.toLocaleString('en-IN')}</span>
              <span className="text-xs text-[#748d78]">/ month</span>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#276447]/20 text-left text-xs">
              <div className="flex justify-between text-[#b5c0b8]">
                <span>Question Bounty (₹350/item)</span>
                <span className="font-mono text-white">₹{questionBaseEarnings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#b5c0b8]">
                <span>Blueprint Curation Bonus</span>
                <span className="font-mono text-white">₹{paperCurationEarnings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#b5c0b8]">
                <span>Student Attempt Dividend</span>
                <span className="font-mono text-[#d5f36a]">₹{studentAttemptDividend.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer mt-2 text-xs font-bold"
              onClick={onApplyClick}
            >
              <span className="button__flair" aria-hidden="true" />
              <Sparkles size={16} />
              <span>Claim Your Author Profile</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#748d78]">
              <ShieldCheck size={14} className="text-[#43c98b]" />
              <span>100% Author IP Protection • Transparent Monthly Reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
