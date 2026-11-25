import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeaturesBentoProps {
  onOpenDemoExam?: () => void;
}

export default function FeaturesBento({ onOpenDemoExam }: FeaturesBentoProps) {
  return (
    <section className="relative py-12 md:py-16 bg-transparent" id="features">
      <div className="app-container">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-xs text-muted mb-2">
            <span className="text-[#D5F36A] font-bold tracking-wider">CORE CAPABILITIES</span>
          </div>

          <div className="mb-2.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EEE9]">
              Engineered for Zero Mark Loss
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#8F9D93] max-w-[600px] leading-relaxed">
            Every feature on Quanverse is calibrated to turn raw board effort into verified 95%+ marks.
          </p>
        </div>

        {/* Master Architectural Grid Frame: Strict 2x2 Grid */}
        <div className="relative border border-[#bedcc8]/15 bg-[#07110D]/45 backdrop-blur-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Cell 1: Top-Left (Optical OCR) - Default: Text, Hover: Artwork */}
            <div className="group relative p-7 sm:p-10 min-h-[340px] flex flex-col justify-between border-b md:border-r border-[#bedcc8]/15 overflow-hidden transition-colors">
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D5F36A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />

              {/* Halftone Artwork Image (Revealed on Hover) */}
              <div className="absolute inset-0 bg-[#040d0a] z-[1] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-ocr.png" 
                  alt="Optical OCR Artwork" 
                  className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-[2] flex flex-col justify-between h-full opacity-100 group-hover:opacity-0 transition-all duration-300 transform scale-100 group-hover:scale-95 pointer-events-auto group-hover:pointer-events-none">
                <div>
                  <div className="font-mono text-xs mb-3">
                    <span className="text-[#D5F36A] font-semibold uppercase tracking-wider">
                      [01 / OPTICAL OCR]
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-[#E8EEE9] leading-snug mb-2.5">
                    Real Paper OCR Recognition
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-6">
                    Snap your handwritten sheets for instant symbol, equation, and step-mark parsing.
                  </p>
                </div>

                <div className="bg-[#0B241A]/55 border border-[#bedcc8]/15 rounded-md p-4 min-h-[120px] font-mono text-xs flex flex-col justify-between mt-auto">
                  <div className="flex flex-col gap-1 text-[#E8EEE9]">
                    <div>Given: In △ABC, ∠B = 90°</div>
                    <div>AC² = (12)² + (5)² = 169 ⇒ AC = 13 cm</div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#104734]/60 border border-[#a7f3c4]/30 rounded text-[#D5F36A] text-[11px] font-semibold w-fit mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D5F36A] shadow-[0_0_6px_rgba(213,243,106,0.6)]" />
                    <span>Step Award: +1.5 Marks Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 2: Top-Right (Pacing Analytics) - Inverted: Artwork by default, Text on hover */}
            <div className="group relative p-7 sm:p-10 min-h-[340px] flex flex-col justify-between border-b border-[#bedcc8]/15 overflow-hidden transition-colors">
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D5F36A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />

              {/* Halftone Artwork Image (Shown by Default) */}
              <div className="absolute inset-0 bg-[#040d0a] z-[1] overflow-hidden pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-step.png" 
                  alt="Pacing Analytics Artwork" 
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Content (Revealed on Hover) */}
              <div className="absolute inset-0 p-7 sm:p-10 bg-[#07110D]/95 backdrop-blur-md z-[2] flex flex-col justify-between h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <div>
                  <div className="font-mono text-xs mb-3">
                    <span className="text-[#D5F36A] font-semibold uppercase tracking-wider">
                      [02 / PACING ANALYTICS]
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-[#E8EEE9] leading-snug mb-2.5">
                    Board Hall Pacing Analytics
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-6">
                    Track section minute targets in real time to prevent rushed or incomplete long answers.
                  </p>
                </div>

                <div className="bg-[#0B241A]/55 border border-[#bedcc8]/15 rounded-md p-4 min-h-[120px] font-mono text-xs flex flex-col justify-between gap-3 mt-auto">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[#E8EEE9]">
                      <span className="font-medium">Section A (MCQs)</span>
                      <span className="text-[11px] font-semibold text-[#D5F36A] bg-[#104734]/60 px-2 py-0.5 rounded border border-[#D5F36A]/35">
                        22 / 25 min
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#bedcc8]/15 rounded overflow-hidden">
                      <div className="h-full bg-[#D5F36A] rounded shadow-[0_0_8px_rgba(213,243,106,0.35)]" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[#E8EEE9]">
                      <span className="font-medium">Section D (Long Ans)</span>
                      <span className="text-[11px] font-semibold text-[#D5F36A] bg-[#104734]/60 px-2 py-0.5 rounded border border-[#D5F36A]/35">
                        45 / 45 min
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#bedcc8]/15 rounded overflow-hidden">
                      <div className="h-full bg-[#D5F36A] rounded shadow-[0_0_8px_rgba(213,243,106,0.35)]" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 3: Bottom-Left (Topper Benchmark) - Inverted: Artwork by default, Text on hover */}
            <div className="group relative p-7 sm:p-10 min-h-[340px] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#bedcc8]/15 overflow-hidden transition-colors">
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D5F36A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />

              {/* Halftone Artwork Image (Shown by Default) */}
              <div className="absolute inset-0 bg-[#040d0a] z-[1] overflow-hidden pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-schemes.png" 
                  alt="Topper Benchmark Artwork" 
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Content (Revealed on Hover) */}
              <div className="absolute inset-0 p-7 sm:p-10 bg-[#07110D]/95 backdrop-blur-md z-[2] flex flex-col justify-between h-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <div>
                  <div className="font-mono text-xs mb-3">
                    <span className="text-[#D5F36A] font-semibold uppercase tracking-wider">
                      [03 / TOPPER BENCHMARK]
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-[#E8EEE9] leading-snug mb-2.5">
                    100/100 Model Answer Benchmark
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-6">
                    Compare your working side by side with state topper scripts to master official notation.
                  </p>
                </div>

                <div className="bg-[#0B241A]/55 border border-[#bedcc8]/15 rounded-md p-4 min-h-[120px] font-mono text-xs flex flex-col justify-center gap-2.5 mt-auto">
                  <div className="flex justify-between items-center text-[#E8EEE9]">
                    <span className="font-medium">Your Working</span>
                    <span className="text-[#8F9D93] text-[11px]">2.0 / 3.0 (-1m skipped step)</span>
                  </div>
                  <div className="w-full h-px bg-[#bedcc8]/15" />
                  <div className="flex justify-between items-center text-[#D5F36A]">
                    <span className="font-semibold">Topper Exemplar</span>
                    <span className="font-bold">3.0 / 3.0 Full Marks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 4: Bottom-Right (Diagnostic Radar) - Default: Text, Hover: Artwork */}
            <div className="group relative p-7 sm:p-10 min-h-[340px] flex flex-col justify-between overflow-hidden transition-colors">
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D5F36A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />

              {/* Halftone Artwork Image (Revealed on Hover) */}
              <div className="absolute inset-0 bg-[#040d0a] z-[1] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <img 
                  src="/assets/metrics/metric-blueprints.png" 
                  alt="Diagnostic Radar Artwork" 
                  className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-[2] flex flex-col justify-between h-full opacity-100 group-hover:opacity-0 transition-all duration-300 transform scale-100 group-hover:scale-95 pointer-events-auto group-hover:pointer-events-none">
                <div>
                  <div className="font-mono text-xs mb-3">
                    <span className="text-[#D5F36A] font-semibold uppercase tracking-wider">
                      [04 / DIAGNOSTIC RADAR]
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-[#E8EEE9] leading-snug mb-2.5">
                    Chapter Weakness Radar
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-6">
                    Isolate subtopics leaking half-marks and assign five-minute targeted recovery drills.
                  </p>
                </div>

                <div className="bg-[#0B241A]/55 border border-[#bedcc8]/15 rounded-md p-4 min-h-[120px] font-mono text-xs flex flex-col justify-between gap-3 mt-auto">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[#E8EEE9]">
                      <span className="font-medium">Trigonometry Identities</span>
                      <span className="text-[11px] font-semibold text-[#43C98B] bg-[#104734]/60 px-2 py-0.5 rounded border border-[#43C98B]/35">
                        94% Mastery
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#bedcc8]/15 rounded overflow-hidden">
                      <div className="h-full bg-[#43C98B] rounded shadow-[0_0_8px_rgba(67,201,139,0.35)]" style={{ width: '94%' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[#E8EEE9]">
                      <span className="font-medium">Carbon Compounds</span>
                      <span className="text-[11px] font-semibold text-[#D5F36A] bg-[#104734]/60 px-2 py-0.5 rounded border border-[#D5F36A]/35">
                        58% Leak
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#bedcc8]/15 rounded overflow-hidden">
                      <div className="h-full bg-[#D5F36A] rounded shadow-[0_0_8px_rgba(213,243,106,0.35)]" style={{ width: '58%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Master Grid Footer Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 bg-[#0B241A]/45 border-t border-[#bedcc8]/15">
            <div className="font-mono text-xs text-[#8F9D93]">
              Test your Class 10 working against official examiner rubrics.
            </div>
            <button
              type="button"
              className="btn btn-emerald flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
              onClick={onOpenDemoExam}
            >
              <span>Attempt Interactive Mock Exam</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
