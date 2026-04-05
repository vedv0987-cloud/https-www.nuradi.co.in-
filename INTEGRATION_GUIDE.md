# QUICK INTEGRATION GUIDE
## Drop these components into your Next.js project

---

## Step 1: Install Dependencies

```bash
npm install razorpay
```

---

## Step 2: Copy Files

Copy the entire monetization-kit folder structure into your project:

```
your-project/
├── .env.local                          ← Copy from .env.example, fill in your keys
├── components/
│   ├── ads/
│   │   ├── AdSenseScript.tsx           ← Script loader
│   │   ├── AdBanner.tsx                ← Reusable ad unit
│   │   └── InFeedAd.tsx               ← Native ad for video grids
│   ├── affiliate/
│   │   ├── AffiliateCard.tsx           ← Product card
│   │   ├── AffiliateSidebar.tsx        ← Video page sidebar
│   │   └── AffiliateDisclosure.tsx     ← Legal disclosure
│   └── subscription/
│       ├── PricingCards.tsx             ← Pricing page
│       └── PaywallGate.tsx             ← Premium content gate
├── lib/
│   ├── affiliateMap.ts                 ← Product → category mapping
│   └── razorpay.ts                     ← Payment helper
└── pages/api/
    ├── create-subscription.ts          ← Order creation endpoint
    └── verify-payment.ts              ← Payment verification
```

---

## Step 3: Integration Points in Your Existing Pages

### layout.tsx (or _app.tsx) — Add AdSense Script
```tsx
import AdSenseScript from '@/components/ads/AdSenseScript';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
```

### Homepage (nuradi.co.in) — Add Ads Between Sections
```tsx
import AdBanner from '@/components/ads/AdBanner';
import InFeedAd from '@/components/ads/InFeedAd';

// Between "Trending Now" and "Browse Categories":
<AdBanner slot="YOUR_AD_SLOT_1" format="horizontal" />

// In the Trending video grid, every 4th card:
{videos.map((video, index) => (
  <>
    <VideoCard key={video.id} video={video} />
    {(index + 1) % 4 === 0 && <InFeedAd key={`ad-${index}`} slot="YOUR_INFEED_SLOT" />}
  </>
))}

// Between "Editor's Picks" and "AI-Powered Insights":
<AdBanner slot="YOUR_AD_SLOT_2" format="horizontal" />
```

### Video Detail Page (nuradi.co.in/video/[slug]) — Add Affiliate Sidebar
```tsx
import AffiliateSidebar from '@/components/affiliate/AffiliateSidebar';
import AdBanner from '@/components/ads/AdBanner';

// In the sidebar (right column):
<AffiliateSidebar category={video.category} />

// Below the video player:
<AdBanner slot="YOUR_AD_SLOT_3" format="rectangle" />
```

### Learning Paths Page — Add Paywall
```tsx
import PaywallGate from '@/components/subscription/PaywallGate';

// Wrap the learning path content:
<PaywallGate feature="Learning Paths" isSubscribed={user?.isPro}>
  <LearningPathContent path={path} />
</PaywallGate>
```

### New /pricing Page
```tsx
import PricingCards from '@/components/subscription/PricingCards';

export default function PricingPage() {
  return <PricingCards />;
}
```

### Footer — Add Affiliate Disclosure
```tsx
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

// In your existing footer component:
<AffiliateDisclosure variant="footer" />
```

---

## Step 4: Create AdSense Ad Slots

1. Go to https://www.google.com/adsense/
2. Create 4 ad units:
   - **Leaderboard** (728×90) → For horizontal banners between sections
   - **In-feed** (Fluid) → For native ads in video grids
   - **Medium Rectangle** (300×250) → For video page sidebar
   - **Anchor** (Auto) → For mobile sticky bottom
3. Copy each slot ID into your component usage

---

## Step 5: Sign Up for Affiliate Programs

**Priority order (based on your audience):**
1. **Amazon Associates India** — https://affiliate-program.amazon.in/
   - Covers fitness gear, books, supplements, electronics
   - 1-10% commission, 24hr cookie
   
2. **Headspace Affiliate** — Apply via Impact.com
   - Perfect for mental health category
   - Up to 25% commission
   
3. **MyProtein India** — Apply via Awin
   - Nutrition & fitness category
   - Up to 8% commission

4. **Fitbit Affiliate** — Apply via Impact.com
   - Fitness tracker recommendations
   - 3% commission

---

## Step 6: Revenue Tracking

Add Google Analytics events for:
- Ad impressions (automatic with AdSense)
- Affiliate link clicks (built into AffiliateCard component)
- Subscription conversions (built into Razorpay flow)

Track monthly: Total revenue, revenue per visitor, conversion rates

---

## Timeline to ₹30,000/month

| Week | Action | Expected Revenue |
|------|--------|-----------------|
| 1-2 | AdSense live | ₹200-500/week |
| 3-4 | Affiliate links active | ₹500-2,000/week |
| 5-8 | Subscriptions launched | ₹1,000-5,000/week |
| 12+ | All three optimized | ₹7,000-10,000/week |
