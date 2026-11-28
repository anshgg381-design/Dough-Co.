'use client';

import Image from 'next/image';
import { siteImages } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';
import {
  ArchitecturalRule,
  ParallaxFrame,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

export default function HalfAndHalfSection() {
  return (
    <section
      id="half-and-half"
      aria-labelledby="half-and-half-heading"
      className="relative overflow-hidden border-t border-[#0B0A09] bg-[#0B0A09] text-[#FFFFFF] scroll-mt-[84px]"
    >
      {/* Full-bleed dark wood-fired photography with scroll-scrubbed parallax */}
      <div className="absolute inset-0">
        <ParallaxFrame
          className="w-full h-full"
          scaleRange={[1.18, 1.06]}
          yRange={[-34, 34]}
        >
          <Image
            src={siteImages.heroPizza}
            alt="Wood-fired Napoli pizza at Dough & Co. available as Half & Half"
            fill
            loading="eager"
            decoding="async"
            quality={78}
            sizes="100vw"
            placeholder="blur"
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
        </ParallaxFrame>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#0B0A09]/62"
        />
      </div>

      {/* Centered LPQ cinematic statement break */}
      <div className="relative z-10 mx-auto max-w-[920px] px-5 lg:px-8 py-[96px] lg:py-[144px] text-center">
        <ScriptOverlapHeading
          id="half-and-half-heading"
          script="Two flavours, one pie"
          title="HALF & HALF"
          align="center"
          dark
        />

        <div className="mx-auto mt-6 w-20">
          <ArchitecturalRule className="bg-[#F5C300]" delay={0.12} />
        </div>

        <RevealBlock delay={0.1} className="mt-6 flex flex-col items-center">
          <p className="max-w-[46ch] text-[16px] sm:text-[18px] leading-relaxed text-[#FFFFFF]/90">
            Pair any two pizzas from our 20-pizza menu side by side on a single
            wood-fired base. Final price confirmed at order.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <TicketButton href="/menu?category=pizzas" variant="light">
              See all 20 pizzas
            </TicketButton>
            <TicketButton href={siteConfig.links.zomato} external variant="gold">
              Order on Zomato
            </TicketButton>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
