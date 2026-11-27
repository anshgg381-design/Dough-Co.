import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { parseMenuCategoryParam } from '@/lib/menu-utils';
import MenuPageClient from '@/components/MenuPageClient';

export const metadata: Metadata = {
  title: siteConfig.seo.menuTitle,
  description: siteConfig.seo.menuDescription,
};

interface MenuPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const initialCategory = parseMenuCategoryParam(params.category);
  return <MenuPageClient initialCategory={initialCategory} />;
}
