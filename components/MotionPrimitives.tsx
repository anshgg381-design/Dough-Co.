'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export const PAGE_STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.04,
    },
  },
};

export const PAGE_STAGGER_SECTION: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: EDITORIAL_EASE,
    },
  },
};

interface StaggeredSectionGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Top-level Framer Motion stagger orchestrator for initial homepage load.
 * Choreographs main content bands in an editorial cascade on mount.
 */
export function StaggeredSectionGroup({
  children,
  className = '',
}: StaggeredSectionGroupProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={PAGE_STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredSectionProps {
  children: ReactNode;
  className?: string;
  /** When true, reveals immediately as part of the initial page-load stagger cascade */
  initialReveal?: boolean;
}

/**
 * Editorial wrapper for each major homepage content section.
 * Above-the-fold sections cascade automatically on initial load via parent staggerChildren;
 * deeper sections glide smoothly into place on scroll with early viewport triggering.
 */
export function StaggeredSection({
  children,
  className = '',
  initialReveal = false,
}: StaggeredSectionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (initialReveal) {
    return (
      <motion.div variants={PAGE_STAGGER_SECTION} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04, margin: '0px 0px -32px 0px' }}
      transition={{ duration: 0.58, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function RevealBlock({
  children,
  className,
  delay = 0,
  y = 18,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: prefersReduced ? 0 : 0.52,
        delay: prefersReduced ? 0 : Math.min(delay, 0.2),
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
 * Crisp GPU-composited editorial text reveal inspired by lepainquotidien.com.
 * Uses transform + opacity exclusively (zero filter:blur rasterization lag).
 */
export function BlurFocusText({
  children,
  className = '',
  delay = 0,
}: BlurFocusTextProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: '32%' }}
        whileInView={{ opacity: 1, y: '0%' }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: prefersReduced ? 0 : 0.56,
          delay: prefersReduced ? 0 : Math.min(delay, 0.16),
          ease: EDITORIAL_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  yRange?: [number, number];
}

/**
 * Lag-free GPU-composited scroll parallax photo frame.
 * Maps scrollYProgress directly to translateY (zero per-frame spring physics overhead)
 * while maintaining static oversized bleed so edges never expose gaps during motion.
 */
export function ParallaxFrame({
  children,
  className = '',
  yRange = [-18, 18],
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="relative w-full h-full scale-[1.09]"
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
 * Lightweight GPU-composited hover-scaling wrapper for homepage image panels.
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
      transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
      className={`relative w-full h-full ${className}`}
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
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : Math.min(delay, 0.14),
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
            : { opacity: 0, y: 10, rotate: -3.5, scale: 0.97 }
        }
        whileInView={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotate: -2, scale: 1 }
        }
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.48, ease: EDITORIAL_EASE }}
        className={`relative z-10 font-script font-semibold text-[34px] sm:text-[44px] leading-none select-none -mb-2 sm:-mb-3 ${
          dark ? 'text-[#F5C300]' : 'text-[#D99B00]'
        }`}
      >
        {script}
      </motion.span>

      <BlurFocusText delay={0.05}>
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

interface EditorialMarqueeProps {
  items: readonly string[];
  className?: string;
}

/**
 * Restraint-first infinite horizontal kinetic ribbon using pure GPU CSS transform.
 * Pauses gently on hover and renders statically when reduced motion is preferred.
 */
export function EditorialMarquee({
  items,
  className = '',
}: EditorialMarqueeProps) {
  const prefersReduced = useReducedMotion();

  const renderTrack = (keyPrefix: string) => (
    <div
      aria-hidden={keyPrefix === 'dup'}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item, idx) => (
        <span
          key={`${keyPrefix}-${idx}`}
          className="inline-flex items-center gap-8 whitespace-nowrap font-display text-[15px] sm:text-[17px] font-bold uppercase tracking-[0.14em]"
        >
          <span>{item}</span>
          <span
            aria-hidden="true"
            className="inline-block h-[5px] w-[5px] rotate-45 bg-[#D99B00]"
          />
        </span>
      ))}
    </div>
  );

  if (prefersReduced) {
    return (
      <div
        className={`overflow-x-auto no-scrollbar border-b border-[#0B0A09] bg-[#0B0A09] text-[#F5F2EB] py-3.5 ${className}`}
      >
        <div className="mx-auto max-w-[1392px] px-6 flex items-center justify-center gap-6 flex-wrap">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="font-display text-[14px] font-bold uppercase tracking-[0.14em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Dough & Co. kitchen highlights"
      className={`group overflow-hidden border-b border-[#0B0A09] bg-[#0B0A09] text-[#F5F2EB] py-3.5 select-none ${className}`}
    >
      <div className="flex w-max animate-[dough-marquee_32s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
        {renderTrack('main')}
        {renderTrack('dup')}
      </div>
    </div>
  );
}
