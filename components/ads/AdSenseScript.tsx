// components/ads/AdSenseScript.tsx
// Add this to your root layout.tsx or _app.tsx
//
// Usage: <AdSenseScript />
// Place inside <head> or at the top of your layout

import Script from 'next/script';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
// Set this in your .env.local:
// NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

export default function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) {
    console.warn('AdSense client ID not configured. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local');
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
