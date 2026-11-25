import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface PricingSectionProps {
  onOpenDemoExam?: () => void;
}

interface PricingPlan {
  id: string;
  name: string;
  tag: string;
  price: string;
  originalPrice?: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  isPopular: boolean;
}

export default function PricingSection({ onOpenDemoExam }: PricingSectionProps) {
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free Starter Trial',
      tag: 'ZERO COMMITMENT',
      price: '₹0',
      period: 'lifetime free trial',
      desc: 'Experience the AI step-marking engine with one complete 80-mark mock exam.',
      features: [
        '1 Complete 80-mark mock exam',
        'AI step-by-step marksheet',
        'Predicted board readiness score',
        'Instant 60-second evaluation'
      ],
      cta: 'Start Free Mock Now',
      isPopular: false
    },
    {
      id: 'sprint',
      name: 'Topper Board Pass 2027',
      tag: 'RECOMMENDED FOR CLASS 10',
      price: '₹999',
      originalPrice: '₹2,499',
      period: 'entire board exam season',
      desc: 'Complete mock exam suite designed to push your scores past 95%.',
      features: [
        '15 Full-length board mock exams',
        'Unlimited handwritten sheet scans',
        'Exact step deduction breakdown',
        'Topper model answer comparison',
        'Chapter weakness drills'
      ],
      cta: 'Unlock Board Pass',
      isPopular: true
    },
    {
      id: 'school',
      name: 'School & Coaching License',
      tag: 'FOR INSTITUTIONS',
      price: 'Custom',
      period: 'per batch / academic year',
      desc: 'Automated grading pipelines and class analytics for educators.',
      features: [
        'Teacher question authoring studio',
        'Batch answer sheet scanning',
        'Class performance heatmaps',
        'Printable PDF parent scorecards'
      ],
      cta: 'Request School Demo',
      isPopular: false
    }
  ];

  return (
    <section className="relative py-12 md:py-16 bg-transparent" id="pricing">
      <div className="app-container">

        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-xs text-muted mb-2">
            <span className="text-[#D5F36A] font-bold">PASS SELECTION</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EEE9]">
              Transparent Pricing. No Token Markups.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#8F9D93] max-w-[600px] leading-relaxed mt-2">
            Official CBSE &amp; ICSE alignment. Start free today without a credit card.
          </p>
        </div>

        {/* Continuous 3-Column Editorial Pricing Grid */}
        <div className="relative border border-[#bedcc8]/15 bg-[#07110D]/45 backdrop-blur-md">

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {plans.map((p) => {
              return (
                <div
                  key={p.id}
                  className={`p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#bedcc8]/15 last:border-r-0 last:border-b-0 ${
                    p.isPopular ? 'bg-[#104734]/22' : 'bg-[#07110D]/40'
                  }`}
                >
                  <div>
                    {/* Col Top Meta */}
                    <div className="font-mono text-xs mb-2">
                      <span className={`tracking-wider font-semibold uppercase ${p.isPopular ? 'text-[#D5F36A]' : 'text-[#43C98B]'}`}>
                        {p.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-[#F1F5F2] mb-1.5">
                      {p.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#B5C0B8] leading-relaxed mb-4">
                      {p.desc}
                    </p>

                    {/* Price Display */}
                    <div className="font-mono py-3.5 border-y border-[#bedcc8]/10 mb-5">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl md:text-4xl font-bold ${p.isPopular ? 'text-[#D5F36A]' : 'text-[#F1F5F2]'}`}>
                          {p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-[#8F9D93] line-through">
                            {p.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#8F9D93] mt-1">
                        {p.period}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 text-xs text-[#B5C0B8] mb-6">
                      {p.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#43C98B] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-3 border-t border-[#bedcc8]/10 mt-auto">
                    <button
                      type="button"
                      className={`w-full justify-center flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3.5 px-6 ${
                        p.isPopular ? 'btn btn-emerald' : 'btn btn-secondary'
                      }`}
                      onClick={onOpenDemoExam}
                    >
                      <span className="button__flair" aria-hidden="true" />
                      <span>{p.cta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Integrated Trust Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[#0B241A]/50 border-t border-[#bedcc8]/15 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#8F9D93]">
              <ShieldCheck size={16} className="text-[#43C98B]" />
              <span>OFFICIAL NCERT &amp; CISCE BLUEPRINT ALIGNMENT GUARANTEE</span>
            </div>
            <div className="text-[#8F9D93] text-[11px]">
              INSTANT DIGITAL ACCESS · 7-DAY SATISFACTION REFUND
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
