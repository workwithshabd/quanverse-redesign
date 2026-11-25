import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Users, 
  GraduationCap, 
  Cpu, 
  Heart, 
  Laptop, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { api, type CareerPosition } from '../services/api';
import { useNavigation } from '../hooks/useNavigation';
import { useGsapScroll } from '../hooks/useGsapScroll';

interface PerkItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function CareersPage() {
  const { navigateTo, openJobApplication } = useNavigation();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useGsapScroll(pageRef);

  const [positions, setPositions] = useState<CareerPosition[]>([]);
  const [activeDept, setActiveDept] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const jobs = await api.getOpenPositions();
        setPositions(jobs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const departments = [
    'All',
    'Engineering & AI',
    'Product & Design',
    'Growth & Partnerships',
    'Academics & Editorial',
    'Operations & Support'
  ];

  const filteredPositions = activeDept === 'All'
    ? positions
    : positions.filter(p => p.department === activeDept);

  const perks: PerkItem[] = [
    {
      icon: <Laptop size={22} className="text-[#43C98B]" />,
      title: 'Remote-First Freedom',
      desc: 'Work from anywhere across India. We optimize for high-trust, asynchronous execution and outcomes, not seat time.'
    },
    {
      icon: <TrendingUp size={22} className="text-[#43C98B]" />,
      title: 'Meaningful Equity (ESOPs)',
      desc: 'Be a genuine co-owner of Quanverse. We distribute substantial equity packages across all full-time team members.'
    },
    {
      icon: <Heart size={22} className="text-[#43C98B]" />,
      title: 'Comprehensive Health Cover',
      desc: 'Comprehensive medical and health insurance for you and your dependents, with zero co-pay and OPD allowances.'
    },
    {
      icon: <Sparkles size={22} className="text-[#43C98B]" />,
      title: '₹40,000 Learning Stipend',
      desc: 'Annual personal development budget for engineering books, LLM developer subscriptions, workshops, and courses.'
    },
    {
      icon: <Cpu size={22} className="text-[#43C98B]" />,
      title: 'Modern AI & Web Tooling',
      desc: 'Latest M-series MacBooks, premium Gemini & Claude API credits, and state-of-the-art developer tooling.'
    },
    {
      icon: <GraduationCap size={22} className="text-[#43C98B]" />,
      title: 'Deep Student Impact',
      desc: 'Directly eliminate board exam panic for over 4 million Class 10 candidates across CBSE & ICSE every year.'
    }
  ];

  return (
    <div className="careers-page min-h-screen bg-transparent" ref={pageRef}>
      
      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="app-container">
          <div className="text-center max-w-[840px] mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F1F5F2] tracking-tight leading-tight mb-5">
              Build the Intelligence Layer for <br />
              <span className="text-[#D5F36A]">National Board Exams.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#8F9D93] leading-relaxed mb-8 max-w-[740px] mx-auto">
              We are transforming how 4 million Class 10 CBSE &amp; ICSE students prepare for life-defining examinations. 
              Join an ambitious, mission-driven team solving real-world computer vision, handwriting multimodal recognition, and fair step-marking.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
              <a href="#open-positions" className="btn btn-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5">
                <Briefcase size={17} />
                <span>Explore Open Roles ({positions.length})</span>
                <ArrowRight size={16} />
              </a>

              <a href="#company-culture" className="btn btn-secondary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5">
                <Heart size={16} className="text-rose-400" />
                <span>Culture &amp; Perks</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 p-5 bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded-xl max-w-[800px] mx-auto">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">45,000+</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Student Papers Evaluated</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">99.4%</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Board Rubric Accuracy</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">140+</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">Partner School Networks</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#bedcc8]/15" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#D5F36A]">Remote</div>
                <div className="text-xs text-[#8F9D93] mt-0.5">India-Wide Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT EDUCATOR CALLOUT */}
      <section className="py-8">
        <div className="app-container">
          <div className="p-8 sm:p-10 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F1F5F2] mb-3">
                  Are You a Senior Class 10 Teacher or Board Examiner?
                </h2>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed mb-5">
                  Looking to author board-standard question papers, validate step-marking schemes, curate pre-boards for your school, or earn monthly creator royalties? 
                  We built a dedicated platform exclusively for educators.
                </p>

                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-medium text-[#F1F5F2]">
                    <CheckCircle2 size={14} className="text-[#43C98B]" />
                    Perpetual Royalties (₹350/item + attempt dividends)
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium text-[#F1F5F2]">
                    <CheckCircle2 size={14} className="text-[#43C98B]" />
                    AI Authoring Studio &amp; School Pre-Board Suite
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium text-[#F1F5F2]">
                    <CheckCircle2 size={14} className="text-[#43C98B]" />
                    Official Senior Evaluator Recognition
                  </span>
                </div>
              </div>

              <div className="bg-[#07110D]/60 p-6 rounded-lg border border-[#bedcc8]/15 text-center">
                <span className="block font-semibold text-sm text-[#F1F5F2] mb-1.5">Join Educator Network</span>
                <p className="text-xs text-[#8F9D93] mb-4">
                  Author questions, calculate monthly royalties, or register as an accredited evaluator.
                </p>
                
                <button
                  type="button"
                  className="btn btn-primary w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5"
                  onClick={() => navigateTo('teachers')}
                >
                  <span className="button__flair" aria-hidden="true" />
                  <Users size={16} />
                  <span>Apply as a Teacher</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn btn-ghost text-xs w-full mt-2 text-[#8F9D93] hover:text-[#F1F5F2]"
                  onClick={() => navigateTo('teachers', '#royalty-calc')}
                >
                  <span>View Royalty Calculator →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Culture, Benefits & Perks */}
      <section className="py-12 md:py-16" id="company-culture">
        <div className="app-container">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2.5">Why You’ll Do Your Best Work Here</h2>
            <p className="text-sm text-[#8F9D93] leading-relaxed">
              We treat our team like professional athletes: world-class compensation, high trust, exceptional craft standards, and deep respect for your craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, i) => (
              <div key={i} className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg">
                <div className="w-10 h-10 rounded-md bg-[#104734]/50 border border-[#bedcc8]/15 flex items-center justify-center mb-3">
                  {perk.icon}
                </div>
                <h3 className="text-base font-semibold text-[#F1F5F2] mb-1.5">{perk.title}</h3>
                <p className="text-xs sm:text-sm text-[#8F9D93] leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Positions Directory */}
      <section className="py-12 md:py-16 bg-[#0B241A]/20" id="open-positions">
        <div className="app-container">
          <div className="text-center max-w-[600px] mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F2] mb-2">Open Positions Across All Teams</h2>
            <p className="text-sm text-[#8F9D93]">
              Explore opportunities in Engineering, AI, Product, Design, Growth, and Academics.
            </p>
          </div>

          {/* Department Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-1.5 text-xs text-[#8F9D93] mr-2">
              <Filter size={14} />
              <span>Department:</span>
            </div>
            {departments.map(dept => (
              <button
                key={dept}
                type="button"
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeDept === dept
                    ? 'bg-[#104734]/70 border border-[#D5F36A] text-[#D5F36A]'
                    : 'bg-[#07110D]/60 border border-[#bedcc8]/15 text-[#8F9D93] hover:text-[#F1F5F2]'
                }`}
                onClick={() => setActiveDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          {isLoading ? (
            <div className="text-center py-12 text-sm text-[#8F9D93]">
              <span>Fetching live roles...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPositions.map(job => (
                <div key={job.id} className="p-6 bg-[#0B241A]/40 border border-[#bedcc8]/15 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#D5F36A] font-semibold">{job.badge}</span>
                      <span className="text-[#8F9D93]">{job.department}</span>
                    </div>

                    <h3 className="text-base font-semibold text-[#F1F5F2] mb-2">{job.title}</h3>
                    <p className="text-xs text-[#8F9D93] leading-relaxed mb-4">{job.description}</p>

                    {job.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#104734]/40 border border-[#bedcc8]/12 text-[#B5C0B8]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-1.5 text-xs text-[#8F9D93] mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#43C98B]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#43C98B]" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={13} className="text-[#43C98B]" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-[#07110D]/60 border border-[#bedcc8]/10 text-xs mb-4">
                      <span className="text-[#8F9D93] block text-[11px]">Salary &amp; Package:</span>
                      <strong className="text-[#D5F36A] font-mono">{job.compensation}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider py-3 px-5"
                    onClick={() => openJobApplication(job)}
                  >
                    <span className="button__flair" aria-hidden="true" />
                    <span>Apply for this Role</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* General Inquiries Box */}
          <div className="p-6 bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded-lg text-center mt-10 max-w-[600px] mx-auto">
            <h4 className="font-semibold text-sm text-[#F1F5F2] mb-1.5">Don't see your exact role listed?</h4>
            <p className="text-xs text-[#8F9D93] mb-3 leading-relaxed">
              We are constantly seeking brilliant compilers, educators, distributed systems engineers, and learning theorists. Send a link to your GitHub, portfolio, or past work to:
            </p>
            <div className="inline-block px-3 py-1 rounded bg-[#104734]/50 border border-[#43C98B]/30 text-xs font-mono text-[#D5F36A]">
              careers@quanverse.tech
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
