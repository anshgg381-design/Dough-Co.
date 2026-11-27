'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import { siteImages } from '@/data/images';
import { getLiveOpenStatus, type LiveOpenStatus } from '@/lib/hours';
import { EDITORIAL_EASE } from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

export default function HeroSection() {
  const heroStageRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [status, setStatus] = useState<LiveOpenStatus | null>(null);

  // Smooth GPU-composited sticky scroll choreography (opacity + translateY only, zero CSS blur rasterization)
  const { scrollYProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 185, damping: 32 });

  // Whole 5-line stack glides smoothly upward into full frame
  const stackY = useTransform(smooth, [0, 0.9], [72, 0]);

  // Line 2: "PIZZA, PASTA" — softens in, sharpens first
  const line2Opacity = useTransform(smooth, [0, 0.24], [0.46, 1]);
  const line2Y = useTransform(smooth, [0, 0.24], [10, 0]);

  // Line 3: "TACOS" — reveals on scroll
  const line3Opacity = useTransform(smooth, [0.16, 0.42], [0, 1]);
  const line3Y = useTransform(smooth, [0.16, 0.44], [18, 0]);

  // Line 4: "COFFEE, SHAKES, MOCKTAILS" — reveals on scroll
  const line4Opacity = useTransform(smooth, [0.4, 0.66], [0, 1]);
  const line4Y = useTransform(smooth, [0.4, 0.68], [18, 0]);

  // Line 5: "& MUCH MORE." — final reveal
  const line5Opacity = useTransform(smooth, [0.62, 0.88], [0, 1]);
  const line5Y = useTransform(smooth, [0.62, 0.9], [18, 0]);

  // Foreground portrait photo gently settles on scroll
  const photoY = useTransform(smooth, [0, 1], [0, 12]);
  const photoScale = useTransform(smooth, [0, 1], [1, 1.035]);

  useEffect(() => {
    const syncStatus = () => setStatus(getLiveOpenStatus(new Date()));
    syncStatus();
    const timer = window.setInterval(syncStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={heroStageRef}
      aria-label="Dough & Co. hero"
      className="relative bg-[#F5F2EB] lg:h-[210vh] border-b border-[#0B0A09]"
    >
      {/* Desktop sticky architectural plaster stage + balanced single-screen mobile hero */}
      <div className="relative lg:sticky lg:top-0 min-h-[100svh] lg:h-[100svh] flex flex-col justify-between overflow-hidden pt-[84px] lg:pt-[94px]">
        {/* Warm stone counter plinth band at the lower edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-x-0 bottom-0 h-[23vh] bg-[#EAE4DA] border-t border-[#0B0A09]/12"
        />

        {/* Layered editorial composition: centered 5-line scroll reveal above architectural hero portrait */}
        <div className="relative flex-1 flex flex-col items-center justify-center lg:justify-between px-5 lg:px-8 pb-[84px] md:pb-12 lg:pb-6">
          {/* Desktop 5-line progressive GPU scroll-reveal headline */}
          <motion.div
            style={prefersReduced ? undefined : { y: stackY }}
            className="hidden lg:flex relative z-10 text-center flex-col items-center pt-2 xl:pt-4 will-change-transform"
          >
            <motion.p
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, y: 10, rotate: -3 }
              }
              animate={{ opacity: 1, y: 0, rotate: -1.5 }}
              transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
              className="font-script font-semibold text-[34px] xl:text-[38px] leading-none text-[#D99B00] mb-1.5 select-none"
            >
              Model Town, Panipat
            </motion.p>

            <h1 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.95] text-[#0B0A09] select-none flex flex-col items-center gap-0.5">
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04, ease: EDITORIAL_EASE }}
                className="block text-[clamp(2.65rem,4.6vw,4.35rem)]"
              >
                ALL UNDER ONE ROOF.
              </motion.span>

              <motion.span
                style={
                  prefersReduced
                    ? undefined
                    : { y: line2Y, opacity: line2Opacity }
                }
                className="block text-[clamp(2.35rem,4vw,3.75rem)] text-[#0B0A09] will-change-transform"
              >
                PIZZA, PASTA
              </motion.span>

              <motion.span
                style={
                  prefersReduced
                    ? undefined
                    : { y: line3Y, opacity: line3Opacity }
                }
                className="block text-[clamp(2.35rem,4vw,3.75rem)] text-[#0B0A09] will-change-transform"
              >
                TACOS
              </motion.span>

              <motion.span
                style={
                  prefersReduced
                    ? undefined
                    : { y: line4Y, opacity: line4Opacity }
                }
                className="block text-[clamp(1.95rem,3.3vw,3.15rem)] text-[#0B0A09] will-change-transform"
              >
                COFFEE, SHAKES, MOCKTAILS
              </motion.span>

              <motion.span
                style={
                  prefersReduced
                    ? undefined
                    : { y: line5Y, opacity: line5Opacity }
                }
                className="block text-[clamp(1.75rem,2.9vw,2.75rem)] text-[#8C6200] will-change-transform"
              >
                &amp; MUCH MORE.
              </motion.span>
            </h1>
          </motion.div>

          {/* Mobile crisp staggered 5-line entrance headline */}
          <div className="flex lg:hidden relative z-10 text-center flex-col items-center">
            <motion.p
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, y: 10, rotate: -3 }
              }
              animate={{ opacity: 1, y: 0, rotate: -1.5 }}
              transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
              className="font-script font-semibold text-[26px] leading-none text-[#D99B00] mb-1.5 select-none"
            >
              Model Town, Panipat
            </motion.p>

            <h1 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.98] text-[#0B0A09] select-none flex flex-col items-center gap-0.5">
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.04, ease: EDITORIAL_EASE }}
                className="block text-[clamp(2.2rem,9vw,3.1rem)]"
              >
                ALL UNDER ONE ROOF.
              </motion.span>
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: EDITORIAL_EASE }}
                className="block text-[clamp(1.65rem,6.6vw,2.35rem)] text-[#0B0A09]/92"
              >
                PIZZA, PASTA
              </motion.span>
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: EDITORIAL_EASE }}
                className="block text-[clamp(1.65rem,6.6vw,2.35rem)] text-[#0B0A09]/92"
              >
                TACOS
              </motion.span>
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22, ease: EDITORIAL_EASE }}
                className="block text-[clamp(1.4rem,5.5vw,2rem)] text-[#0B0A09]/92"
              >
                COFFEE, SHAKES, MOCKTAILS
              </motion.span>
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease: EDITORIAL_EASE }}
                className="block text-[clamp(1.3rem,5vw,1.8rem)] text-[#8C6200]"
              >
                &amp; MUCH MORE.
              </motion.span>
            </h1>
          </div>

          {/* Architectural circular medallion showcasing Dough & Co. storefront facade */}
          <motion.div
            style={prefersReduced ? undefined : { y: photoY }}
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.1, ease: EDITORIAL_EASE }}
            className="relative z-20 mt-4 sm:mt-5 lg:mt-0 will-change-transform"
          >
            <motion.div
              data-cursor="view"
              whileHover={prefersReduced ? undefined : { scale: 1.025 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="relative w-[210px] sm:w-[250px] lg:w-[310px] xl:w-[350px] aspect-square overflow-hidden rounded-full border-2 border-[#0B0A09] bg-[#161412] shadow-[0_24px_50px_rgba(11,10,9,0.22)] ring-4 ring-[#F5F2EB]/80"
            >
              <motion.div
                style={prefersReduced ? undefined : { scale: photoScale }}
                className="relative w-full h-full rounded-full overflow-hidden will-change-transform"
              >
                <Image
                  src={siteImages.heroStorefront}
                  alt="Dough & Co. Pizzeria and Taqueria storefront in Model Town, Panipat"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 360px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile CTAs & live location status with comfortable clearance above mobile bar */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EDITORIAL_EASE }}
            className="lg:hidden relative z-30 mt-4 flex flex-col items-center text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <TicketButton
                href={siteConfig.links.zomato}
                external
                variant="ink"
                className="px-5 py-2.5 text-[13px]"
              >
                Order on Zomato
              </TicketButton>
              <TicketButton
                href="#reserve"
                variant="outline"
                className="px-5 py-2.5 text-[13px]"
              >
                Reserve a table
              </TicketButton>
            </div>
            <p className="mt-2.5 text-[12px] leading-snug text-[#46423D] max-w-[34ch]">
              {siteConfig.address.oneLine}
            </p>
            <p
              data-testid="live-open-status-mobile"
              className="mt-0.5 text-[13px] font-semibold tabular-nums text-[#0B0A09]"
            >
              {status ? status.label : 'Open daily from 12:00 PM'}
            </p>
          </motion.div>
        </div>

        {/* Desktop corner anchors on the stone plinth: CTAs + live status left, SCROLL cue right */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: EDITORIAL_EASE }}
          className="hidden lg:flex pointer-events-none absolute inset-x-0 bottom-0 z-30 mx-auto max-w-[1392px] w-full px-6 pb-8 items-end justify-between"
        >
          <div className="pointer-events-auto flex flex-col items-start gap-3 max-w-[380px]">
            <div className="flex items-center gap-3">
              <TicketButton href={siteConfig.links.zomato} external variant="ink">
                Order on Zomato
              </TicketButton>
              <TicketButton href="#reserve" variant="outline">
                Reserve a table
              </TicketButton>
            </div>
            <div className="text-[13px] leading-snug text-[#46423D]">
              <p>{siteConfig.address.oneLine}</p>
              <p
                data-testid="live-open-status"
                className="mt-0.5 font-semibold tabular-nums text-[#0B0A09]"
              >
                {status ? status.label : 'Open daily from 12:00 PM'}
              </p>
            </div>
          </div>

          {/* Signature lepainquotidien.com bottom-right SCROLL cue */}
          <a
            href="#menu-highlights"
            aria-label="Scroll to explore menu highlights"
            className="pointer-events-auto group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0B0A09]"
          >
            <span>SCROLL</span>
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#0B0A09] bg-[#FFFFFF] text-[#0B0A09] transition-colors duration-300 group-hover:bg-[#0B0A09] group-hover:text-[#FFFFFF]">
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[2px]" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
