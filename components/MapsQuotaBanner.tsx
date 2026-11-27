'use client';

import { useEffect, useState } from 'react';

let interceptorInstalled = false;

/**
 * Installs client-side Two-Tier Demo Key quota listeners (`window.gm_authFailure`
 * and `OverQuotaMapError` console tap) and displays a compact non-intrusive
 * top banner strictly when Google Maps quota is reached.
 */
export default function MapsQuotaBanner() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);

    if (!interceptorInstalled) {
      interceptorInstalled = true;

      const win = window as Window & { gm_authFailure?: () => void };
      const previousAuthFailure = win.gm_authFailure;
      win.gm_authFailure = () => {
        if (typeof previousAuthFailure === 'function') {
          previousAuthFailure();
        }
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      };

      const origError = console.error;
      console.error = (...args: unknown[]) => {
        origError.apply(console, args);
        const msg = args.map((a) => String(a)).join(' ');
        if (
          msg.includes('OverQuotaMapError') ||
          msg.includes('QuotaExceededError')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      };
    }

    return () => {
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
    };
  }, []);

  if (!quotaExceeded) {
    return null;
  }

  return (
    <div
      role="status"
      data-testid="gmp-quota-banner"
      className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm print:hidden"
    >
      <span>
        Google Maps Platform quota reached. If you are the app owner, visit{' '}
        <a
          href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-amber-950 hover:text-amber-800"
        >
          maps developer site
        </a>{' '}
        for instructions to update your account.
      </span>
    </div>
  );
}
