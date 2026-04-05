"use client";

import { useState, useMemo } from "react";
import { Check, Sparkles, Zap, X, Lock, Crown, Tag } from "lucide-react";
import { PLANS, SubscriptionPlan, startCashfreeCheckout } from "@/lib/cashfree";
import { validateCoupon, formatPaisa } from "@/lib/coupons";
import { cn } from "@/lib/utils";

export default function PricingCards() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [error, setError] = useState("");
  const [modalPlan, setModalPlan] = useState<SubscriptionPlan | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; description: string } | null>(null);
  const [couponError, setCouponError] = useState("");

  const openCheckoutModal = (plan: SubscriptionPlan) => {
    if (plan.tier === "free") return;
    setModalPlan(plan);
    setError("");
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const handleApplyCoupon = () => {
    const v = validateCoupon(couponInput);
    if (v.valid && v.code && v.description) {
      setAppliedCoupon({ code: v.code, discount: v.discount, description: v.description });
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError(v.error || "Invalid coupon");
    }
  };

  const finalPrice = useMemo(() => {
    if (!modalPlan) return 0;
    const base = modalPlan.price;
    if (!appliedCoupon) return base;
    return Math.round(base * (1 - appliedCoupon.discount));
  }, [modalPlan, appliedCoupon]);

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
      couponCode: appliedCoupon?.code,
      onFailure: (err) => {
        setLoading(null);
        setError(err.message || "Checkout failed. Please try again.");
      },
    });
  };

  // Get visible plans based on billing cycle
  const freePlan = PLANS.find((p) => p.tier === "free")!;
  const proPlan = PLANS.find((p) => p.tier === "pro" && p.period === billingCycle)!;
  const premiumPlan = PLANS.find((p) => p.tier === "premium" && p.period === billingCycle)!;
  const visiblePlans = [freePlan, proPlan, premiumPlan];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-bold mb-4 uppercase tracking-wider">
          <Tag className="w-3 h-3" />
          Launch offer: NuradiHealth25 for 25% OFF
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Choose Your Health Plan
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Start free. Upgrade anytime. Cancel anytime.
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
                  49% OFF
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

      {/* 3 plan cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {visiblePlans.map((plan) => {
          const isFree = plan.tier === "free";
          const isPro = plan.tier === "pro";
          const isPremium = plan.tier === "premium";
          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-3xl p-8 transition-all flex flex-col",
                isPremium
                  ? "bg-gradient-to-b from-[#1a1a1a] to-black text-white border-2 border-amber-400 shadow-2xl shadow-amber-500/20"
                  : isPro
                  ? "bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-xl"
                  : "bg-white text-[#1a1a1a] border-2 border-gray-100"
              )}
            >
              {isPro && plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </span>
                </div>
              )}
              {isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-white" />
                    Best Value
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold">{plan.name.replace(" Monthly", "").replace(" Annual", "")}</h3>

              <div className="mt-4 mb-6">
                {plan.originalDisplayPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-sm line-through", isPremium ? "text-white/40" : "text-gray-400")}>
                      {plan.originalDisplayPrice}
                    </span>
                    {plan.discountBadge && (
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.discountBadge}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">{plan.displayPrice}</span>
                  {plan.price > 0 && (
                    <span className={cn("text-sm", isPremium ? "text-white/60" : "text-gray-400")}>
                      /{plan.period === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </div>
                {plan.savings && (
                  <div className={cn("mt-2 text-sm font-semibold", isPremium ? "text-amber-400" : "text-emerald-600")}>
                    {plan.savings}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Check
                      className={cn(
                        "w-4 h-4 flex-shrink-0 mt-0.5",
                        isPremium ? "text-amber-400" : "text-emerald-600"
                      )}
                      strokeWidth={3}
                    />
                    <span className={isPremium ? "text-white/90" : "text-gray-700"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openCheckoutModal(plan)}
                disabled={isFree || loading === plan.id}
                className={cn(
                  "w-full py-3.5 rounded-full text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  isPremium
                    ? "bg-gradient-to-r from-amber-400 to-orange-400 text-[#1a1a1a] hover:from-amber-300 hover:to-orange-300"
                    : isPro
                    ? "bg-[#1a1a1a] text-white hover:bg-black"
                    : "bg-gray-100 text-gray-600 cursor-default"
                )}
              >
                {loading === plan.id
                  ? "Redirecting..."
                  : isFree
                  ? "Current Plan"
                  : isPremium
                  ? "Go Premium →"
                  : "Get Pro Access →"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10 text-xs text-gray-400 space-y-1">
        <p>Secure payment via Cashfree (UPI · cards · netbanking · wallets) · Cancel anytime</p>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h3 className="text-2xl font-black tracking-tight text-center mb-8">
          Compare All Features
        </h3>
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Feature</th>
                <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Free</th>
                <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] bg-gray-50">Pro</th>
                <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 text-[#1a1a1a]">Premium</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-3.5 text-gray-700">{row.feature}</td>
                  <td className="px-4 py-3.5 text-center text-gray-500">
                    {row.free === true ? (
                      <Check className="w-4 h-4 text-gray-400 mx-auto" />
                    ) : row.free === false ? (
                      <span className="text-gray-300">—</span>
                    ) : (
                      <span className="text-xs text-gray-500">{row.free}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center bg-gray-50 font-semibold text-[#1a1a1a]">
                    {row.pro === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" strokeWidth={3} />
                    ) : row.pro === false ? (
                      <span className="text-gray-300">—</span>
                    ) : (
                      <span className="text-xs">{row.pro}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center bg-amber-50 font-semibold text-[#1a1a1a]">
                    {row.premium === true ? (
                      <Check className="w-4 h-4 text-amber-600 mx-auto" strokeWidth={3} />
                    ) : (
                      <span className="text-xs">{row.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-black tracking-tight mb-4">Frequently Asked Questions</h3>
        <p className="text-gray-600 mb-6">
          Cancel anytime. Secure payments via Cashfree. Use NuradiHealth25 for 25% off.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-left">
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Can I cancel anytime?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">Yes. One-time payment model means you simply don&apos;t renew when your period ends.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">What payment methods are accepted?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">UPI, all major credit/debit cards, net banking, and wallets via Cashfree.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Is my payment secure?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">Absolutely. All payments are processed by Cashfree — PCI DSS Level 1 certified.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h4 className="font-bold text-sm mb-1">Do you offer a free trial?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">Free tier gives you core access forever. Upgrade anytime for premium features.</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {modalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm" onClick={() => !loading && setModalPlan(null)}>
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
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

            {/* Price display with discount */}
            <div className="mb-6">
              {appliedCoupon ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm line-through text-gray-400">{modalPlan.displayPrice}</span>
                    <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {appliedCoupon.description}
                    </span>
                  </div>
                  <p className="text-3xl font-black text-[#1a1a1a] mt-1">
                    {formatPaisa(finalPrice)}
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      /{modalPlan.period === "monthly" ? "month" : "year"}
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-3xl font-black text-[#1a1a1a]">
                  {modalPlan.displayPrice}
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    /{modalPlan.period === "monthly" ? "month" : "year"}
                  </span>
                </p>
              )}
            </div>

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

              {/* Coupon */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Coupon Code (optional)</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="text-sm font-bold text-emerald-700">{appliedCoupon.code}</p>
                        <p className="text-[10px] text-emerald-600">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponInput("");
                      }}
                      className="text-xs text-emerald-700 hover:underline"
                      disabled={!!loading}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try NuradiHealth25"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors uppercase"
                      disabled={!!loading}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={!couponInput.trim() || !!loading}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-red-600 mt-1.5">{couponError}</p>
                )}
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={!email.includes("@") || !!loading}
                className="w-full py-3.5 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Redirecting to payment..."
                  : `Pay ${formatPaisa(finalPrice)} →`}
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

const COMPARISON_ROWS: Array<{ feature: string; free: boolean | string; pro: boolean | string; premium: boolean | string }> = [
  { feature: "Browse 1,000+ videos", free: true, pro: true, premium: true },
  { feature: "28 verified creators", free: true, pro: true, premium: true },
  { feature: "BMI & Breathing tools", free: true, pro: true, premium: true },
  { feature: "Symptom Checker", free: true, pro: true, premium: true },
  { feature: "First Aid Guide", free: true, pro: true, premium: true },
  { feature: "Home Remedies library", free: true, pro: true, premium: true },
  { feature: "HealthBot AI messages", free: "10/day", pro: "Unlimited", premium: "Priority + Unlimited" },
  { feature: "Disease Infographics", free: "Preview", pro: "Full access", premium: "HD PDF downloads" },
  { feature: "Biological Age Calculator", free: false, pro: true, premium: true },
  { feature: "Gut Health Score", free: false, pro: true, premium: true },
  { feature: "Sleep Score Calculator", free: false, pro: true, premium: true },
  { feature: "Mood & Stress Tracker", free: false, pro: true, premium: true },
  { feature: "Structured Learning Paths", free: false, pro: true, premium: true },
  { feature: "Progress tracking & streaks", free: false, pro: true, premium: true },
  { feature: "Completion certificates", free: false, pro: true, premium: true },
  { feature: "Daily Dose (personalized)", free: false, pro: true, premium: true },
  { feature: "Ad-free experience", free: false, pro: true, premium: true },
  { feature: "Priority email support", free: false, pro: true, premium: true },
  { feature: "Annual health review", free: false, pro: "Basic (yearly)", premium: "Enhanced" },
  { feature: "1-on-1 doctor consultations", free: false, pro: false, premium: "4/year" },
  { feature: "Quarterly health reports", free: false, pro: false, premium: true },
  { feature: "VIP support (12h SLA)", free: false, pro: false, premium: true },
  { feature: "Early access to beta features", free: false, pro: false, premium: true },
];
