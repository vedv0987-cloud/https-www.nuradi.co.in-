import PricingCards from "@/components/subscription/PricingCards";

export const metadata = {
  title: "Pricing — NuradiHealth",
  description: "Upgrade to Pro for structured learning, progress tracking, and an ad-free experience.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
            NuradiHealth Pro
          </div>
        </div>
        <PricingCards />
      </div>
    </div>
  );
}
