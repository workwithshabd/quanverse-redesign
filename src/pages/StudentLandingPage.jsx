import React, { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import BoardReadinessSection from '../components/BoardReadinessSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesBento from '../components/FeaturesBento';
import MockExamSuite from '../components/MockExamSuite';
import NewsCircularsSection from '../components/NewsCircularsSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import { useNavigation } from '../hooks/useNavigation';
import { useGsapScroll } from '../hooks/useGsapScroll';

/**
 * StudentLandingPage
 * Purely dedicated to Class 10 CBSE & ICSE students & parents.
 * Features elevated section palettes and GSAP smooth scroll motion.
 */
export default function StudentLandingPage() {
  const { openDemoExam } = useNavigation();
  const pageRef = useRef(null);

  // Attach GSAP smooth scroll-triggered animations
  useGsapScroll(pageRef);

  return (
    <div className="student-landing-page" ref={pageRef}>
      {/* 1. Hero Section with Live Step-Marking AI Sandbox */}
      <HeroSection onOpenDemoExam={openDemoExam} />

      {/* 2. Interactive Board Readiness Simulator */}
      <BoardReadinessSection onOpenDemoExam={openDemoExam} />

      {/* 3. How It Works (Examiner rubrics meet AI feedback) */}
      <HowItWorksSection onOpenDemoExam={openDemoExam} />

      {/* 4. Core Features Bento Grid */}
      <FeaturesBento onOpenDemoExam={openDemoExam} />

      {/* 5. Class 10 Mock Exam Suite & Question Banks */}
      <MockExamSuite onOpenDemoExam={openDemoExam} />

      {/* 6. Verified Board News & Circulars Alerts */}
      <NewsCircularsSection />

      {/* 7. Transparent Pricing & Starter Pass */}
      <PricingSection onOpenDemoExam={openDemoExam} />

      {/* 8. Verified Student & Parent Reviews */}
      <TestimonialsSection />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
}
