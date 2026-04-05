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
      imageUrl: 'https://images.unsplash.com/photo-1631815588090-d1bcbe9a8537?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      platform: 'Amazon India',
    },
    {
      id: 'h3',
      name: 'Pulse Oximeter',
      description: 'Medical-grade SpO2 and heart rate monitor for home use.',
      price: '₹599',
      commission: '5%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: 'https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop',
      platform: 'Amazon India',
    },
    {
      id: 'n3',
      name: 'Food Scale (Digital)',
      description: 'Precision digital kitchen scale for portion control.',
      price: '₹399',
      commission: '6%',
      affiliateUrl: 'https://amzn.to/YOUR_LINK',
      imageUrl: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=400&h=300&fit=crop',
      platform: 'Amazon India',
    },
    {
      id: 'm3',
      name: 'Calm Premium — Annual',
      description: 'Sleep stories, meditation, and relaxation exercises.',
      price: '₹2,999/year',
      commission: '20%',
      affiliateUrl: 'https://www.calm.com/YOUR_AFFILIATE_LINK',
      imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
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
