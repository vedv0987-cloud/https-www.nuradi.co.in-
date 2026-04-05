// components/affiliate/AffiliateDisclosure.tsx
// Legal disclosure — required by FTC and Indian Consumer Protection Act
//
// Usage:
//   Footer: <AffiliateDisclosure variant="footer" />
//   Page:   <AffiliateDisclosure variant="page" />

interface AffiliateDisclosureProps {
  variant?: 'footer' | 'page' | 'inline';
}

export default function AffiliateDisclosure({ variant = 'footer' }: AffiliateDisclosureProps) {
  if (variant === 'inline') {
    return (
      <span style={{ fontSize: 11, color: '#999', fontStyle: 'italic' }}>
        This page contains affiliate links. We may earn a commission at no extra cost to you.
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(128,128,128,0.05)',
          borderRadius: 8,
          fontSize: 11,
          color: '#888',
          lineHeight: 1.5,
          textAlign: 'center',
          margin: '16px 0',
        }}
      >
        <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you
        purchase through these links, we may earn a small commission at no additional cost to you.
        This helps us keep HealthEduTV free and running.{' '}
        <a href="/affiliate-disclosure" style={{ color: '#666', textDecoration: 'underline' }}>
          Full disclosure
        </a>
      </div>
    );
  }

  // Full page variant — use on /affiliate-disclosure page
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px', lineHeight: 1.8 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Affiliate Disclosure</h1>

      <p>
        HealthEduTV (nuradi.co.in) is a participant in several affiliate programs. This means that
        some of the links on our website are affiliate links — when you click on them and make a
        purchase, we may receive a small commission at no additional cost to you.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 28 }}>Programs We Participate In</h2>
      <p>
        We are affiliated with Amazon Associates (India), Headspace, MyProtein, Fitbit, and other
        health and wellness brands. Each program has its own commission structure and terms.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 28 }}>Our Promise</h2>
      <p>
        We only recommend products and services that we believe provide genuine value to our
        audience. Our editorial content is never influenced by affiliate partnerships. The health
        and education videos we curate are selected purely based on quality and credibility — not
        affiliate potential.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 28 }}>Medical Disclaimer</h2>
      <p>
        HealthEduTV provides curated health education content for informational purposes only. The
        content on this website is not intended to be a substitute for professional medical advice,
        diagnosis, or treatment. Always seek the advice of your physician or other qualified health
        provider with any questions you may have regarding a medical condition.
      </p>

      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>
        Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
}
