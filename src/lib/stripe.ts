// Stripe integration for NuradiHealth Pro subscriptions
// Setup:
// 1. Sign up at https://dashboard.stripe.com
// 2. Get your publishable key (pk_...) and secret key (sk_...)
// 3. Add to .env.local:
//    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXX
//    STRIPE_SECRET_KEY=sk_live_XXXX

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;           // in paisa / cents (₹1499 = 149900 paisa)
  displayPrice: string;
  period: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
  savings?: string;
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    displayPrice: "₹0",
    period: "monthly",
    features: [
      "Browse all 1,000+ videos",
      "Basic health tools (BMI, Breathing)",
      "Browse categories & channels",
      "Weekly newsletter",
      "Limited HealthBot AI (10/day)",
    ],
  },
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: 149900,            // ₹1499
    displayPrice: "₹1,499",
    period: "monthly",
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited HealthBot AI",
      "Structured Learning Paths",
      "Progress tracking & streaks",
      "Completion certificates",
      "Ad-free experience",
      "Advanced health tools",
      "Daily Dose (personalized)",
      "Bookmark & notes on videos",
      "Priority email support",
    ],
  },
  {
    id: "pro_yearly",
    name: "Pro Annual",
    price: 1499900,           // ₹14,999
    displayPrice: "₹14,999",
    period: "yearly",
    savings: "Save ₹2,989/year",
    features: [
      "Everything in Pro Monthly",
      "16% cheaper than monthly",
      "Priority access to new features",
      "Exclusive health reports",
      "1-on-1 consultation credits (2/year)",
      "Annual health review",
    ],
  },
];

interface StripeCheckoutOptions {
  plan: SubscriptionPlan;
  userEmail: string;
  onFailure: (error: Error) => void;
}

/**
 * Start Stripe Checkout flow for a subscription plan.
 * Creates a Checkout Session server-side, then redirects to Stripe's hosted page.
 */
export async function startStripeCheckout({ plan, userEmail, onFailure }: StripeCheckoutOptions) {
  if (plan.id === "free") return;

  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: plan.id,
        email: userEmail,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      onFailure(new Error(data.error || "Failed to create checkout session"));
      return;
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (err) {
    onFailure(err instanceof Error ? err : new Error("Checkout failed"));
  }
}
