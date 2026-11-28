'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { siteImages } from '@/data/images';
import {
  EDITORIAL_EASE,
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
  const prefersReduced = useReducedMotion();

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

        {/* Sharp architectural 3-panel gallery with staggered entrance, scroll parallax & hover scale */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#0B0A09] bg-[#FFFFFF] divide-y md:divide-y-0 md:divide-x divide-[#0B0A09]">
          {SPACE_PHOTOS.map((photo, index) => (
            <motion.figure
              key={photo.caption}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: prefersReduced ? 0 : 0.68,
                delay: prefersReduced ? 0 : index * 0.1,
                ease: EDITORIAL_EASE,
              }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE6DC]">
                <HoverScaleFrame scale={1.05}>
                  <ParallaxFrame
                    className="w-full h-full"
                    scaleRange={[1.12, 1.04]}
                    yRange={index === 1 ? [-14, 14] : [-24, 24]}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading="eager"
                      decoding="async"
                      quality={78}
                      sizes="(max-width: 768px) 100vw, 420px"
                      placeholder="blur"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </ParallaxFrame>
                </HoverScaleFrame>
              </div>
              <figcaption className="border-t border-[#0B0A09] px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0B0A09] text-center transition-colors duration-200 group-hover:bg-[#FAF7F2] group-hover:text-[#8C6200]">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
