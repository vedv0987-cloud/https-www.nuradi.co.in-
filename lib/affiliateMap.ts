// lib/affiliateMap.ts
// Maps video categories to relevant affiliate products
// Update affiliate links with your actual tracking URLs

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  commission: string;
  affiliateUrl: string;
  imageUrl: string;
  platform: string;         // Amazon, Headspace, Fitbit, etc.
  badge?: string;            // "Best Seller", "Editor's Pick", etc.
}

// ──────────────────────────────────────────────
// CATEGORY → PRODUCT MAPPING
// ──────────────────────────────────────────────
// Replace all affiliate URLs with YOUR actual tracking links
// after signing up for each program.

export const affiliateProducts: Record<string, AffiliateProduct[]> = {

  // ── Health & Wellness ──────────────────────
  'health': [
    {
      id: 'h1',
      name: 'Omron Blood Pressure Monitor',
      description: 'Clinical-grade BP monitor recommended by doctors worldwide.',
      price: '₹1,899',
      commission: '6%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/omron-bp.jpg',
      platform: 'Amazon India',
      badge: 'Best Seller',
    },
    {
      id: 'h2',
      name: 'Dr. Vaidya\'s Immunity Kit',
      description: 'Ayurvedic immunity booster pack. 100% natural ingredients.',
      price: '₹699',
      commission: '10%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/immunity-kit.jpg',
      platform: 'Amazon India',
    },
    {
      id: 'h3',
      name: 'Pulse Oximeter',
      description: 'Medical-grade SpO2 and heart rate monitor for home use.',
      price: '₹599',
      commission: '5%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/oximeter.jpg',
      platform: 'Amazon India',
    },
  ],

  // ── Fitness & Exercise ─────────────────────
  'fitness': [
    {
      id: 'f1',
      name: 'Fitbit Charge 6',
      description: 'Advanced fitness tracker with heart rate, GPS, and sleep tracking.',
      price: '₹14,999',
      commission: '3%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/fitbit.jpg',
      platform: 'Amazon India',
      badge: 'Editor\'s Pick',
    },
    {
      id: 'f2',
      name: 'Boldfit Resistance Bands Set',
      description: 'Professional-grade bands for home workouts. 5 resistance levels.',
      price: '₹449',
      commission: '8%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/bands.jpg',
      platform: 'Amazon India',
      badge: 'Best Value',
    },
    {
      id: 'f3',
      name: 'Yoga Mat (Extra Thick 6mm)',
      description: 'Non-slip, eco-friendly yoga mat with alignment lines.',
      price: '₹799',
      commission: '7%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/yoga-mat.jpg',
      platform: 'Amazon India',
    },
  ],

  // ── Nutrition & Diet ───────────────────────
  'nutrition': [
    {
      id: 'n1',
      name: 'MyProtein Impact Whey',
      description: 'World\'s #1 whey protein. 21g protein per serving.',
      price: '₹1,499',
      commission: '8%',
      affiliateUrl: 'https://www.myprotein.co.in/YOUR_LINK',
      imageUrl: '/images/affiliates/myprotein.jpg',
      platform: 'MyProtein',
      badge: 'Top Rated',
    },
    {
      id: 'n2',
      name: 'Nutribullet Blender',
      description: 'High-speed nutrient extractor for smoothies and juices.',
      price: '₹4,499',
      commission: '5%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/nutribullet.jpg',
      platform: 'Amazon India',
    },
    {
      id: 'n3',
      name: 'Food Scale (Digital)',
      description: 'Precision digital kitchen scale for portion control.',
      price: '₹399',
      commission: '6%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/food-scale.jpg',
      platform: 'Amazon India',
    },
  ],

  // ── Mental Health ──────────────────────────
  'mental-health': [
    {
      id: 'm1',
      name: 'Headspace — 1 Year Plan',
      description: 'Guided meditation & mindfulness app. 500+ meditation sessions.',
      price: '₹799/year',
      commission: '25%',
      affiliateUrl: 'https://www.headspace.com/YOUR_AFFILIATE_LINK',
      imageUrl: '/images/affiliates/headspace.jpg',
      platform: 'Headspace',
      badge: 'Best for Beginners',
    },
    {
      id: 'm2',
      name: 'Gratitude Journal',
      description: '5-minute daily journal for mental wellness and mindfulness.',
      price: '₹349',
      commission: '7%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/journal.jpg',
      platform: 'Amazon India',
    },
    {
      id: 'm3',
      name: 'Calm Premium — Annual',
      description: 'Sleep stories, meditation, and relaxation exercises.',
      price: '₹2,999/year',
      commission: '20%',
      affiliateUrl: 'https://www.calm.com/YOUR_AFFILIATE_LINK',
      imageUrl: '/images/affiliates/calm.jpg',
      platform: 'Calm',
    },
  ],

  // ── Medical Education ──────────────────────
  'medical': [
    {
      id: 'md1',
      name: 'Life Line Health Screening',
      description: 'Preventive health screening packages. Early detection saves lives.',
      price: '$149',
      commission: '$90 CPA',
      affiliateUrl: 'https://www.lifelinescreening.com/YOUR_LINK',
      imageUrl: '/images/affiliates/lifeline.jpg',
      platform: 'Life Line Screening',
      badge: 'High Commission',
    },
    {
      id: 'md2',
      name: 'Visible Body — Anatomy Atlas',
      description: '3D anatomy learning app for medical students and enthusiasts.',
      price: '₹1,099',
      commission: '15%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/anatomy.jpg',
      platform: 'Amazon India',
    },
  ],

  // ── Science & Learning ─────────────────────
  'science': [
    {
      id: 's1',
      name: 'Brilliant.org Premium',
      description: 'Interactive STEM courses. Learn math, science, and CS.',
      price: '$24.99/mo',
      commission: '20%',
      affiliateUrl: 'https://brilliant.org/YOUR_LINK',
      imageUrl: '/images/affiliates/brilliant.jpg',
      platform: 'Brilliant',
      badge: 'Editor\'s Pick',
    },
    {
      id: 's2',
      name: 'National Geographic Microscope Kit',
      description: 'Dual LED student microscope with experiment accessories.',
      price: '₹2,999',
      commission: '4%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/microscope.jpg',
      platform: 'Amazon India',
    },
  ],

  // ── Personal Development ───────────────────
  'personal-dev': [
    {
      id: 'p1',
      name: 'Atomic Habits — James Clear',
      description: 'The #1 bestseller on building good habits and breaking bad ones.',
      price: '₹399',
      commission: '5%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: '/images/affiliates/atomic-habits.jpg',
      platform: 'Amazon India',
      badge: 'Best Seller',
    },
    {
      id: 'p2',
      name: 'Notion Premium',
      description: 'All-in-one workspace for notes, tasks, and life management.',
      price: '$10/mo',
      commission: '15%',
      affiliateUrl: 'https://notion.so/YOUR_LINK',
      imageUrl: '/images/affiliates/notion.jpg',
      platform: 'Notion',
    },
  ],
};

// ──────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────

/**
 * Get affiliate products for a given video category
 * Falls back to health products if category not found
 */
export function getProductsForCategory(category: string): AffiliateProduct[] {
  const key = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
  return affiliateProducts[key] || affiliateProducts['health'] || [];
}

/**
 * Get a single featured product for a category (for inline recommendations)
 */
export function getFeaturedProduct(category: string): AffiliateProduct | null {
  const products = getProductsForCategory(category);
  return products.find(p => p.badge) || products[0] || null;
}

/**
 * Track affiliate click (for your analytics)
 * Integrate with Google Analytics or your own tracking
 */
export function trackAffiliateClick(product: AffiliateProduct, source: string) {
  // Google Analytics event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      event_category: 'monetization',
      event_label: product.name,
      product_id: product.id,
      platform: product.platform,
      source: source,
    });
  }

  // You can also send to your own analytics endpoint
  // fetch('/api/track-click', { method: 'POST', body: JSON.stringify({ ... }) });
}
