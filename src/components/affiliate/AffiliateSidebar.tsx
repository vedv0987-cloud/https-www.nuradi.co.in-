// components/affiliate/AffiliateSidebar.tsx
// Shows contextual product recommendations on video detail pages
//
// Usage:
//   <AffiliateSidebar category="fitness" />
//   <AffiliateSidebar category="mental-health" maxProducts={3} />

'use client';

import { getProductsForCategory, AffiliateProduct } from '@/lib/affiliateMap';
import AffiliateCard from './AffiliateCard';

interface AffiliateSidebarProps {
  category: string;          // Video category slug: "fitness", "mental-health", etc.
  maxProducts?: number;
  title?: string;
}

export default function AffiliateSidebar({
  category,
  maxProducts = 3,
  title = 'Recommended for You',
}: AffiliateSidebarProps) {
  const products = getProductsForCategory(category).slice(0, maxProducts);

  if (products.length === 0) return null;

  return (
    <aside
      style={{
        borderRadius: '16px',
        border: '1px solid rgba(128,128,128,0.12)',
        padding: '20px',
        background: 'var(--sidebar-bg, rgba(128,128,128,0.03))',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: 0,
            color: 'var(--text-primary, #111)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: '#999',
            margin: '4px 0 0',
          }}
        >
          Handpicked products related to this video
        </p>
      </div>

      {/* Product Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {products.map((product) => (
          <AffiliateCard
            key={product.id}
            product={product}
            source="video-sidebar"
            compact={true}
          />
        ))}
      </div>

      {/* Disclosure */}
      <p
        style={{
          fontSize: 10,
          color: '#bbb',
          marginTop: 14,
          lineHeight: 1.4,
          textAlign: 'center',
        }}
      >
        As an affiliate, we may earn a small commission at no extra cost to you.{' '}
        <a href="/affiliate-disclosure" style={{ color: '#999', textDecoration: 'underline' }}>
          Learn more
        </a>
      </p>
    </aside>
  );
}
