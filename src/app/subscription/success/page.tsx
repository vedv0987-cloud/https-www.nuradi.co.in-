"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { activateProFromServer } from "@/lib/subscription";

type VerifyState =
  | { status: "verifying" }
  | { status: "success"; plan: string; planName: string; email: string; expiresAt: string }
  | { status: "failed"; message: string };

function SuccessContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerifyState>({ status: "verifying" });

  useEffect(() => {
    const orderId =
      searchParams.get("order_id") ||
      (typeof window !== "undefined" ? localStorage.getItem("nuradi_checkout_order_id") : null);

    if (!orderId) {
      setState({ status: "failed", message: "No order ID found. If you completed payment, please contact support." });
      return;
    }

    fetch("/api/cashfree/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.plan) {
          const planKey = (data.period === "yearly" || data.plan.endsWith("_yearly")) ? "yearly" : "monthly";
          const tier = data.tier || (data.plan.startsWith("premium_") ? "premium" : "pro");
          activateProFromServer({
            tier,
            plan: planKey,
            email: data.email,
            expiresAt: data.expiresAt,
          });
          setState({
            status: "success",
            plan: planKey,
            planName: data.planName,
            email: data.email,
            expiresAt: data.expiresAt,
          });
        } else {
          setState({
            status: "failed",
            message: data.message || "Payment verification failed. If you were charged, contact support@nuradi.co.in.",
          });
        }
      })
      .catch(() => {
        setState({
          status: "failed",
          message: "Could not verify payment. Please contact support if you were charged.",
        });
      });
  }, [searchParams]);

  if (state.status === "verifying") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#1a1a1a] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (state.status === "failed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-3">Verification Failed</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">{state.message}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-[#1a1a1a] rounded-full text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">Welcome to {state.planName}!</h1>
        <p className="text-gray-600 mb-2 max-w-md mx-auto leading-relaxed">
          Your NuradiHealth Pro subscription is now active. All premium features are unlocked.
        </p>
        <p className="text-xs text-gray-400 mb-8">
          Active until {new Date(state.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Premium features unlocked
          </p>
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
          A confirmation email has been sent to {state.email}. Need help? Email support@nuradi.co.in
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
