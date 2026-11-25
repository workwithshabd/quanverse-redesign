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

export interface FlairButtonElement extends HTMLElement {
  __buttonInstance?: Button;
}

export class Button {
  block: FlairButtonElement;
  DOM!: {
    button: FlairButtonElement;
    flair: HTMLElement;
  };
  xSet!: (value: number) => void;
  ySet!: (value: number) => void;
  enterHandler!: (e: MouseEvent) => void;
  leaveHandler!: (e: MouseEvent) => void;
  moveHandler!: (e: MouseEvent) => void;

  constructor(buttonElement: FlairButtonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init(): void {
    let flair = this.block.querySelector<HTMLElement>(':scope > .button__flair');
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

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent") as (value: number) => void;
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent") as (value: number) => void;
  }

  getXY(e: MouseEvent): { x: number; y: number } {
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

  initEvents(): void {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      if (prefersReducedMotion || isTouchOnly) {
        return;
      }
    }

    this.enterHandler = (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      // Kill any running exit/move tweens immediately so fast hover never misses or conflicts
      gsap.killTweensOf(this.DOM.flair);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    this.leaveHandler = (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      const exitPosition = this.DOM.button.matches('[data-flair-stable]')
        ? { xPercent: x, yPercent: y }
        : {
            xPercent: x > 85 ? x + 15 : x < 15 ? x - 15 : x,
            yPercent: y > 85 ? y + 15 : y < 15 ? y - 15 : y
          };

      gsap.to(this.DOM.flair, {
        ...exitPosition,
        scale: 0,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    this.moveHandler = (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    this.DOM.button.addEventListener("mouseenter", this.enterHandler);
    this.DOM.button.addEventListener("mouseleave", this.leaveHandler);
    this.DOM.button.addEventListener("mousemove", this.moveHandler);
  }

  destroy(): void {
    this.DOM.button.removeEventListener("mouseenter", this.enterHandler);
    this.DOM.button.removeEventListener("mouseleave", this.leaveHandler);
    this.DOM.button.removeEventListener("mousemove", this.moveHandler);
    gsap.killTweensOf(this.DOM.flair);
  }
}

export function setupButtonFlair(btn: HTMLElement | null): () => void {
  const flairBtn = btn as FlairButtonElement | null;
  if (!flairBtn || flairBtn.__buttonInstance || flairBtn.matches(EXCLUDE_BUTTON_SELECTOR)) {
    return () => {};
  }
  const instance = new Button(flairBtn);
  flairBtn.__buttonInstance = instance;
  return () => instance.destroy();
}

/**
 * React Hook: Initializes and maintains cursor-following button flair animations across all
 * eligible buttons on the website, including dynamically rendered buttons.
 */
export function useButtonFlair(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scan and setup all currently mounted buttons
    const initAll = () => {
      const buttons = document.querySelectorAll<HTMLElement>(ELIGIBLE_BUTTON_SELECTOR);
      buttons.forEach(setupButtonFlair);
    };

    initAll();

    // Event delegation on pointerover to automatically handle dynamically rendered buttons cleanly
    const onGlobalPointerEnter = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      const btn = target.closest<HTMLElement>(ELIGIBLE_BUTTON_SELECTOR);
      const flairBtn = btn as FlairButtonElement | null;
      if (flairBtn && !flairBtn.matches(EXCLUDE_BUTTON_SELECTOR) && !flairBtn.__buttonInstance) {
        setupButtonFlair(flairBtn);
        // Dispatch mouseenter so this first hover immediately animates
        const synthetic = new MouseEvent('mouseenter', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false,
        });
        flairBtn.dispatchEvent(synthetic);
      }
    };

    document.addEventListener('pointerover', onGlobalPointerEnter, true);

    return () => {
      document.removeEventListener('pointerover', onGlobalPointerEnter, true);

      // Clean up all initialized buttons
      const buttons = document.querySelectorAll<FlairButtonElement>(ELIGIBLE_BUTTON_SELECTOR);
      buttons.forEach((btn) => {
        if (btn.__buttonInstance) {
          btn.__buttonInstance.destroy();
          delete btn.__buttonInstance;
        }
      });
    };
  }, []);
}
