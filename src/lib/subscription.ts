// Subscription status management
// NOTE: This is a client-side MVP implementation using localStorage.
// TODO: Replace with real auth + Supabase subscription lookup once auth is added.

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nuradi_pro_subscription";

export interface ProStatus {
  isPro: boolean;
  plan: "monthly" | "yearly" | null;
  activatedAt: string | null;
}

function getStoredStatus(): ProStatus {
  if (typeof window === "undefined") return { isPro: false, plan: null, activatedAt: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isPro: false, plan: null, activatedAt: null };
    return JSON.parse(raw);
  } catch {
    return { isPro: false, plan: null, activatedAt: null };
  }
}

/**
 * Hook to check if the current user has an active Pro subscription.
 * Returns { isPro, isLoading, plan, activatedAt }
 */
export function useSubscription() {
  const [status, setStatus] = useState<ProStatus>({ isPro: false, plan: null, activatedAt: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setStatus(getStoredStatus());
    setIsLoading(false);

    // Listen for storage events (e.g. upgrade in another tab)
    const handler = () => setStatus(getStoredStatus());
    window.addEventListener("storage", handler);
    window.addEventListener("nuradi:pro-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("nuradi:pro-updated", handler);
    };
  }, []);

  return { ...status, isLoading };
}

/** Activate Pro subscription (called after successful Stripe checkout) */
export function activatePro(plan: "monthly" | "yearly") {
  if (typeof window === "undefined") return;
  const status: ProStatus = {
    isPro: true,
    plan,
    activatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

/** Cancel Pro subscription (for testing / manual cancel) */
export function deactivatePro() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}
