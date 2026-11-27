'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({
  children,
  className,
  delay = 0,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: prefersReduced ? 0 : 0.78,
        delay,
        ease: EDITORIAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface BlurFocusTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Signature Le Pain Quotidien depth-of-field blur-to-sharp reveal.
 * Words glide into crisp editorial focus smoothly on mount or viewport entry.
 */
export function BlurFocusText({
  children,
  className = '',
  delay = 0,
}: BlurFocusTextProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 0, y: 20, filter: 'blur(10px)' }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: prefersReduced ? 0 : 0.85,
        delay,
        ease: EDITORIAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  yRange?: [number, number];
}

/**
 * Scroll-scrubbed architectural photo frame with silky spring parallax and gentle zoom.
 */
export function ParallaxFrame({
  children,
  className = '',
  scaleRange = [1.08, 1.0],
  yRange = [-16, 16],
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const scale = useTransform(smooth, [0, 1], scaleRange);
  const y = useTransform(smooth, [0, 1], yRange);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={prefersReduced ? undefined : { scale, y }}
        className="relative w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface HoverScaleFrameProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

/**
 * Refined Framer Motion hover-scaling wrapper for homepage image panels.
 * Uses a smooth editorial cubic-bezier curve and respects prefers-reduced-motion.
 */
export function HoverScaleFrame({
  children,
  className = '',
  scale = 1.045,
}: HoverScaleFrameProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      data-cursor="view"
      whileHover={prefersReduced ? undefined : { scale }}
      transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
      className={`relative w-full h-full will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ArchitecturalRuleProps {
  className?: string;
  delay?: number;
}

/**
 * Crisp 1px hairline divider that draws itself horizontally on scroll entry.
 */
export function ArchitecturalRule({
  className = 'bg-[#0B0A09]',
  delay = 0,
}: ArchitecturalRuleProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: prefersReduced ? 0 : 0.75,
        delay,
        ease: EDITORIAL_EASE,
      }}
      style={{ transformOrigin: '0% 50%' }}
      className={`h-[1px] w-full ${className}`}
    />
  );
}

interface ScriptOverlapHeadingProps {
  script: string;
  title: string;
  align?: 'center' | 'left';
  id?: string;
  as?: 'h1' | 'h2';
  dark?: boolean;
}

/**
 * Signature Le Pain Quotidien editorial lockup: warm honey-gold handwritten script
 * overlapping the top edge of tall, ultra-condensed uppercase display lettering.
 */
export function ScriptOverlapHeading({
  script,
  title,
  align = 'center',
  id,
  as = 'h2',
  dark = false,
}: ScriptOverlapHeadingProps) {
  const prefersReduced = useReducedMotion();
  const HeadingTag = as;
  const alignClass =
    align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass}`}>
      <motion.span
        initial={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 0, y: 12, rotate: -4 }
        }
        whileInView={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotate: -2 }
        }
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
        className={`relative z-10 font-script font-semibold text-[34px] sm:text-[44px] leading-none select-none -mb-2 sm:-mb-3 ${
          dark ? 'text-[#F5C300]' : 'text-[#D99B00]'
        }`}
      >
        {script}
      </motion.span>

      <BlurFocusText delay={0.08}>
        <HeadingTag
          id={id}
          className={`font-display font-bold uppercase tracking-[-0.015em] leading-[0.94] text-[clamp(2.6rem,5.2vw,4.75rem)] ${
            dark ? 'text-[#FFFFFF]' : 'text-[#0B0A09]'
          }`}
        >
          {title}
        </HeadingTag>
      </BlurFocusText>
    </div>
  );
}
