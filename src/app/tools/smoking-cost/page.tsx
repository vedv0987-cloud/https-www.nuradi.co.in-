"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateSmokingCost,
  buyableItems,
  DAMAGE_TIMELINE,
  RECOVERY_TIMELINE,
} from "@/lib/calculators/smoking-cost";

export default function SmokingCostPage() {
  const [cigs, setCigs] = useState(10);
  const [price, setPrice] = useState(15);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () =>
      calculateSmokingCost({
        cigarettesPerDay: cigs,
        pricePerCigarette: price,
        yearsSmoking: years,
      }),
    [cigs, price, years]
  );

  const purchases = useMemo(() => buyableItems(result.lifetimeCost), [result.lifetimeCost]);

  const formatINR = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Cigarettes per day: <span className="text-foreground text-base">{cigs}</span>
        </label>
        <input
          type="range"
          min={1}
          max={40}
          value={cigs}
          onChange={(e) => setCigs(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>1</span>
          <span>20</span>
          <span>40</span>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Price per cigarette: <span className="text-foreground text-base">₹{price}</span>
        </label>
        <input
          type="range"
          min={5}
          max={30}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>₹5</span>
          <span>₹15</span>
          <span>₹30</span>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Years smoking: <span className="text-foreground text-base">{years}</span>
        </label>
        <input
          type="range"
          min={1}
          max={50}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Giant money counter */}
        <div className="rounded-2xl border bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">You&apos;ve Spent</p>
          <div className="text-5xl sm:text-6xl font-extrabold text-rose-600 dark:text-rose-400">
            <AnimatedNumber value={result.lifetimeCost} format={formatINR} />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            on cigarettes in <strong>{years} years</strong> · {result.totalCigarettesSmoked.toLocaleString("en-IN")} cigarettes smoked
          </p>
        </div>

        {/* Cost breakdown grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Daily</p>
            <p className="text-xl font-extrabold">{formatINR(result.dailyCost)}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Monthly</p>
            <p className="text-xl font-extrabold">{formatINR(result.monthlyCost)}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Yearly</p>
            <p className="text-xl font-extrabold">{formatINR(result.yearlyCost)}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Next 10 yrs</p>
            <p className="text-xl font-extrabold">{formatINR(result.future10yCost)}</p>
          </div>
        </div>

        {/* If invested */}
        <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">If You&apos;d Invested It (12% return)</p>
          <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
            {formatINR(result.investmentValue)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            That smoke money could have become real wealth.
          </p>
        </div>

        {/* What you could've bought */}
        {purchases.length > 0 && (
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">What You Could&apos;ve Bought Instead</h3>
            <div className="grid grid-cols-2 gap-3">
              {purchases.map((p) => (
                <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-3xl flex-shrink-0">{p.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{p.count}×</p>
                    <p className="text-xs font-semibold truncate">{p.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Life lost */}
        <div className="rounded-2xl border bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-950/40 dark:to-rose-950/20 p-8 text-center">
          <p className="text-4xl mb-2">⏳</p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Life Lost to Smoking</p>
          <div className="text-5xl sm:text-6xl font-extrabold text-rose-600 dark:text-rose-400">
            <AnimatedNumber value={result.yearsLost} format={(n) => n.toFixed(1)} /> <span className="text-2xl">years</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            = {result.daysLost.toLocaleString("en-IN")} days · {result.minutesLost.toLocaleString("en-IN")} minutes
          </p>
          <p className="text-[10px] text-muted-foreground mt-2">
            Based on CDC estimate: 11 minutes lost per cigarette
          </p>
        </div>

        {/* Damage timeline */}
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-bold mb-4 text-rose-600 dark:text-rose-400">⚠️ Health Damage Timeline</h3>
          <div className="space-y-3">
            {DAMAGE_TIMELINE.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-16 rounded-lg px-2 py-1 text-center text-xs font-bold text-white" style={{ backgroundColor: d.color }}>
                  {d.years}y
                </div>
                <p className="text-sm flex-1 pt-1">{d.event}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recovery timeline */}
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-bold mb-4 text-emerald-600 dark:text-emerald-400">✨ If You Quit Today</h3>
          <div className="space-y-2.5">
            {RECOVERY_TIMELINE.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-20 rounded-lg px-2 py-1 text-center text-[10px] font-bold text-white" style={{ backgroundColor: r.color }}>
                  {r.time}
                </div>
                <p className="text-sm flex-1 pt-0.5">{r.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="smoking-cost"
      title="Smoking Cost Calculator"
      description="See exactly how much money and life you're losing to smoking — and what you'd gain by quitting today."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
