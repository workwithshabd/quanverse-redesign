import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap
} from 'lucide-react';

export default function PricingSection({ onOpenDemoExam }) {


  const plans = [
    {
      id: 'free',
      name: 'Free Starter Trial',
      badge: 'Zero Commitment',
      badgeClass: 'pill-butter',
      price: '₹0',
      period: 'lifetime free',
      desc: 'Experience the AI step-marking engine with one complete 80-mark board exam.',
      features: [
        '1 Complete CBSE or ICSE Full-Length Mock Exam',
        'Detailed AI Step-by-Step Marksheet',
        'Board Readiness Score Prediction',
        'Standard NCERT & CISCE Rubric Alignment',
        'Instant Result Delivery in 60s'
      ],
      cta: 'Start Free Mock Now',
      ctaClass: 'btn-secondary',
      popular: false
    },
    {
      id: 'sprint',
      name: 'Topper Board Pass 2027',
      badge: 'Most Popular for Class 10',
      badgeClass: 'pill-sage',
      price: '₹999',
      originalPrice: '₹2,499',
      period: 'entire board exam season',
      desc: 'Complete practice suite designed to transform 75% students into 95%+ board achievers.',
      features: [
        '15 Full-Length 80-Mark Board-Standard Mock Tests',
        'Unlimited AI Handwriting Sheet Scans & OCR',
        'Exact Half-Mark Deduction Analysis for every step',
        'Side-by-side comparison with Topper Model Answers',
        'Chapter-Level Weakness Radar & 5-min repair drills',
        'Priority AI Grading Queue (< 30 seconds)'
      ],
      cta: 'Unlock Board Pass',
      ctaClass: 'btn-primary',
      popular: true
    },
    {
      id: 'school',
      name: 'School & Coaching License',
      badge: 'For Institutions',
      badgeClass: 'pill-lavender',
      price: 'Custom',
      period: 'per batch / academic year',
      desc: 'Empower teachers with automated grading pipelines and comprehensive class analytics.',
      features: [
        'Full Teacher Question Authoring Studio',
        'Bulk Batch Answer Sheet OCR Scanning (Classroom Sets)',
        'Subject-Wise Class Performance & Weakness Heatmap',
        'Automated Printable PDF Parent Report Cards',
        'Dedicated Academic Advisor & Custom Blueprints'
      ],
      cta: 'Request School Demo',
      ctaClass: 'btn-secondary',
      popular: false
    }
  ];

  return (
    <section className="pricing-section section-spacing" id="pricing">
      <div className="app-container">
        
        {/* Header */}
        <div className="section-head text-center">
          <div className="pill-badge pill-peach mb-3">
            <Zap size={14} />
            <span>Fair &amp; Transparent</span>
          </div>
          <h2 className="section-title">
            Invest in Your <span className="highlight-text">Board Confidence</span>
          </h2>
          <p className="section-subtitle">
            Every plan includes official CBSE &amp; ICSE marking scheme alignment. Start completely free today.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plans.map((p) => (
            <div 
              key={p.id} 
              className={`pricing-card glass-panel ${p.popular ? 'pricing-popular-card' : ''}`}
            >
              {p.popular && (
                <div className="popular-ribbon">
                  <Sparkles size={13} className="text-butter" />
                  <span>Recommended for Boards</span>
                </div>
              )}

              <div className="plan-header">
                <span className={`pill-badge ${p.badgeClass} plan-badge`}>{p.badge}</span>
                <h3 className="plan-name">{p.name}</h3>
                <p className="plan-desc">{p.desc}</p>
              </div>

              <div className="plan-price-block">
                <div className="price-row">
                  <span className="price-currency">{p.price}</span>
                  {p.originalPrice && (
                    <span className="price-strike">{p.originalPrice}</span>
                  )}
                </div>
                <span className="price-period">{p.period}</span>
              </div>

              <div className="plan-cta-wrap">
                <button
                  type="button"
                  className={`btn ${p.ctaClass} w-full`}
                  onClick={onOpenDemoExam}
                >
                  <span>{p.cta}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="plan-features-list">
                <span className="features-label">Included in this plan:</span>
                {p.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <div className="check-icon-circle">
                      <Check size={14} className="text-emerald" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Trust Guarantees */}
        <div className="pricing-guarantee-bar">
          <div className="guar-item">
            <ShieldCheck size={18} className="text-emerald" />
            <span>100% Free First Exam • No Credit Card Required</span>
          </div>
          <div className="guar-item">
            <Check size={18} className="text-emerald" />
            <span>Instant Digital Delivery &amp; Cashfree Secure Checkout</span>
          </div>
        </div>

      </div>

      <style>{`
        .pricing-section {
          background: #fbfbf9;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 3rem;
          align-items: stretch;
        }

        .pricing-card {
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
          background: #ffffff;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-smooth);
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-card);
        }

        .pricing-popular-card {
          border-color: var(--pastel-sage-border);
          box-shadow: 0 16px 36px -8px rgba(30, 63, 49, 0.12);
          background: linear-gradient(180deg, #ffffff 0%, #f6faf7 100%);
        }

        .popular-ribbon {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--brand-emerald);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.9rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 12px rgba(30, 63, 49, 0.2);
        }

        .plan-header {
          margin-bottom: 1.5rem;
        }

        .plan-badge {
          margin-bottom: 0.75rem;
        }

        .plan-name {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .plan-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          min-height: 42px;
        }

        .plan-price-block {
          margin-bottom: 1.75rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }

        .price-currency {
          font-family: var(--font-display);
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--brand-emerald);
          line-height: 1;
        }

        .price-strike {
          font-size: 1.1rem;
          color: var(--text-light);
          text-decoration: line-through;
        }

        .price-period {
          font-size: 0.78rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: block;
          margin-top: 0.35rem;
        }

        .plan-cta-wrap {
          margin-bottom: 2rem;
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .features-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-main);
          line-height: 1.4;
        }

        .check-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--pastel-sage);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pricing-guarantee-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          padding: 1.25rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
        }

        .guar-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 960px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
