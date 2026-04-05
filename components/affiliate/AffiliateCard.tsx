// components/affiliate/AffiliateCard.tsx
// Product recommendation card — place on video detail pages
//
// Usage:
//   <AffiliateCard product={product} source="video-sidebar" />

'use client';

import { AffiliateProduct, trackAffiliateClick } from '@/lib/affiliateMap';

interface AffiliateCardProps {
  product: AffiliateProduct;
  source?: string;           // tracking source: "sidebar", "in-content", "footer"
  compact?: boolean;         // compact mode for in-feed placement
}

export default function AffiliateCard({
  product,
  source = 'sidebar',
  compact = false,
}: AffiliateCardProps) {

  const handleClick = () => {
    trackAffiliateClick(product, source);
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid rgba(128,128,128,0.15)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: 'rgba(128,128,128,0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
          e.currentTarget.style.background = 'rgba(59,130,246,0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(128,128,128,0.15)';
          e.currentTarget.style.background = 'rgba(128,128,128,0.03)';
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{product.price}</div>
        </div>
        <span style={{ fontSize: 12, color: '#3b82f6', fontWeight: 500, whiteSpace: 'nowrap' }}>
          View →
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: '14px',
        border: '1px solid rgba(128,128,128,0.15)',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        background: 'var(--card-bg, #fff)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', paddingTop: '60%', background: '#f5f5f5' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              background: '#10b981',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '14px 16px' }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          {product.name}
        </h4>
        <p style={{ fontSize: 13, color: '#888', margin: '6px 0 0', lineHeight: 1.5 }}>
          {product.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary, #111)' }}>
            {product.price}
          </span>
          <span style={{ fontSize: 11, color: '#999' }}>via {product.platform}</span>
        </div>

        <button
          onClick={handleClick}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '10px 16px',
            borderRadius: 10,
            border: 'none',
            background: '#3b82f6',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
        >
          View Product →
        </button>
      </div>
    </div>
  );
}
