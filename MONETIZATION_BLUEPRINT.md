# HealthEduTV Monetization Blueprint
## 3-Stream Revenue Integration for Next.js

**Target:** ₹30,000+/month within 3–6 months → Sale valuation ₹7–15 lakhs

---

## Revenue Stream Overview

| Stream | Expected Monthly Revenue | Time to First ₹ | Effort |
|--------|-------------------------|------------------|--------|
| Google AdSense | ₹8,000–₹20,000 | 1–2 weeks | Low |
| Health Affiliate Links | ₹10,000–₹40,000 | 2–4 weeks | Medium |
| Learning Path Subscriptions | ₹15,000–₹50,000 | 4–8 weeks | High |

---

## STREAM 1: Google AdSense

### Placement Strategy (Health Content Sites)

**High-performing ad placements for video curation sites:**
1. **Leaderboard (728×90)** — Below navigation, above hero
2. **In-feed native ads** — Every 4th video card in trending/explore grids
3. **Sidebar (300×250)** — On video detail pages
4. **Anchor ad (mobile)** — Sticky bottom banner
5. **Between-section ads** — Between "Trending" and "Categories" sections

### Files to Create

```
components/
  ads/
    AdBanner.tsx          → Reusable ad unit component
    InFeedAd.tsx          → Native ad between video cards
    AdSenseScript.tsx     → Head script loader
```

### Key Rules
- Never place ads ON or directly overlapping video embeds (AdSense policy)
- Maximum 3 ad units per page on mobile, 5 on desktop
- Label affiliate sections distinctly from AdSense (policy compliance)
- Health content requires YMYL compliance — ensure "About" page has medical disclaimers

---

## STREAM 2: Health Affiliate Programs

### Recommended Programs for HealthEduTV

| Program | Commission | Cookie | Why It Fits |
|---------|-----------|--------|------------|
| **Amazon Associates** (India) | 1–10% | 24 hrs | Fitness equipment, books, supplements — universal |
| **Headspace** | Up to 25% | 30 days | Mental health category alignment |
| **Fitbit** | 3% | 15 days | Fitness & Exercise category |
| **MyProtein** (via Awin) | Up to 8% | 30 days | Nutrition & Diet category |
| **Market Health** | Up to 60% | 30 days | Health supplements, beauty |
| **NutriProfits** | Up to 40% | Lifetime | Supplements, wellness |
| **Life Line Screening** | $90 CPA | 60 days | Medical Education audience |
| **Vitamin Shoppe** | 1–10% | 7 days | Supplements, superfoods |
| **HealthyWage** | $50+ CPA | 30 days | Fitness challenge — engaging concept |

### Integration Strategy

**Context-aware affiliate placement:**
- Video about yoga → Affiliate links to yoga mats, blocks, Headspace
- Video about nutrition → Links to supplements, meal prep tools
- Video about fitness → Links to Fitbit, resistance bands, protein
- Video about mental health → Links to Headspace, therapy apps, journals

### Files to Create

```
components/
  affiliate/
    AffiliateCard.tsx        → Product recommendation card
    AffiliateSidebar.tsx     → Sidebar recommendations on video pages
    AffiliateDisclosure.tsx  → Legal disclosure component
lib/
  affiliateMap.ts            → Category-to-product mapping
```

---

## STREAM 3: Learning Path Subscriptions

### Pricing Strategy

| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | Browse all videos, basic health tools |
| Pro Monthly | ₹149/mo | Learning paths, progress tracking, certificates, ad-free |
| Pro Annual | ₹999/yr (₹83/mo) | Everything in monthly + exclusive content |

### What's Behind the Paywall
- **Learning Paths** (structured courses with progress tracking)
- **Certificates** (completion badges for courses)
- **Ad-free experience**
- **Advanced Health Tools** (detailed BMI insights, sleep tracker, meal planner)
- **Daily Dose** (personalized daily health briefing)
- **Bookmarks & Notes** on videos

### Payment Integration
- **Razorpay** — Best for Indian market (UPI, cards, wallets)
- Alternative: Stripe (for international users)

### Files to Create

```
components/
  subscription/
    PricingCard.tsx          → Pricing plan display
    PaywallGate.tsx          → Wraps premium content
    SubscriptionBadge.tsx    → Pro badge on user profile
lib/
  razorpay.ts               → Payment integration helper
  subscription.ts           → Plan checking utilities
pages/api/
  create-subscription.ts    → Razorpay subscription API
  verify-payment.ts         → Payment verification webhook
```

---

## Implementation Priority

### Week 1–2: AdSense (Quick Revenue)
1. Add AdSense script to `_app.tsx` or `layout.tsx`
2. Create `AdBanner` component
3. Place ads: below nav, in-feed (every 4th card), video page sidebar
4. Add anchor ad for mobile

### Week 3–4: Affiliate Links (Medium Revenue)
1. Sign up for Amazon Associates India + 2–3 health programs
2. Build affiliate product card component
3. Create category-to-product mapping
4. Add affiliate sidebar to video detail pages
5. Add disclosure footer

### Week 5–8: Subscriptions (Recurring Revenue)
1. Set up Razorpay account
2. Build pricing page
3. Add auth system (NextAuth.js)
4. Implement paywall gate for learning paths
5. Add progress tracking for premium users

---

## Legal Requirements

1. **Affiliate Disclosure** — Required by FTC/Indian Consumer Protection Act
2. **Privacy Policy** — Update for ad tracking cookies
3. **Terms of Service** — Add subscription terms
4. **Medical Disclaimer** — Critical for health content (YMYL)
5. **Cookie Consent Banner** — Required for AdSense compliance

---

## Revenue Tracking Dashboard

Track these KPIs monthly:
- **AdSense**: RPM (revenue per 1000 impressions), CTR, top pages
- **Affiliates**: Clicks, conversions, EPC (earnings per click)
- **Subscriptions**: MRR, churn rate, conversion rate (free→paid)
- **Overall**: Total revenue, revenue per visitor, growth rate
