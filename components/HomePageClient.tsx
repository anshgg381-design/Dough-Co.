'use client';

import { MotionConfig } from 'motion/react';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import MenuPreviewSection from '@/components/MenuPreviewSection';
import FeaturedDishesSection from '@/components/FeaturedDishesSection';
import HalfAndHalfSection from '@/components/HalfAndHalfSection';
import OurSpaceSection from '@/components/OurSpaceSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import ReserveSection from '@/components/ReserveSection';
import VisitSection from '@/components/VisitSection';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';

export default function HomePageClient() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-[#0B0A09]">
        <ScrollProgressBar />
        <SiteHeader />
        <main>
          <HeroSection />
          <MenuPreviewSection />
          <FeaturedDishesSection />
          <HalfAndHalfSection />
          <OurSpaceSection />
          <CustomerReviewsSection />
          <ReserveSection />
          <VisitSection />
        </main>
        <SiteFooter />
        <MobileActionBar />
      </div>
    </MotionConfig>
  );
}
