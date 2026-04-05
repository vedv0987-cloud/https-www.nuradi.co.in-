"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || state === "loading") return;

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      setMessage(data.message || "Check your inbox to confirm!");
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border p-8 sm:p-10 text-center">
        <AnimatePresence mode="wait">
          {state !== "success" ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">Get smarter about health every day</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Join thousands who get daily health tips, curated videos, and actionable advice. No spam, ever.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  className="flex-1"
                  required
                  disabled={state === "loading"}
                />
                <Button type="submit" className="gap-1.5 px-5" disabled={state === "loading"}>
                  {state === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                  ) : (
                    <>Subscribe <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
              {state === "error" && message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-4 flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4" /> {message}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-1">Check your inbox!</h2>
              <p className="text-sm text-muted-foreground">{message || "We've sent you a confirmation email."}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
