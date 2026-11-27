'use client';

import { MapPin, Phone, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function MobileActionBar() {
  return (
    <div
      data-testid="mobile-action-bar"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FFFFFF] border-t border-[#0B0A09]"
    >
      <div className="grid grid-cols-3 divide-x divide-[#0B0A09]">
        <a
          href={siteConfig.phone.href}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0B0A09] active:bg-[#FAF7F2]"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>

        <a
          href={siteConfig.links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0B0A09] active:bg-[#FAF7F2]"
        >
          <MapPin className="w-4 h-4" />
          <span>Directions</span>
        </a>

        <a
          href={siteConfig.links.zomato}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] bg-[#0B0A09] text-[#FFFFFF] active:bg-[#F5C300] active:text-[#0B0A09]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order</span>
        </a>
      </div>
    </div>
  );
}
