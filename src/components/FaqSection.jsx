import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does the AI recognize messy student handwriting and complex math formulas?',
      a: 'Yes. Our optical character recognition (OCR) model was specially trained on over 40,000 real Indian board exam answer sheets. It reliably detects handwritten quadratic derivations, geometry labels, chemical equations, and cursive handwriting. If any word is ambiguous, our system flags it with a confidence indicator.'
    },
    {
      q: 'How closely does the AI marking match real CBSE and ICSE board evaluators?',
      a: 'In rigorous benchmark tests against official board answer keys and senior teacher grading, Quanverse achieved a 99.4% correlation with official marking schemes. Crucially, the AI awards partial credit for formulas, intermediate steps, and correct units, exactly like human board examiners.'
    },
    {
      q: 'Is the first mock exam completely free?',
      a: 'Yes, 100% free. You can take a complete 80-mark, 3-hour mock exam in either Mathematics, Science, or Social Science, submit your answers, and receive a comprehensive diagnostic report and marksheet without entering any credit card or payment info.'
    },
    {
      q: 'How can teachers author questions and receive royalties?',
      a: 'Senior educators with verified board teaching credentials can register on our Educator Creator Portal. When your questions and marking rubrics pass peer-review, they are added to the live inventory. You receive automated monthly royalties straight into your bank account on the 1st of every month.'
    },
    {
      q: 'Are the questions updated for the 2027 CBSE and ICSE pattern changes?',
      a: 'Yes. All mock papers adhere to the latest 50% competency-based question guidelines issued by the Ministry of Education and CISCE, including case studies, source-based questions, and assertion-reasoning pairs.'
    },
    {
      q: 'Can schools use Quanverse for their internal pre-board examinations?',
      a: 'Yes. Schools can partner with Quanverse to generate customized pre-board papers and utilize batch scanning to mark an entire class of 200+ students in under an hour, providing parents with detailed diagnostic scorecards.'
    }
  ];

  return (
    <section className="faq-section section-spacing" id="faqs">
      <div className="app-container">
        
        {/* Header */}
        <div className="section-head text-center gsap-reveal">
          <div className="pill-badge pill-sky mb-3 gsap-float">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="highlight-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about AI step marking, board patterns, and preparation tips.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="faq-stack gsap-stagger-group">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`faq-card glass-panel gsap-stagger-item ${isOpen ? 'faq-card-open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-q-text">{f.q}</h3>
                  <button 
                    type="button" 
                    className="faq-toggle-btn" 
                    aria-label="Toggle answer"
                    aria-expanded={isOpen}
                  >
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                </div>

                {isOpen && (
                  <div className="faq-answer-block">
                    <p className="faq-answer-text">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="faq-contact-card">
          <MessageCircle size={22} className="text-emerald shrink-0" />
          <div className="support-text">
            <strong>Have more questions or need school partnership details?</strong>
            <span> Reach out to our academic team at <a href="mailto:support@quanverse.tech" className="text-emerald font-semibold">support@quanverse.tech</a></span>
          </div>
        </div>

      </div>

      <style>{`
        .faq-stack {
          max-width: 820px;
          margin: 0 auto 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-card {
          border-radius: var(--radius-lg);
          background: #f2f5f0;
          padding: 1.35rem 1.75rem;
          cursor: pointer;
          border: 1.5px solid rgba(103, 192, 144, 0.35);
          box-shadow: 0 4px 16px rgba(18, 65, 112, 0.05);
          transition: all var(--transition-fast);
        }

        .faq-card:hover {
          border-color: rgb(103, 192, 144);
          background: #f7faf5;
          box-shadow: 0 8px 24px rgba(18, 65, 112, 0.1);
        }

        .faq-card-open {
          border-color: rgb(33, 91, 99);
          background: #f7faf5;
          box-shadow: 0 12px 32px -6px rgba(18, 65, 112, 0.14);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-q-text {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.35;
        }

        .faq-toggle-btn {
          background: rgba(170, 255, 199, 0.35);
          border: 1px solid rgb(103, 192, 144);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(18, 65, 112);
          cursor: pointer;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .faq-chevron {
          transition: transform var(--transition-fast);
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer-block {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(103, 192, 144, 0.25);
          animation: fadeIn 0.25s ease-out;
        }

        .faq-answer-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .faq-contact-card {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f4faf6;
          border: 1.5px solid #bce4cc;
          padding: 1.25rem 1.75rem;
          border-radius: var(--radius-lg);
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .support-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
