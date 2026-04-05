"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Lock, Sparkles, Check, Crown } from "lucide-react";
import { useSubscription } from "@/lib/subscription";
import type { Tier } from "@/lib/cashfree";

interface PremiumGateProps {
  children: ReactNode;
  feature: string;
  description?: string;
  showPreview?: boolean;
  requiredTier?: "pro" | "premium";
}

export function PremiumGate({
  children,
  feature,
  description,
  showPreview = true,
  requiredTier = "pro",
}: PremiumGateProps) {
  const { isLoading, meetsTier, isDev } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (meetsTier(requiredTier as Tier)) {
    // If dev mode is active, show a subtle dev badge in the top-right corner
    if (isDev) {
      return (
        <div className="relative">
          <div className="absolute top-4 right-4 z-50 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider shadow-sm pointer-events-none">
            <Sparkles className="w-2.5 h-2.5" />
            Dev Mode
          </div>
          {children}
        </div>
      );
    }
    return <>{children}</>;
  }

  const tierName = requiredTier === "premium" ? "Premium" : "Pro";
  const tierColor = requiredTier === "premium" ? "amber" : "gray";
  const defaultDesc =
    requiredTier === "premium"
      ? "Upgrade to Premium for exclusive features including 1-on-1 doctor consultations."
      : "Upgrade to Pro to unlock this and all premium features.";

  const proFeatures = [
    "Unlimited HealthBot AI",
    "120 Disease Infographics",
    "All Premium Tools",
    "Structured Learning Paths",
    "Ad-free experience",
  ];

  const premiumFeatures = [
    "Everything in Pro",
    "4 Doctor Consultations/year",
    "HealthBot Priority Queue",
    "Full Infographics HD PDFs",
    "Enhanced Annual Review",
  ];

  const features = requiredTier === "premium" ? premiumFeatures : proFeatures;
  const startingPrice = requiredTier === "premium" ? "₹2,999/month" : "₹999/month";

  return (
    <div className="relative min-h-[600px]">
      {showPreview && (
        <div className="pointer-events-none select-none opacity-40 blur-md max-h-[600px] overflow-hidden">
          {children}
        </div>
      )}

      <div className={showPreview ? "absolute inset-0 flex items-center justify-center px-4" : "flex items-center justify-center px-4 py-16"}>
        <div className="max-w-md w-full bg-white border-2 border-[#1a1a1a] rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            {requiredTier === "premium" ? (
              <Crown className="w-7 h-7 text-amber-400" strokeWidth={2.5} />
            ) : (
              <Lock className="w-7 h-7 text-white" strokeWidth={2.5} />
            )}
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-${tierColor}-100 text-${tierColor}-800 text-[10px] font-bold uppercase tracking-wider mb-4`}>
            <Sparkles className="w-3 h-3" />
            {tierName} Feature
          </div>

          <h2 className="text-2xl font-black tracking-tight mb-2">{feature}</h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description || defaultDesc}</p>

          <div className="space-y-2 mb-6 text-left bg-gray-50 rounded-xl p-4">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={3} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Link
              href="/pricing"
              className="flex-1 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors"
            >
              Upgrade to {tierName} →
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-3 border border-gray-200 text-[#1a1a1a] rounded-full text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              View Plans
            </Link>
          </div>

          <p className="text-[11px] text-gray-400 mt-4">
            Starting at {startingPrice} · 49% off yearly plans · Use code NuradiHealth25
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 ${className}`}>
      <Sparkles className="w-2.5 h-2.5" />
      Pro
    </span>
  );
}

export function PremiumBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 text-white ${className}`}>
      <Crown className="w-2.5 h-2.5" />
      Premium
    </span>
  );
}
