import type { Metadata } from 'next';
import { Antonio, Caveat, DM_Sans } from 'next/font/google';
import { siteConfig, buildRestaurantJsonLd } from '@/data/siteConfig';
import CustomCursor from '@/components/CustomCursor';
import MapsQuotaBanner from '@/components/MapsQuotaBanner';
import './globals.css';

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-antonio',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildRestaurantJsonLd();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${antonio.variable} ${caveat.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="plaster-canvas text-[#0B0A09] font-sans antialiased selection:bg-[#0B0A09] selection:text-[#F5C300]"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MapsQuotaBanner />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
