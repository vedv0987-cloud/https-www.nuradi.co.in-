// components/subscription/PricingCard.tsx
// Subscription pricing cards — use on /pricing page
//
// Usage:
//   <PricingCards />

'use client';

import { useState } from 'react';
import { PLANS, SubscriptionPlan, openRazorpayCheckout } from '@/lib/razorpay';

export default function PricingCards() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (plan.id === 'free') return;

    setLoading(plan.id);

    // TODO: Replace with actual user data from your auth system
    const userEmail = 'user@example.com';
    const userName = 'User';

    await openRazorpayCheckout({
      plan,
      userEmail,
      userName,
      onSuccess: (paymentId, orderId) => {
        setLoading(null);
        // Redirect to success page or update UI
        window.location.href = `/subscription/success?payment_id=${paymentId}`;
      },
      onFailure: (error) => {
        setLoading(null);
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      },
    });
  };

  const visiblePlans = PLANS.filter((plan) => {
    if (plan.id === 'free') return true;
    if (billingCycle === 'monthly') return plan.period === 'monthly';
    if (billingCycle === 'yearly') return plan.period === 'yearly';
    return true;
  });

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
          Upgrade to Pro
        </h2>
        <p style={{ fontSize: 16, color: '#888', marginTop: 8 }}>
          Unlock structured learning, progress tracking, and an ad-free experience
        </p>

        {/* Billing Toggle */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(128,128,128,0.1)',
            borderRadius: 12,
            padding: 4,
            marginTop: 20,
            gap: 4,
          }}
        >
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                background: billingCycle === cycle ? '#fff' : 'transparent',
                color: billingCycle === cycle ? '#111' : '#888',
                boxShadow: billingCycle === cycle ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {cycle === 'monthly' ? 'Monthly' : 'Annual'}
              {cycle === 'yearly' && (
                <span
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 4,
                    marginLeft: 6,
                    fontWeight: 700,
                  }}
                >
                  SAVE 44%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {visiblePlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              borderRadius: 16,
              border: plan.popular
                ? '2px solid #3b82f6'
                : '1px solid rgba(128,128,128,0.15)',
              padding: '28px 24px',
              position: 'relative',
              background: 'var(--card-bg, #fff)',
              boxShadow: plan.popular ? '0 8px 30px rgba(59,130,246,0.12)' : 'none',
            }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#3b82f6',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Most Popular
              </div>
            )}

            {/* Plan Name */}
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>
              {plan.name}
            </h3>

            {/* Price */}
            <div style={{ margin: '16px 0' }}>
              <span style={{ fontSize: 36, fontWeight: 800 }}>{plan.displayPrice}</span>
              {plan.price > 0 && (
                <span style={{ fontSize: 14, color: '#888', marginLeft: 4 }}>
                  /{plan.period === 'monthly' ? 'month' : 'year'}
                </span>
              )}
              {plan.savings && (
                <div
                  style={{
                    fontSize: 13,
                    color: '#10b981',
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {plan.savings}
                </div>
              )}
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    fontSize: 14,
                    color: '#555',
                    marginBottom: 10,
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      color: plan.price > 0 ? '#3b82f6' : '#10b981',
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={plan.id === 'free' || loading === plan.id}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 12,
                border: plan.price > 0 ? 'none' : '1px solid rgba(128,128,128,0.2)',
                background: plan.popular ? '#3b82f6' : plan.price > 0 ? '#111' : 'transparent',
                color: plan.price > 0 ? '#fff' : '#888',
                fontSize: 15,
                fontWeight: 600,
                cursor: plan.id === 'free' ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading === plan.id ? 0.7 : 1,
              }}
            >
              {loading === plan.id
                ? 'Processing...'
                : plan.id === 'free'
                ? 'Current Plan'
                : 'Get Pro Access'}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Signals */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 32,
          fontSize: 13,
          color: '#999',
        }}
      >
        <p>Secure payment via Razorpay • Cancel anytime • 7-day money-back guarantee</p>
      </div>
    </div>
  );
}
