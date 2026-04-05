"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { activatePro } from "@/lib/subscription";

function SuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Activate Pro locally. In production, a webhook-triggered server lookup should be the source of truth.
    const plan = searchParams.get("plan") === "yearly" ? "yearly" : "monthly";
    activatePro(plan);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">Welcome to Pro!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Your NuradiHealth Pro subscription is now active. You have unlimited access to all premium features, HealthBot AI, 120 disease infographics, and more.
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Premium features unlocked</p>
          <div className="space-y-2">
            <Link href="/chat" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group">
              <span className="text-sm font-medium text-[#1a1a1a]">Unlimited HealthBot AI \u2192</span>
            </Link>
            <Link href="/infographics" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group">
              <span className="text-sm font-medium text-[#1a1a1a]">120 Disease Infographics \u2192</span>
            </Link>
            <Link href="/tools/biological-age" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group">
              <span className="text-sm font-medium text-[#1a1a1a]">Biological Age Calculator \u2192</span>
            </Link>
            <Link href="/tools/gut-health" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group">
              <span className="text-sm font-medium text-[#1a1a1a]">Gut Health Score \u2192</span>
            </Link>
            <Link href="/learning-paths" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group">
              <span className="text-sm font-medium text-[#1a1a1a]">Structured Learning Paths \u2192</span>
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors"
        >
          Go to Homepage
        </Link>

        <p className="text-xs text-gray-400 mt-6">
          A confirmation email has been sent to your inbox. Need help? Email support@nuradi.co.in
        </p>
      </div>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SuccessContent />
    </Suspense>
  );
}
