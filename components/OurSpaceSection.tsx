'use client';

import Image from 'next/image';
import { siteImages } from '@/data/images';
import {
  HoverScaleFrame,
  ParallaxFrame,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';

const SPACE_PHOTOS = [
  {
    src: siteImages.storefront,
    alt: 'Dough & Co. Pizzeria and Taqueria entrance in Model Town, Panipat',
    caption: 'Storefront · Model Town',
  },
  {
    src: siteImages.interiorBar,
    alt: 'Espresso bar and two-level dining room inside Dough & Co.',
    caption: 'Coffee Bar & Mezzanine',
  },
  {
    src: siteImages.diningCorner,
    alt: 'Banquette dining corner by the window at Dough & Co.',
    caption: 'Window Dining Corner',
  },
] as const;

export default function OurSpaceSection() {
  return (
    <section
      id="our-space"
      aria-labelledby="our-space-heading"
      className="border-t border-[#0B0A09] bg-[#FAF7F2] py-[80px] lg:py-[124px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <ScriptOverlapHeading
            id="our-space-heading"
            script="Model Town, Panipat"
            title="OUR SPACE"
            align="center"
          />
          <RevealBlock delay={0.08} className="mt-5">
            <p className="text-[16px] leading-relaxed text-[#46423D] max-w-[50ch]">
              230-R, Ground Floor, next to IDFC Bank — pizzas, pasta, tacos and
              coffee under one roof.
            </p>
          </RevealBlock>
        </div>

        {/* Sharp architectural 3-panel gallery with 1px hairline dividers + Framer Motion hover scale */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#0B0A09] bg-[#FFFFFF] divide-y md:divide-y-0 md:divide-x divide-[#0B0A09]">
          {SPACE_PHOTOS.map((photo, index) => (
            <figure key={photo.caption} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE6DC]">
                <HoverScaleFrame scale={1.045}>
                  <ParallaxFrame
                    className="w-full h-full"
                    scaleRange={[1.08, 1.0]}
                    yRange={index === 1 ? [-12, 12] : [-18, 18]}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </ParallaxFrame>
                </HoverScaleFrame>
              </div>
              <figcaption className="border-t border-[#0B0A09] px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0B0A09] text-center">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
