'use client';

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { MenuCategory } from '@/data/menu';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SiteHeader from '@/components/SiteHeader';
import FullMenuSection from '@/components/FullMenuSection';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';

interface MenuPageClientProps {
  initialCategory?: 'all' | MenuCategory;
}

export default function MenuPageClient({
  initialCategory = 'all',
}: MenuPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | MenuCategory>(
    initialCategory
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-[#0B0A09]">
        <ScrollProgressBar />
        <SiteHeader solidDefault />
        <main>
          <FullMenuSection
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            standalone
          />
        </main>
        <SiteFooter isSubpage />
        <MobileActionBar />
      </div>
    </MotionConfig>
  );
}
