'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import { siteImages } from '@/data/images';
import { EDITORIAL_EASE, RevealBlock } from '@/components/MotionPrimitives';

interface SiteFooterProps {
  isSubpage?: boolean;
}

const EXPLORE_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Half & Half', href: '#half-and-half' },
  { label: 'Drink pairings', href: '#pairings' },
  { label: 'Our space', href: '#our-space' },
] as const;

const VISIT_LINKS = [
  { label: 'Reserve a table', href: '#reserve' },
  { label: 'Visit & hours', href: '#visit' },
  { label: 'All 20 pizzas', href: '/menu?category=pizzas' },
] as const;

const CONNECT_LINKS = [
  { label: 'Order on Zomato', href: siteConfig.links.zomato },
  { label: 'Google Maps', href: siteConfig.links.maps },
  { label: siteConfig.instagram.handle, href: siteConfig.links.instagram },
] as const;

export default function SiteFooter({ isSubpage = false }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const prefersReduced = useReducedMotion();

  const resolveHref = (href: string) =>
    isSubpage && href.startsWith('#') ? `/${href}` : href;

  return (
    <footer className="bg-[#000000] text-[#FFFFFF] border-t border-[#0B0A09] pt-16 lg:pt-20 pb-24 md:pb-12 print:hidden">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        {/* Centered circular Dough & Co. logo crest */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
          className="flex justify-center"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="inline-block rounded-full overflow-hidden border border-[#FFFFFF]/30 bg-[#FFFFFF]"
          >
            <motion.span
              whileHover={prefersReduced ? undefined : { scale: 1.07, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="relative block w-[72px] h-[72px]"
            >
              <Image
                src={siteImages.logoBadge}
                alt={siteConfig.name}
                fill
                sizes="72px"
                placeholder="blur"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </motion.span>
          </Link>
        </motion.div>

        {/* Three centered architectural columns inspired by lepainquotidien.com */}
        <nav
          aria-label="Footer navigation"
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 text-center max-w-[820px] mx-auto"
        >
          <RevealBlock delay={0.04}>
            <h2 className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-[#F5C300]">
              EXPLORE
            </h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((item) => {
                const href = resolveHref(item.href);
                const cls =
                  'inline-block text-[14px] text-[#FFFFFF]/85 transition-all duration-200 hover:text-[#F5C300] hover:translate-x-[2px]';
                return (
                  <li key={item.href}>
                    {item.href.startsWith('/') ? (
                      <Link href={href} className={cls}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={href} className={cls}>
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <h2 className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-[#F5C300]">
              DINING
            </h2>
            <ul className="mt-4 space-y-2.5">
              {VISIT_LINKS.map((item) => {
                const href = resolveHref(item.href);
                const cls =
                  'inline-block text-[14px] text-[#FFFFFF]/85 transition-all duration-200 hover:text-[#F5C300] hover:translate-x-[2px]';
                return (
                  <li key={item.href}>
                    {item.href.startsWith('/') ? (
                      <Link href={href} className={cls}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={href} className={cls}>
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.16}>
            <h2 className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-[#F5C300]">
              CONNECT
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CONNECT_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[14px] text-[#FFFFFF]/85 transition-all duration-200 hover:text-[#F5C300] hover:translate-x-[2px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealBlock>
        </nav>

        <div className="mt-14 pt-6 border-t border-[#FFFFFF]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#FFFFFF]/65 tabular-nums">
          <p>
            © {year} {siteConfig.name} All rights reserved.
          </p>
          <p>{siteConfig.descriptor}</p>
        </div>
      </div>
    </footer>
  );
}
