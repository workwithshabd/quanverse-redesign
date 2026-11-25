import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface TestimonialItem {
  name: string;
  school: string;
  board?: string;
  score?: string;
  badge?: string;
  avatarText: string;
  quote: string;
  title?: string;
}

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');

  const studentReviews: TestimonialItem[] = [
    {
      name: 'Aarav Sharma',
      school: 'Delhi Public School, R.K. Puram',
      board: 'CBSE Class 10',
      score: '97.4%',
      badge: '97.4% BOARD RESULT',
      avatarText: 'AS',
      quote: 'The AI step marking caught that I was skipping formula conditions in Algebra. That single fix saved me 4 marks on the actual board exam.'
    },
    {
      name: 'Ananya Deshmukh',
      school: 'The Cathedral & John Connon, Mumbai',
      board: 'ICSE Class 10',
      score: '98.2%',
      badge: '98.2% BOARD RESULT',
      avatarText: 'AD',
      quote: 'Uploading real notebook sheets and getting official rubric feedback in 45 seconds is game-changing. The Topper comparisons transformed my presentation.'
    },
    {
      name: 'Kabir Varma',
      school: 'National Public School, Bengaluru',
      board: 'CBSE Class 10',
      score: '96.0%',
      badge: '96.0% BOARD RESULT',
      avatarText: 'KV',
      quote: 'I jumped from 76% in pre-boards to 96% in final boards. The weakness radar stopped me from wasting time re-reading material I already knew.'
    }
  ];

  const teacherReviews: TestimonialItem[] = [
    {
      name: 'Mrs. Sunita Mehra',
      title: 'Senior HOD Mathematics (22 yrs exp)',
      school: 'Springdales School, New Delhi',
      avatarText: 'SM',
      badge: '22 YRS BOARD EXP',
      quote: 'Grading 160 board papers by hand used to take entire weekends. With Quanverse rubrics, papers were evaluated in 90 minutes with zero fatigue.'
    },
    {
      name: 'Dr. Rajesh Sen',
      title: 'ICSE Science Master & Author',
      school: 'St. Xavier’s Collegiate, Kolkata',
      avatarText: 'RS',
      badge: 'VERIFIED EXAMINER',
      quote: 'The authoring studio makes it seamless to publish competency-aligned mock papers and guide thousands of students toward board mastery.'
    },
    {
      name: 'Mr. Anand K. Nair',
      title: 'Senior Physics Lead (18 yrs exp)',
      school: 'Bhavan’s Vidya Mandir, Kochi',
      avatarText: 'AN',
      badge: 'CBSE EVALUATOR',
      quote: 'The step marking mirrors official board keys with precision. It trains students to articulate every intermediate step examiners look for.'
    }
  ];

  const currentList = activeTab === 'students' ? studentReviews : teacherReviews;

  return (
    <section className="relative py-12 md:py-16 bg-transparent" id="testimonials">
      <div className="app-container">
        
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-xs text-muted mb-2">
            <span className="text-[#43C98B] font-bold">COMMUNITY VERIFICATION</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="title-with-flourish">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EEE9]">
                Real student turnarounds from 76% to 96%
              </h2>
            </div>

            {/* Role Toggle Tabs */}
            <div className="flex gap-1.5 font-mono text-xs">
              <button
                type="button"
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === 'students'
                    ? 'bg-[#104734]/60 border border-[#D5F36A] text-[#D5F36A]'
                    : 'bg-[#0B241A]/40 border border-[#bedcc8]/15 text-[#B5C0B8] hover:bg-[#104734]/45 hover:text-[#F1F5F2]'
                }`}
                onClick={() => setActiveTab('students')}
              >
                [ STUDENT STORIES ]
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === 'teachers'
                    ? 'bg-[#104734]/60 border border-[#D5F36A] text-[#D5F36A]'
                    : 'bg-[#0B241A]/40 border border-[#bedcc8]/15 text-[#B5C0B8] hover:bg-[#104734]/45 hover:text-[#F1F5F2]'
                }`}
                onClick={() => setActiveTab('teachers')}
              >
                [ EDUCATOR PERSPECTIVES ]
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#8F9D93] max-w-[600px] leading-relaxed mt-2">
            Verified feedback from students and educators.
          </p>
        </div>

        {/* Master Editorial Testimonials Grid */}
        <div className="relative border border-[#bedcc8]/15 bg-[#07110D]/45 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {currentList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#bedcc8]/15 last:border-r-0 last:border-b-0 bg-[#07110D]/40 min-h-[14.5rem]"
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <div className="flex items-center gap-1 text-[#D5F36A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  {item.badge && (
                    <span className="text-[#D5F36A] font-bold">[{item.badge}]</span>
                  )}
                </div>

                <blockquote className="text-sm text-[#F1F5F2] leading-relaxed mb-4 flex-1">
                  "{item.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-3 border-t border-dashed border-[#bedcc8]/10 font-mono text-xs mt-auto">
                  <div className="text-[#F1F5F2] font-semibold text-sm">
                    {item.name}
                  </div>
                  <div className="text-[#8F9D93] text-xs mt-0.5">
                    {item.school}
                  </div>
                  {item.board && (
                    <div className="text-[#D5F36A] text-[11px] mt-0.5">
                      {item.board}
                    </div>
                  )}
                  {item.title && (
                    <div className="text-[#D5F36A] text-[11px] mt-0.5">
                      {item.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
