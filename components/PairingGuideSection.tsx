'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Coffee, Plus } from 'lucide-react';
import {
  filterPairings,
  getResolvedPairings,
  PAIRING_MOODS,
  type PairingMood,
} from '@/data/pairings';
import { type DietaryType } from '@/data/menu';
import { formatINR } from '@/lib/menu-utils';
import {
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';

const ALL_PAIRINGS = getResolvedPairings();

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
      className={`inline-flex items-center justify-center w-[13px] h-[13px] border ${styles.border} shrink-0 mt-[4px]`}
    >
      <span className={`w-[5px] h-[5px] rounded-full ${styles.dot}`} />
    </span>
  );
}

export default function PairingGuideSection() {
  const [mood, setMood] = useState<PairingMood>('all');
  const [vegOnly, setVegOnly] = useState(false);

  const visiblePairings = useMemo(
    () => filterPairings(ALL_PAIRINGS, mood, vegOnly),
    [mood, vegOnly]
  );

  return (
    <section
      id="pairings"
      aria-labelledby="pairings-heading"
      data-testid="pairing-guide-section"
      className="border-t border-[#0B0A09] bg-[#FFFFFF] py-[80px] lg:py-[124px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <ScriptOverlapHeading
            id="pairings-heading"
            script="Kitchen & coffee bar"
            title="DRINK & PIZZA PAIRING GUIDE"
            align="center"
          />
          <RevealBlock delay={0.06}>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#46423D] max-w-[54ch]">
              Match our wood-fired Napoli pies and fresh pasta with cold brews,
              espresso classics, shakes and house craft mocktails from the bar.
            </p>
          </RevealBlock>
        </div>

        {/* Interactive mood tabs + Veg-only filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-[#0B0A09] py-4">
          <div
            role="tablist"
            aria-label="Pairing flavour mood"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          >
            {PAIRING_MOODS.map((tab) => {
              const selected = mood === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setMood(tab.id)}
                  className={`shrink-0 rounded-none border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150 ${
                    selected
                      ? 'border-[#0B0A09] bg-[#0B0A09] text-[#FFFFFF]'
                      : 'border-[#0B0A09]/30 bg-[#FAF7F2] text-[#0B0A09] hover:border-[#0B0A09] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={vegOnly}
            data-testid="pairing-veg-toggle"
            onClick={() => setVegOnly((prev) => !prev)}
            className={`inline-flex items-center justify-center gap-2 self-start md:self-auto rounded-none border border-[#0B0A09] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150 ${
              vegOnly
                ? 'bg-[#1E6B3A] text-[#FFFFFF] border-[#1E6B3A]'
                : 'bg-[#FFFFFF] text-[#0B0A09] hover:bg-[#FAF7F2]'
            }`}
          >
            <span
              aria-hidden="true"
              className={`w-[7px] h-[7px] rounded-full ${
                vegOnly ? 'bg-[#FFFFFF]' : 'bg-[#1E6B3A]'
              }`}
            />
            <span>Veg pairings only</span>
          </button>
        </div>

        {/* Crisp 1px architectural grid of paired dishes and bar drinks */}
        <div
          data-testid="pairing-guide-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#0B0A09] bg-[#FFFFFF]"
        >
          {visiblePairings.map((pairing) => (
            <article
              key={pairing.id}
              data-testid="pairing-card"
              className="group border-r border-b border-[#0B0A09] bg-[#FFFFFF] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:bg-[#FAF7F2]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#0B0A09]/15">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C6200]">
                    {PAIRING_MOODS.find((m) => m.id === pairing.mood)?.label}
                  </span>
                  <span className="text-[13px] font-bold tabular-nums text-[#0B0A09]">
                    Duo {formatINR(pairing.combinedPrice)}
                  </span>
                </div>

                {/* Dish + Drink lockup */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <DietaryMark type={pairing.food.dietary} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B655D]">
                          From the oven
                        </p>
                        <h3 className="text-[17px] font-semibold leading-snug text-[#0B0A09]">
                          {pairing.food.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[14px] font-semibold tabular-nums text-[#0B0A09] shrink-0 pt-3">
                      {formatINR(pairing.food.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pl-6 text-[#8C6200]">
                    <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="h-[1px] flex-1 bg-[#0B0A09]/15" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Coffee
                        aria-hidden="true"
                        className="w-[14px] h-[14px] text-[#8C6200] shrink-0 mt-[4px]"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B655D]">
                          From the bar
                        </p>
                        <p className="text-[16px] font-semibold leading-snug text-[#0B0A09]">
                          {pairing.drink.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-[14px] font-semibold tabular-nums text-[#0B0A09] shrink-0 pt-3">
                      {formatINR(pairing.drink.price)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#0B0A09]/15">
                  <p className="text-[14px] font-semibold text-[#0B0A09] leading-snug">
                    {pairing.headline}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#46423D]">
                    {pairing.note}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0B0A09]/15 flex items-center justify-between gap-4">
                <Link
                  href={`/menu?category=${pairing.food.category}`}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0B0A09] underline underline-offset-4 hover:text-[#8C6200]"
                >
                  <span>See {pairing.food.category === 'pastas' ? 'pasta' : 'pizza'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/menu?category=drinks"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#46423D] underline underline-offset-4 hover:text-[#0B0A09]"
                >
                  <span>See drinks</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
