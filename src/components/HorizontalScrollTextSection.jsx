import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HorizontalScrollTextSection.css';

export default function HorizontalScrollTextSection() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

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
      <span className="stream-symbol">✦</span>
      <span>Stop Losing Step Marks</span>
      <span className="stream-symbol">✦</span>
      <span className="text-lime">CBSE &amp; ICSE Class 10</span>
      <span className="stream-symbol">✦</span>
      <span>AI Step-Marking Engine</span>
      <span className="stream-symbol">✦</span>
      <span className="text-emerald">Zero Step-Mark Leakage</span>
      <span className="stream-symbol">✦</span>
      <span>Topper Evaluation Schemes</span>
      <span className="stream-symbol">✦</span>
      <span className="text-lime">Real-Time Diagnostic Matrix</span>
      <span className="stream-symbol">✦</span>
      <span>Every Single Step Counts</span>
      <span className="stream-symbol">✦</span>
      <span className="text-emerald">Official Specimen Accuracy</span>
      <span className="stream-symbol">✦</span>
    </>
  );

  return (
    <section className="Horizontal" aria-label="Kinetic Evaluation Stream">
      <div className="Horizontal__track-wrap">
        <div className="Horizontal__text-track" ref={trackRef}>
          {/* Two identical sets of items for seamless infinite looping */}
          <div className="Horizontal__text-group oi-regular">
            {streamItems}
          </div>
          <div className="Horizontal__text-group oi-regular" aria-hidden="true">
            {streamItems}
          </div>
        </div>
      </div>
    </section>
  );
}
