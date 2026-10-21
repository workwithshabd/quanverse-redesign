import React, { useRef } from 'react';
import { 
  Users, 
  Coins, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Star,
  HelpCircle
} from 'lucide-react';
import RoyaltyCalculator from '../components/teacher/RoyaltyCalculator';
import TeacherSignupForm from '../components/teacher/TeacherSignupForm';
import { useNavigation } from '../hooks/useNavigation';

export default function TeachersPage() {
  const { openTeacherSignup, navigateTo } = useNavigation();
  const signupRef = useRef(null);

  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      openTeacherSignup();
    }
  };

  const teacherTestimonials = [
    {
      name: 'Mrs. Sunita Sharma',
      role: 'Head of Mathematics Department',
      school: 'Delhi Public School, R.K. Puram',
      experience: '19 Years Experience • 8-Time Board Examiner',
      quote: 'Quanverse provides the exact step-marking rigor we demand in CBSE evaluation. I author two specimen mock series each semester and the royalties are paid like clockwork on the 5th of each month.',
      earnings: 'Avg. ₹38,000/month in creator royalties'
    },
    {
      name: 'Mr. Rajesh Nair',
      role: 'Senior Physics Faculty & Author',
      school: 'St. Xavier’s Collegiate School, Kolkata',
      experience: '14 Years ICSE Science Specialist',
      quote: 'The AI question generator matches CISCE specimen rubrics with astonishing accuracy. It saved our department 40+ hours when drafting pre-board papers for 240 candidates.',
      earnings: 'Pre-board distribution partner'
    },
    {
      name: 'Dr. Anita Deshmukh',
      role: 'Senior Biology Evaluator',
      school: 'Bishop’s School, Pune',
      experience: '16 Years Secondary Board Evaluator',
      quote: 'Teaching Class 10 requires deep nuance—students often lose marks merely on technical keywords. Authoring on Quanverse gives our expertise national reach while securing recurring income.',
      earnings: 'Avg. ₹29,500/month royalties'
    }
  ];

  const teacherFaqs = [
    {
      q: 'Who owns the copyright of the questions and mock papers I author?',
      a: 'You retain full intellectual attribution and co-copyright. Quanverse receives an exclusive digital distribution license to deliver your content to students and schools, and pays you perpetual royalties for every student attempt.'
    },
    {
      q: 'How and when are teacher royalties paid?',
      a: 'Royalties are calculated transparently in your Educator Dashboard and credited directly to your registered bank account or UPI on the 5th of every month. Complete attempt analytics and deduction statements are downloadable anytime.'
    },
    {
      q: 'Can I author part-time alongside my current school teaching job?',
      a: 'Yes, absolutely! 92% of our partner educators are active school teachers or private tutors. You can author single questions in the evening, review rubrics on weekends, or curate complete pre-boards whenever your schedule permits.'
    },
    {
      q: 'What is the minimum eligibility to become an authoring teacher?',
      a: 'We require a minimum of 3 years of teaching experience in Class 10 CBSE, ICSE, or State Board curricula. Prior experience as an official board answer sheet evaluator is highly preferred and fast-tracks approval.'
    }
  ];

  return (
    <div className="teachers-page">
      
      {/* 1. Teacher Hero Section */}
      <section className="teachers-hero-section">
        <div className="pastel-glow-orb orb-lavender"></div>
        <div className="pastel-glow-orb orb-sage"></div>
        <div className="pastel-glow-orb orb-butter"></div>

        <div className="app-container">
          <div className="teachers-hero-content text-center">
            
            <div className="hero-top-badge-row">
              <div className="pill-badge pill-lavender mb-3 mx-auto">
                <Users size={14} />
                <span>Quanverse Educator Creator Network</span>
              </div>
            </div>

            <h1 className="teachers-hero-heading">
              Author Board-Standard Papers. <br />
              <span className="highlight-text">Earn Monthly Royalties</span> &amp; Lead AI Assessment.
            </h1>

            <p className="teachers-hero-sub">
              Are you an experienced Class 10 CBSE or ICSE educator? Partner with India’s dedicated board preparation platform. 
              Author original question papers, validate official step-marking rubrics, automate pre-boards for your school, and receive perpetual creator royalties directly to your bank account.
            </p>

            <div className="teachers-cta-row">
              <button 
                type="button" 
                className="btn btn-primary btn-lg shadow-hover"
                onClick={scrollToSignup}
              >
                <Users size={18} />
                <span>Sign Up as a Teacher</span>
                <ArrowRight size={17} />
              </button>

              <a href="#royalty-calc" className="btn btn-secondary btn-lg">
                <Coins size={17} className="text-butter" />
                <span>Calculate Your Royalties</span>
              </a>

              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={() => navigateTo('careers')}
              >
                <span>View Full-Time Core Team Roles →</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="teachers-trust-band">
              <div className="trust-cell">
                <div className="trust-val">₹3.4M+</div>
                <div className="trust-desc">Royalties Paid to Educators</div>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-cell">
                <div className="trust-val">140+</div>
                <div className="trust-desc">Partner Schools &amp; Pre-Boards</div>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-cell">
                <div className="trust-val">450+</div>
                <div className="trust-desc">Active Teacher Authors</div>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-cell">
                <div className="trust-val">100%</div>
                <div className="trust-desc">Attribution &amp; IP Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Educator Benefits (4 Core Pillars) */}
      <section className="section-spacing educator-pillars-section">
        <div className="app-container">
          <div className="section-head text-center mb-5">
            <span className="pill-badge pill-sage mb-2">Why Teach With Quanverse</span>
            <h2 className="section-title">Built by Educators, for Educators</h2>
            <p className="section-sub max-w-700 mx-auto">
              We empower seasoned teachers with cutting-edge technology and fair economics—transforming your pedagogical expertise into recurring value.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card glass-panel-elevated">
              <div className="pillar-icon-box bg-sage">
                <Coins size={24} className="text-sage" />
              </div>
              <h3 className="pillar-title">Author Once, Earn Perpetually</h3>
              <p className="pillar-desc">
                Receive upfront bounties for approved questions plus monthly dividends every single time a student takes an exam featuring your content.
              </p>
              <ul className="pillar-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Upfront bounty: ₹300 - ₹1,200 per item</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Recurring attempts royalty dividend</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Automatic payouts on 5th of every month</li>
              </ul>
            </div>

            <div className="pillar-card glass-panel-elevated">
              <div className="pillar-icon-box bg-lavender">
                <Award size={24} className="text-lavender" />
              </div>
              <h3 className="pillar-title">National Examiner Recognition</h3>
              <p className="pillar-desc">
                Your profile, verified school affiliation, and examiner credentials appear prominently alongside your authored mock exams.
              </p>
              <ul className="pillar-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Verified "Senior Board Examiner" badge</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Dedicated author public profile page</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Featured in school recommendation lists</li>
              </ul>
            </div>

            <div className="pillar-card glass-panel-elevated">
              <div className="pillar-icon-box bg-peach">
                <Sparkles size={24} className="text-peach" />
              </div>
              <h3 className="pillar-title">AI Authoring Studio Access</h3>
              <p className="pillar-desc">
                Use our proprietary teacher co-pilot to generate official CBSE 2027-aligned marking keys, step deductions, and competency case studies in seconds.
              </p>
              <ul className="pillar-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Auto-formatting to CBSE &amp; ICSE blueprints</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Step-by-step mark allocation generator</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> LaTeX math &amp; diagram formatting tools</li>
              </ul>
            </div>

            <div className="pillar-card glass-panel-elevated">
              <div className="pillar-icon-box bg-sky">
                <BookOpen size={24} className="text-sky" />
              </div>
              <h3 className="pillar-title">Automate School Pre-Boards</h3>
              <p className="pillar-desc">
                Assemble complete 80-mark pre-board papers for your school with 1-click PDF generation, printable answer booklets, and automated AI grading.
              </p>
              <ul className="pillar-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> 1-Click 80-mark pre-board generation</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Print-ready question paper with school logo</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Bulk AI grading for school cohorts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Royalty Calculator */}
      <section className="section-spacing bg-subtle-section" id="royalty-calc">
        <div className="app-container">
          <div className="section-head text-center mb-4">
            <span className="pill-badge pill-butter mb-2">Earnings Transparency</span>
            <h2 className="section-title">How Much Can You Earn?</h2>
            <p className="section-sub max-w-600 mx-auto">
              Drag the sliders below to estimate your monthly payouts based on questions contributed and student attempts.
            </p>
          </div>

          <div className="max-w-900 mx-auto">
            <RoyaltyCalculator onApplyClick={scrollToSignup} />
          </div>
        </div>
      </section>

      {/* 4. Dedicated Sign Up as Teacher Section */}
      <section className="section-spacing" id="teacher-signup-section" ref={signupRef}>
        <div className="app-container">
          <div className="max-w-800 mx-auto">
            <TeacherSignupForm onSuccess={() => {}} />
          </div>
        </div>
      </section>

      {/* 5. Senior Teacher Testimonials & Spotlights */}
      <section className="section-spacing bg-subtle-section">
        <div className="app-container">
          <div className="section-head text-center mb-5">
            <span className="pill-badge pill-lavender mb-2">Senior Faculty Voices</span>
            <h2 className="section-title">Trusted by Senior CBSE &amp; ICSE Educators</h2>
            <p className="section-sub max-w-600 mx-auto">
              Hear from department heads and board moderators who author on Quanverse.
            </p>
          </div>

          <div className="testimonials-grid">
            {teacherTestimonials.map((t, idx) => (
              <div key={idx} className="teacher-testimonial-card glass-panel-elevated">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-butter text-butter" />
                  ))}
                </div>
                <blockquote className="teacher-quote">“{t.quote}”</blockquote>
                <div className="teacher-meta-box">
                  <div className="teacher-avatar-circle">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="teacher-details">
                    <strong className="teacher-name">{t.name}</strong>
                    <span className="teacher-title">{t.role} • {t.school}</span>
                    <span className="teacher-exp">{t.experience}</span>
                  </div>
                </div>
                <div className="teacher-earnings-tag">
                  <Coins size={13} className="text-butter" />
                  <span>{t.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Teacher FAQs */}
      <section className="section-spacing" id="teacher-faqs">
        <div className="app-container">
          <div className="section-head text-center mb-5">
            <span className="pill-badge pill-peach mb-2">Frequently Asked Questions</span>
            <h2 className="section-title">Educator Partnership FAQs</h2>
            <p className="section-sub max-w-600 mx-auto">
              Clear answers regarding intellectual property, monthly payouts, and time commitments.
            </p>
          </div>

          <div className="teacher-faq-list max-w-800 mx-auto">
            {teacherFaqs.map((faq, idx) => (
              <div key={idx} className="faq-card glass-panel-elevated">
                <h3 className="faq-question">
                  <HelpCircle size={18} className="text-emerald" />
                  <span>{faq.q}</span>
                </h3>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="faq-contact-card text-center mt-5 max-w-600 mx-auto glass-panel">
            <h4 className="font-semibold mb-2">Want to discuss an institutional school partnership?</h4>
            <p className="text-muted text-sm mb-3">
              Contact our Academic Coordination team at <strong>partners@quanverse.tech</strong> or WhatsApp our coordinator at +91 98765 43210.
            </p>
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={scrollToSignup}
            >
              <span>Apply as Authoring Educator</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .teachers-page {
          min-height: 100vh;
          background: var(--bg-page);
        }

        .teachers-hero-section {
          position: relative;
          padding: 5rem 0 4rem;
          overflow: hidden;
        }

        .teachers-hero-heading {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.15;
          margin-bottom: 1.25rem;
          letter-spacing: -0.8px;
        }

        .teachers-hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-muted);
          max-width: 760px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .teachers-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .teachers-trust-band {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          background: #ffffff;
          padding: 1.25rem 2.5rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-card);
          max-width: 900px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .trust-cell {
          text-align: center;
        }

        .trust-val {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--brand-emerald);
          letter-spacing: -0.5px;
        }

        .trust-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .trust-sep {
          width: 1px;
          height: 36px;
          background: var(--border-medium);
        }

        /* Pillars Grid */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 1.75rem;
        }

        .pillar-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .pillar-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .bg-sage { background: var(--pastel-sage); }
        .text-sage { color: var(--pastel-sage-text); }
        .bg-lavender { background: var(--pastel-lavender); }
        .text-lavender { color: var(--pastel-lavender-text); }
        .bg-peach { background: var(--pastel-peach); }
        .text-peach { color: var(--pastel-peach-text); }
        .bg-sky { background: var(--pastel-sky); }
        .text-sky { color: var(--pastel-sky-text); }

        .pillar-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--text-main);
          margin-bottom: 0.65rem;
        }

        .pillar-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .pillar-checks {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          font-size: 0.85rem;
          color: var(--text-main);
        }
        .pillar-checks li {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Testimonials Grid */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.75rem;
        }

        .teacher-testimonial-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 1rem;
        }

        .teacher-quote {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .teacher-meta-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }

        .teacher-avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--pastel-sage);
          color: var(--pastel-sage-text);
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .teacher-details {
          display: flex;
          flex-direction: column;
        }

        .teacher-name {
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .teacher-title {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .teacher-exp {
          font-size: 0.75rem;
          color: var(--pastel-sage-text);
          font-weight: 600;
        }

        .teacher-earnings-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--pastel-butter);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--pastel-butter-text);
          width: fit-content;
        }

        /* FAQ */
        .teacher-faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          border: 1px solid var(--border-light);
        }

        .faq-question {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .faq-answer {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          padding-left: 28px;
        }

        .faq-contact-card {
          padding: 1.75rem;
          background: #ffffff;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }

        .bg-subtle-section {
          background: var(--bg-subtle);
        }

        .max-w-600 { max-width: 600px; }
        .max-w-700 { max-width: 700px; }
        .max-w-800 { max-width: 800px; }
        .max-w-900 { max-width: 900px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
}
