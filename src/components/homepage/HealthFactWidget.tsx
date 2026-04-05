"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { getTodaysFact } from "@/data/health-facts";

export function HealthFactWidget() {
  const fact = useMemo(() => getTodaysFact(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-l-4 border-emerald-500 p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Did you know?
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{fact.text}</p>
      <p className="text-[10px] text-muted-foreground mt-2">
        Source: {fact.source} · Updates daily
      </p>
    </motion.div>
  );
}
