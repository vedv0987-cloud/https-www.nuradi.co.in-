"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateDueDate, getBabySize, MILESTONES, formatDate,
  type DueDateMethod,
} from "@/lib/calculators/due-date";
import { triggerConfetti } from "@/lib/tools-animations";

export default function DueDatePage() {
  const today = new Date();
  const defaultDate = new Date(today);
  defaultDate.setDate(today.getDate() - 28);

  const [method, setMethod] = useState<DueDateMethod | null>(null);
  const [dateStr, setDateStr] = useState(defaultDate.toISOString().slice(0, 10));
  const [cycleLength, setCycleLength] = useState(28);

  const result = useMemo(() => {
    if (!method) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return calculateDueDate(method, d, cycleLength);
  }, [method, dateStr, cycleLength]);

  useEffect(() => {
    if (result) triggerConfetti();
  }, [result]);

  const babySize = result ? getBabySize(result.weeksPregnant) : null;

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Calculation Method</label>
        <RadioCards<DueDateMethod>
          options={[
            { value: "lmp", label: "Last Period (LMP)", description: "Most common method", icon: "📅" },
            { value: "conception", label: "Conception Date", description: "If you know exactly when", icon: "💕" },
            { value: "ivf", label: "IVF Transfer Date", description: "Day 5 transfer", icon: "🧬" },
          ]}
          value={method}
          onChange={setMethod}
        />
      </div>
      {method && (
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
            {method === "lmp" ? "First day of last period" : method === "conception" ? "Conception date" : "IVF transfer date"}
          </label>
          <Input type="date" value={dateStr} max={today.toISOString().slice(0, 10)} onChange={(e) => setDateStr(e.target.value)} />
        </div>
      )}
      {method === "lmp" && (
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
            Cycle length: {cycleLength} days
          </label>
          <input type="range" min={21} max={35} value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="w-full accent-pink-500" />
        </div>
      )}
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">🤰</div>
          <p className="text-muted-foreground">Select a method and date to calculate.</p>
        </motion.div>
      ) : (
        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">🎉 Your Due Date</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-rose-700 dark:text-rose-300 mb-2">
              {formatDate(result.dueDate)}
            </p>
            <p className="text-sm text-muted-foreground">
              in <AnimatedNumber value={result.daysToGo} /> days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-card p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">You&apos;re at</p>
              <p className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">
                <AnimatedNumber value={result.weeksPregnant} />w {result.daysPregnant}d
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Trimester</p>
              <p className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">#{result.trimester}</p>
            </div>
          </div>

          {babySize && result.weeksPregnant >= 4 && (
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Baby is the size of a</p>
              <div className="text-6xl mb-2">{babySize.emoji}</div>
              <p className="text-xl font-bold capitalize">{babySize.size}</p>
            </div>
          )}

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3">Key Milestones</h3>
            <div className="space-y-2">
              {MILESTONES.map((m) => {
                const reached = result.weeksPregnant >= m.week;
                return (
                  <div key={m.week} className={`flex items-center gap-3 py-2 ${reached ? "opacity-100" : "opacity-50"}`}>
                    <div className={`w-12 text-center text-xs font-bold rounded-lg px-1.5 py-1 flex-shrink-0 ${reached ? "bg-pink-500 text-white" : "bg-muted"}`}>
                      W{m.week}
                    </div>
                    <p className="text-sm flex-1">{m.event}</p>
                    {reached && <span className="text-emerald-500 text-sm">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="due-date"
      title="Pregnancy Due Date"
      description="Calculate your baby's due date from LMP, conception date, or IVF transfer date. Includes week-by-week baby size & milestones."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
