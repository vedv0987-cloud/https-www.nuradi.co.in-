// Cashfree Payment Gateway integration for NuradiHealth Pro
// Docs: https://www.cashfree.com/docs/api-reference/payments/latest/orders
//
// Setup (user must do):
// 1. Sign up at https://merchant.cashfree.com
// 2. Get App ID + Secret Key (test or prod)
// 3. Add to .env.local:
//    CASHFREE_APP_ID=<app_id>
//    CASHFREE_SECRET_KEY=<secret_key>
//    CASHFREE_ENV=TEST (or PROD)

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;            // in paisa (₹1499 = 149900)
  displayPrice: string;
  period: "monthly" | "yearly";
  durationDays: number;     // subscription length
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
    durationDays: 0,
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
    price: 149900,            // ₹1,499
    displayPrice: "₹1,499",
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
    durationDays: 365,
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

export function getPlanById(id: string): SubscriptionPlan | undefined {
  return PLANS.find((p) => p.id === id);
}

// ------------ CLIENT-SIDE CHECKOUT FLOW ------------

interface CashfreeCheckoutOptions {
  plan: SubscriptionPlan;
  userEmail: string;
  userName?: string;
  userPhone?: string;
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

/**
 * Start Cashfree checkout flow for a subscription plan.
 * Creates order server-side, then opens Cashfree Drop hosted checkout.
 */
export async function startCashfreeCheckout({
  plan,
  userEmail,
  userName,
  userPhone,
  onFailure,
}: CashfreeCheckoutOptions) {
  if (plan.id === "free") return;

  try {
    // Step 1: Create order on our server
    const res = await fetch("/api/cashfree/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: plan.id,
        email: userEmail,
        name: userName,
        phone: userPhone,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.paymentSessionId) {
      onFailure(new Error(data.error || "Failed to create payment order"));
      return;
    }

    // Step 2: Persist email + orderId locally so success page can use them
    try {
      localStorage.setItem("nuradi_checkout_email", userEmail);
      localStorage.setItem("nuradi_checkout_order_id", data.orderId);
      localStorage.setItem("nuradi_checkout_plan", plan.id);
    } catch {}

    // Step 3: Load Cashfree Drop SDK
    const loaded = await loadCashfreeSDK();
    if (!loaded || !window.Cashfree) {
      onFailure(new Error("Failed to load payment SDK"));
      return;
    }

    // Step 4: Open Cashfree hosted checkout
    const mode = data.env === "PROD" ? "production" : "sandbox";
    const cashfree = window.Cashfree({ mode });
    const result = await cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self",
    });

    if (result.error) {
      onFailure(new Error(result.error.message));
    }
    // On success, Cashfree redirects to return_url automatically (_self)
  } catch (err) {
    onFailure(err instanceof Error ? err : new Error("Checkout failed"));
  }
}
