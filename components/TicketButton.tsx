'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EDITORIAL_EASE } from '@/components/MotionPrimitives';

interface TicketButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: 'ink' | 'outline' | 'light' | 'gold';
  className?: string;
}

/**
 * Sharp-cornered architectural CTA button inspired by lepainquotidien.com,
 * featuring a crisp bottom-to-top sliding fill wipe on hover.
 */
export default function TicketButton({
  children,
  href,
  external = false,
  type = 'button',
  onClick,
  variant = 'ink',
  className = '',
}: TicketButtonProps) {
  const prefersReduced = useReducedMotion();

  const styles =
    variant === 'outline'
      ? {
          shell: 'border border-[#0B0A09] bg-[#FFFFFF] text-[#0B0A09] hover:text-[#FFFFFF]',
          wipe: 'bg-[#0B0A09]',
        }
      : variant === 'light'
        ? {
            shell: 'border border-[#FFFFFF] bg-[#FFFFFF] text-[#0B0A09] hover:text-[#0B0A09]',
            wipe: 'bg-[#F5C300]',
          }
        : variant === 'gold'
          ? {
              shell: 'border border-[#0B0A09] bg-[#F5C300] text-[#0B0A09] hover:text-[#FFFFFF]',
              wipe: 'bg-[#0B0A09]',
            }
          : {
              shell: 'border border-[#0B0A09] bg-[#0B0A09] text-[#FFFFFF] hover:text-[#0B0A09]',
              wipe: 'bg-[#F5C300]',
            };

  const baseClasses = `group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none px-7 py-3.5 text-[14px] font-semibold tracking-[0.04em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 ${styles.shell} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${styles.wipe}`}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        <span>{children}</span>
        {external ? (
          <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        ) : (
          <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-[4px]" />
        )}
      </span>
    </>
  );

  const tapProps = prefersReduced
    ? {}
    : {
        whileTap: { scale: 0.97 },
        transition: { duration: 0.16, ease: EDITORIAL_EASE },
      };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...tapProps}
        >
          {inner}
        </motion.a>
      );
    }

    if (href.startsWith('#')) {
      return (
        <motion.a href={href} className={baseClasses} {...tapProps}>
          {inner}
        </motion.a>
      );
    }

    return (
      <motion.div className={className.includes('w-full') ? 'block w-full' : 'inline-block'} {...tapProps}>
        <Link href={href} className={baseClasses}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      {...tapProps}
    >
      {inner}
    </motion.button>
  );
}
