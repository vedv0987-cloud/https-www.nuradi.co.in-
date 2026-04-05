"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("nuradi_cookie_consent");
    if (!consent) setShow(true);
  }, []);

  const accept = (level: "all" | "essential") => {
    localStorage.setItem("nuradi_cookie_consent", level);
    localStorage.setItem("nuradi_cookie_consent_date", new Date().toISOString());
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
        >
          <div className="max-w-4xl mx-auto bg-background border border-border rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="flex-1">
              <p className="text-sm">
                🍪 We use cookies to improve your experience and analyze usage. Essential cookies keep the site working.
              </p>
              <Link href="/privacy" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                Read Privacy Policy →
              </Link>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => accept("essential")}
                className="flex-1 md:flex-none text-xs font-semibold px-3 py-2 rounded-lg border hover:bg-muted"
              >
                Essential Only
              </button>
              <button
                onClick={() => accept("all")}
                className="flex-1 md:flex-none text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg hover:opacity-90"
              >
                Accept All
              </button>
              <button onClick={() => accept("essential")} aria-label="Close" className="hidden md:block text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
