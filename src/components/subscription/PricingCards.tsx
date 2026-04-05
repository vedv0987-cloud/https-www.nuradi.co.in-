"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, X, Lock } from "lucide-react";
import { PLANS, SubscriptionPlan, startCashfreeCheckout } from "@/lib/cashfree";
import { cn } from "@/lib/utils";

export default function PricingCards() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [error, setError] = useState("");
  const [modalPlan, setModalPlan] = useState<SubscriptionPlan | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openCheckoutModal = (plan: SubscriptionPlan) => {
    if (plan.id === "free") return;
    setModalPlan(plan);
    setError("");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalPlan) return;

    setLoading(modalPlan.id);
    setError("");

    await startCashfreeCheckout({
      plan: modalPlan,
      userEmail: email.trim().toLowerCase(),
      userName: name.trim() || undefined,
      userPhone: phone.trim() || undefined,
      onFailure: (err) => {
        setLoading(null);
        setError(err.message || "Checkout failed. Please try again.");
      },
    });
  };

  const visiblePlans = PLANS.filter((plan) => {
    if (plan.id === "free") return true;
    if (billingCycle === "monthly") return plan.period === "monthly";
    if (billingCycle === "yearly") return plan.period === "yearly";
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mb-4 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          NuradiHealth Pro
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Upgrade to Pro
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Unlimited HealthBot AI, structured learning, progress tracking, and an ad-free experience.
        </p>

        <div className="inline-flex bg-gray-100 rounded-full p-1 mt-8 gap-1">
          {(["monthly", "yearly"] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                billingCycle === cycle
                  ? "bg-white shadow-sm text-[#1a1a1a]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {cycle === "monthly" ? "Monthly" : "Annual"}
              {cycle === "yearly" && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Save 16%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {visiblePlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative rounded-3xl p-8 transition-all",
              plan.popular
                ? "bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] shadow-2xl shadow-black/10 scale-[1.02]"
                : "bg-white text-[#1a1a1a] border-2 border-gray-100 hover:border-gray-300"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-lg font-bold">{plan.name}</h3>

            <div className="mt-4 mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">{plan.displayPrice}</span>
                {plan.price > 0 && (
                  <span className={cn("text-sm", plan.popular ? "text-white/60" : "text-gray-400")}>
                    /{plan.period === "monthly" ? "month" : "year"}
                  </span>
                )}
              </div>
              {plan.savings && (
                <div className="mt-2 text-sm font-semibold text-emerald-400">
                  {plan.savings}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <Check
                    className={cn(
                      "w-4 h-4 flex-shrink-0 mt-0.5",
                      plan.popular ? "text-emerald-400" : "text-[#1a1a1a]"
                    )}
                    strokeWidth={3}
                  />
                  <span className={plan.popular ? "text-white/90" : "text-gray-700"}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => openCheckoutModal(plan)}
              disabled={plan.id === "free" || loading === plan.id}
              className={cn(
                "w-full py-3.5 rounded-full text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                plan.popular
                  ? "bg-white text-[#1a1a1a] hover:bg-gray-100"
                  : plan.price > 0
                  ? "bg-[#1a1a1a] text-white hover:bg-black"
                  : "bg-gray-100 text-gray-600 cursor-default"
              )}
            >
              {loading === plan.id
                ? "Redirecting to checkout..."
                : plan.id === "free"
                ? "Current Plan"
                : "Get Pro Access \u2192"}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-xs text-gray-400 space-y-1">
        <p>Secure payment via Cashfree (UPI \u00B7 cards \u00B7 netbanking \u00B7 wallets) \u00B7 Cancel anytime</p>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-black tracking-tight text-center mb-8">
          Compare Features
        </h3>
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Feature</th>
                <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Free</th>
                <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] bg-gray-50">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-3.5 text-gray-700">{row.feature}</td>
                  <td className="px-6 py-3.5 text-center text-gray-500">
                    {row.free === true ? (
                      <Check className="w-4 h-4 text-gray-400 mx-auto" />
                    ) : row.free === false ? (
                      <span className="text-gray-300">\u2014</span>
                    ) : (
                      <span className="text-xs text-gray-500">{row.free}</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-center bg-gray-50 font-semibold text-[#1a1a1a]">
                    {row.pro === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" strokeWidth={3} />
                    ) : (
                      <span className="text-xs">{row.pro}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ / Final CTA */}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-black tracking-tight mb-4">Still have questions?</h3>
        <p className="text-gray-600 mb-6">
          Try Pro risk-free with our 7-day money-back guarantee. Cancel anytime, no questions asked.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-left">
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Can I cancel anytime?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">Yes. Cancel with one click from your account. No lock-in, no hidden fees.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">What payment methods are accepted?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">UPI, all major credit/debit cards, net banking, and wallets via Cashfree.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Is my payment secure?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">Absolutely. All payments are processed by Cashfree Payments \u2014 PCI DSS Level 1 certified.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Will there be a free trial?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">We offer a 7-day money-back guarantee \u2014 effectively a free trial with full access.</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {modalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm" onClick={() => !loading && setModalPlan(null)}>
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !loading && setModalPlan(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              disabled={!!loading}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3 h-3" />
              Secure Checkout
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-1">{modalPlan.name}</h3>
            <p className="text-3xl font-black text-[#1a1a1a] mb-6">
              {modalPlan.displayPrice}
              <span className="text-sm font-normal text-gray-400 ml-1">
                /{modalPlan.period === "monthly" ? "month" : "year"}
              </span>
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors"
                  disabled={!!loading}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors"
                  disabled={!!loading}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone (for payment)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors"
                  disabled={!!loading}
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={!email.includes("@") || !!loading}
                className="w-full py-3.5 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Redirecting to payment..." : "Proceed to Payment \u2192"}
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                You&apos;ll be redirected to Cashfree&apos;s secure payment page.<br />
                Pay with UPI, cards, netbanking, or wallets.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const COMPARISON_ROWS: Array<{ feature: string; free: boolean | string; pro: boolean | string }> = [
  { feature: "Browse 1,000+ health videos", free: true, pro: true },
  { feature: "28 verified creators", free: true, pro: true },
  { feature: "Basic tools (BMI, Breathing)", free: true, pro: true },
  { feature: "Symptom Checker", free: true, pro: true },
  { feature: "First Aid Guide", free: true, pro: true },
  { feature: "Home Remedies library", free: true, pro: true },
  { feature: "HealthBot AI messages", free: "10/day", pro: "Unlimited" },
  { feature: "Disease Infographics (120 cards)", free: "Preview only", pro: "Full access" },
  { feature: "Biological Age Calculator", free: false, pro: true },
  { feature: "Gut Health Score", free: false, pro: true },
  { feature: "Sleep Score Calculator", free: false, pro: true },
  { feature: "Mood & Stress Tracker", free: false, pro: true },
  { feature: "Structured Learning Paths", free: false, pro: true },
  { feature: "Progress tracking & streaks", free: false, pro: true },
  { feature: "Completion certificates", free: false, pro: true },
  { feature: "Daily Dose (personalized)", free: false, pro: true },
  { feature: "Ad-free experience", free: false, pro: true },
  { feature: "Priority email support", free: false, pro: true },
  { feature: "Annual health review", free: false, pro: "Yearly plan only" },
];
