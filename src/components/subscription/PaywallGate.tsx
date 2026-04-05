// components/subscription/PaywallGate.tsx
// Wraps premium content — shows upgrade CTA if user is not subscribed
//
// Usage:
//   <PaywallGate>
//     <LearningPathContent />
//   </PaywallGate>
//
//   <PaywallGate feature="certificates">
//     <CertificateDownload />
//   </PaywallGate>

'use client';

import { ReactNode } from 'react';

interface PaywallGateProps {
  children: ReactNode;
  isSubscribed?: boolean;           // Pass from your auth/subscription context
  feature?: string;                  // Name of the premium feature being gated
  previewLines?: number;            // How many lines of content to show as preview
}

// TODO: Replace this with your actual subscription check
// Example with NextAuth + database:
//   const { data: session } = useSession();
//   const isSubscribed = session?.user?.subscription?.status === 'active';

export default function PaywallGate({
  children,
  isSubscribed = false,             // Default to false — replace with your auth logic
  feature = 'Learning Paths',
  previewLines = 3,
}: PaywallGateProps) {
  // If user is subscribed, show content normally
  if (isSubscribed) {
    return <>{children}</>;
  }

  // Show blurred preview + upgrade CTA
  return (
    <div style={{ position: 'relative' }}>
      {/* Blurred preview of content */}
      <div
        style={{
          maxHeight: `${previewLines * 28}px`,
          overflow: 'hidden',
          filter: 'blur(4px)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(transparent 0%, var(--bg, #fff) 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 20,
        }}
      >
        {/* Upgrade CTA */}
        <div
          style={{
            textAlign: 'center',
            padding: '24px 32px',
            borderRadius: 16,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.05)',
            backdropFilter: 'blur(10px)',
            maxWidth: 400,
          }}
        >
          {/* Lock icon */}
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>

          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
            {feature} is a Pro Feature
          </h3>

          <p style={{ fontSize: 14, color: '#888', margin: '0 0 16px', lineHeight: 1.5 }}>
            Upgrade to Pro for structured learning, progress tracking,
            certificates, and an ad-free experience.
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <a
              href="/pricing"
              style={{
                padding: '10px 24px',
                borderRadius: 10,
                background: '#3b82f6',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Upgrade — ₹149/mo
            </a>
            <a
              href="/pricing"
              style={{
                padding: '10px 16px',
                borderRadius: 10,
                border: '1px solid rgba(128,128,128,0.2)',
                color: '#888',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              View Plans
            </a>
          </div>

          <p style={{ fontSize: 11, color: '#bbb', marginTop: 12 }}>
            7-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
