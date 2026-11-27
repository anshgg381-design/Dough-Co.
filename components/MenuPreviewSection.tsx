'use client';

import Image, { type StaticImageData } from 'next/image';
import { MENU_ITEMS, type MenuCategory } from '@/data/menu';
import { siteImages } from '@/data/images';
import {
  ArchitecturalRule,
  HoverScaleFrame,
  ParallaxFrame,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

interface EditorialSplitRow {
  category: MenuCategory;
  script: string;
  title: string;
  countLabel: string;
  summary: string;
  ctaLabel: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition: string;
  photoOnRight: boolean;
}

const PIZZA_COUNT = MENU_ITEMS.filter((i) => i.category === 'pizzas').length;
const PASTA_COUNT = MENU_ITEMS.filter((i) => i.category === 'pastas').length;
const TACO_COUNT = MENU_ITEMS.filter((i) => i.category === 'tacos').length;
const DRINK_COUNT = MENU_ITEMS.filter((i) => i.category === 'drinks').length;

const SPLIT_ROWS: readonly EditorialSplitRow[] = [
  {
    category: 'pizzas',
    script: 'Wood-fired',
    title: 'PIZZA',
    countLabel: `${PIZZA_COUNT} dishes on the menu`,
    summary:
      'From Queen Margherita and Burrata Margherita to Chipotle Paneer and Chicken Pepperoni, baked fresh to order.',
    ctaLabel: 'See pizza',
    image: siteImages.heroPizza,
    imageAlt: 'Napoli pizza from Dough & Co.',
    objectPosition: 'object-center',
    photoOnRight: false,
  },
  {
    category: 'pastas',
    script: 'Freshly sauced',
    title: 'PASTA',
    countLabel: `${PASTA_COUNT} pasta & large plates`,
    summary:
      'Truffle Wild Mushroom Spaghetti, Penne Alfredo, Chicken Bolognese, Spinach Ricotta Ravioli and Classic Lasagne.',
    ctaLabel: 'See pasta',
    image: siteImages.truffleMushroomSpaghetti,
    imageAlt: 'Truffle Wild Mushroom Spaghetti Pasta from Dough & Co.',
    objectPosition: 'object-center',
    photoOnRight: true,
  },
  {
    category: 'tacos',
    script: 'Bold Mexican',
    title: 'TACOS',
    countLabel: `${TACO_COUNT} Mexican dishes`,
    summary:
      'Tacos, quesadillas, burritos and fajita plates served across our vegetarian and non-vegetarian kitchen sections.',
    ctaLabel: 'See tacos',
    image: siteImages.tableSetting,
    imageAlt: 'Table setting with chilli oil at Dough & Co.',
    objectPosition: 'object-center',
    photoOnRight: false,
  },
  {
    category: 'drinks',
    script: 'From the bar',
    title: 'COFFEE & DRINKS',
    countLabel: `${DRINK_COUNT} coffees and drinks`,
    summary:
      'Espresso classics, iced coffees, matcha, cold brews, shakes and house refreshers poured all day from our coffee bar.',
    ctaLabel: 'See coffee & drinks',
    image: siteImages.interiorBar,
    imageAlt: 'Espresso machine and coffee bar counter at Dough & Co.',
    objectPosition: 'object-[22%_58%]',
    photoOnRight: true,
  },
];

export default function MenuPreviewSection() {
  return (
    <section
      id="menu-highlights"
      aria-label="Menu highlights by category"
      className="mx-auto max-w-[1392px] px-3 lg:px-6 pt-12 lg:pt-16 pb-[72px] lg:pb-[112px] scroll-mt-[84px]"
    >
      {/* Signature lepainquotidien.com 50/50 sharp hairline-bordered editorial split grid */}
      <div className="border-t border-l border-r border-[#0B0A09] bg-[#FFFFFF]">
        {SPLIT_ROWS.map((row) => (
          <div
            key={row.category}
            data-testid={`menu-split-${row.category}`}
            className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#0B0A09]"
          >
            {/* Full-bleed photographic half with scroll parallax + Framer Motion hover scale */}
            <div
              className={`relative min-h-[340px] sm:min-h-[460px] lg:min-h-[560px] overflow-hidden border-b lg:border-b-0 border-[#0B0A09] ${
                row.photoOnRight
                  ? 'lg:order-2 lg:border-l border-[#0B0A09]'
                  : 'lg:order-1 lg:border-r border-[#0B0A09]'
              }`}
            >
              <HoverScaleFrame scale={1.045}>
                <ParallaxFrame className="w-full h-full min-h-[340px] sm:min-h-[460px] lg:min-h-[560px] bg-[#1A1816]">
                  <Image
                    src={row.image}
                    alt={row.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    referrerPolicy="no-referrer"
                    className={`object-cover ${row.objectPosition}`}
                  />
                </ParallaxFrame>
              </HoverScaleFrame>
            </div>

            {/* Pure white centered editorial copy half */}
            <div
              className={`flex flex-col items-center justify-center text-center px-7 py-14 sm:px-14 sm:py-20 lg:px-20 ${
                row.photoOnRight ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <ScriptOverlapHeading
                script={row.script}
                title={row.title}
                align="center"
              />

              <div className="mt-5 w-16">
                <ArchitecturalRule className="bg-[#0B0A09]/25" delay={0.12} />
              </div>

              <RevealBlock
                delay={0.08}
                className="mt-4 flex flex-col items-center"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] tabular-nums text-[#8C6200]">
                  {row.countLabel}
                </p>

                <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#46423D] max-w-[42ch]">
                  {row.summary}
                </p>

                <div className="mt-8">
                  <TicketButton
                    href={`/menu?category=${row.category}`}
                    variant="ink"
                  >
                    {row.ctaLabel}
                  </TicketButton>
                </div>
              </RevealBlock>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
