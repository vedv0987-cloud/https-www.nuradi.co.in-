import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Subscription Cancelled",
  description: "Your checkout was cancelled. No charges were made.",
};

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-gray-400" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-3">Checkout Cancelled</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          No worries — you haven&apos;t been charged. You can subscribe anytime.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-black transition-colors"
          >
            View Plans Again
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-[#1a1a1a] rounded-full text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
