"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  SYMPTOMS,
  analyzeDeficiencies,
  type Symptom,
} from "@/lib/calculators/vitamin-check";

const GROUP_LABELS: Record<Symptom["group"], { label: string; emoji: string }> = {
  physical: { label: "Physical", emoji: "💪" },
  "skin-hair": { label: "Skin & Hair", emoji: "💇" },
  mental: { label: "Mental", emoji: "🧠" },
  digestive: { label: "Digestive & Other", emoji: "🫃" },
};

export default function VitaminCheckPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const results = useMemo(
    () => analyzeDeficiencies(Array.from(selected)),
    [selected]
  );

  const groupedSymptoms = useMemo(() => {
    const groups: Record<string, Symptom[]> = {};
    SYMPTOMS.forEach((s) => {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(s);
    });
    return groups;
  }, []);

  const inputPanel = (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        Tap all symptoms you&apos;ve experienced in the last 2 weeks.
      </p>
      {Object.entries(groupedSymptoms).map(([group, syms]) => (
        <div key={group}>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
            {GROUP_LABELS[group as Symptom["group"]].emoji} {GROUP_LABELS[group as Symptom["group"]].label}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {syms.map((s) => {
              const isSelected = selected.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`text-left p-2.5 rounded-xl border-2 transition-colors text-xs font-medium ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                      : "border-border bg-card hover:border-emerald-500/40"
                  }`}
                >
                  {isSelected && "✓ "}{s.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {selected.size === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border bg-card p-10 text-center"
        >
          <div className="text-5xl mb-3">💊</div>
          <p className="text-muted-foreground">Select symptoms to analyze potential vitamin deficiencies.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Based on {selected.size} symptom{selected.size > 1 ? "s" : ""}
            </p>
            <p className="text-base font-bold">Top deficiency matches ranked by confidence</p>
          </div>

          <div className="space-y-3">
            {results.slice(0, 5).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[10px] font-bold text-muted-foreground">#{i + 1}</span>
                      <h3 className="font-bold">{d.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {d.matchedSymptoms} matching symptom{d.matchedSymptoms > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-2xl font-extrabold ${d.confidence >= 60 ? "text-rose-600 dark:text-rose-400" : d.confidence >= 30 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                      <AnimatedNumber value={d.confidence} />%
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">confidence</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.confidence}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    className={`h-full ${d.confidence >= 60 ? "bg-rose-500" : d.confidence >= 30 ? "bg-amber-500" : "bg-muted-foreground"}`}
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Indian food sources:</span>
                    <p className="mt-1">{d.foods.join(" · ")}</p>
                  </div>
                  <div>
                    <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Lab tests:</span>
                    <p className="mt-1">{d.tests.join(" · ")}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 text-xs text-muted-foreground">
            ⚠️ <strong>This is not a diagnosis.</strong> Symptoms overlap across many conditions. Use this to guide a conversation with your doctor + order appropriate blood tests.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="vitamin-check"
      title="Vitamin Deficiency Checker"
      description="Tap your symptoms to see which vitamin/mineral deficiencies they might indicate, plus Indian food sources and blood tests to order."
      inputs={inputPanel}
      result={resultPanel}
    />
  );
}
