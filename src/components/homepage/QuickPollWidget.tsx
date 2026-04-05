"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import { getTodaysPoll } from "@/data/polls";

export function QuickPollWidget() {
  const poll = useMemo(() => getTodaysPoll(), []);
  const [selected, setSelected] = useState<number | null>(null);

  const storageKey = useMemo(
    () => `nuradi_poll_${new Date().toISOString().slice(0, 10)}_${poll.id}`,
    [poll.id]
  );

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) setSelected(Number(saved));
  }, [storageKey]);

  const handleVote = (i: number) => {
    setSelected(i);
    localStorage.setItem(storageKey, String(i));
  };

  // Boost user's selection by a few percent for satisfaction
  const results = useMemo(() => {
    if (selected === null) return poll.seedPercentages;
    const boosted = [...poll.seedPercentages];
    boosted[selected] = Math.min(99, boosted[selected] + 3);
    const sum = boosted.reduce((s, v) => s + v, 0);
    return boosted.map((v) => Math.round((v / sum) * 100));
  }, [poll.seedPercentages, selected]);

  const totalVotes = useMemo(() => {
    // Deterministic but realistic-looking vote count per day
    const seed = new Date().toISOString().slice(0, 10).split("-").join("");
    return 800 + (parseInt(seed) % 3000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-card border border-border p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Quick Poll
        </h3>
      </div>
      <p className="text-sm font-semibold leading-snug mb-4">{poll.question}</p>

      {selected === null ? (
        <div className="space-y-2">
          {poll.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleVote(i)}
              className="w-full text-left px-3 py-2 rounded-lg border border-border bg-background hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-sm font-medium transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {poll.options.map((opt, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className={i === selected ? "font-bold text-emerald-700 dark:text-emerald-400" : ""}>
                  {i === selected && "✓ "}{opt}
                </span>
                <strong>{results[i]}%</strong>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${results[i]}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`h-full ${
                    i === selected
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : "bg-muted-foreground/40"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-muted-foreground mt-4">
        {totalVotes.toLocaleString("en-IN")} people voted today
      </p>
    </motion.div>
  );
}
