import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsapScroll Hook
 * Attaches Lenis buttery-smooth inertial scrolling connected with GSAP ScrollTrigger.
 * Executes smooth entrance animations, card staggers, and floating elements.
 * Automatically cleans up on unmount.
 */
export function useGsapScroll(containerRef) {
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Initialize Lenis with snappier, responsive smooth scrolling
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth animated anchor link navigation with snappy duration
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -68, duration: 0.7 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // 2. Use gsap.context for animations
    const ctx = gsap.context(() => {
      // Reveal Section Headings & Badges with snappy speed
      const sectionHeads = gsap.utils.toArray('.gsap-reveal');
      sectionHeads.forEach((el) => {
        gsap.fromTo(
          el,
          { 
            y: 24, 
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Snappy Staggered Card Entrances (Bento, Mocks, Pricing, Steps)
      const staggerGroups = gsap.utils.toArray('.gsap-stagger-group');
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { 
              y: 28, 
              opacity: 0,
              scale: 0.97
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.48,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 86%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

    }, containerRef);

    ctxRef.current = ctx;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ctx.revert();
    };
  }, [containerRef]);

  return ctxRef;
}
