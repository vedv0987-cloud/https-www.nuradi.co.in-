// components/ads/InFeedAd.tsx
// Native ad that blends with your video card grid
//
// Usage: Insert this component every 4th item in your video grid
//
// Example in your Trending/Explore grid:
//   {videos.map((video, index) => (
//     <>
//       <VideoCard key={video.id} video={video} />
//       {(index + 1) % 4 === 0 && <InFeedAd key={`ad-${index}`} slot="YOUR_INFEED_SLOT" />}
//     </>
//   ))}

'use client';

import { useEffect, useRef } from 'react';

interface InFeedAdProps {
  slot: string;
  className?: string;
}

export default function InFeedAd({ slot, className = '' }: InFeedAdProps) {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isLoaded.current = true;
    } catch (error) {
      console.error('InFeedAd error:', error);
    }
  }, []);

  return (
    <div
      className={`in-feed-ad ${className}`}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(128, 128, 128, 0.05)',
        border: '1px solid rgba(128, 128, 128, 0.1)',
        padding: '8px',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: '9px',
          color: '#aaa',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '4px',
        }}
      >
        Sponsored
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"  // Google's in-feed layout key
      />
    </div>
  );
}
