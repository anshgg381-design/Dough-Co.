'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { MENU_ITEMS, type DietaryType } from '@/data/menu';
import { menuImagesByPath } from '@/data/images';
import { formatINR, getFeaturedDishesWithImages } from '@/lib/menu-utils';
import {
  EDITORIAL_EASE,
  HoverScaleFrame,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

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
      className={`inline-flex items-center justify-center w-[14px] h-[14px] border ${styles.border} shrink-0 mt-[5px]`}
    >
      <span className={`w-[6px] h-[6px] rounded-full ${styles.dot}`} />
    </span>
  );
}

const FEATURED_DISHES = getFeaturedDishesWithImages(MENU_ITEMS);

export default function FeaturedDishesSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="featured-dishes"
      aria-labelledby="featured-dishes-heading"
      data-testid="featured-dishes-section"
      className="py-[72px] lg:py-[112px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1392px] px-3 lg:px-6">
        <div className="mb-12 lg:mb-16 text-center flex flex-col items-center">
          <ScriptOverlapHeading
            id="featured-dishes-heading"
            script="From the kitchen"
            title="OUR BEST DISHES"
            align="center"
          />
          <RevealBlock delay={0.08}>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#46423D] max-w-[50ch]">
              A look at six photographed dishes from our Model Town kitchen.
            </p>
          </RevealBlock>
        </div>

        {/* Crisp 1px architectural hairline-bordered 3x2 gallery grid */}
        <ul
          data-testid="featured-dishes-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#0B0A09] bg-[#FFFFFF]"
        >
          {FEATURED_DISHES.map((dish, index) => {
            const photo = dish.image ? menuImagesByPath[dish.image] : undefined;
            if (!photo) return null;

            return (
              <motion.li
                key={dish.id}
                data-testid="featured-dish-item"
                initial={
                  prefersReduced
                    ? { opacity: 1 }
                    : { opacity: 0, y: 26, scale: 0.985 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={prefersReduced ? undefined : { y: -3 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: prefersReduced ? 0 : 0.65,
                  delay: prefersReduced ? 0 : (index % 3) * 0.08,
                  ease: EDITORIAL_EASE,
                }}
                className="group relative border-r border-b border-[#0B0A09] bg-[#FFFFFF] flex flex-col transition-colors duration-300 hover:bg-[#FAF7F2]"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-[#0B0A09] bg-[#EFE9DF]">
                  <HoverScaleFrame scale={1.06}>
                    <Image
                      src={photo}
                      alt={dish.name}
                      fill
                      loading="eager"
                      decoding="async"
                      quality={78}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"
                      placeholder="blur"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </HoverScaleFrame>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <DietaryMark type={dish.dietary} />
                        <h3 className="text-[18px] font-semibold leading-snug text-[#0B0A09] transition-colors duration-200 group-hover:text-[#8C6200]">
                          {dish.name}
                        </h3>
                      </div>
                      <span className="text-[16px] font-semibold tabular-nums text-[#0B0A09] shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:text-[#8C6200]">
                        {formatINR(dish.price)}
                      </span>
                    </div>

                    {dish.description.length > 0 && (
                      <p className="mt-3 pl-[24px] text-[14px] leading-relaxed text-[#46423D]">
                        {dish.description}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#D99B00] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </motion.li>
            );
          })}
        </ul>

        <RevealBlock delay={0.1} className="mt-12 lg:mt-14 flex justify-center">
          <TicketButton href="/menu" variant="ink">
            See all {MENU_ITEMS.length} menu items
          </TicketButton>
        </RevealBlock>
      </div>
    </section>
  );
}
