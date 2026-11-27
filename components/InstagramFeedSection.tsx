'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FALLBACK_INSTAGRAM_POSTS, type InstagramPost } from '@/data/instagram';
import { siteConfig } from '@/data/siteConfig';
import {
  EDITORIAL_EASE,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<readonly InstagramPost[]>(
    FALLBACK_INSTAGRAM_POSTS
  );
  const [source, setSource] = useState<'curated' | 'live' | 'fallback'>('curated');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    async function loadLatestPosts() {
      try {
        const res = await fetch('/api/instagram');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          setSource(data.source || 'live');
        }
      } catch {
        // Keep resilient fallback posts on any network anomaly
      }
    }
    loadLatestPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      data-testid="instagram-feed-section"
      className="border-t border-[#0B0A09] bg-[#FAF7F2] py-[80px] lg:py-[120px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1392px] px-3 lg:px-6">
        {/* Section header lockup */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center text-center">
          <ScriptOverlapHeading
            id="instagram-heading"
            script="Follow our table"
            title="LATEST ON INSTAGRAM"
            align="center"
          />

          <RevealBlock delay={0.08} className="mt-5 flex flex-col items-center">
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#46423D] max-w-[50ch]">
              Daily bakes, dining room scenes and fresh updates from{' '}
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0B0A09] underline underline-offset-4 transition-colors hover:text-[#8C6200]"
              >
                {siteConfig.instagram.handle}
              </a>{' '}
              in Model Town, Panipat.
            </p>

            {/* Subtle live feed status pill badge */}
            <div className="mt-4 inline-flex items-center gap-2 border border-[#0B0A09]/20 bg-[#FFFFFF] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B0A09]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E6B3A] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1E6B3A]" />
              </span>
              <span>
                {source === 'live' ? 'Live Instagram Feed' : 'Instagram Updates'} · {siteConfig.instagram.handle}
              </span>
            </div>
          </RevealBlock>
        </div>

        {/* 6-cell architectural hairline grid */}
        <div
          data-testid="instagram-feed-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#0B0A09] bg-[#FFFFFF]"
        >
          {posts.slice(0, 6).map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram post: ${post.caption.slice(0, 80)}...`}
              data-testid="instagram-post-card"
              data-cursor="view"
              data-cursor-label="INSTAGRAM"
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{
                duration: prefersReduced ? 0 : 0.65,
                delay: prefersReduced ? 0 : index * 0.06,
                ease: EDITORIAL_EASE,
              }}
              className="group relative aspect-square w-full overflow-hidden border-r border-b border-[#0B0A09] bg-[#1A1816] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D99B00]"
            >
              {/* Photo layer with smooth hover zoom */}
              <motion.div
                whileHover={prefersReduced ? undefined : { scale: 1.06 }}
                transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
                className="relative h-full w-full will-change-transform"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || 'Dough & Co. Instagram photo'}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0UxREJDRiIvPjwvc3ZnPg=="
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </motion.div>

              {/* Editorial dark scrim overlay appearing on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-[#0B0A09]/82 p-4 text-[#FFFFFF] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
              >
                <div className="flex items-center justify-between">
                  <Instagram className="h-4 w-4 text-[#F5C300]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5C300]">
                    {post.shortDate}
                  </span>
                </div>

                <p className="line-clamp-3 text-[11px] leading-snug text-[#FFFFFF]/90">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between border-t border-[#FFFFFF]/20 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]">
                  <span>{post.location || 'Model Town'}</span>
                  <ArrowUpRight className="h-3 w-3 text-[#F5C300] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom action bar */}
        <RevealBlock delay={0.12} className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#0B0A09] bg-[#FFFFFF] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-[#0B0A09] bg-[#FAF7F2] text-[#0B0A09]">
              <Instagram className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-[#0B0A09]">
                {siteConfig.instagram.handle}
              </p>
              <p className="text-[12px] text-[#46423D]">
                Tag us in your photos from Model Town
              </p>
            </div>
          </div>

          <TicketButton
            href={siteConfig.links.instagram}
            external
            variant="ink"
            className="px-6 py-2.5 text-[13px]"
          >
            Follow on Instagram
          </TicketButton>
        </RevealBlock>
      </div>
    </section>
  );
}
