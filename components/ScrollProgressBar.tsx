'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Thin, minimal top-of-window scroll progress indicator inspired by
 * Le Pain Quotidien's restrained editorial aesthetic.
 */
export default function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

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
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-[#D99B00] will-change-transform"
      />
    </div>
  );
}
