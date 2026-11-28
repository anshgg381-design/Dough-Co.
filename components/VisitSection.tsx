'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import { getLiveOpenStatus, type LiveOpenStatus } from '@/lib/hours';
import {
  ArchitecturalRule,
  EDITORIAL_EASE,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import VisitMap from '@/components/VisitMap';

const VISIT_LINKS = [
  {
    label: 'Google Maps',
    href: siteConfig.links.maps,
    external: true,
    tabular: false,
  },
  {
    label: siteConfig.phone.display,
    href: siteConfig.phone.href,
    external: false,
    tabular: true,
  },
  {
    label: siteConfig.instagram.handle,
    href: siteConfig.links.instagram,
    external: true,
    tabular: false,
  },
  {
    label: 'Order on Zomato',
    href: siteConfig.links.zomato,
    external: true,
    tabular: false,
  },
] as const;

export default function VisitSection() {
  const [status, setStatus] = useState<LiveOpenStatus | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const sync = () => setStatus(getLiveOpenStatus(new Date()));
    sync();
    const timer = window.setInterval(sync, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="border-t border-[#0B0A09] bg-[#FAF7F2] py-[80px] lg:py-[124px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: Address and primary links */}
          <div className="lg:col-span-6">
            <ScriptOverlapHeading
              id="visit-heading"
              script="Find us"
              title="VISIT US"
              align="left"
            />

            <RevealBlock delay={0.06}>
              <address className="not-italic mt-7 text-[18px] sm:text-[20px] font-medium leading-relaxed text-[#0B0A09] max-w-[38ch]">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </address>

              <div className="mt-8">
                <ArchitecturalRule className="bg-[#0B0A09]/25" delay={0.1} />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {VISIT_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.45,
                      delay: prefersReduced ? 0 : idx * 0.06,
                      ease: EDITORIAL_EASE,
                    }}
                    className={`group inline-flex items-center justify-between py-2.5 border-b border-[#0B0A09]/30 text-[15px] font-semibold text-[#0B0A09] transition-colors hover:border-[#0B0A09] hover:text-[#8C6200] ${
                      link.tabular ? 'tabular-nums' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                  </motion.a>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Right column: Hours table with today highlighted */}
          <RevealBlock delay={0.08} className="lg:col-span-6 lg:pt-4">
            <div className="border border-[#0B0A09] bg-[#FFFFFF] p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(11,10,9,0.08)]">
              <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-[#0B0A09]">
                <h3 className="font-display text-[26px] font-bold uppercase tracking-[-0.01em] text-[#0B0A09]">
                  HOURS
                </h3>
                {status && (
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] tabular-nums text-[#8C6200]">
                    {status.label}
                  </p>
                )}
              </div>

              <dl className="divide-y divide-[#0B0A09]/15">
                {siteConfig.hours.schedule.map((row) => {
                  const isToday = status?.todayGroup === row.id;
                  return (
                    <div
                      key={row.id}
                      data-testid={`hours-row-${row.id}`}
                      data-today={isToday ? 'true' : 'false'}
                      className={`py-5 px-4 -mx-4 flex items-baseline justify-between gap-6 transition-colors duration-300 ${
                        isToday
                          ? 'bg-[#F5C300]/22 text-[#0B0A09]'
                          : 'text-[#46423D]'
                      }`}
                    >
                      <dt className="flex items-center gap-3 text-[16px] font-semibold">
                        <span>{row.days}</span>
                        {isToday && (
                          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C6200]">
                            Today
                          </span>
                        )}
                      </dt>
                      <dd
                        className={`text-[16px] tabular-nums ${
                          isToday ? 'font-bold text-[#0B0A09]' : 'font-medium'
                        }`}
                      >
                        {row.display}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </RevealBlock>
        </div>

        {/* Interactive Google Map anchored inside a sharp 1px architectural frame */}
        <RevealBlock delay={0.12} className="mt-12 lg:mt-14">
          <VisitMap />
        </RevealBlock>
      </div>
    </section>
  );
}
