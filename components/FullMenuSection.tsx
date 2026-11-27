'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const prefersReduced = useReducedMotion();

  const filteredItems = useMemo(
    () => filterMenuItems(MENU_ITEMS, { category: activeCategory, dietary, query }),
    [activeCategory, dietary, query]
  );

  const groupedSections = useMemo(
    () => groupMenuBySubCategory(filteredItems),
    [filteredItems]
  );

  return (
    <section
      id="menu"
      aria-labelledby="full-menu-heading"
      className={`${
        standalone
          ? 'pt-[116px] pb-[80px] lg:pt-[144px] lg:pb-[124px]'
          : 'py-[80px] lg:py-[124px]'
      } scroll-mt-[84px]`}
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid grid-cols-12 items-end gap-y-6 mb-10 lg:mb-14">
          <div className="col-span-12 lg:col-span-7">
            <ScriptOverlapHeading
              id="full-menu-heading"
              script={siteConfig.name}
              title="THE MENU"
              align="left"
              as={standalone ? 'h1' : 'h2'}
            />
          </div>
          <RevealBlock
            delay={0.08}
            className="col-span-12 lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-x-6 gap-y-2"
          >
            <p
              data-testid="menu-item-count"
              className="text-[14px] font-semibold uppercase tracking-[0.08em] tabular-nums text-[#46423D]"
            >
              {filteredItems.length} of {MENU_ITEMS.length} items
            </p>
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
      <div className="sticky top-[68px] lg:top-[72px] z-30 bg-[#FFFFFF] border-y border-[#0B0A09]">
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
                        duration: prefersReduced ? 0 : 0.25,
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
              className="inline-flex items-center border border-[#0B0A09] divide-x divide-[#0B0A09] self-start sm:self-auto"
            >
              {DIETARY_OPTIONS.map((option) => {
                const selected = dietary === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDietary(option.id)}
                    className={`rounded-none px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150 ${
                      selected
                        ? 'bg-[#0B0A09] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] text-[#0B0A09] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column editorial menu list */}
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8 pt-12 lg:pt-16">
        <AnimatePresence mode="wait">
          {groupedSections.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-16 text-center"
            >
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
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${dietary}-${query.trim().toLowerCase()}`}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReduced ? 0.15 : 0.25,
                ease: EDITORIAL_EASE,
              }}
              className="space-y-14 lg:space-y-16"
            >
              {groupedSections.map((group) => (
                <div key={group.subCategory}>
                  <div className="flex items-baseline justify-between pb-3 border-b border-[#0B0A09] mb-2">
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-bold uppercase leading-[1.05] text-[#0B0A09]">
                      {group.subCategory}
                    </h3>
                    <span className="text-[13px] font-semibold tabular-nums text-[#46423D]">
                      {group.items.length}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                    {group.items.map((item) => {
                      const realPhoto = item.image
                        ? menuImagesByPath[item.image]
                        : undefined;

                      return (
                        <li
                          key={item.id}
                          className="py-5 border-b border-[#0B0A09]/15 flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <DietaryMark type={item.dietary} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-4">
                                <h4 className="text-[16px] sm:text-[17px] font-semibold leading-snug text-[#0B0A09]">
                                  {item.name}
                                </h4>
                                <span className="text-[16px] font-bold tabular-nums text-[#0B0A09] shrink-0">
                                  {formatINR(item.price)}
                                </span>
                              </div>
                              {item.description.length > 0 && (
                                <p className="mt-1.5 text-[14px] leading-relaxed text-[#46423D]">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {realPhoto && (
                            <div className="relative w-[80px] h-[80px] shrink-0 overflow-hidden rounded-none border border-[#0B0A09] bg-[#ECE6DC]">
                              <Image
                                src={realPhoto}
                                alt={item.name}
                                fill
                                sizes="80px"
                                placeholder="blur"
                                referrerPolicy="no-referrer"
                                className="object-cover"
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
