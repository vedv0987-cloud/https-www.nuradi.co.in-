// lib/razorpay.ts
// Razorpay integration helper for NuradiHealth Pro subscriptions
//
// Setup:
// 1. Sign up at https://dashboard.razorpay.com
// 2. Get your Key ID and Key Secret
// 3. Add to .env.local:
//    NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
//    RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX

// ──────────────────────────────────────────────
// SUBSCRIPTION PLANS
// ──────────────────────────────────────────────

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;           // in paisa (₹149 = 14900)
  displayPrice: string;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  savings?: string;
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    displayPrice: '₹0',
    period: 'monthly',
    features: [
      'Browse all 1,031+ videos',
      'Basic health tools (BMI, Breathing)',
      'Browse categories & channels',
      'Weekly newsletter',
    ],
  },
  {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    price: 14900,            // ₹149
    displayPrice: '₹149',
    period: 'monthly',
    popular: true,
    features: [
      'Everything in Free',
      'Structured Learning Paths',
      'Progress tracking & streaks',
      'Completion certificates',
      'Ad-free experience',
      'Advanced health tools',
      'Daily Dose (personalized)',
      'Bookmark & notes on videos',
    ],
  },
  {
    id: 'pro_yearly',
    name: 'Pro Annual',
    price: 99900,            // ₹999
    displayPrice: '₹999',
    period: 'yearly',
    savings: 'Save ₹789/year',
    features: [
      'Everything in Pro Monthly',
      '44% cheaper than monthly',
      'Priority access to new features',
      'Exclusive health reports',
    ],
  },
];

// ──────────────────────────────────────────────
// RAZORPAY CHECKOUT
// ──────────────────────────────────────────────

interface RazorpayCheckoutOptions {
  plan: SubscriptionPlan;
  userEmail: string;
  userName: string;
  onSuccess: (paymentId: string, orderId: string) => void;
  onFailure: (error: any) => void;
}

/**
 * Load Razorpay SDK dynamically
 */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Open Razorpay checkout for a subscription plan
 */
export async function openRazorpayCheckout({
  plan,
  userEmail,
  userName,
  onSuccess,
  onFailure,
}: RazorpayCheckoutOptions) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    onFailure(new Error('Failed to load Razorpay SDK'));
    return;
  }

  // Step 1: Create order on your backend
  const orderResponse = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      planId: plan.id,
      amount: plan.price,
      email: userEmail,
    }),
  });

  const orderData = await orderResponse.json();

  if (!orderData.orderId) {
    onFailure(new Error('Failed to create order'));
    return;
  }

  // Step 2: Open Razorpay checkout
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: plan.price,
    currency: 'INR',
    name: 'NuradiHealth',
    description: `${plan.name} Subscription`,
    order_id: orderData.orderId,
    prefill: {
      email: userEmail,
      name: userName,
    },
    theme: {
      color: '#3b82f6',
    },
    handler: function (response: any) {
      // Step 3: Verify payment on your backend
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.verified) {
            onSuccess(response.razorpay_payment_id, response.razorpay_order_id);
          } else {
            onFailure(new Error('Payment verification failed'));
          }
        });
    },
    modal: {
      ondismiss: function () {
        console.log('Checkout modal closed');
      },
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
}
