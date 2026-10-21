import React, { useState } from 'react';
import { Coins, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RoyaltyCalculator({ onApplyClick }) {
  const [questionsCount, setQuestionsCount] = useState(30);
  const [papersCurated, setPapersCurated] = useState(4);
  const [averageAttempts, setAverageAttempts] = useState(1200);

  // Calculation logic
  const questionBaseEarnings = questionsCount * 350; // ₹350 per approved question
  const paperCurationEarnings = papersCurated * 2000; // ₹2,000 per full 80-mark blueprint curated
  const studentAttemptDividend = Math.round((questionsCount * (averageAttempts / 1000) * 150)); // attempt dividend
  const totalEstimatedMonthly = questionBaseEarnings + paperCurationEarnings + studentAttemptDividend;

  return (
    <div className="royalty-calc-widget glass-panel-elevated">
      <div className="calc-header-band">
        <div className="calc-title-group">
          <div className="calc-icon-box">
            <Coins size={22} className="text-butter" />
          </div>
          <div>
            <h3 className="calc-card-title">Educator Monthly Royalty Calculator</h3>
            <p className="calc-card-sub">Simulate your potential earnings as a Quanverse Board Author</p>
          </div>
        </div>
        <div className="calc-payout-tag">
          <TrendingUp size={14} className="text-emerald" />
          <span>Direct Bank Payouts on 5th of Every Month</span>
        </div>
      </div>

      <div className="calc-grid">
        {/* Sliders Column */}
        <div className="calc-controls-col">
          {/* Slider 1: Questions Authored */}
          <div className="calc-slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Original Board Questions Authored</span>
              <span className="slider-value-badge">{questionsCount} Questions</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={questionsCount}
              onChange={(e) => setQuestionsCount(Number(e.target.value))}
              className="custom-range"
            />
            <div className="slider-range-limits">
              <span>5</span>
              <span>50</span>
              <span>100 items/mo</span>
            </div>
          </div>

          {/* Slider 2: Full Pre-Board Blueprints */}
          <div className="calc-slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Full 80-Mark Pre-Board Papers Curated</span>
              <span className="slider-value-badge">{papersCurated} Papers</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={papersCurated}
              onChange={(e) => setPapersCurated(Number(e.target.value))}
              className="custom-range"
            />
            <div className="slider-range-limits">
              <span>0</span>
              <span>6</span>
              <span>12 papers/mo</span>
            </div>
          </div>

          {/* Slider 3: Student Attempts */}
          <div className="calc-slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Est. Student Attempts per Question</span>
              <span className="slider-value-badge">{averageAttempts.toLocaleString('en-IN')} Attempts</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="200"
              value={averageAttempts}
              onChange={(e) => setAverageAttempts(Number(e.target.value))}
              className="custom-range"
            />
            <div className="slider-range-limits">
              <span>200</span>
              <span>2,500</span>
              <span>5,000+</span>
            </div>
          </div>
        </div>

        {/* Payout Breakdown Card */}
        <div className="calc-summary-col">
          <div className="payout-result-card">
            <span className="payout-label">Projected Monthly Earnings</span>
            <div className="payout-amount-display">
              <span className="payout-currency">₹</span>
              <span className="payout-number">{totalEstimatedMonthly.toLocaleString('en-IN')}</span>
              <span className="payout-period">/ month</span>
            </div>

            <div className="breakdown-list">
              <div className="breakdown-item">
                <span className="item-name">Approved Question Bounty (₹350/item)</span>
                <span className="item-amount">₹{questionBaseEarnings.toLocaleString('en-IN')}</span>
              </div>
              <div className="breakdown-item">
                <span className="item-name">Paper Blueprint Curation Bonus</span>
                <span className="item-amount">₹{paperCurationEarnings.toLocaleString('en-IN')}</span>
              </div>
              <div className="breakdown-item">
                <span className="item-name">Perpetual Student Attempt Dividend</span>
                <span className="item-amount">₹{studentAttemptDividend.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn btn-primary w-full shadow-hover apply-from-calc-btn"
              onClick={onApplyClick}
            >
              <Sparkles size={16} />
              <span>Claim Your Author Profile</span>
              <ArrowRight size={16} />
            </button>

            <div className="payout-security-notice">
              <ShieldCheck size={14} className="text-emerald" />
              <span>100% Author IP Protection • Transparent Monthly Reports</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .royalty-calc-widget {
          background: #f2f5f0;
          border-radius: var(--radius-xl);
          padding: 2.25rem;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 16px 40px -8px rgba(18, 65, 112, 0.1);
        }

        .calc-header-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.75rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .calc-title-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .calc-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(170, 255, 199, 0.35);
          border: 1px solid rgba(103, 192, 144, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calc-card-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }

        .calc-card-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .calc-payout-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--pastel-sage-text);
          background: var(--pastel-sage);
          padding: 6px 12px;
          border-radius: var(--radius-full);
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .calc-controls-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .calc-slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slider-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .slider-value-badge {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--pastel-lavender-text);
          background: var(--pastel-lavender);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .custom-range {
          width: 100%;
          height: 6px;
          background: var(--bg-subtle);
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          accent-color: var(--brand-emerald);
        }

        .slider-range-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-light);
        }

        /* Summary Col */
        .payout-result-card {
          background: linear-gradient(135deg, rgb(18, 65, 112) 0%, rgb(33, 91, 99) 100%);
          border-radius: var(--radius-lg);
          padding: 2rem;
          color: #ffffff;
          box-shadow: 0 16px 36px -8px rgba(18, 65, 112, 0.3);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .payout-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: rgba(170, 255, 199, 0.85);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .payout-amount-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 1.5rem;
        }

        .payout-currency {
          font-size: 1.5rem;
          color: rgb(170, 255, 199);
          font-weight: 700;
        }

        .payout-number {
          font-family: var(--font-display);
          font-size: 2.6rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .payout-period {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .breakdown-list {
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          text-align: left;
        }

        .item-name {
          color: rgba(255, 255, 255, 0.85);
        }

        .item-amount {
          font-weight: 600;
          color: rgb(170, 255, 199);
        }

        .apply-from-calc-btn {
          margin-bottom: 1rem;
          padding: 12px 20px;
          font-size: 0.95rem;
        }

        .payout-security-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: rgba(226, 241, 231, 0.7);
        }
      `}</style>
    </div>
  );
}
