// Subscription status management
// Uses localStorage for instant UX + Supabase as source of truth (via /api/subscription/status)

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nuradi_pro_subscription";
const EMAIL_KEY = "nuradi_checkout_email";

export interface ProStatus {
  isPro: boolean;
  plan: "monthly" | "yearly" | null;
  activatedAt: string | null;
  expiresAt: string | null;
  email: string | null;
}

const EMPTY: ProStatus = { isPro: false, plan: null, activatedAt: null, expiresAt: null, email: null };

function getStoredStatus(): ProStatus {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProStatus>;

    // Check expiry on the client too
    if (parsed.expiresAt) {
      const expiresAt = new Date(parsed.expiresAt);
      if (expiresAt < new Date()) {
        localStorage.removeItem(STORAGE_KEY);
        return EMPTY;
      }
    }

    return {
      isPro: parsed.isPro ?? false,
      plan: parsed.plan ?? null,
      activatedAt: parsed.activatedAt ?? null,
      expiresAt: parsed.expiresAt ?? null,
      email: parsed.email ?? null,
    };
  } catch {
    return EMPTY;
  }
}

/**
 * Hook to check if the current user has an active Pro subscription.
 * On mount: loads from localStorage immediately, then syncs with Supabase.
 */
export function useSubscription() {
  const [status, setStatus] = useState<ProStatus>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Instant UX: load from localStorage first
    const stored = getStoredStatus();
    setStatus(stored);

    // Sync with server if we have an email
    const email = stored.email || localStorage.getItem(EMAIL_KEY);
    if (email) {
      fetch(`/api/subscription/status?email=${encodeURIComponent(email)}`)
        .then((r) => r.json())
        .then((serverStatus: { isPro: boolean; plan?: "monthly" | "yearly"; expiresAt?: string; activatedAt?: string }) => {
          if (serverStatus.isPro && serverStatus.plan) {
            const synced: ProStatus = {
              isPro: true,
              plan: serverStatus.plan,
              activatedAt: serverStatus.activatedAt || null,
              expiresAt: serverStatus.expiresAt || null,
              email,
            };
            setStatus(synced);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
          } else if (stored.isPro) {
            // Server says not Pro, but local says Pro → clear local (refund/expiry)
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

  return { ...status, isLoading };
}

/**
 * Activate Pro after server-verified payment.
 * Called from /subscription/success after /api/cashfree/verify succeeds.
 */
export function activateProFromServer(opts: {
  plan: "monthly" | "yearly";
  email: string;
  expiresAt: string;
}) {
  if (typeof window === "undefined") return;
  const status: ProStatus = {
    isPro: true,
    plan: opts.plan,
    activatedAt: new Date().toISOString(),
    expiresAt: opts.expiresAt,
    email: opts.email,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  localStorage.setItem(EMAIL_KEY, opts.email);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}

/** Manually deactivate Pro (testing / logout) */
export function deactivatePro() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("nuradi:pro-updated"));
}
