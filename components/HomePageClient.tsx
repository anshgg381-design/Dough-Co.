'use client';

import { MotionConfig } from 'motion/react';
import {
  EditorialMarquee,
  StaggeredSection,
  StaggeredSectionGroup,
} from '@/components/MotionPrimitives';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import MenuPreviewSection from '@/components/MenuPreviewSection';
import FeaturedDishesSection from '@/components/FeaturedDishesSection';
import HalfAndHalfSection from '@/components/HalfAndHalfSection';
import OurSpaceSection from '@/components/OurSpaceSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import InstagramFeedSection from '@/components/InstagramFeedSection';
import ReserveSection from '@/components/ReserveSection';
import VisitSection from '@/components/VisitSection';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';

const MARQUEE_ITEMS = [
  'WOOD-FIRED NAPOLI PIZZA',
  'FRESH PASTA',
  'MEXICAN TACOS',
  'ESPRESSO & COFFEE BAR',
  'HALF & HALF PIZZAS',
  'MODEL TOWN, PANIPAT',
] as const;

export default function HomePageClient() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-[#0B0A09]">
        <ScrollProgressBar />
        <SiteHeader />
        <main>
          <HeroSection />
          <StaggeredSectionGroup>
            <StaggeredSection initialReveal>
              <EditorialMarquee items={MARQUEE_ITEMS} />
            </StaggeredSection>
            <StaggeredSection initialReveal>
              <MenuPreviewSection />
            </StaggeredSection>
            <StaggeredSection>
              <FeaturedDishesSection />
            </StaggeredSection>
            <StaggeredSection>
              <HalfAndHalfSection />
            </StaggeredSection>
            <StaggeredSection>
              <OurSpaceSection />
            </StaggeredSection>
            <StaggeredSection>
              <CustomerReviewsSection />
            </StaggeredSection>
            <StaggeredSection>
              <InstagramFeedSection />
            </StaggeredSection>
            <StaggeredSection>
              <ReserveSection />
            </StaggeredSection>
            <StaggeredSection>
              <VisitSection />
            </StaggeredSection>
          </StaggeredSectionGroup>
        </main>
        <SiteFooter />
        <MobileActionBar />
      </div>
    </MotionConfig>
  );
}
