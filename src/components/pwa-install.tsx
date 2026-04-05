"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstall() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Capture install prompt, gate on visit count
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Count visits
    const count = parseInt(localStorage.getItem("nuradi_visit_count") || "0", 10) + 1;
    localStorage.setItem("nuradi_visit_count", String(count));

    // Don't show if dismissed or already installed
    if (localStorage.getItem("nuradi_pwa_dismissed") === "true") return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      // Show banner after 3rd visit
      if (count >= 3) {
        setTimeout(() => setVisible(true), 2000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("nuradi_pwa_installed", "true");
    }
    setPromptEvent(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("nuradi_pwa_dismissed", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border bg-background shadow-2xl p-4 flex items-start gap-3"
        >
          <div className="text-3xl">📱</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold mb-0.5">Install NuradiHealth</p>
            <p className="text-xs text-muted-foreground">
              Quick access + works offline + daily health tips
            </p>
            <div className="flex gap-2 mt-2.5">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full"
              >
                <Download className="h-3 w-3" /> Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
