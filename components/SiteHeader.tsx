'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import { siteImages } from '@/data/images';
import { getLiveOpenStatus, type LiveOpenStatus } from '@/lib/hours';
import { EDITORIAL_EASE } from '@/components/MotionPrimitives';

interface SiteHeaderProps {
  solidDefault?: boolean;
  onNavigateSection?: (href: string) => void;
}

const LEFT_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Half & Half', href: '#half-and-half' },
  { label: 'Our space', href: '#our-space' },
] as const;

const RIGHT_LINKS = [
  { label: 'Reserve', href: '#reserve' },
  { label: 'Visit', href: '#visit' },
] as const;

export default function SiteHeader({
  solidDefault = false,
  onNavigateSection,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(solidDefault);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState<LiveOpenStatus | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const syncStatus = () => setStatus(getLiveOpenStatus(new Date()));
    syncStatus();
    const timer = window.setInterval(syncStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (solidDefault) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [solidDefault]);

  const isCompact = solidDefault || scrolled;

  const resolveHref = (href: string) =>
    solidDefault && href.startsWith('#') ? `/${href}` : href;

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    if (onNavigateSection) onNavigateSection(href);
  };

  return (
    <header
      data-testid="site-header"
      data-scrolled={isCompact ? 'true' : 'false'}
      className={`fixed top-0 inset-x-0 z-50 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isCompact ? 'px-3 pt-2.5 lg:px-6 lg:pt-3' : 'px-3 pt-3.5 lg:px-6 lg:pt-4'
      }`}
    >
      {/* Architectural boxed grid navigation bar inspired by lepainquotidien.com */}
      <div className="relative mx-auto max-w-[1392px] border border-[#0B0A09] bg-[#FFFFFF] text-[#0B0A09]">
        {/* Desktop architectural cell grid */}
        <div
          className={`hidden lg:grid grid-cols-[1fr_auto_1fr] items-stretch divide-x divide-[#0B0A09] transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isCompact ? 'h-[58px]' : 'h-[66px]'
          }`}
        >
          {/* Left navigation cells */}
          <nav
            aria-label="Primary navigation"
            className="grid grid-cols-3 divide-x divide-[#0B0A09]"
          >
            {LEFT_LINKS.map((item) => {
              const href = resolveHref(item.href);
              const cellClass =
                'flex items-center justify-center px-4 text-[14px] font-medium tracking-[0.02em] text-[#0B0A09] whitespace-nowrap transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8C6200]';
              return item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => handleLinkClick(item.href)}
                  className={cellClass}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={href}
                  onClick={() => handleLinkClick(item.href)}
                  className={cellClass}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Center crest cell: unmodified supplied circular Dough & Co. logo badge */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center justify-center px-10 xl:px-16 transition-colors duration-200 hover:bg-[#FAF7F2]"
          >
            <span
              className={`relative block rounded-full overflow-hidden border border-[#0B0A09]/25 bg-[#FFFFFF] transition-[width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCompact ? 'w-[42px] h-[42px]' : 'w-[50px] h-[50px]'
              }`}
            >
              <Image
                src={siteImages.logoBadge}
                alt={siteConfig.name}
                fill
                sizes="56px"
                loading="eager"
                placeholder="blur"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </span>
          </Link>

          {/* Right cells: Reserve, Visit, and Order on Zomato primary action */}
          <div className="grid grid-cols-[1fr_1fr_1.35fr] divide-x divide-[#0B0A09]">
            {RIGHT_LINKS.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                onClick={() => handleLinkClick(item.href)}
                className="flex items-center justify-center px-4 text-[14px] font-medium tracking-[0.02em] text-[#0B0A09] whitespace-nowrap transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8C6200]"
              >
                {item.label}
              </a>
            ))}

            <a
              href={siteConfig.links.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-1.5 overflow-hidden bg-[#0B0A09] px-5 text-[14px] font-semibold tracking-[0.02em] text-[#FFFFFF] whitespace-nowrap transition-colors duration-300 hover:text-[#0B0A09]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-full bg-[#F5C300] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              />
              <span className="relative z-10 inline-flex items-center gap-1.5">
                <span>Order on Zomato</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </span>
            </a>
          </div>
        </div>

        {/* Mobile boxed bar */}
        <div className="lg:hidden grid grid-cols-[56px_1fr_auto] items-stretch divide-x divide-[#0B0A09] h-[56px]">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`flex items-center justify-center transition-colors duration-200 ${
              mobileOpen ? 'bg-[#0B0A09] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#0B0A09]'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center justify-center"
          >
            <span className="relative block w-[40px] h-[40px] rounded-full overflow-hidden border border-[#0B0A09]/25 bg-[#FFFFFF]">
              <Image
                src={siteImages.logoBadge}
                alt={siteConfig.name}
                fill
                sizes="44px"
                loading="eager"
                placeholder="blur"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </span>
          </Link>

          <a
            href={siteConfig.links.zomato}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-[#0B0A09] px-4 text-[13px] font-semibold text-[#FFFFFF] whitespace-nowrap"
          >
            <span>Order</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile curtain navigation drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
              className="lg:hidden border-t border-[#0B0A09] bg-[#FFFFFF] px-6 py-6"
            >
              <div className="flex flex-col divide-y divide-[#0B0A09]/15">
                {[...LEFT_LINKS, ...RIGHT_LINKS].map((item, idx) => {
                  const href = resolveHref(item.href);
                  const cls =
                    'block py-3.5 font-display text-[26px] uppercase tracking-[-0.01em] text-[#0B0A09]';
                  return (
                    <motion.div
                      key={item.href}
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25, ease: EDITORIAL_EASE }}
                    >
                      {item.href.startsWith('/') ? (
                        <Link
                          href={href}
                          onClick={() => handleLinkClick(item.href)}
                          className={cls}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          onClick={() => handleLinkClick(item.href)}
                          className={cls}
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-[#0B0A09]/15 flex items-center justify-between gap-4">
                <p className="text-[13px] font-medium tabular-nums text-[#46423D]">
                  {status ? status.label : 'Open daily from 12:00 PM'}
                </p>
                <a
                  href={siteConfig.phone.href}
                  className="text-[13px] font-semibold tabular-nums text-[#0B0A09] underline underline-offset-4"
                >
                  {siteConfig.phone.display}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
