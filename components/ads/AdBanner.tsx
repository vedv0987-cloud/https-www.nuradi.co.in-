// components/ads/AdBanner.tsx
// Reusable AdSense ad unit component
//
// Usage examples:
//   <AdBanner slot="1234567890" format="horizontal" />     → Leaderboard (below nav)
//   <AdBanner slot="1234567891" format="rectangle" />      → Sidebar (video pages)
//   <AdBanner slot="1234567892" format="in-feed" />        → Between video cards
//   <AdBanner slot="1234567893" format="anchor" />         → Mobile sticky bottom

'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;                                           // Your AdSense ad slot ID
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'in-feed' | 'anchor' | 'auto';
  className?: string;
  responsive?: boolean;
}

export default function AdBanner({
  slot,
  format = 'auto',
  className = '',
  responsive = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Prevent double-loading in React strict mode
    if (isLoaded.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isLoaded.current = true;
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Style mapping for different ad formats
  const formatStyles: Record<string, React.CSSProperties> = {
    horizontal: { display: 'block', width: '100%', height: '90px' },
    rectangle: { display: 'inline-block', width: '300px', height: '250px' },
    vertical: { display: 'inline-block', width: '160px', height: '600px' },
    'in-feed': { display: 'block', width: '100%' },
    anchor: { display: 'block', position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50 },
    auto: { display: 'block' },
  };

  // Map format to AdSense format attribute
  const adsenseFormat: Record<string, string> = {
    horizontal: 'horizontal',
    rectangle: 'rectangle',
    vertical: 'vertical',
    'in-feed': 'fluid',
    anchor: 'auto',
    auto: 'auto',
  };

  return (
    <div
      ref={adRef}
      className={`ad-container ${className}`}
      style={{ textAlign: 'center', overflow: 'hidden', margin: '16px 0' }}
    >
      {/* Subtle ad label for transparency */}
      <span
        style={{
          display: 'block',
          fontSize: '10px',
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '4px',
        }}
      >
        Advertisement
      </span>

      <ins
        className="adsbygoogle"
        style={formatStyles[format] || formatStyles.auto}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={adsenseFormat[format] || 'auto'}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
