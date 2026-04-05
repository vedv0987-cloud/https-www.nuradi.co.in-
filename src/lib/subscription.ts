// Subscription status management
// Uses localStorage for instant UX + Supabase as source of truth (via /api/subscription/status)
// Also supports dev-mode bypass via localStorage flag

"use client";

import { useEffect, useState } from "react";
import type { Tier } from "@/lib/cashfree";
import { tierMeetsRequirement } from "@/lib/cashfree";

const STORAGE_KEY = "nuradi_pro_subscription";
const EMAIL_KEY = "nuradi_checkout_email";
const DEV_MODE_KEY = "nuradi_dev_mode";

export interface ProStatus {
  isPro: boolean;
  tier: Tier;
  plan: "monthly" | "yearly" | null;
  activatedAt: string | null;
  expiresAt: string | null;
  email: string | null;
  isDev?: boolean;
}

const EMPTY: ProStatus = {
  isPro: false,
  tier: "free",
  plan: null,
  activatedAt: null,
  expiresAt: null,
  email: null,
};

const DEV_STATUS: ProStatus = {
  isPro: true,
  tier: "premium",
  plan: "yearly",
  activatedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  email: "dev@nuradi.co.in",
  isDev: true,
};

function isDevMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEV_MODE_KEY) === "true";
}

function getStoredStatus(): ProStatus {
  if (typeof window === "undefined") return EMPTY;
  if (isDevMode()) return DEV_STATUS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProStatus>;

    if (parsed.expiresAt) {
      const expiresAt = new Date(parsed.expiresAt);
      if (expiresAt < new Date()) {
        localStorage.removeItem(STORAGE_KEY);
        return EMPTY;
      }
    }

    return {
      isPro: parsed.isPro ?? false,
      tier: parsed.tier ?? (parsed.isPro ? "pro" : "free"),
      plan: parsed.plan ?? null,
      activatedAt: parsed.activatedAt ?? null,
      expiresAt: parsed.expiresAt ?? null,
      email: parsed.email ?? null,
    };
  } catch {
    return EMPTY;
  }
}

/** React hook: returns current subscription status */
export function useSubscription() {
  const [status, setStatus] = useState<ProStatus>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dev mode: bypass all checks
    if (isDevMode()) {
      setStatus(DEV_STATUS);
      setIsLoading(false);
      return;
    }

    const stored = getStoredStatus();
    setStatus(stored);

    const email = stored.email || localStorage.getItem(EMAIL_KEY);
    if (email) {
      fetch(`/api/subscription/status?email=${encodeURIComponent(email)}`)
        .then((r) => r.json())
        .then((serverStatus: { isPro: boolean; tier?: Tier; plan?: "monthly" | "yearly"; expiresAt?: string; activatedAt?: string }) => {
          if (serverStatus.isPro && serverStatus.plan) {
            const synced: ProStatus = {
              isPro: true,
              tier: serverStatus.tier || "pro",
              plan: serverStatus.plan,
              activatedAt: serverStatus.activatedAt || null,
              expiresAt: serverStatus.expiresAt || null,
              email,
            };
            setStatus(synced);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
          } else if (stored.isPro) {
            setStatus(EMPTY);
            localStorage.removeItem(STORAGE_KEY);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }

    const handler = () => setStatus(getStoredStatus());
    window.addEventListener("storage", handler);
    window.addEventListener("nuradi:pro-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("nuradi:pro-updated", handler);
    };
  }, []);

  /** Helper: does the user meet a minimum tier? */
  const meetsTier = (required: Tier) => tierMeetsRequirement(status.tier, required);

  return { ...status, isLoading, meetsTier };
}

/** Called from /subscription/success after server verification */
export function activateProFromServer(opts: {
  tier: Tier;
  plan: "monthly" | "yearly";
  email: string;
  expiresAt: string;
}) {
  if (typeof window === "undefined") return;
  const status: ProStatus = {
    isPro: true,
    tier: opts.tier,
    plan: opts.plan,
    activatedAt: new Date().toISOString(),
    expiresAt: opts.expiresAt,
    email: opts.email,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  localStorage.setItem(EMAIL_KEY, opts.email);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

/** Manual deactivate (testing / logout) */
export function deactivatePro() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

// Dev mode helpers
export function enableDevMode() {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEV_MODE_KEY, "true");
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

export function disableDevMode() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DEV_MODE_KEY);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

export function isDevModeActive(): boolean {
  return isDevMode();
}
