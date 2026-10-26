import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function PricingSection({ onOpenDemoExam }) {
  const plans = [
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
    <section className="editorial-pricing-section" id="pricing">
      <div className="app-container">

        {/* Section Header */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-lime font-bold">PASS SELECTION</span>
          </div>

          <div className="title-with-flourish">
            <h2 className="section-title text-main">
              Transparent Pricing. No Token Markups.
            </h2>
          </div>

          <p className="section-subtitle">
            Official CBSE &amp; ICSE alignment. Start free today without a credit card.
          </p>
        </div>

        {/* Continuous 3-Column Editorial Pricing Grid */}
        <div className="editorial-pricing-grid">

          {/* 3 Columns */}
          <div className="pricing-columns-row">
            {plans.map((p) => {
              return (
                <div
                  key={p.id}
                  className={`pricing-col ${p.isPopular ? 'popular-col' : ''}`}
                >
                  {/* Col Top Meta */}
                  <div className="col-top-meta font-mono text-xs mb-3">
                    <span className={`tracking-wider font-semibold uppercase ${p.isPopular ? 'text-accent-lime' : 'text-accent-emerald'}`}>
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="plan-name text-main mb-2">
                    {p.name}
                  </h3>

                  <p className="plan-desc text-muted mb-4 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Price Display */}
                  <div className="price-box font-mono mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`price-amount text-3xl md:text-4xl font-bold ${p.isPopular ? 'text-accent-lime' : 'text-main'}`}>
                        {p.price}
                      </span>
                      {p.originalPrice && (
                        <span className="price-strikethrough text-muted line-through text-sm">
                          {p.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="price-period text-xs text-muted mt-1">
                      {p.period}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="plan-features-list space-y-2.5 font-sans text-xs text-muted mb-3">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-accent-emerald shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="plan-cta-wrap mt-auto pt-2.5 border-t border-[rgba(190,220,200,0.1)]">
                    <button
                      type="button"
                      className={`w-full justify-center ${
                        p.isPopular ? 'btn btn-emerald' : 'btn btn-secondary'
                      }`}
                      onClick={onOpenDemoExam}
                    >
                      <span>{p.cta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Integrated Trust Banner (Continuous Grid, No Floating Box) */}
          <div className="pricing-trust-banner font-mono text-xs">
            <div className="trust-col-left flex items-center gap-2 text-muted">
              <ShieldCheck size={16} className="text-accent-emerald" />
              <span>OFFICIAL NCERT &amp; CISCE BLUEPRINT ALIGNMENT GUARANTEE</span>
            </div>
            <div className="trust-col-right text-muted">
              INSTANT DIGITAL ACCESS · 7-DAY SATISFACTION REFUND
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .editorial-pricing-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-pricing-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        /* Master Editorial Pricing Grid */
        .editorial-pricing-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .pricing-columns-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .pricing-col {
          padding: clamp(1.5rem, 2.6vw, 2.25rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
          background: rgba(7, 17, 13, 0.4);
        }

        .pricing-col:last-child {
          border-right: none;
        }

        .pricing-col.popular-col {
          background: rgba(16, 71, 52, 0.22);
        }

        .col-top-meta {
          height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .plan-name {
          min-height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.25rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: #F1F5F2;
        }

        .plan-desc {
          min-height: auto;
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.65rem;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #B5C0B8;
        }

        .price-box {
          padding: 0.85rem 0;
          border-top: 1px solid rgba(190, 220, 200, 0.1);
          border-bottom: 1px solid rgba(190, 220, 200, 0.1);
          margin-bottom: 1.15rem;
        }

        .plan-features-list {
          flex: 1;
          min-height: auto;
          margin-bottom: 0.85rem;
        }

        .plan-cta-wrap {
          margin-top: auto;
          padding-top: 0.65rem;
        }

        /* Bottom Trust Banner */
        .pricing-trust-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem clamp(1rem, 1.8vw, 1.45rem);
          background: rgba(11, 36, 26, 0.5);
          border-top: 1px solid rgba(190, 220, 200, 0.14);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .pricing-columns-row {
            grid-template-columns: 1fr;
          }

          .pricing-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }
        }
      `}</style>
    </section>
  );
}
