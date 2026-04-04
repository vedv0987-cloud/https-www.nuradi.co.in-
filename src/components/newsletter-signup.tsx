"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      const existing = JSON.parse(localStorage.getItem("healthedutv_subscribers") || "[]");
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem("healthedutv_subscribers", JSON.stringify(existing));
    } catch {}
    setSubscribed(true);
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border p-8 sm:p-10 text-center">
        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">Get smarter about health every week</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Join readers who get the best health videos, facts, and tips. One email per week. No spam, ever.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" className="flex-1" required />
                <Button type="submit" className="gap-1.5 px-5">Subscribe <ArrowRight className="w-4 h-4" /></Button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-1">You&apos;re in!</h2>
              <p className="text-sm text-muted-foreground">Welcome to the NuradiHealth community.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
