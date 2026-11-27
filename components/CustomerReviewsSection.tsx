'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CUSTOMER_REVIEWS } from '@/data/reviews';
import { siteImages } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';
import {
  EDITORIAL_EASE,
  HoverScaleFrame,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

export default function CustomerReviewsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      data-testid="customer-reviews-section"
      className="border-t border-[#0B0A09] bg-[#F5F2EB] py-[80px] lg:py-[124px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-12 lg:mb-16 flex flex-col items-center text-center">
          <ScriptOverlapHeading
            id="reviews-heading"
            script="Google reviews"
            title="WHAT OUR CUSTOMERS SAY"
            align="center"
          />
          <RevealBlock delay={0.08}>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#46423D] max-w-[46ch]">
              Notes and table photos from guests dining with us in Model Town.
            </p>
          </RevealBlock>
        </div>

        {/* Crisp 2x2 architectural hairline grid pairing Google reviews with real photos */}
        <div
          data-testid="customer-reviews-grid"
          className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-[#0B0A09] bg-[#FFFFFF]"
        >
          {CUSTOMER_REVIEWS.map((review, index) => {
            const photo = siteImages[review.photoKey];

            return (
              <motion.article
                key={review.id}
                data-testid="customer-review-card"
                initial={
                  prefersReduced
                    ? { opacity: 1 }
                    : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: prefersReduced ? 0 : 0.72,
                  delay: prefersReduced ? 0 : (index % 2) * 0.1,
                  ease: EDITORIAL_EASE,
                }}
                className="group border-r border-b border-[#0B0A09] bg-[#FFFFFF] flex flex-col transition-colors duration-300 hover:bg-[#FAF7F2]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#0B0A09] bg-[#EFE9DF]">
                  <HoverScaleFrame scale={1.045}>
                    <Image
                      src={photo}
                      alt={review.photoAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </HoverScaleFrame>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div
                        role="img"
                        aria-label={`${review.rating} out of 5 stars on Google`}
                        className="inline-flex items-center gap-1"
                      >
                        {Array.from({ length: review.rating }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            aria-hidden="true"
                            className="w-4 h-4 fill-[#D99B00] text-[#D99B00]"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46423D]">
                        {review.source} Review
                      </span>
                    </div>

                    <blockquote className="mt-4 text-[16px] sm:text-[17px] leading-[1.65] text-[#0B0A09]">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </div>

                  <footer className="pt-5 border-t border-[#0B0A09]/15 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <p className="text-[15px] font-semibold text-[#0B0A09]">
                        {review.author}
                      </p>
                      <p className="text-[13px] text-[#46423D]">
                        {review.visitContext}
                      </p>
                    </div>
                    <p className="text-[13px] font-medium text-[#8C6200]">
                      {review.ordered}
                    </p>
                  </footer>
                </div>
              </motion.article>
            );
          })}
        </div>

        <RevealBlock delay={0.1} className="mt-12 lg:mt-14 flex justify-center">
          <TicketButton href={siteConfig.links.maps} external variant="outline">
            Read more reviews on Google
          </TicketButton>
        </RevealBlock>
      </div>
    </section>
  );
}
