'use client';

import { motion, useReducedMotion, useScroll } from 'motion/react';

/**
 * Thin, minimal top-of-window scroll progress indicator driven directly
 * by native scrollYProgress for 1:1 lag-free responsiveness with zero idle RAF loops.
 */
export default function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReduced) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-testid="scroll-progress-track"
      className="pointer-events-none fixed top-0 inset-x-0 z-[60] h-[2px] bg-[#0B0A09]/8 print:hidden"
    >
      <motion.div
        data-testid="scroll-progress-bar"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-[#D99B00]"
      />
    </div>
  );
}
