import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HorizontalScrollTextSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Seamless infinite continuous marquee loop at a graceful, slower pace
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(track, { xPercent: 0 });
        return;
      }

      // Infinite continuous slow automatic scroll to the left (duration: 75s)
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 75,
        ease: 'none',
      });
    }, track);

    // Pause / slow on hover, resume on leave
    const handleMouseEnter = () => {
      if (tweenRef.current) {
        gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.5 });
      }
    };

    const handleMouseLeave = () => {
      if (tweenRef.current) {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
      }
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  const streamItems = (
    <>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span>Stop Losing Step Marks</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span className="text-[#D5F36A] [text-shadow:0_0_6px_rgba(213,243,106,0.45)]">CBSE &amp; ICSE Class 10</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span>AI Step-Marking Engine</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span className="text-[#43C98B] [text-shadow:0_0_6px_rgba(67,201,139,0.45)]">Zero Step-Mark Leakage</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span>Topper Evaluation Schemes</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span className="text-[#D5F36A] [text-shadow:0_0_6px_rgba(213,243,106,0.45)]">Real-Time Diagnostic Matrix</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span>Every Single Step Counts</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
      <span className="text-[#43C98B] [text-shadow:0_0_6px_rgba(67,201,139,0.45)]">Official Specimen Accuracy</span>
      <span className="inline-block mx-4 md:mx-8 text-[#D5F36A] text-[0.55em] opacity-90 [text-shadow:0_0_5px_rgba(213,243,106,0.5)]">✦</span>
    </>
  );

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#07110D] border-y border-dotted border-[#bedcc8]/25 py-6 md:py-9 select-none z-[15] before:absolute before:inset-0 before:bg-[radial-gradient(rgba(190,220,200,0.04)_1px,transparent_1px)] before:bg-[size:36px_36px] before:pointer-events-none before:z-[1] after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#07110D] after:via-transparent after:to-[#07110D] after:pointer-events-none after:z-[8]" 
      aria-label="Kinetic Evaluation Stream"
    >
      <div className="relative z-[5] w-full overflow-hidden flex items-center">
        <div className="flex items-center w-max will-change-transform" ref={trackRef}>
          {/* Two identical sets of items for seamless infinite looping */}
          <div className="inline-flex items-center whitespace-nowrap font-['Oi',serif] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#E8EEE9] pr-10 leading-snug tracking-wider">
            {streamItems}
          </div>
          <div className="inline-flex items-center whitespace-nowrap font-['Oi',serif] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#E8EEE9] pr-10 leading-snug tracking-wider" aria-hidden="true">
            {streamItems}
          </div>
        </div>
      </div>
    </section>
  );
}
