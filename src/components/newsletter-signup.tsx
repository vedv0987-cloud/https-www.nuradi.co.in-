"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;
type State = "idle" | "loading" | "success" | "error";

export function NewsletterSignup() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: NewsletterFormData) => {
    if (state === "loading") return;
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      setMessage(json.message || "Check your inbox to confirm!");
      reset();
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
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 max-w-md mx-auto" noValidate>
                <Input
                  {...register("email")}
                  placeholder="your@email.com"
                  type="email"
                  className="flex-1"
                  disabled={state === "loading"}
                  aria-invalid={!!errors.email}
                />
                <Button type="submit" className="gap-1.5 px-5" disabled={state === "loading"}>
                  {state === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                  ) : (
                    <>Subscribe <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-3 flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.email.message}
                </motion.p>
              )}
              {state === "error" && message && !errors.email && (
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
