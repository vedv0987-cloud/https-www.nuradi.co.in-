"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Unlock, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { enableDevMode, disableDevMode, isDevModeActive } from "@/lib/subscription";

export default function DevUnlockPage() {
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsActive(isDevModeActive());
  }, []);

  const handleToggle = () => {
    if (isActive) {
      disableDevMode();
      setIsActive(false);
    } else {
      enableDevMode();
      setIsActive(true);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-white border-2 border-[#1a1a1a] rounded-3xl p-8 text-center shadow-2xl">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
              isActive ? "bg-emerald-600" : "bg-gray-200"
            }`}
          >
            {isActive ? (
              <Unlock className="w-7 h-7 text-white" strokeWidth={2.5} />
            ) : (
              <Lock className="w-7 h-7 text-gray-500" strokeWidth={2.5} />
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            Developer Mode
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-2">
            {isActive ? "Dev Mode Active" : "Dev Mode Inactive"}
          </h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {isActive
              ? "All premium content is unlocked on this device. A yellow 'Dev Mode' badge will appear on gated pages."
              : "Unlock all Pro and Premium features on this device without payment. Useful for development and testing."}
          </p>

          <div className="space-y-2 mb-6 text-left bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">When active, unlocks:</p>
            {[
              "120 Disease Infographics (/infographics)",
              "Biological Age Calculator",
              "Gut Health Score",
              "Sleep Score, Mood Tracker",
              "Unlimited HealthBot AI",
              "Learning Paths, Daily Dose",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={3} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleToggle}
            className={`w-full py-3.5 rounded-full text-sm font-bold transition-colors ${
              isActive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-[#1a1a1a] text-white hover:bg-black"
            }`}
          >
            {isActive ? (
              <span className="inline-flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Deactivate Dev Mode
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                Activate Dev Mode
              </span>
            )}
          </button>

          <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
            This only affects your current browser. Regular users are not affected.
            <br />
            Alternative: set <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">localStorage.nuradi_dev_mode = &quot;true&quot;</code> in DevTools.
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-[#1a1a1a] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
