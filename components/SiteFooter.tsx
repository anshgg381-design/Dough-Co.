'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { siteImages } from '@/data/images';

interface SiteFooterProps {
  isSubpage?: boolean;
}

const EXPLORE_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Half & Half', href: '#half-and-half' },
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

  const resolveHref = (href: string) =>
    isSubpage && href.startsWith('#') ? `/${href}` : href;

  return (
    <footer className="bg-[#000000] text-[#FFFFFF] border-t border-[#0B0A09] pt-16 lg:pt-20 pb-24 md:pb-12">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        {/* Centered circular Dough & Co. logo crest */}
        <div className="flex justify-center">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="inline-block rounded-full overflow-hidden border border-[#FFFFFF]/30 bg-[#FFFFFF] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
          >
            <span className="relative block w-[72px] h-[72px]">
              <Image
                src={siteImages.logoBadge}
                alt={siteConfig.name}
                fill
                sizes="72px"
                placeholder="blur"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </span>
          </Link>
        </div>

        {/* Three centered architectural columns inspired by lepainquotidien.com */}
        <nav
          aria-label="Footer navigation"
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 text-center max-w-[820px] mx-auto"
        >
          <div>
            <h2 className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-[#F5C300]">
              EXPLORE
            </h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((item) => {
                const href = resolveHref(item.href);
                const cls =
                  'text-[14px] text-[#FFFFFF]/85 transition-colors duration-200 hover:text-[#F5C300]';
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
          </div>

          <div>
            <h2 className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-[#F5C300]">
              DINING
            </h2>
            <ul className="mt-4 space-y-2.5">
              {VISIT_LINKS.map((item) => {
                const href = resolveHref(item.href);
                const cls =
                  'text-[14px] text-[#FFFFFF]/85 transition-colors duration-200 hover:text-[#F5C300]';
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
          </div>

          <div>
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
                    className="text-[14px] text-[#FFFFFF]/85 transition-colors duration-200 hover:text-[#F5C300]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
