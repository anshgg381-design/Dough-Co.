'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, FileText, Printer, Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type DietaryType,
  type MenuCategory,
} from '@/data/menu';
import { menuImagesByPath } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';
import {
  filterMenuItems,
  formatINR,
  groupMenuBySubCategory,
  type DietaryFilter,
} from '@/lib/menu-utils';
import {
  EDITORIAL_EASE,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';

interface FullMenuSectionProps {
  activeCategory: 'all' | MenuCategory;
  onCategoryChange: (category: 'all' | MenuCategory) => void;
  standalone?: boolean;
}

function DietaryMark({ type }: { type: DietaryType }) {
  const styles =
    type === 'veg'
      ? { border: 'border-[#1E6B3A]', dot: 'bg-[#1E6B3A]', label: 'Vegetarian' }
      : type === 'egg'
        ? { border: 'border-[#9A5B13]', dot: 'bg-[#9A5B13]', label: 'Contains egg' }
        : { border: 'border-[#B93124]', dot: 'bg-[#B93124]', label: 'Non-vegetarian' };

  return (
    <span
      role="img"
      aria-label={styles.label}
      title={styles.label}
      className={`inline-flex items-center justify-center w-[14px] h-[14px] rounded-none border ${styles.border} shrink-0 mt-[5px]`}
    >
      <span className={`w-[6px] h-[6px] rounded-full ${styles.dot}`} />
    </span>
  );
}

const DIETARY_OPTIONS: { id: DietaryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'non-veg', label: 'Non-veg' },
];

export default function FullMenuSection({
  activeCategory,
  onCategoryChange,
  standalone = false,
}: FullMenuSectionProps) {
  const [dietary, setDietary] = useState<DietaryFilter>('all');
  const [query, setQuery] = useState('');
  const [printPreview, setPrintPreview] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const prefersReduced = useReducedMotion();

  const filteredItems = useMemo(
    () =>
      filterMenuItems(MENU_ITEMS, {
        category: activeCategory,
        dietary,
        query: deferredQuery,
      }),
    [activeCategory, dietary, deferredQuery]
  );

  const groupedSections = useMemo(
    () => groupMenuBySubCategory(filteredItems),
    [filteredItems]
  );

  const activeCategoryLabel =
    MENU_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? 'All';

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="menu"
      aria-labelledby="full-menu-heading"
      data-print-preview={printPreview ? 'true' : 'false'}
      className={`${
        standalone
          ? 'pt-[116px] pb-[80px] lg:pt-[144px] lg:pb-[124px]'
          : 'py-[80px] lg:py-[124px]'
      } print:pt-0 print:pb-0 scroll-mt-[84px]`}
    >
      {/* Print-only & Print-Preview Editorial Broadsheet Masthead */}
      <div
        data-testid="printable-menu-masthead"
        className={`${
          printPreview ? 'block' : 'hidden print:block'
        } mx-auto max-w-[1280px] px-5 lg:px-8 pb-8 mb-8 border-b-2 border-[#0B0A09]`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C6200] print:text-[#0B0A09]">
              {siteConfig.descriptor}
            </p>
            <h2 className="mt-1 font-display text-[36px] sm:text-[44px] font-bold uppercase tracking-[-0.015em] leading-none text-[#0B0A09]">
              {siteConfig.name} — FULL MENU
            </h2>
            <p className="mt-2 text-[13px] text-[#46423D] print:text-[#0B0A09]">
              {siteConfig.address.full} · {siteConfig.phone.display}
            </p>
          </div>
          <div className="text-left sm:text-right text-[12px] tabular-nums text-[#46423D] print:text-[#0B0A09]">
            <p className="font-semibold text-[#0B0A09]">
              {activeCategoryLabel} · {filteredItems.length} items (INR)
            </p>
            <p className="mt-0.5">
              Mon–Thu {siteConfig.hours.schedule[0].display} · Fri–Sun{' '}
              {siteConfig.hours.schedule[1].display}
            </p>
          </div>
        </div>

        {printPreview && (
          <div className="mt-6 pt-4 border-t border-[#0B0A09]/20 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <p className="text-[13px] text-[#46423D]">
              Showing compact editorial paper layout ready for printing or PDF export.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-none border border-[#0B0A09] bg-[#0B0A09] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FFFFFF] hover:bg-[#F5C300] hover:text-[#0B0A09]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                type="button"
                data-testid="exit-print-preview"
                onClick={() => setPrintPreview(false)}
                className="inline-flex items-center gap-2 rounded-none border border-[#0B0A09] bg-[#FFFFFF] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0B0A09] hover:bg-[#FAF7F2]"
              >
                <X className="w-3.5 h-3.5" />
                <span>Interactive menu</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Standard interactive header (hidden in print or print-preview broadsheet) */}
      <div
        className={`${
          printPreview ? 'hidden' : 'block print:hidden'
        } mx-auto max-w-[1280px] px-5 lg:px-8`}
      >
        <div className="grid grid-cols-12 items-end gap-y-6 mb-10 lg:mb-14">
          <div className="col-span-12 lg:col-span-6">
            <ScriptOverlapHeading
              id="full-menu-heading"
              script={siteConfig.name}
              title="THE MENU"
              align="left"
              as={standalone ? 'h1' : 'h2'}
            />
          </div>
          <RevealBlock
            delay={0.06}
            className="col-span-12 lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-x-5 gap-y-3"
          >
            <p
              data-testid="menu-item-count"
              className="text-[14px] font-semibold uppercase tracking-[0.08em] tabular-nums text-[#46423D]"
            >
              {filteredItems.length} of {MENU_ITEMS.length} items
            </p>

            <button
              type="button"
              data-testid="toggle-print-preview"
              onClick={() => setPrintPreview(true)}
              className="inline-flex items-center gap-1.5 rounded-none border border-[#0B0A09] bg-[#FFFFFF] px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0B0A09] transition-colors duration-150 hover:bg-[#FAF7F2]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Printable view</span>
            </button>

            <button
              type="button"
              data-testid="print-menu-button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-none border border-[#0B0A09] bg-[#0B0A09] px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FFFFFF] transition-colors duration-150 hover:bg-[#F5C300] hover:text-[#0B0A09]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print menu</span>
            </button>

            <a
              href={siteConfig.links.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0B0A09] underline underline-offset-4 hover:text-[#8C6200]"
            >
              <span>Order delivery on Zomato</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </a>
          </RevealBlock>
        </div>
      </div>

      {/* Sticky category tabs + search + veg/non-veg filter */}
      <div
        className={`${
          printPreview ? 'hidden' : 'block print:hidden'
        } sticky top-[68px] lg:top-[72px] z-30 bg-[#FFFFFF] border-y border-[#0B0A09]`}
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar pt-1"
          >
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category.id)}
                  className={`relative shrink-0 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0B0A09]'
                      : 'text-[#6B655D] hover:text-[#0B0A09]'
                  }`}
                >
                  <span>{category.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="active-menu-tab-underline"
                      transition={{
                        duration: prefersReduced ? 0 : 0.22,
                        ease: EDITORIAL_EASE,
                      }}
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-[#0B0A09]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="py-3.5 border-t border-[#0B0A09]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-[340px]">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#46423D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search menu items"
                placeholder="Search pizzas, tacos, coffee..."
                className="w-full rounded-none bg-[#FAF7F2] border border-[#0B0A09] pl-10 pr-9 py-2 text-[14px] text-[#0B0A09] placeholder:text-[#6B655D] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#46423D] hover:text-[#0B0A09]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div
              role="group"
              aria-label="Filter by diet"
              className="relative inline-flex items-center border border-[#0B0A09] divide-x divide-[#0B0A09] self-start sm:self-auto"
            >
              {DIETARY_OPTIONS.map((option) => {
                const selected = dietary === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDietary(option.id)}
                    className={`relative rounded-none px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                      selected
                        ? 'text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] text-[#0B0A09] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="dietary-filter-bg"
                        transition={{
                          duration: prefersReduced ? 0 : 0.22,
                          ease: EDITORIAL_EASE,
                        }}
                        className="absolute inset-0 bg-[#0B0A09]"
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Zero-lag two-column editorial menu list (no keystroke unmount/teardown) */}
      <div
        className={`mx-auto max-w-[1280px] px-5 lg:px-8 ${
          printPreview ? 'pt-2 pb-12' : 'pt-12 lg:pt-16'
        } print:px-0 print:pt-0`}
      >
        {groupedSections.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-[28px] font-bold uppercase text-[#0B0A09]">
              No dishes match that search.
            </p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('all');
                setDietary('all');
                setQuery('');
              }}
              className="mt-5 rounded-none border border-[#0B0A09] bg-[#0B0A09] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#FFFFFF] transition-colors duration-200 hover:bg-[#F5C300] hover:text-[#0B0A09]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-14 lg:space-y-16 print:space-y-8">
            {groupedSections.map((group) => (
              <div key={group.subCategory} className="print-section-group">
                <div className="flex items-baseline justify-between pb-3 border-b border-[#0B0A09] mb-2 print-keep-with-next">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-bold uppercase leading-[1.05] text-[#0B0A09] print:text-[20px]">
                    {group.subCategory}
                  </h3>
                  <span className="text-[13px] font-semibold tabular-nums text-[#46423D] print:text-[#0B0A09]">
                    {group.items.length}
                  </span>
                </div>

                <ul
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-x-12 ${
                    printPreview ? 'md:grid-cols-2 gap-x-10' : ''
                  } print:grid-cols-2 print:gap-x-8`}
                >
                  {group.items.map((item) => {
                    const realPhoto = item.image
                      ? menuImagesByPath[item.image]
                      : undefined;

                    return (
                      <li
                        key={item.id}
                        className={`print-menu-row ${
                          printPreview ? 'py-3' : 'py-5'
                        } print:py-2.5 border-b border-[#0B0A09]/15 flex items-start justify-between gap-4`}
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <DietaryMark type={item.dietary} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-4">
                              <h4
                                className={`${
                                  printPreview
                                    ? 'text-[15px]'
                                    : 'text-[16px] sm:text-[17px]'
                                } print:text-[13px] font-semibold leading-snug text-[#0B0A09]`}
                              >
                                {item.name}
                              </h4>
                              <span
                                className={`${
                                  printPreview ? 'text-[15px]' : 'text-[16px]'
                                } print:text-[13px] font-bold tabular-nums text-[#0B0A09] shrink-0`}
                              >
                                {formatINR(item.price)}
                              </span>
                            </div>
                            {item.description.length > 0 && (
                              <p
                                className={`mt-1.5 ${
                                  printPreview ? 'text-[12.5px]' : 'text-[14px]'
                                } print:text-[11px] leading-relaxed text-[#46423D] print:text-[#2D2A26]`}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {realPhoto && !printPreview && (
                          <div className="group/thumb relative w-[80px] h-[80px] shrink-0 overflow-hidden rounded-none border border-[#0B0A09] bg-[#ECE6DC] print:hidden">
                            <Image
                              src={realPhoto}
                              alt={item.name}
                              fill
                              loading="eager"
                              decoding="async"
                              quality={75}
                              sizes="80px"
                              placeholder="blur"
                              referrerPolicy="no-referrer"
                              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-110"
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
