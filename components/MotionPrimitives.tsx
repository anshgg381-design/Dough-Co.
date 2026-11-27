'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: prefersReduced ? 0 : 0.52,
        delay: prefersReduced ? 0 : Math.min(delay, 0.14),
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
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReduced ? 0 : 0.56,
        delay: prefersReduced ? 0 : Math.min(delay, 0.14),
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
 * Clean architectural photo frame container without heavy per-frame scroll listeners.
 */
export function ParallaxFrame({
  children,
  className = '',
}: ParallaxFrameProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  );
}

interface HoverScaleFrameProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

/**
 * GPU-composited Framer Motion hover-scaling wrapper for homepage image panels.
 */
export function HoverScaleFrame({
  children,
  className = '',
  scale = 1.04,
}: HoverScaleFrameProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      data-cursor="view"
      whileHover={prefersReduced ? undefined : { scale }}
      transition={{ duration: 0.42, ease: EDITORIAL_EASE }}
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReduced ? 0 : 0.55,
        delay: prefersReduced ? 0 : Math.min(delay, 0.12),
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
            : { opacity: 0, y: 10, rotate: -3 }
        }
        whileInView={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotate: -2 }
        }
        viewport={{ once: true, amount: 0.15 }}
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
