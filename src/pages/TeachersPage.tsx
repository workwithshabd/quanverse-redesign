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
import { useGsapScroll } from '../hooks/useGsapScroll';

interface TeacherTestimonial {
  name: string;
  role: string;
  school: string;
  experience: string;
  quote: string;
  earnings: string;
}

interface TeacherFaq {
  q: string;
  a: string;
}

export default function TeachersPage() {
  const { openTeacherSignup, navigateTo } = useNavigation();
  const signupRef = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  useGsapScroll(pageRef);

  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      openTeacherSignup();
    }
  };

  const teacherTestimonials: TeacherTestimonial[] = [
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

  const teacherFaqs: TeacherFaq[] = [
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
    <div className="teachers-page min-h-screen bg-transparent" ref={pageRef}>
      
      {/* 1. Teacher Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="app-container">
          <div className="text-center max-w-[840px] mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F1F5F2] tracking-tight leading-tight mb-5">
              Author Board-Standard Papers. <br />
              <span className="text-[#D5F36A]">Earn Monthly Royalties &amp; Lead AI Assessment.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#8F9D93] leading-relaxed mb-8 max-w-[740px] mx-auto">
              Are you an experienced Class 10 CBSE or ICSE educator? Partner with India’s dedicated board preparation platform. 
              Author original question papers, validate official step-marking rubrics, automate pre-boards for your school, and receive perpetual creator royalties directly to your bank account.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
              <button 
                type="button" 
                className="btn btn-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5"
                onClick={scrollToSignup}
              >
                <Users size={18} />
                <span>Sign Up as a Teacher</span>
                <ArrowRight size={17} />
              </button>

              <a href="#royalty-calc" className="btn btn-secondary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5">
                <Coins size={17} className="text-[#D5F36A]" />
                <span>Calculate Your Royalties</span>
              </a>

              <button
                type="button"
                className="btn btn-ghost flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#8F9D93] hover:text-[#F1F5F2]"
                onClick={() => navigateTo('careers')}
              >
                <span>View Full-Time Core Team Roles →</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 p-5 bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded-xl max-w-[800px] mx-auto">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">₹3.4M+</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Royalties Paid to Educators</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">140+</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Partner Schools &amp; Pre-Boards</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">450+</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Active Teacher Authors</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">100%</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Attribution &amp; IP Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Educator Benefits (4 Core Pillars) */}
      <section className="py-12 md:py-16">
        <div className="app-container">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2.5">Built by Educators, for Educators</h2>
            <p className="text-sm text-[#8F9D93] leading-relaxed">
              We empower seasoned teachers with cutting-edge technology and fair economics—transforming your pedagogical expertise into recurring value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between hover:border-[#43C98B]/35 transition-all">
              <div>
                <div className="w-12 h-12 rounded-md bg-[#104734]/50 border border-[#bedcc8]/15 flex items-center justify-center mb-4 text-[#D5F36A]">
                  <Coins size={24} />
                </div>
                <h3 className="text-base font-semibold text-[#F1F5F2] mb-2">Author Once, Earn Perpetually</h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-4">
                  Receive upfront bounties for approved questions plus monthly dividends every single time a student takes an exam featuring your content.
                </p>
              </div>
              <ul className="pt-3 border-t border-[#bedcc8]/10 space-y-2 text-xs text-[#F1F5F2]">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Upfront bounty: ₹300 - ₹1,200 per item</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Recurring attempts royalty dividend</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Automatic payouts on 5th of month</li>
              </ul>
            </div>

            <div className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between hover:border-[#43C98B]/35 transition-all">
              <div>
                <div className="w-12 h-12 rounded-md bg-[#104734]/50 border border-[#bedcc8]/15 flex items-center justify-center mb-4 text-[#43C98B]">
                  <Award size={24} />
                </div>
                <h3 className="text-base font-semibold text-[#F1F5F2] mb-2">National Examiner Recognition</h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-4">
                  Your profile, verified school affiliation, and examiner credentials appear prominently alongside your authored mock exams.
                </p>
              </div>
              <ul className="pt-3 border-t border-[#bedcc8]/10 space-y-2 text-xs text-[#F1F5F2]">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Verified "Senior Examiner" badge</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Dedicated author public profile page</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Featured in school recommendation lists</li>
              </ul>
            </div>

            <div className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between hover:border-[#43C98B]/35 transition-all">
              <div>
                <div className="w-12 h-12 rounded-md bg-[#104734]/50 border border-[#bedcc8]/15 flex items-center justify-center mb-4 text-[#D5F36A]">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-base font-semibold text-[#F1F5F2] mb-2">AI Authoring Studio Access</h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-4">
                  Use our proprietary teacher co-pilot to generate official CBSE 2027-aligned marking keys, step deductions, and competency case studies in seconds.
                </p>
              </div>
              <ul className="pt-3 border-t border-[#bedcc8]/10 space-y-2 text-xs text-[#F1F5F2]">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Auto-formatting to CBSE &amp; ICSE</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Step mark allocation generator</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> LaTeX math &amp; diagram formatting</li>
              </ul>
            </div>

            <div className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between hover:border-[#43C98B]/35 transition-all">
              <div>
                <div className="w-12 h-12 rounded-md bg-[#104734]/50 border border-[#bedcc8]/15 flex items-center justify-center mb-4 text-[#43C98B]">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-base font-semibold text-[#F1F5F2] mb-2">Automate School Pre-Boards</h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-4">
                  Assemble complete 80-mark pre-board papers for your school with 1-click PDF generation, printable answer booklets, and automated AI grading.
                </p>
              </div>
              <ul className="pt-3 border-t border-[#bedcc8]/10 space-y-2 text-xs text-[#F1F5F2]">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> 1-Click 80-mark pre-board generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Print-ready paper with school logo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#43C98B] shrink-0" /> Bulk AI grading for school cohorts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Royalty Calculator */}
      <section className="py-12 md:py-16 bg-[#0B241A]/20" id="royalty-calc">
        <div className="app-container">
          <div className="text-center max-w-[600px] mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2">How Much Can You Earn?</h2>
            <p className="text-sm text-[#8F9D93]">
              Drag the sliders below to estimate your monthly payouts based on questions contributed and student attempts.
            </p>
          </div>

          <div className="max-w-[840px] mx-auto">
            <RoyaltyCalculator onApplyClick={scrollToSignup} />
          </div>
        </div>
      </section>

      {/* 4. Dedicated Sign Up as Teacher Section */}
      <section className="py-12 md:py-16" id="teacher-signup-section" ref={signupRef}>
        <div className="app-container">
          <div className="max-w-[780px] mx-auto">
            <TeacherSignupForm onSuccess={() => {}} />
          </div>
        </div>
      </section>

      {/* 5. Senior Teacher Testimonials & Spotlights */}
      <section className="py-12 md:py-16 bg-[#0B241A]/20">
        <div className="app-container">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2">Trusted by Senior CBSE &amp; ICSE Educators</h2>
            <p className="text-sm text-[#8F9D93]">
              Hear from department heads and board moderators who author on Quanverse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teacherTestimonials.map((t, idx) => (
              <div key={idx} className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3 text-[#D5F36A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xs sm:text-sm text-[#F1F5F2] leading-relaxed italic mb-5">
                    “{t.quote}”
                  </blockquote>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded bg-[#104734]/60 text-[#D5F36A] border border-[#bedcc8]/15 font-bold text-xs flex items-center justify-center shrink-0">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <strong className="block text-xs font-semibold text-[#F1F5F2]">{t.name}</strong>
                      <span className="text-[11px] text-[#8F9D93] block">{t.role} • {t.school}</span>
                      <span className="text-[10px] text-[#D5F36A] font-mono block">{t.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D5F36A]/10 border border-[#D5F36A]/25 text-[#D5F36A] font-mono text-[11px] w-fit">
                    <Coins size={12} />
                    <span>{t.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Teacher FAQs */}
      <section className="py-12 md:py-16" id="teacher-faqs">
        <div className="app-container">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2">Educator Partnership FAQs</h2>
            <p className="text-sm text-[#8F9D93]">
              Clear answers regarding intellectual property, monthly payouts, and time commitments.
            </p>
          </div>

          <div className="max-w-[780px] mx-auto flex flex-col gap-4">
            {teacherFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg">
                <h3 className="flex items-start gap-2.5 text-sm sm:text-base font-semibold text-[#F1F5F2] mb-2">
                  <HelpCircle size={18} className="text-[#43C98B] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded-lg text-center mt-10 max-w-[560px] mx-auto">
            <h4 className="font-semibold text-sm text-[#F1F5F2] mb-1.5">Want to discuss an institutional school partnership?</h4>
            <p className="text-xs text-[#8F9D93] mb-4 leading-relaxed">
              Contact our Academic Coordination team at <strong>partners@quanverse.tech</strong> or WhatsApp our coordinator at +91 98765 43210.
            </p>
            <button 
              type="button" 
              className="btn btn-primary flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5 mx-auto"
              onClick={scrollToSignup}
            >
              <span className="button__flair" aria-hidden="true" />
              <span>Apply as Authoring Educator</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
