import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsapScroll Hook
 * Attaches smooth scroll-triggered entrance animations, card staggers,
 * and ambient parallax physics to the page. Automatically cleans up on unmount.
 */
export function useGsapScroll(containerRef) {
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context for React 19 safe scoping and clean cleanup
    const ctx = gsap.context(() => {
      // 1. Reveal Section Headings & Badges smoothly
      const sectionHeads = gsap.utils.toArray('.gsap-reveal');
      sectionHeads.forEach((el) => {
        gsap.fromTo(
          el,
          { 
            y: 35, 
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 2. Staggered Card Entrances (Bento, Mocks, Pricing, Steps)
      const staggerGroups = gsap.utils.toArray('.gsap-stagger-group');
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { 
              y: 40, 
              opacity: 0,
              scale: 0.96
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 82%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // 3. Subtle Parallax for Ambient Light Orbs
      const orbs = gsap.utils.toArray('.pastel-glow-orb');
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 20;
        gsap.to(orb, {
          y: speed,
          x: (i % 2 === 0 ? 1 : -1) * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: orb.parentElement || document.body,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      // 4. Smooth Floating Animation for Stat Pills and Badges
      const floatItems = gsap.utils.toArray('.gsap-float');
      floatItems.forEach((el, idx) => {
        gsap.to(el, {
          y: idx % 2 === 0 ? -8 : 8,
          duration: 3 + (idx * 0.4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

    }, containerRef);

    ctxRef.current = ctx;

    // Refresh ScrollTrigger after DOM layout stabilizes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert(); // clean up all GSAP tweens and ScrollTriggers
    };
  }, [containerRef]);

  return ctxRef;
}
