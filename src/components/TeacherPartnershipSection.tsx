import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';

export default function TeacherPartnershipSection() {
  const [questionsCount, setQuestionsCount] = useState<number>(25);
  const [papersCurated, setPapersCurated] = useState<number>(4);
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Approximate royalty formula: ₹250 per approved question + ₹1500 per paper curation + student attempt dividend
  const estimatedRoyalty = (questionsCount * 300) + (papersCurated * 1800);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherEmail) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-12 md:py-16" id="for-teachers">
      <div className="app-container">
        
        {/* Banner Card */}
        <div className="p-8 sm:p-12 md:p-14 bg-[#07110D]/45 border border-[#bedcc8]/15 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 md:gap-14 items-center">
            
            {/* Left Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F2] mb-4">
                Are You a Senior Class 10 Teacher? Earn While You Author.
              </h2>
              <p className="text-sm sm:text-base text-[#B5C0B8] leading-relaxed mb-6">
                Quanverse connects experienced school teachers with thousands of board candidates. 
                Submit original board-standard questions, build school pre-board papers, and receive automated monthly royalties straight into your bank account.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F1F5F2] leading-snug p-2 rounded hover:bg-[#104734]/25 transition-colors">
                  <div className="mt-0.5 shrink-0"><CheckCircle size={15} className="text-[#43C98B]" /></div>
                  <span><strong>Author Once, Earn Indefinitely:</strong> Royalties paid every time a student attempts your paper.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F1F5F2] leading-snug p-2 rounded hover:bg-[#104734]/25 transition-colors">
                  <div className="mt-0.5 shrink-0"><CheckCircle size={15} className="text-[#43C98B]" /></div>
                  <span><strong>Instant AI Paper Generator:</strong> Build a custom 80-mark pre-board test for your school in 60 seconds.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F1F5F2] leading-snug p-2 rounded hover:bg-[#104734]/25 transition-colors">
                  <div className="mt-0.5 shrink-0"><CheckCircle size={15} className="text-[#43C98B]" /></div>
                  <span><strong>Full Copyright &amp; Attribution:</strong> Your teacher profile and school affiliation displayed proudly.</span>
                </div>
              </div>

              {/* Form */}
              {!submitted ? (
                <form className="flex flex-wrap gap-2.5 max-w-[480px]" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your school / personal email..."
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="flex-1 min-w-[220px] px-4 py-2.5 rounded border border-[#bedcc8]/20 bg-[#0B241A]/50 text-[#F1F5F2] text-sm outline-none focus:border-[#D5F36A]"
                  />
                  <button type="submit" className="btn btn-primary flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5">
                    <span className="button__flair" aria-hidden="true" />
                    <span>Apply as Educator</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2.5 p-3.5 bg-[#104734]/35 text-[#D5F36A] border border-[#43C98B]/30 rounded text-sm font-semibold">
                  <CheckCircle size={18} className="text-[#43C98B]" />
                  <span>Application received! Our Academic Coordinator will reach out within 24 hours.</span>
                </div>
              )}
            </div>

            {/* Right: Interactive Royalty Estimator */}
            <div>
              <div className="bg-[#0B241A]/35 border border-[#bedcc8]/15 rounded p-6 sm:p-7 flex flex-col gap-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#bedcc8]/10">
                  <Coins size={20} className="text-[#43C98B]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#F1F5F2]">Monthly Royalty Calculator</h3>
                    <span className="text-xs text-[#8F9D93]">Estimate your monthly creator earnings</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Slider 1: Questions */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8F9D93] font-semibold">Approved Questions Authored</span>
                      <span className="text-[#43C98B] font-bold">{questionsCount} Questions</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={questionsCount}
                      onChange={(e) => setQuestionsCount(Number(e.target.value))}
                      className="custom-range range-sage w-full cursor-pointer accent-[#43C98B]"
                    />
                  </div>

                  {/* Slider 2: Papers */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8F9D93] font-semibold">Full 80-Mark Papers Curated</span>
                      <span className="text-[#43C98B] font-bold">{papersCurated} Papers</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={papersCurated}
                      onChange={(e) => setPapersCurated(Number(e.target.value))}
                      className="custom-range range-sage w-full cursor-pointer accent-[#43C98B]"
                    />
                  </div>
                </div>

                {/* Earnings Display */}
                <div className="bg-[#104734]/25 border border-[#bedcc8]/15 rounded p-5 text-center flex flex-col items-center">
                  <span className="text-[11px] uppercase tracking-wider text-[#8F9D93] font-semibold">
                    Estimated Monthly Earnings
                  </span>
                  <div className="flex items-baseline gap-1.5 my-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#D5F36A] leading-none">
                      ₹{estimatedRoyalty.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#8F9D93]">/ month</span>
                  </div>
                  <span className="text-[11px] text-[#8F9D93]">
                    Direct deposit on the 1st of every month • Transparent dashboard
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
