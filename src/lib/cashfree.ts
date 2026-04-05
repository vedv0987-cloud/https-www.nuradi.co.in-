// Cashfree Payment Gateway integration for NuradiHealth
// Docs: https://www.cashfree.com/docs/api-reference/payments/latest/orders
//
// Setup:
// 1. Sign up at https://merchant.cashfree.com
// 2. Get App ID + Secret Key
// 3. Add to .env.local:
//    CASHFREE_APP_ID=<app_id>
//    CASHFREE_SECRET_KEY=<secret_key>
//    CASHFREE_ENV=TEST (or PROD)

export type Tier = "free" | "pro" | "premium";

export interface SubscriptionPlan {
  id: string;
  tier: Tier;
  name: string;
  price: number;                  // in paisa (₹1 = 100 paisa)
  displayPrice: string;
  originalPrice?: number;          // crossed-out MRP
  originalDisplayPrice?: string;
  discountBadge?: string;          // e.g. "49% OFF"
  period: "monthly" | "yearly";
  durationDays: number;
  features: string[];
  popular?: boolean;
  savings?: string;
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    tier: "free",
    name: "Free",
    price: 0,
    displayPrice: "₹0",
    period: "monthly",
    durationDays: 0,
    features: [
      "Browse 1,000+ videos",
      "Basic tools (BMI, Breathing)",
      "HealthBot AI (10 messages/day)",
      "Browse categories & channels",
      "Weekly newsletter",
    ],
  },
  {
    id: "pro_monthly",
    tier: "pro",
    name: "Pro Monthly",
    price: 99900,                   // ₹999
    displayPrice: "₹999",
    period: "monthly",
    durationDays: 30,
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited HealthBot AI",
      "Structured Learning Paths",
      "Progress tracking & streaks",
      "Completion certificates",
      "Ad-free experience",
      "All advanced tools (Biological Age, Gut Health, Sleep Score)",
      "Mood & Stress Tracker",
      "Daily Dose (personalized)",
      "Bookmark & notes on videos",
      "Priority email support",
    ],
  },
  {
    id: "pro_yearly",
    tier: "pro",
    name: "Pro Annual",
    price: 999900,                  // ₹9,999
    displayPrice: "₹9,999",
    originalPrice: 1960000,         // ₹19,600
    originalDisplayPrice: "₹19,600",
    discountBadge: "49% OFF",
    period: "yearly",
    durationDays: 365,
    savings: "Save ₹9,601",
    features: [
      "Everything in Pro Monthly",
      "Best value — save ₹9,601",
      "Priority access to new features",
      "Exclusive health reports",
      "Annual health review (basic)",
    ],
  },
  {
    id: "premium_monthly",
    tier: "premium",
    name: "Premium Monthly",
    price: 299900,                  // ₹2,999
    displayPrice: "₹2,999",
    period: "monthly",
    durationDays: 30,
    features: [
      "Everything in Pro",
      "HealthBot AI priority queue (faster responses)",
      "Disease Infographics full suite (downloadable HD PDFs)",
      "VIP support (12-hour response SLA)",
      "Early access to beta features",
    ],
  },
  {
    id: "premium_yearly",
    tier: "premium",
    name: "Premium Annual",
    price: 2999900,                 // ₹29,999
    displayPrice: "₹29,999",
    originalPrice: 5899900,         // ₹58,999
    originalDisplayPrice: "₹58,999",
    discountBadge: "49% OFF",
    period: "yearly",
    durationDays: 365,
    savings: "Save ₹29,000",
    features: [
      "Everything in Premium Monthly",
      "4 one-on-one doctor consultations (per year)",
      "Enhanced Annual Health Review (comprehensive)",
      "Quarterly personal health reports",
      "Best value — save ₹29,000",
    ],
  },
];

export function getPlanById(id: string): SubscriptionPlan | undefined {
  return PLANS.find((p) => p.id === id);
}

/** Tier hierarchy check: returns true if userTier has access to requiredTier's features */
export function tierMeetsRequirement(userTier: Tier, requiredTier: Tier): boolean {
  const rank: Record<Tier, number> = { free: 0, pro: 1, premium: 2 };
  return rank[userTier] >= rank[requiredTier];
}

// ------------ CLIENT-SIDE CHECKOUT FLOW ------------

interface CashfreeCheckoutOptions {
  plan: SubscriptionPlan;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  couponCode?: string;
  onFailure: (error: Error) => void;
}

interface CashfreeDrop {
  checkout: (opts: { paymentSessionId: string; redirectTarget?: "_self" | "_blank" | "_modal" }) => Promise<{ error?: { message: string }; paymentDetails?: unknown; redirect?: boolean }>;
}

declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => CashfreeDrop;
  }
}

function loadCashfreeSDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Cashfree) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function startCashfreeCheckout({
  plan,
  userEmail,
  userName,
  userPhone,
  couponCode,
  onFailure,
}: CashfreeCheckoutOptions) {
  if (plan.tier === "free") return;

  try {
    const res = await fetch("/api/cashfree/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: plan.id,
        email: userEmail,
        name: userName,
        phone: userPhone,
        couponCode,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.paymentSessionId) {
      onFailure(new Error(data.error || "Failed to create payment order"));
      return;
    }

    try {
      localStorage.setItem("nuradi_checkout_email", userEmail);
      localStorage.setItem("nuradi_checkout_order_id", data.orderId);
      localStorage.setItem("nuradi_checkout_plan", plan.id);
    } catch {}

    const loaded = await loadCashfreeSDK();
    if (!loaded || !window.Cashfree) {
      onFailure(new Error("Failed to load payment SDK"));
      return;
    }

    const mode = data.env === "PROD" ? "production" : "sandbox";
    const cashfree = window.Cashfree({ mode });
    const result = await cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self",
    });

    if (result.error) {
      onFailure(new Error(result.error.message));
    }
  } catch (err) {
    onFailure(err instanceof Error ? err : new Error("Checkout failed"));
  }
}
