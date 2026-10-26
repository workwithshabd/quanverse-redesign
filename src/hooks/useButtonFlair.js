import { useEffect } from 'react';
import gsap from 'gsap';

export const ELIGIBLE_BUTTON_SELECTOR = `
  .btn,
  .zuse-cta-primary,
  .zuse-cta-secondary,
  .nav-cta-btn,
  .zuse-cta-btn,
  .nav-signin-header-btn,
  .evaluate-cta-btn,
  .board-btn,
  .filter-tab-btn,
  .google-action-btn,
  .button,
  [data-flair-btn],
  [data-block="button"]
`;

export const EXCLUDE_BUTTON_SELECTOR = `
  .stage-dot-btn,
  .modal-close-btn,
  .modal-close-icon-btn,
  .mobile-close-btn,
  .bf-toggle-btn,
  .password-toggle-btn,
  [data-no-flair]
`;

export class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    let flair = this.block.querySelector(':scope > .button__flair');
    if (!flair) {
      flair = document.createElement('span');
      flair.className = 'button__flair';
      flair.setAttribute('aria-hidden', 'true');
      this.block.insertBefore(flair, this.block.firstChild);
    }

    this.DOM = {
      button: this.block,
      flair: flair
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const {
      left,
      top,
      width,
      height
    } = this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top)
    };
  }

  initEvents() {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      if (prefersReducedMotion || isTouchOnly) {
        return;
      }
    }

    this.enterHandler = (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    this.leaveHandler = (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      const exitPosition = this.DOM.button.matches('[data-flair-stable]')
        ? { xPercent: x, yPercent: y }
        : {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y
          };

      gsap.to(this.DOM.flair, {
        ...exitPosition,
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    this.moveHandler = (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2"
      });
    };

    this.DOM.button.addEventListener("mouseenter", this.enterHandler);
    this.DOM.button.addEventListener("mouseleave", this.leaveHandler);
    this.DOM.button.addEventListener("mousemove", this.moveHandler);
  }

  destroy() {
    this.DOM.button.removeEventListener("mouseenter", this.enterHandler);
    this.DOM.button.removeEventListener("mouseleave", this.leaveHandler);
    this.DOM.button.removeEventListener("mousemove", this.moveHandler);
    gsap.killTweensOf(this.DOM.flair);
  }
}

export function setupButtonFlair(btn) {
  if (!btn || btn.__buttonInstance || btn.matches(EXCLUDE_BUTTON_SELECTOR)) {
    return () => {};
  }
  const instance = new Button(btn);
  btn.__buttonInstance = instance;
  return () => instance.destroy();
}

/**
 * React Hook: Initializes and maintains cursor-following button flair animations across all
 * eligible buttons on the website, including dynamically rendered buttons.
 */
export function useButtonFlair() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scan and setup all currently mounted buttons
    const initAll = () => {
      const buttons = document.querySelectorAll(ELIGIBLE_BUTTON_SELECTOR);
      buttons.forEach(setupButtonFlair);
    };

    initAll();

    // Event delegation on pointerover to automatically handle dynamically rendered buttons cleanly
    const onGlobalPointerEnter = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest(ELIGIBLE_BUTTON_SELECTOR);
      if (btn && !btn.matches(EXCLUDE_BUTTON_SELECTOR) && !btn.__buttonInstance) {
        setupButtonFlair(btn);
        // Dispatch mouseenter so this first hover immediately animates
        const synthetic = new MouseEvent('mouseenter', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false,
        });
        btn.dispatchEvent(synthetic);
      }
    };

    document.addEventListener('pointerover', onGlobalPointerEnter, true);

    return () => {
      document.removeEventListener('pointerover', onGlobalPointerEnter, true);

      // Clean up all initialized buttons
      const buttons = document.querySelectorAll(ELIGIBLE_BUTTON_SELECTOR);
      buttons.forEach((btn) => {
        if (btn.__buttonInstance) {
          btn.__buttonInstance.destroy();
          delete btn.__buttonInstance;
        }
      });
    };
  }, []);
}
