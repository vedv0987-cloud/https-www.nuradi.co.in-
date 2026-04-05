"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { calculateDosage, MEDICINES } from "@/lib/calculators/kids-dosage";

export default function KidsDosagePage() {
  const [weightKg, setWeightKg] = useState(15);
  const [ageYears, setAgeYears] = useState(4);
  const [selectedId, setSelectedId] = useState(MEDICINES[0].id);

  const medicine = MEDICINES.find((m) => m.id === selectedId)!;
  const result = useMemo(() => calculateDosage(weightKg, medicine), [weightKg, medicine]);

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Child Weight (kg)</label>
          <Input type="number" min={3} max={60} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age (years)</label>
          <Input type="number" min={0} max={16} value={ageYears} onChange={(e) => setAgeYears(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Medicine</label>
        <div className="grid grid-cols-1 gap-2">
          {MEDICINES.map((m) => {
            const selected = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`text-left p-3 rounded-xl border-2 transition-colors ${selected ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : "border-border bg-card hover:border-emerald-500/40"}`}
              >
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.brand}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{m.syrupStrength}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      <motion.div key={selectedId + weightKg} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {result.warning && (
          <div className="rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-900/40 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">{result.warning}</p>
          </div>
        )}

        <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Per Dose</p>
          <div className="text-6xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            <AnimatedNumber value={result.doseMl} format={(n) => n.toFixed(1)} /><span className="text-2xl"> ml</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">= {result.doseMg} mg · {result.medicine.activeIngredient}</p>
        </div>

        {/* Measuring cup visual */}
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-bold mb-3">Measuring Cup</h3>
          <div className="relative mx-auto w-32 h-48 border-2 border-border rounded-b-3xl rounded-t-md overflow-hidden bg-muted/30">
            {[10, 7.5, 5, 2.5].map((ml) => (
              <div key={ml} className="absolute left-0 right-0 border-t border-muted-foreground/30" style={{ bottom: `${(ml / 10) * 100}%` }}>
                <span className="absolute -left-6 -top-2 text-[10px] text-muted-foreground">{ml}ml</span>
              </div>
            ))}
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: `${Math.min(100, (result.doseMl / 10) * 100)}%` }}
              transition={{ duration: 1.2, type: "spring" }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-300"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <p className="text-sm font-bold text-white drop-shadow" style={{ marginBottom: `${Math.min(100, (result.doseMl / 10) * 100) - 5}%` }}>
                {result.doseMl} ml
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Schedule</p>
            <p className="text-lg font-extrabold">Every {result.scheduleHours}h</p>
            <p className="text-xs text-muted-foreground">{result.medicine.dosesPerDay}x per day</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Daily Max</p>
            <p className="text-lg font-extrabold">{result.totalDailyMl} ml</p>
            <p className="text-xs text-muted-foreground">{result.maxDailyMg} mg/day</p>
          </div>
        </div>

        <div className="rounded-xl bg-muted/50 p-4 text-sm">
          <p className="font-semibold mb-1">📋 Notes</p>
          <p className="text-muted-foreground text-xs">{result.medicine.notes}</p>
        </div>

        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 text-xs text-rose-700 dark:text-rose-300">
          ⚠️ <strong>Always verify with your pediatrician.</strong> Use the measuring cup/syringe that came with the medicine. Never use kitchen spoons.
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="kids-dosage"
      title="Kids Medicine Dosage"
      description="Calculate safe pediatric doses for common Indian medicines (Calpol, Meftal-P, Augmentin, Azee, etc.) based on your child's weight."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
