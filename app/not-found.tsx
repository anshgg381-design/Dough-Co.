import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between text-[#0B0A09]">
      <SiteHeader solidDefault />
      <main className="flex-1 flex items-center justify-center px-5 lg:px-8 pt-[124px] pb-20">
        <div className="w-full max-w-[560px] border border-[#0B0A09] bg-[#FFFFFF] p-8 sm:p-12 text-center">
          <p className="font-script font-semibold text-[32px] leading-none text-[#D99B00]">
            404
          </p>
          <h1 className="mt-2 font-display text-[44px] sm:text-[56px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#0B0A09]">
            PAGE NOT FOUND
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#46423D]">
            The page you are looking for is not on our menu. Head back to our
            home page or browse all dishes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-[#0B0A09] bg-[#0B0A09] px-6 py-3 text-[14px] font-semibold tracking-[0.04em] text-[#FFFFFF] transition-colors duration-200 hover:bg-[#F5C300] hover:text-[#0B0A09]"
            >
              Back home
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center border border-[#0B0A09] bg-[#FFFFFF] px-6 py-3 text-[14px] font-semibold tracking-[0.04em] text-[#0B0A09] transition-colors duration-200 hover:bg-[#0B0A09] hover:text-[#FFFFFF]"
            >
              View menu
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter isSubpage />
    </div>
  );
}
